import type { ShallowRef } from 'vue';

export function useCanvasBinds(canvasRef: Readonly<ShallowRef<HTMLCanvasElement | null>>) {
  let unitSize = 0;
  let canvasRect: DOMRectReadOnly | undefined;

  function syncCanvasSizesAndGetUnitSize(requiredRowUnits: number) {
    const canvas = canvasRef.value;
    if (!canvas) return 0;

    canvasRect = canvas.getBoundingClientRect();
    const size = canvasRect.width;

    canvas.width = size;
    canvas.height = size;

    unitSize = size / requiredRowUnits;
    return unitSize;
  }

  const cursorPosition = reactive<[number, number]>([-1, -1]);
  const isAnyTileHovered = ref(false);

  const checkIfTileIsHovered = (tile: GameBoardTile) => {
    if (tile.isFlipped) return false;
    const x = GAME_BOARD_MARGIN_SIZE + tile.x * (GAME_BOARD_TILE_SIZE + GAME_BOARD_MARGIN_SIZE);
    const y = GAME_BOARD_MARGIN_SIZE + tile.y * (GAME_BOARD_TILE_SIZE + GAME_BOARD_MARGIN_SIZE);
    const [cursorX, cursorY] = cursorPosition;

    const isHovered = cursorX > x && cursorX < x + GAME_BOARD_TILE_SIZE
      && cursorY > y && cursorY < y + GAME_BOARD_TILE_SIZE;

    if (isHovered) isAnyTileHovered.value = true;
    return isHovered;
  };

  return {
    isAnyTileHovered, checkIfTileIsHovered, syncCanvasSizesAndGetUnitSize, cursorPosition,
    getCtx() {
      return canvasRef.value?.getContext('2d');
    },
    onMouseMove(ev: MouseEvent) {
      requestAnimationFrame(() => {
        const mouseX = ev.clientX - canvasRect!.left;
        const mouseY = ev.clientY - canvasRect!.top;

        cursorPosition[0] = mouseX / unitSize;
        cursorPosition[1] = mouseY / unitSize;
      });
    },
    onMouseLeave() {
      cursorPosition[0] = -1;
      cursorPosition[1] = -1;
    },
  };
}
