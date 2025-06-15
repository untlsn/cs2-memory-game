<script setup lang="ts">
// const { seed, difficulty } = useGameBoardParams();

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

  const unitSize = syncCanvasSizesAndGetUnitSize(requiredRowUnits);
  const tileSize = unitSize * GAME_BOARD_TILE_SIZE;
  const marginSize = unitSize * GAME_BOARD_MARGIN_SIZE;
  const tileWithMarginSize = tileSize + marginSize;

  const createGradient = (x: number, y: number, gradientColors: readonly [string, string, string]) => {
    const gradient = ctx.createLinearGradient(x, y, x + tileSize, y + tileSize);
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

  const loadedImages = await Promise.all(
    GAME_BOARD_WEAPONS_IMAGES.map(async (src) => {
      const image = new Image();
      image.src = src;
      await new Promise(res => image.onload = res);
      return image;
    }),
  );

  const imageSize = tileSize * GAME_BOARD_TILE_IMAGE_PERCENTAGE;
  const imagePadding = tileSize * (1 - GAME_BOARD_TILE_IMAGE_PERCENTAGE) / 2;

  const drawImage = (tile: GameBoardTile) => {
    const x = marginSize + tile.x * tileWithMarginSize + imagePadding;
    const y = marginSize + tile.y * tileWithMarginSize + imagePadding;

    const image = loadedImages[tile.weapon];
    if (!image) return;

    ctx.drawImage(image, x, y, imageSize, imageSize);
  };

  const drawRect = (tile: GameBoardTile) => {
    const x = marginSize + tile.x * tileWithMarginSize;
    const y = marginSize + tile.y * tileWithMarginSize;
    const radius = tileSize * GAME_BOARD_RADIUS_PERCENTAGE;

    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + tileSize - radius, y);
    ctx.arcTo(x + tileSize, y, x + tileSize, y + radius, radius);
    ctx.lineTo(x + tileSize, y + tileSize - radius);
    ctx.arcTo(
      x + tileSize,
      y + tileSize,
      x + tileSize - radius,
      y + tileSize,
      radius,
    );
    ctx.lineTo(x + radius, y + tileSize);
    ctx.arcTo(x, y + tileSize, x, y + tileSize - radius, radius);
    ctx.lineTo(x, y + radius);
    ctx.arcTo(x, y, x + radius, y, radius);
    ctx.closePath();

    ctx.fillStyle = createGradient(x, y, getTileColor(tile));
    ctx.fill();
    if (tile.isFlipped) drawImage(tile);
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
