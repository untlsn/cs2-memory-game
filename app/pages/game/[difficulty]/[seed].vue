<script setup lang="ts">
const canvasRef = useTemplateRef('canvas');
const {
  syncCanvasSizesAndGetUnitSize,
  getCtx,
  checkIfTileIsHovered,
  isAnyTileHovered,
  onMouseMove,
  onMouseLeave,
} = useCanvasBinds(canvasRef);

const tiles = useTiles();

onMounted(async () => {
  const ctx = getCtx();
  if (!ctx) return;

  const requiredRowUnits = GAME_BOARD_MARGIN_SIZE + Math.sqrt(tiles.length) * (GAME_BOARD_TILE_SIZE + GAME_BOARD_MARGIN_SIZE);

  const units = new CtxUnitCalculator(ctx, syncCanvasSizesAndGetUnitSize(requiredRowUnits));

  const getTileColor = (tile: GameBoardTile) => {
    if (tile.isFlipped) return GAME_BOARD_COLOR_GRADIENT_RARITY[tile.rarity]!;
    if (checkIfTileIsHovered(tile)) return GAME_BOARD_COLOR_GRADIENT_GOLD_BRIGHT;

    return GAME_BOARD_COLOR_GRADIENT_GOLD;
  };

  const drawRect = await RoundedRectPainter(
    units,
    (tile) => {
      const [x, y] = units.getTilePosition(tile);
      const colors = getTileColor(tile);

      const gradient = ctx.createLinearGradient(x, y, x + units.tile, y + units.tile);
      gradient.addColorStop(0, colors[0]);
      gradient.addColorStop(0.5, colors[1]);
      gradient.addColorStop(1, colors[2]);
      return gradient;
    },
  );

  watchEffect(() => {
    isAnyTileHovered.value = false;
    tiles.forEach(drawRect);
  });
});

const onClick = useOnTileClick(() => tiles.find(checkIfTileIsHovered));
</script>

<template>
  <div>
    <canvas
      ref="canvas"
      class="mx-auto size-[70vmin]"
      :class="isAnyTileHovered && !onClick.disabled ? 'cursor-pointer' : ''"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"
      @click="onClick"
    />
  </div>
</template>

<style scoped>
</style>
