import { CHEONGAN, JIJI } from './constants';

export function calculateDaeun(gender, yearPillar, monthPillar, year) {
  const yearGanIdx = CHEONGAN.indexOf(yearPillar.cheongan);
  const isYangYear = yearGanIdx % 2 === 0;
  const isMale = gender === '남';
  const forward = (isYangYear && isMale) || (!isYangYear && !isMale);

  const monthGanIdx = CHEONGAN.indexOf(monthPillar.cheongan);
  const monthJiIdx = JIJI.indexOf(monthPillar.jiji);

  const daeunList = [];
  const startAge = 3;

  for (let i = 1; i <= 10; i++) {
    const ganIdx = forward
      ? (monthGanIdx + i) % 10
      : ((monthGanIdx - i) % 10 + 10) % 10;
    const jiIdx = forward
      ? (monthJiIdx + i) % 12
      : ((monthJiIdx - i) % 12 + 12) % 12;

    daeunList.push({
      age: startAge + (i - 1) * 10,
      ageRange: `${startAge + (i - 1) * 10}~${startAge + i * 10 - 1}세`,
      cheongan: CHEONGAN[ganIdx],
      jiji: JIJI[jiIdx],
      startYear: year + startAge + (i - 1) * 10,
    });
  }

  return daeunList;
}

export function getSeun(targetYear) {
  const idx = (targetYear - 4) % 60;
  const ganIdx = ((idx % 10) + 10) % 10;
  const jiIdx = ((idx % 12) + 12) % 12;
  return { year: targetYear, cheongan: CHEONGAN[ganIdx], jiji: JIJI[jiIdx] };
}

export function getSeunRange(currentYear, range = 5) {
  const list = [];
  for (let y = currentYear - range; y <= currentYear + range; y++) {
    list.push(getSeun(y));
  }
  return list;
}
