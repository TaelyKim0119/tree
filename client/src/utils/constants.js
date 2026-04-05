export const CHEONGAN = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
export const JIJI = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];

export const CHEONGAN_OHENG = {
  '甲':'목','乙':'목','丙':'화','丁':'화','戊':'토',
  '己':'토','庚':'금','辛':'금','壬':'수','癸':'수'
};

export const JIJI_OHENG = {
  '子':'수','丑':'토','寅':'목','卯':'목','辰':'토','巳':'화',
  '午':'화','未':'토','申':'금','酉':'금','戌':'토','亥':'수'
};

export const CHEONGAN_EUMYANG = {
  '甲':'양','乙':'음','丙':'양','丁':'음','戊':'양',
  '己':'음','庚':'양','辛':'음','壬':'양','癸':'음'
};

export const OHENG_SANGSEANG = { '목':'화', '화':'토', '토':'금', '금':'수', '수':'목' };
export const OHENG_SANGGEUK = { '목':'토', '토':'수', '수':'화', '화':'금', '금':'목' };

export const WOLGEON = { '甲':'丙','乙':'戊','丙':'庚','丁':'壬','戊':'甲','己':'丙','庚':'戊','辛':'庚','壬':'壬','癸':'甲' };
export const SIGEON = { '甲':'甲','乙':'丙','丙':'戊','丁':'庚','戊':'壬','己':'甲','庚':'丙','辛':'戊','壬':'庚','癸':'壬' };

export const JEOLIP = [
  { month: 1, day: 6 },
  { month: 2, day: 4 },
  { month: 3, day: 6 },
  { month: 4, day: 5 },
  { month: 5, day: 6 },
  { month: 6, day: 6 },
  { month: 7, day: 7 },
  { month: 8, day: 7 },
  { month: 9, day: 8 },
  { month: 10, day: 8 },
  { month: 11, day: 7 },
  { month: 12, day: 7 },
];

export const OHENG_HANJA = { '목': '木', '화': '火', '토': '土', '금': '金', '수': '水' };

export const SIJI_OPTIONS = [
  { label: '子時 (23:00~01:00)', value: 0 },
  { label: '丑時 (01:00~03:00)', value: 2 },
  { label: '寅時 (03:00~05:00)', value: 4 },
  { label: '卯時 (05:00~07:00)', value: 6 },
  { label: '辰時 (07:00~09:00)', value: 8 },
  { label: '巳時 (09:00~11:00)', value: 10 },
  { label: '午時 (11:00~13:00)', value: 12 },
  { label: '未時 (13:00~15:00)', value: 14 },
  { label: '申時 (15:00~17:00)', value: 16 },
  { label: '酉時 (17:00~19:00)', value: 18 },
  { label: '戌時 (19:00~21:00)', value: 20 },
  { label: '亥時 (21:00~23:00)', value: 22 },
];
