export function useAudio(url: string) {
  if (import.meta.server) return () => { };

  const audioContext = new AudioContext();

  const flipTileAudio = (async () => {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return audioContext.decodeAudioData(arrayBuffer);
  })();

  return async () => {
    const source = audioContext.createBufferSource();
    source.buffer = await flipTileAudio;
    source.connect(audioContext.destination);
    source.start();
  };
}
