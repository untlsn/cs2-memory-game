export const GAME_BOARD_DIFFICULTY = ['easy', 'medium', 'hard'] as const;
export type GameBoardDifficulty = typeof GAME_BOARD_DIFFICULTY[number];

// How many units per tile
export const GAME_BOARD_TILE_SIZE = 5;
// How many units per margin
export const GAME_BOARD_MARGIN_SIZE = 1;
// How big radius should be compare to tile size
export const GAME_BOARD_RADIUS_PERCENTAGE = 0.1;

// Default gradient of tile
export const GAME_BOARD_COLOR_GRADIENT_GOLD = ['#A57C00', '#FEDB73', '#FFD700'] as const;
// Bright gradient of tile used for hover effect
export const GAME_BOARD_COLOR_GRADIENT_GOLD_BRIGHT = ['#000000', '#000000', '#000000'] as const;
// Rarity gradients of tile used for flipped tiles
export const GAME_BOARD_COLOR_GRADIENT_RARITY = [
  ['#3F3F3F', '#A0A0A0', '#707070'], // Grey
  ['#305C30', '#7ED37E', '#50A050'], // Green
  ['#2B4A7A', '#7ABBF5', '#508CD9'], // Blue
  ['#5A3070', '#BF7FFF', '#8A5BB0'], // Purple
  ['#7A4F2A', '#FFB060', '#B07F4F'], // Orange
  ['#7A2A2A', '#FF6060', '#B04F4F'], // Red
] as const;
