export const GAME_BOARD_DIFFICULTY = ['easy', 'medium', 'hard'] as const;
export type GameBoardDifficulty = typeof GAME_BOARD_DIFFICULTY[number];
