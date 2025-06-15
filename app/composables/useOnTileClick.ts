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
    const weaponsMatch = hoveredTile.weapon === selectedPreviously!.weapon;
    setTimeout(() => {
      if (!weaponsMatch) {
        hoveredTile.isFlipped = false;
        selectedPreviously!.isFlipped = false;
      }
      else {
        playSuccessAudio();
      }

      onClick.disabled = false;
      selectedPreviously = undefined;
    }, weaponsMatch ? 0 : 1000);
  };

  onClick.disabled = false;

  return onClick;
}
