import { it, describe, expect, vi, beforeAll } from 'vitest';

vi.mock('~/composables/useGameBoardParams', () => ({
  useGameBoardParams: vi.fn(),
}));

describe('useTiles', () => {
  beforeAll(() => {
    vi.mocked(useGameBoardParams).mockReturnValue({
      seed: 123,
      difficulty: 'easy',
    });
  });
  it('should return an array of tiles with correct length for specific difficulty', () => {
    expect(
      useTiles(),
    ).toHaveLength(16);

    vi.mocked(useGameBoardParams).mockReturnValue({
      seed: 123,
      difficulty: 'medium',
    });

    expect(
      useTiles(),
    ).toHaveLength(36);

    vi.mocked(useGameBoardParams).mockReturnValue({
      seed: 123,
      difficulty: 'hard',
    });

    expect(
      useTiles(),
    ).toHaveLength(64);
  });
  it('should have unique pairs', () => {
    const tiles = useTiles();
    const weaponsHeap = new Set<number>();

    for (const tile of tiles) {
      if (weaponsHeap.has(tile.weapon)) weaponsHeap.delete(tile.weapon);
      else weaponsHeap.add(tile.weapon);
    }

    expect(weaponsHeap, 'At least one weapon is not unique').toHaveLength(0);
  });
});
