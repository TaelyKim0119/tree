import { cheonganImage, jijiImage } from '../utils/imageMap';

export default function SajuChart({ manseryeok }) {
  const pillars = [
    { label: '시주', key: '시주', highlight: false },
    { label: '일주', key: '일주', highlight: true },
    { label: '월주', key: '월주', highlight: false },
    { label: '년주', key: '년주', highlight: false },
  ];
  return (
    <div className="flex justify-center gap-3 sm:gap-4">
      {pillars.map(({ label, key, highlight }) => {
        const data = manseryeok[key];
        return (
          <div key={key} className="text-center space-y-2">
            <p className={`text-[10px] tracking-widest ${highlight ? 'text-amber-400/60 font-semibold' : 'text-white/20'}`}>{label}{highlight && ' ★'}</p>
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
          </div>
        );
      })}
    </div>
  );
}
