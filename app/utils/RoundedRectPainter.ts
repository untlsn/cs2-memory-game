export async function RoundedRectPainter(
  units: CtxUnitCalculator,
  getGradient: (tile: GameBoardTile) => CanvasGradient,
) {
  const { ctx } = units;
  const drawWeapon = await WeaponPainter(units);

  return (tile: GameBoardTile) => {
    const [x, y] = units.getTilePosition(tile);
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

    ctx.fillStyle = getGradient(tile);
    ctx.fill();
    if (tile.isFlipped) drawWeapon(tile);
  };
}
