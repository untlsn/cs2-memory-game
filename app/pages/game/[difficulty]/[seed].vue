<script setup lang="ts">
// const { seed, difficulty } = useGameBoardParams();

const canvas = useTemplateRef('canvas');

onMounted(() => {
  const ctx = canvas.value?.getContext('2d');
  if (!ctx) return;

  const tileSize = 50;

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

  drawRect(0, 0);
});
</script>

<template>
  <div>
    <canvas ref="canvas" />
  </div>
</template>

<style scoped>
</style>
