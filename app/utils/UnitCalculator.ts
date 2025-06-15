export class UnitCalculator {
  readonly tile: number;
  readonly margin: number;
  readonly tileWithMargin: number;

  constructor(public readonly unitSize: number) {
    this.tile = this.unitSize * GAME_BOARD_TILE_SIZE;
    this.margin = this.unitSize * GAME_BOARD_MARGIN_SIZE;
    this.tileWithMargin = this.tile + this.margin;
  }
}
