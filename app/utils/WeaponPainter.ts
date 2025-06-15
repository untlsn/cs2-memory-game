export async function WeaponPainter(ctx: CanvasRenderingContext2D, units: UnitCalculator) {
  const loadedImages = await Promise.all(
    GAME_BOARD_WEAPONS_IMAGES.map(async (src) => {
      const image = new Image();
      image.src = src;
      await new Promise(res => image.onload = res);
      return image;
    }),
  );

  const imageSize = units.tile * GAME_BOARD_TILE_IMAGE_PERCENTAGE;
  const imagePadding = units.tile * (1 - GAME_BOARD_TILE_IMAGE_PERCENTAGE) / 2;

  return (tile: GameBoardTile) => {
    const x = units.margin + tile.x * units.tileWithMargin + imagePadding;
    const y = units.margin + tile.y * units.tileWithMargin + imagePadding;

    const image = loadedImages[tile.weapon];
    if (!image) return;

    ctx.drawImage(image, x, y, imageSize, imageSize);
  };
}
