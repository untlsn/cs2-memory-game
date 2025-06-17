type GameStoreLeaderboardElement = {
  seed: number
  difficulty: string
  moves: number
  time: string
  date: string
};

export const useLeaderboardStore = defineStore('leaderboard', () => {
  const leaderboard = ref<GameStoreLeaderboardElement[]>([]);

  return {
    leaderboard,
  };
});
