import { useStore } from '../../store/useStore';
import { planets } from '../../config/planets';

export function Navigation() {
    const activePlanetIndex = useStore(state => state.activePlanetIndex);

    return (
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3 pointer-events-auto z-50">
            {/* Sun/Overview Dot */}
            <div className="group relative flex items-center justify-end">
                <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs tracking-widest text-white/50 bg-black/50 px-2 py-1 rounded">
                    Overview
                </span>
                <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${activePlanetIndex === -1 ? 'bg-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'bg-white/20'}`}
                />
            </div>

            {/* Planet Dots */}
            {planets.map((planet, idx) => (
                <div key={planet.id} className="group relative flex items-center justify-end">
                    <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs tracking-widest text-white/50 bg-black/50 px-2 py-1 rounded">
                        {planet.name}
                    </span>
                    <div
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${activePlanetIndex === idx ? 'bg-white scale-150 shadow-[0_0_10px_rgba(255,255,255,0.8)]' : 'bg-white/20'}`}
                    />
                </div>
            ))}

            {/* Portfolio Dot */}
            <div className="group relative flex items-center justify-end mt-4">
                <span className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs tracking-widest text-white/50 bg-black/50 px-2 py-1 rounded">
                    Portfolio
                </span>
                <div
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${activePlanetIndex === planets.length ? 'bg-blue-500 scale-125 shadow-[0_0_10px_rgba(59,130,246,0.8)]' : 'bg-blue-500/20'}`}
                />
            </div>
        </div>
    );
}
