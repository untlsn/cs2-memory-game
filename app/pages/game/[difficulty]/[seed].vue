<script setup lang="ts">
// const { seed, difficulty } = useGameBoardParams();

const canvasRef = useTemplateRef('canvas');
let canvasRect: DOMRectReadOnly | undefined;

function syncCanvasSizes(canvas: HTMLCanvasElement) {
  canvasRect = canvas.getBoundingClientRect();

  canvas.width = canvasRect.width;
  canvas.height = canvasRect.height;
}

onMounted(() => {
  const ctx = canvasRef.value?.getContext('2d');
  if (!ctx) return;

  syncCanvasSizes(ctx.canvas);

  const rowSize = 5;
  const requiredRowUnits = GAME_BOARD_MARGIN_SIZE + rowSize * (GAME_BOARD_TILE_SIZE + GAME_BOARD_MARGIN_SIZE);

  const unitSize = canvasRect!.width / requiredRowUnits;
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

  const drawRect = (
    x: number,
    y: number,
  ) => {
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

    ctx.fillStyle = createGradient(x, y, GAME_BOARD_COLOR_GRADIENT_GOLD);
    ctx.fill();
  };

  for (let i = 0; i < rowSize ** 2; i++) {
    drawRect(
      marginSize + (i % rowSize) * tileWithMarginSize,
      marginSize + Math.floor(i / rowSize) * tileWithMarginSize,
    );
  }
});
</script>

<template>
  <div>
    <canvas
      ref="canvas"
      class="mx-auto size-[70vmin]"
    />
  </div>
</template>

<style scoped>
</style>
