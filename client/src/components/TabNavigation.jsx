const TABS = ['원국분석','성격','금전운','직업운','연애운','결혼운','건강운','가족/관계','대운/세운','총평'];

export default function TabNavigation({ activeTab, onTabChange }) {
  return (
    <div className="flex overflow-x-auto border-b border-white/5 px-2 gap-0.5" style={{ scrollbarWidth: 'none' }}>
      {TABS.map(tab => (
        <button key={tab} onClick={() => onTabChange(tab)}
          className={`px-3.5 py-3.5 text-[13px] whitespace-nowrap shrink-0 relative transition ${activeTab === tab ? 'text-amber-400/80' : 'text-white/20 hover:text-white/40'}`}>
          {tab}
          {activeTab === tab && <span className="absolute bottom-0 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />}
        </button>
      ))}
    </div>
  );
}
