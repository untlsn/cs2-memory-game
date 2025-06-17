function isDifficulty(difficulty: unknown): difficulty is GameBoardDifficulty {
  return GAME_BOARD_DIFFICULTY.includes(difficulty as GameBoardDifficulty);
}

export type GameBoardParams = {
  difficulty: GameBoardDifficulty
  seed: number
};

/**
 * Get params from route and validate them
 * @returns sanitized params
 */
export function useGameBoardParams(): GameBoardParams {
  const { seed, difficulty } = useRoute().params;

  const seedNumber = Number(seed);
  if (isNaN(seedNumber)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid seed',
    });
  }

  if (!isDifficulty(difficulty)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid difficulty',
    });
  }

  return {
    difficulty,
    seed: seedNumber,
  };
};
