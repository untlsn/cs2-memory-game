export const GAME_BOARD_DIFFICULTY = ['easy', 'medium', 'hard'] as const;
export type GameBoardDifficulty = typeof GAME_BOARD_DIFFICULTY[number];

// How many units per tile
export const GAME_BOARD_TILE_SIZE = 5;
// How many units per margin
export const GAME_BOARD_MARGIN_SIZE = 1;
// How big image should be compare to tile size
export const GAME_BOARD_TILE_IMAGE_PERCENTAGE = 0.9;
// How big radius should be compare to tile size
export const GAME_BOARD_RADIUS_PERCENTAGE = 0.1;

// Default gradient of tile
export const GAME_BOARD_COLOR_GRADIENT_GOLD = ['#A57C00', '#FEDB73', '#FFD700'] as const;
// Bright gradient of tile used for hover effect
export const GAME_BOARD_COLOR_GRADIENT_GOLD_BRIGHT = ['#BBA333', '#FFEFB9', '#FFEBB2'] as const;
// Rarity gradients of tile used for flipped tiles
export const GAME_BOARD_COLOR_GRADIENT_RARITY = [
  ['#3F3F3F', '#A0A0A0', '#707070'], // Grey
  ['#305C30', '#7ED37E', '#50A050'], // Green
  ['#2B4A7A', '#7ABBF5', '#508CD9'], // Blue
  ['#5A3070', '#BF7FFF', '#8A5BB0'], // Purple
  ['#7A4F2A', '#FFB060', '#B07F4F'], // Orange
  ['#7A2A2A', '#FF6060', '#B04F4F'], // Red
] as const;

export const GAME_BOARD_WEAPONS_IMAGES = [
  /*  0 */'/weapons/p250-sand-dune.png',
  /*  1 */'/weapons/mp9-army-sheen.png',
  /*  2 */'/weapons/mp7-forest-ddpat.png',
  /*  3 */'/weapons/sawed-off-forest-ddpat.png',
  /*  4 */'/weapons/dual-berettas-anodized-navy.png',
  /*  5 */'/weapons/pp-bizon-forest-leaves.png',
  /*  6 */'/weapons/ump-45-urban-ddpat.png',
  /*  7 */'/weapons/g3-sg1-arctic-camo.png',
  /*  8 */'/weapons/famas-colony.png',
  /*  9 */'/weapons/mac-10-urban-ddpat.png',
  /* 10 */'/weapons/ak-47-safari-mesh.png',
  /* 11 */'/weapons/awp-safari-mesh.png',
  /* 12 */'/weapons/m4-a4-urban-ddpat.png',
  /* 13 */'/weapons/usp-s-forest-leaves.png',
  /* 14 */'/weapons/glock-18-high-beam.png',
  /* 15 */'/weapons/ak-47-uncharted.png',
  /* 16 */'/weapons/awp-phobos.png',
  /* 17 */'/weapons/m4-a4-mag-7-heaven-guard.png',
  /* 18 */'/weapons/desert-eagle-conspiracy.png',
  /* 19 */'/weapons/usp-s-torque.png',
  /* 20 */'/weapons/awp-hyper-beast.png',
  /* 21 */'/weapons/ak-47-redline.png',
  /* 22 */'/weapons/m4-a4-the-emperor.png',
  /* 23 */'/weapons/desert-eagle-code-red.png',
  /* 24 */'/weapons/glock-18-fade.png',
  /* 25 */'/weapons/awp-dragon-lore.png',
  /* 26 */'/weapons/ak-47-case-hardened.png',
  /* 27 */'/weapons/m4-a4-howl.png',
  /* 28 */'/weapons/desert-eagle-blaze.png',
  /* 29 */'/weapons/ak-47-fire-serpent.png',
  /* 30 */'/weapons/karambit-lore.png',
  /* 31 */'/weapons/m9-bayonet-doppler.png',
];

export const GAME_BOARD_WEAPONS_RARITY = [
  /*  0 */ 0,
  /*  1 */ 0,
  /*  2 */ 0,
  /*  3 */ 0,
  /*  4 */ 0,

  /*  5 */ 1,
  /*  6 */ 1,
  /*  7 */ 1,
  /*  8 */ 1,
  /*  9 */ 1,

  /* 10 */ 2,
  /* 11 */ 2,
  /* 12 */ 2,
  /* 13 */ 2,
  /* 14 */ 2,

  /* 15 */ 3,
  /* 16 */ 3,
  /* 17 */ 3,
  /* 18 */ 3,
  /* 19 */ 3,

  /* 20 */ 4,
  /* 21 */ 4,
  /* 22 */ 4,
  /* 23 */ 4,
  /* 24 */ 4,

  /* 25 */ 5,
  /* 26 */ 5,
  /* 27 */ 5,
  /* 28 */ 5,
  /* 29 */ 5,
  /* 30 */ 5,
  /* 31 */ 5,
];
