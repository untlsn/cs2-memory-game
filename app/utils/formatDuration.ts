import type * as D from 'date-fns';

const formatNumber = (num: number | undefined) => {
  num ||= 0;
  return num.toString().padStart(2, '0');
};

export function formatDuration(duration: D.Duration) {
  return `${formatNumber(duration.hours)}:${formatNumber(duration.minutes)}:${formatNumber(duration.seconds)}`;
}
