export async function RoundedRectPainter(units: CtxUnitCalculator) {
  const { ctx } = units;
  const radius = units.tile * GAME_BOARD_RADIUS_PERCENTAGE;

  return ([x, y]: Cords, color: string | CanvasGradient) => {
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

    ctx.fillStyle = color;
    ctx.fill();
  };
}
