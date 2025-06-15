<script setup lang="ts">
// const { seed, difficulty } = useGameBoardParams();

const canvasRef = useTemplateRef('canvas');
let canvasRect: DOMRectReadOnly | undefined;

function syncCanvasSizes(canvas: HTMLCanvasElement) {
  canvasRect = canvas.getBoundingClientRect();

  canvas.width = canvasRect.width;
  canvas.height = canvasRect.height;
}

const cursorPosition = reactive<[number, number]>([-1, -1]);
let unitSize = 0;

const isAnyTileHovered = ref(false);
const rowSize = 5;

type GameBoardTile = {
  x: number
  y: number
  isFlipped: boolean
  rarity: number
};

const tiles = reactive<GameBoardTile[]>(
  [...Array(rowSize ** 2)].map((_, i) => {
    return {
      x: i % rowSize,
      y: Math.floor(i / rowSize),
      isFlipped: false,
      rarity: Math.floor(Math.random() * 6),
    };
  }),
);

const isTileHovered = (tile: GameBoardTile) => {
  const x = GAME_BOARD_MARGIN_SIZE + tile.x * (GAME_BOARD_TILE_SIZE + GAME_BOARD_MARGIN_SIZE);
  const y = GAME_BOARD_MARGIN_SIZE + tile.y * (GAME_BOARD_TILE_SIZE + GAME_BOARD_MARGIN_SIZE);
  const [cursorX, cursorY] = cursorPosition;

  const isHovered = cursorX > x && cursorX < x + GAME_BOARD_TILE_SIZE
    && cursorY > y && cursorY < y + GAME_BOARD_TILE_SIZE;

  if (isHovered) isAnyTileHovered.value = true;
  return isHovered;
};

onMounted(() => {
  const ctx = canvasRef.value?.getContext('2d');
  if (!ctx) return;

  syncCanvasSizes(ctx.canvas);

  const requiredRowUnits = GAME_BOARD_MARGIN_SIZE + rowSize * (GAME_BOARD_TILE_SIZE + GAME_BOARD_MARGIN_SIZE);

  unitSize = canvasRect!.width / requiredRowUnits;
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
    if (isTileHovered(tile)) return GAME_BOARD_COLOR_GRADIENT_GOLD_BRIGHT;

    return GAME_BOARD_COLOR_GRADIENT_GOLD;
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
  };

  watchEffect(() => {
    isAnyTileHovered.value = false;
    tiles.forEach(drawRect);
  });
});

const onMouseMove = (ev: MouseEvent) => requestAnimationFrame(() => {
  const mouseX = ev.clientX - canvasRect!.left;
  const mouseY = ev.clientY - canvasRect!.top;

  cursorPosition[0] = mouseX / unitSize;
  cursorPosition[1] = mouseY / unitSize;
});

const onMouseLeave = () => {
  cursorPosition[0] = -1;
  cursorPosition[1] = -1;
};

let selectedPreviously: GameBoardTile | undefined;
let onClickDisabled = false;

const onClick = () => {
  if (onClickDisabled) return;
  const hoveredTile = tiles.find(isTileHovered);
  if (!hoveredTile) return;

  hoveredTile.isFlipped = true;
  if (!selectedPreviously) {
    selectedPreviously = hoveredTile;
    return;
  }

  onClickDisabled = true;
  setTimeout(() => {
    onClickDisabled = false;
    hoveredTile.isFlipped = false;
    selectedPreviously!.isFlipped = false;
    selectedPreviously = undefined;
  }, 1000);
};
</script>

<template>
  <div>
    <canvas
      ref="canvas"
      class="mx-auto size-[70vmin]"
      :class="isAnyTileHovered && !onClickDisabled ? 'cursor-pointer' : ''"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"
      @click="onClick"
    />
  </div>
</template>

<style scoped>
</style>
