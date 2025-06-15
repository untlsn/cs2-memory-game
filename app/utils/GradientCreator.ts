export function GradientCreator(
  units: CtxUnitCalculator,
  selectColor: (tile: GameBoardTile) => readonly [string, string, string],
) {
  return (tile: GameBoardTile) => {
    const [x, y] = units.getTilePosition(tile);
    const colors = selectColor(tile);

    const gradient = units.ctx.createLinearGradient(x, y, x + units.tile, y + units.tile);
    gradient.addColorStop(0, colors[0]);
    gradient.addColorStop(0.5, colors[1]);
    gradient.addColorStop(1, colors[2]);
    return gradient;
  };
}
