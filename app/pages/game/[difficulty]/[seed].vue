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

  const createGradient = (x: number, y: number, gradientColors: readonly [string, string, string]) => {
    const gradient = ctx.createLinearGradient(x, y, x + units.tile, y + units.tile);
    gradient.addColorStop(0, gradientColors[0]);
    gradient.addColorStop(0.5, gradientColors[1]);
    gradient.addColorStop(1, gradientColors[2]);
    return gradient;
  };

  const getTileColor = (tile: GameBoardTile) => {
    if (tile.isFlipped) return GAME_BOARD_COLOR_GRADIENT_RARITY[tile.rarity]!;
    if (checkIfTileIsHovered(tile)) return GAME_BOARD_COLOR_GRADIENT_GOLD_BRIGHT;

    return GAME_BOARD_COLOR_GRADIENT_GOLD;
  };

  const drawWeapon = await WeaponPainter(units);

  const drawRect = (tile: GameBoardTile) => {
    const x = units.margin + tile.x * units.tileWithMargin;
    const y = units.margin + tile.y * units.tileWithMargin;
    const radius = units.tile * GAME_BOARD_RADIUS_PERCENTAGE;

    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + units.tile - radius, y);
    ctx.arcTo(x + units.tile, y, x + units.tile, y + radius, radius);
    ctx.lineTo(x + units.tile, y + units.tile - radius);
    ctx.arcTo(
      x + units.tile,
      y + units.tile,
      x + units.tile - radius,
      y + units.tile,
      radius,
    );
    ctx.lineTo(x + radius, y + units.tile);
    ctx.arcTo(x, y + units.tile, x, y + units.tile - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();

    ctx.fillStyle = createGradient(x, y, getTileColor(tile));
    ctx.fill();
    if (tile.isFlipped) drawWeapon(tile);
  };

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
