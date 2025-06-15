/**
 * Contain precomputed pixel values of unit, tiles, margin and canvas context
 * Perfect for passing to other utils as single source of truth
 */
export class CtxUnitCalculator {
  readonly tile: number;
  readonly margin: number;
  readonly tileWithMargin: number;

  constructor(public readonly ctx: CanvasRenderingContext2D, public readonly unitSize: number) {
    this.tile = this.unitSize * GAME_BOARD_TILE_SIZE;
    this.margin = this.unitSize * GAME_BOARD_MARGIN_SIZE;
    this.tileWithMargin = this.tile + this.margin;
  }
}
