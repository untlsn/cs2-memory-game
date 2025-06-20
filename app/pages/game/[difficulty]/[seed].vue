<script setup lang="ts">
import GameBoardInfoDisplay from '~/components/GameBoardInfoDisplay.vue';

const canvasRef = useTemplateRef('canvas');
const {
  syncCanvasSizesAndGetUnitSize,
  getCtx,
  checkIfTileIsHovered,
  isAnyTileHovered,
  onMouseMove,
  onMouseLeave,
  cursorPosition,
} = useCanvasBinds(canvasRef);

const tiles = useTiles();
const gameStore = useGameStore();
gameStore.checkGame(useGameBoardParams());
gameStore.flipMatchedTiles(tiles);

const disableParallax = useDisableParallax();

onMounted(async () => {
  const ctx = getCtx();
  if (!ctx) return;

  const requiredRowUnits = GAME_BOARD_MARGIN_SIZE + Math.sqrt(tiles.length) * (GAME_BOARD_TILE_SIZE + GAME_BOARD_MARGIN_SIZE);

  const units = new CtxUnitCalculator(
    ctx,
    syncCanvasSizesAndGetUnitSize(requiredRowUnits),
    cursorPosition,
    disableParallax,
  );

  const getTileColor = (tile: GameBoardTile) => {
    if (tile.isFlipped) return GAME_BOARD_COLOR_GRADIENT_RARITY[tile.rarity]!;
    if (checkIfTileIsHovered(tile)) return GAME_BOARD_COLOR_GRADIENT_GOLD_BRIGHT;

    return GAME_BOARD_COLOR_GRADIENT_GOLD;
  };

  const drawWeapon = await WeaponPainter(units);
  const drawRect = await RoundedRectPainter(units);
  const createGradient = GradientCreator(units, getTileColor);

  watchEffect(() => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    isAnyTileHovered.value = false;
    ctx.filter = `blur(5px)`;
    for (const tile of tiles) {
      drawRect(units.getTilePosition(tile), 'rgba(0, 0, 0, 0.5)');
    }
    ctx.filter = `blur(3px)`;
    for (const tile of tiles) {
      drawRect(units.getTileParallaxPosition(tile, 0.005), 'rgba(0, 0, 0, 0.7)');
    }
    ctx.filter = 'none';
    for (const tile of tiles) {
      drawRect(units.getTileParallaxPosition(tile, 0.01), createGradient(tile, 0.01));
      if (gameStore.cheatMode || tile.isFlipped) drawWeapon(tile, 0.01);
    }
  });
});

const onClick = useOnTileClick(() => tiles.find(checkIfTileIsHovered));

const won = computed(() => gameStore.matched.length === tiles.length);
</script>

<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <GameBoardInfoDisplay
      :tiles-length="tiles.length"
    />
    <canvas
      ref="canvas"
      class="mx-auto size-[70vmin]"
      :class="isAnyTileHovered && !onClick.disabled ? 'cursor-pointer' : ''"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"

      @touchmove.prevent="onMouseMove($event.touches[0]!)"
      @touchend="onClick() && gameStore.makeMove(); onMouseLeave()"
      @click="onClick() && gameStore.makeMove()"
    />
    <GameBoardCheatMode />
    <GameBoardWonModal v-if="won" />
    <UiDropdownMenu>
      <UiDropdownMenuTrigger class="border-1 rounded grid place-items-center p-1 fixed bottom-8 right-8">
        <NuxtIcon
          name="lucide:menu"
          class="text-[2rem]"
        />
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent>
        <UiDropdownMenuLabel class="text-xs">
          Settings
        </UiDropdownMenuLabel>
        <UiDropdownMenuSeparator />
        <UiDropdownMenuItem @click="disableParallax = !disableParallax">
          <NuxtIcon name="lucide:grip-vertical" />
          {{ disableParallax ? 'Enable' : 'Disable' }} parallax
        </UiDropdownMenuItem>
        <UiDropdownMenuItem @click="gameStore.cheatMode = true">
          <NuxtIcon name="lucide:eye" />
          Cheat mode
        </UiDropdownMenuItem>
        <UiDropdownMenuItem as-child>
          <NuxtLink
            to="/"
            class="cursor-pointer"
          >
            <NuxtIcon name="lucide:log-out" />
            Exit
          </NuxtLink>
        </UiDropdownMenuItem>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </div>
</template>

<style scoped>
</style>
