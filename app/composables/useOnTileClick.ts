export function useOnTileClick(getHoveredTile: () => GameBoardTile | undefined) {
  let selectedPreviously: GameBoardTile | undefined;

  const playTileFlipAudio = useAudio('/audio/flip-tile.mp3');
  const playSuccessAudio = useAudio('/audio/success.mp3');

  const onClick = () => {
    if (onClick.disabled) return;
    const hoveredTile = getHoveredTile();
    if (!hoveredTile) return;

    hoveredTile.isFlipped = true;
    playTileFlipAudio();

    if (!selectedPreviously) {
      selectedPreviously = hoveredTile;
      return;
    }

    onClick.disabled = true;
    setTimeout(() => {
      if (hoveredTile.weapon !== selectedPreviously!.weapon) {
        hoveredTile.isFlipped = false;
        selectedPreviously!.isFlipped = false;
      }
      else {
        playSuccessAudio();
      }

      onClick.disabled = false;
      selectedPreviously = undefined;
    }, 1000);
  };

  onClick.disabled = false;

  return onClick;
}
