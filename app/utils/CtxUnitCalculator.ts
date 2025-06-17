import type { Reactive } from 'vue';

export type Cords = [x: number, y: number];

/**
 * Contain precomputed pixel values of unit, tiles, margin and canvas context
 * Perfect for passing to other utils as single source of truth
 */
export class CtxUnitCalculator {
  readonly tile: number;
  readonly margin: number;
  readonly tileWithMargin: number;

  constructor(
    public readonly ctx: CanvasRenderingContext2D,
    public readonly unitSize: number,
    private readonly cursorPosition: Reactive<[number, number]>,
  ) {
    this.tile = this.unitSize * GAME_BOARD_TILE_SIZE;
    this.margin = this.unitSize * GAME_BOARD_MARGIN_SIZE;
    this.tileWithMargin = this.tile + this.margin;
  }

  getTileParallaxPosition(tile: GameBoardTile, parallaxStrength: number): Cords {
    const [cursorX, cursorY] = this.cursorPosition;
    if (cursorX < 0 || cursorY < 0) return this.getTilePosition(tile);
    const centerX = GAME_BOARD_MARGIN_SIZE + tile.x * (GAME_BOARD_TILE_SIZE + GAME_BOARD_MARGIN_SIZE) + GAME_BOARD_TILE_SIZE / 2;
    const centerY = GAME_BOARD_MARGIN_SIZE + tile.y * (GAME_BOARD_TILE_SIZE + GAME_BOARD_MARGIN_SIZE) + GAME_BOARD_TILE_SIZE / 2;

    const offsetX = cursorX - centerX;
    const offsetY = cursorY - centerY;

    return [
      this.margin + (tile.x + offsetX * parallaxStrength) * this.tileWithMargin,
      this.margin + (tile.y + offsetY * parallaxStrength) * this.tileWithMargin,
    ];
  }

  getTilePosition(tile: GameBoardTile): Cords {
    return [
      this.margin + tile.x * this.tileWithMargin,
      this.margin + tile.y * this.tileWithMargin,
    ];
  };
}
