export function useOnTileClick(getHoveredTile: () => GameBoardTile | undefined) {
  let selectedPreviously: GameBoardTile | undefined;

  const playTileFlipAudio = useAudio('/audio/flip-tile.mp3');
  const playSuccessAudio = useAudio('/audio/success.mp3');

  /**
   * Handle tile click by flipping it and checking if it matches with previously flipped tile
   * Additionally disable click for 1 second after unsuccessful match
   * And corresponding audio will be played
   *
   * @returns true if tile was clicked successfully
   */
  const onClick = () => {
    if (onClick.disabled) return false;
    const hoveredTile = getHoveredTile();
    if (!hoveredTile || hoveredTile.isFlipped) return false;

    hoveredTile.isFlipped = true;
    playTileFlipAudio();

    if (!selectedPreviously) {
      selectedPreviously = hoveredTile;
      return true;
    }

    onClick.disabled = true;
    const weaponsMatch = hoveredTile.weapon === selectedPreviously!.weapon;
    setTimeout(() => {
      if (!weaponsMatch) {
        hoveredTile.isFlipped = false;
        selectedPreviously!.isFlipped = false;
      }
      else {
        hoveredTile.isMatched = true;
        selectedPreviously!.isMatched = true;
        playSuccessAudio();
      }

      onClick.disabled = false;
      selectedPreviously = undefined;
    }, weaponsMatch ? 0 : 1000);

    return true;
  };

  onClick.disabled = false;

  return onClick;
}
