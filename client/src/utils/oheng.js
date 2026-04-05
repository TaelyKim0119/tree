import { CHEONGAN_OHENG, JIJI_OHENG, CHEONGAN_EUMYANG, JIJI, OHENG_SANGSEANG, OHENG_SANGGEUK } from './constants';

function getJijiEumyang(jiji) {
  const idx = JIJI.indexOf(jiji);
  return idx % 2 === 0 ? '양' : '음';
}

export function getOhengDistribution(manseryeok) {
  const count = { 목: 0, 화: 0, 토: 0, 금: 0, 수: 0 };
  const pillars = ['year', 'month', 'day', 'time'];
  for (const p of pillars) {
    count[CHEONGAN_OHENG[manseryeok[p].cheongan]]++;
    count[JIJI_OHENG[manseryeok[p].jiji]]++;
  }
  const total = 8;
  const distribution = {};
  for (const [key, val] of Object.entries(count)) {
    distribution[key] = { count: val, percent: Math.round((val / total) * 1000) / 10 };
  }
  return distribution;
}

export function analyzeSipsin(manseryeok) {
  const ilgan = manseryeok.day.cheongan;
  const ilganOheng = CHEONGAN_OHENG[ilgan];
  const ilganEumyang = CHEONGAN_EUMYANG[ilgan];

  function getSipsinForTarget(targetOheng, targetEumyang) {
    const sameEumyang = ilganEumyang === targetEumyang;
    if (ilganOheng === targetOheng) return sameEumyang ? '비견' : '겁재';
    if (OHENG_SANGSEANG[ilganOheng] === targetOheng) return sameEumyang ? '식신' : '상관';
    if (OHENG_SANGSEANG[targetOheng] === ilganOheng) return sameEumyang ? '편인' : '정인';
    if (OHENG_SANGGEUK[ilganOheng] === targetOheng) return sameEumyang ? '편재' : '정재';
    if (OHENG_SANGGEUK[targetOheng] === ilganOheng) return sameEumyang ? '편관' : '정관';
    return '비견';
  }

  const result = {};
  const pillars = { year: '년주', month: '월주', time: '시주' };
  for (const [key, label] of Object.entries(pillars)) {
    result[`${label}천간`] = getSipsinForTarget(
      CHEONGAN_OHENG[manseryeok[key].cheongan],
      CHEONGAN_EUMYANG[manseryeok[key].cheongan]
    );
    result[`${label}지지`] = getSipsinForTarget(
      JIJI_OHENG[manseryeok[key].jiji],
      getJijiEumyang(manseryeok[key].jiji)
    );
  }
  return result;
}

export function getSingang(manseryeok, ohengDist) {
  const ilganOheng = CHEONGAN_OHENG[manseryeok.day.cheongan];
  const sangseangReverse = {};
  for (const [k, v] of Object.entries(OHENG_SANGSEANG)) sangseangReverse[v] = k;
  const inseongOheng = sangseangReverse[ilganOheng];
  const helpCount = (ohengDist[ilganOheng]?.count || 0) + (ohengDist[inseongOheng]?.count || 0);

  const monthJijiOheng = JIJI_OHENG[manseryeok.month.jiji];
  const deukryeong = monthJijiOheng === ilganOheng || monthJijiOheng === inseongOheng;

  if (helpCount >= 4 || (helpCount >= 3 && deukryeong)) return '신강';
  return '신약';
}

export function getYongsin(singang, ilganOheng) {
  if (singang === '신강') {
    return OHENG_SANGSEANG[ilganOheng];
  } else {
    const sangseangReverse = {};
    for (const [k, v] of Object.entries(OHENG_SANGSEANG)) sangseangReverse[v] = k;
    return sangseangReverse[ilganOheng];
  }
}
