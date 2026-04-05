import { cheonganImage, jijiImage } from '../utils/imageMap';
import { CHEONGAN_OHENG, CHEONGAN_EUMYANG } from '../utils/constants';

const OHENG_KR = { '목': '나무', '화': '불', '토': '흙', '금': '쇠', '수': '물' };

const PILLAR_DESC = {
  '시주': '말년·자녀운',
  '일주': '나 자신',
  '월주': '청년·사회운',
  '년주': '초년·조상운',
};

export default function SajuChart({ manseryeok }) {
  const pillars = [
    { label: '시주', key: '시주', highlight: false },
    { label: '일주', key: '일주', highlight: true },
    { label: '월주', key: '월주', highlight: false },
    { label: '년주', key: '년주', highlight: false },
  ];
  return (
    <div>
      <div className="flex justify-center gap-3 sm:gap-4 md:gap-5">
        {pillars.map(({ label, key, highlight }) => {
          const data = manseryeok[key];
          const oheng = CHEONGAN_OHENG[data.cheongan];
          const eumyang = CHEONGAN_EUMYANG[data.cheongan];
          return (
            <div key={key} className="text-center space-y-2">
              <p className={`text-[10px] md:text-[11px] tracking-widest ${highlight ? 'text-amber-400/60 font-semibold' : 'text-white/20'}`}>{label}{highlight && ' ★'}</p>
              <div className={`w-[70px] h-[88px] md:w-[90px] md:h-[110px] lg:w-[100px] lg:h-[120px] rounded-2xl overflow-hidden relative shadow-xl ${highlight ? 'ring-2 ring-amber-400/30' : 'ring-1 ring-white/5'}`}>
                <img src={cheonganImage[data.cheongan]} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                {highlight && <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-amber-400/80 flex items-center justify-center text-[7px] text-black font-bold">日</div>}
                <div className="absolute bottom-2 inset-x-0 text-center"><div className="text-xl font-bold drop-shadow-2xl text-white">{data.cheongan}</div></div>
              </div>
              <div className={`w-[70px] h-[88px] md:w-[90px] md:h-[110px] lg:w-[100px] lg:h-[120px] rounded-2xl overflow-hidden relative shadow-xl ${highlight ? 'ring-2 ring-amber-400/20' : 'ring-1 ring-white/5'}`}>
                <img src={jijiImage[data.jiji]} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                <div className="absolute bottom-2 inset-x-0 text-center"><div className="text-xl font-bold drop-shadow-2xl text-white">{data.jiji}</div></div>
              </div>
              <p className="text-[9px] md:text-[10px] text-white/25">{eumyang}{OHENG_KR[oheng]}</p>
              <p className="text-[8px] md:text-[9px] text-amber-400/30">{PILLAR_DESC[label]}</p>
            </div>
          );
        })}
      </div>

      {/* 기둥 설명 */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        {pillars.map(({ label, key }) => {
          const data = manseryeok[key];
          const oheng = CHEONGAN_OHENG[data.cheongan];
          return (
            <div key={key} className="glass rounded-xl p-3 border border-white/5">
              <p className="text-amber-400/60 text-[10px] tracking-wider mb-1">{label}</p>
              <p className="text-white/70 text-xs">{data.cheongan}{data.jiji} ({eumyangLabel(data.cheongan)}{OHENG_KR[oheng]})</p>
              <p className="text-white/30 text-[10px] mt-1">{PILLAR_DESC[label]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function eumyangLabel(cheongan) {
  return CHEONGAN_EUMYANG[cheongan] === '양' ? '양' : '음';
}
