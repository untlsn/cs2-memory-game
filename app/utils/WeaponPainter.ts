/**
 * Create a function that will draw weapon on canvas based on asynchronously loaded images
 * @param units CtxUnitCalculator instance
 * @returns Function that will draw weapon on canvas
 */
export async function WeaponPainter(units: CtxUnitCalculator) {
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

  return (tile: GameBoardTile, parallaxStrength: number) => {
    const [x, y] = units.getTileParallaxPosition(tile, parallaxStrength);

    const image = loadedImages[tile.weapon];
    if (!image) return;

    units.ctx.drawImage(image, x + imagePadding, y + imagePadding, imageSize, imageSize);
  };
}
