import * as D from 'date-fns';

const formatNumber = (num: number | undefined) => {
  num ||= 0;
  return num.toString().padStart(2, '0');
};

export function formatDuration(duration: D.Duration) {
  return `${formatNumber(duration.hours)}:${formatNumber(duration.minutes)}:${formatNumber(duration.seconds)}`;
}

export function durationTillNow(start: Date) {
  return D.intervalToDuration({
    start,
    end: new Date(),
  });
}

export function durationFromSeconds(end: number) {
  return D.intervalToDuration({
    start: 0,
    end: end * 1000,
  });
}
