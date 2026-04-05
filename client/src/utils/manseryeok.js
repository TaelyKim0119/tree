import { CHEONGAN, JIJI, WOLGEON, SIGEON, JEOLIP } from './constants';

export function getYearPillar(year, month, day) {
  let adjustedYear = year;
  if (month < 2 || (month === 2 && day < JEOLIP[1].day)) {
    adjustedYear = year - 1;
  }
  const idx = (adjustedYear - 4) % 60;
  const cheonganIdx = ((idx % 10) + 10) % 10;
  const jijiIdx = ((idx % 12) + 12) % 12;
  return { cheongan: CHEONGAN[cheonganIdx], jiji: JIJI[jijiIdx] };
}

export function getMonthPillar(year, month, day, yearCheongan) {
  let monthIdx;
  for (let i = 11; i >= 0; i--) {
    const j = JEOLIP[i];
    if (month > j.month || (month === j.month && day >= j.day)) {
      monthIdx = i;
      break;
    }
  }
  if (monthIdx === undefined) monthIdx = 11;

  const monthJijiMap = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0];
  const jiji = JIJI[monthJijiMap[monthIdx]];

  const startGanIdx = CHEONGAN.indexOf(WOLGEON[yearCheongan]);
  let offset;
  if (monthIdx === 0) offset = -1;
  else if (monthIdx === 11) offset = 10;
  else offset = monthIdx - 1;

  const cheonganIdx = ((startGanIdx + offset) % 10 + 10) % 10;
  const cheongan = CHEONGAN[cheonganIdx];

  return { cheongan, jiji };
}

export function getDayPillar(year, month, day) {
  const baseDate = new Date(1900, 0, 1);
  const targetDate = new Date(year, month - 1, day);
  const diffDays = Math.floor((targetDate - baseDate) / (1000 * 60 * 60 * 24));
  const idx = ((diffDays) % 60 + 60) % 60;
  const cheonganIdx = idx % 10;
  const jijiIdx = idx % 12;
  return { cheongan: CHEONGAN[cheonganIdx], jiji: JIJI[jijiIdx] };
}

export function getTimePillar(hour, dayCheongan) {
  let jiji;
  if (hour === 23 || hour === 0) {
    jiji = '子';
  } else {
    const sijinIdx = Math.floor((hour + 1) / 2);
    jiji = JIJI[sijinIdx];
  }

  const startGan = SIGEON[dayCheongan];
  const startIdx = CHEONGAN.indexOf(startGan);
  const jijiIdx = JIJI.indexOf(jiji);
  const cheonganIdx = (startIdx + jijiIdx) % 10;

  return { cheongan: CHEONGAN[cheonganIdx], jiji };
}

export function calculateManseryeok(year, month, day, hour) {
  const yearPillar = getYearPillar(year, month, day);
  const monthPillar = getMonthPillar(year, month, day, yearPillar.cheongan);
  const dayPillar = getDayPillar(year, month, day);
  const timePillar = getTimePillar(hour, dayPillar.cheongan);

  return {
    year: yearPillar,
    month: monthPillar,
    day: dayPillar,
    time: timePillar,
  };
}
