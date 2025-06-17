function SeededRandom(seed: number) {
  const m = 2 ** 31 - 1;
  const a = 1103515235;
  const c = 12325;

  let lastNumber = seed % m;

  return () => {
    lastNumber = (a * lastNumber + c) % m;
    return lastNumber / m;
  };
}

export type GameBoardTile = {
  index: number
  x: number
  y: number
  isFlipped: boolean
  rarity: number
  weapon: number
};

/**
 * Create tiles for game board with shuffled weapons based on url seed and difficulty
 */
export function useTiles() {
  const { seed, difficulty } = useGameBoardParams();
  const rowSize = GAME_BOARD_DIFFICULTY_ROW_SIZE[difficulty];

  const tilesCount = (rowSize) ** 2;
  const getRandom = SeededRandom(seed);

  const shuffleArray = (arr: number[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(getRandom() * (i + 1));
      [arr[i], arr[j]] = [arr[j]!, arr[i]!];
    }
    return arr;
  };

  const weapons = shuffleArray([...Array(tilesCount / 2)].map((_, i) => i));
  const weaponsPair = shuffleArray([...weapons, ...weapons]);

  return reactive<GameBoardTile[]>(
    weaponsPair.map((weapon, i) => {
      return {
        index: i,
        x: i % rowSize,
        y: Math.floor(i / rowSize),
        isFlipped: false,
        rarity: GAME_BOARD_WEAPONS_RARITY[weapon]!,
        weapon,
      };
    }),
  );
}
