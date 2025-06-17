import * as D from 'date-fns';

export const useGameStore = defineStore('lastGame', () => {
  /** Times user clicked on tile */
  const moves = ref<number>(0);
  /** Time when game started in number to make it savable in localStorage */
  const timeValue = ref<number>();
  /** If cheat mode is enabled */
  const cheatMode = ref<boolean>(false);
  /** Seed used to generate game. Necessary to check if game was played on the same link */
  const seed = ref<number>(0);
  /** Difficulty of game. Necessary to check if game was played on the same link */
  const difficulty = ref<string>('easy');
  const matched = ref<number[]>([]);

  /** Time when game started computed base on timeValue */
  const time = computed(() => {
    const ms = timeValue.value;
    if (ms) return new Date(ms);
    return undefined;
  });

  return {
    moves, cheatMode, seed, difficulty, matched,

    time,

    /** Check if current game was played on the same link */
    checkGame: (params: GameBoardParams) => {
      if (seed.value !== params.seed || difficulty.value !== params.difficulty) {
        moves.value = 0;
        timeValue.value = 0;
        cheatMode.value = false;
        seed.value = params.seed;
        difficulty.value = params.difficulty;
        matched.value = [];
      }
    },
    /** Create leaderboard element based on game state */
    getLeaderboardElement: (): GameStoreLeaderboardElement | undefined => {
      const timeSnap = time.value;
      if (!timeSnap || cheatMode.value) return undefined;

      return {
        seed: seed.value,
        difficulty: difficulty.value,
        moves: moves.value,
        time: formatDuration(durationTillNow(timeSnap)),
        date: D.format(new Date(), 'yyyy-MM-dd HH:mm'),
      };
    },
    /** Increment move and start timer if it's not started */
    makeMove: () => {
      timeValue.value ||= new Date().getTime();
      moves.value++;
    },
    flipMatchedTiles: (tiles: GameBoardTile[]) => {
      for (const tile of tiles) {
        if (matched.value.includes(tile.index)) tile.isFlipped = true;
      }
    },
  };
});
