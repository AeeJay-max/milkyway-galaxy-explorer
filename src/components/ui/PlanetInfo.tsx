import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { planets } from '../../config/planets';

export function PlanetInfo() {
    const activePlanetIndex = useStore((state) => state.activePlanetIndex);
    const viewMode = useStore((state) => state.viewMode);

    if (viewMode !== 'solar_system' || activePlanetIndex === -1) return null;

    const planet = planets[activePlanetIndex];

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={planet.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute left-8 top-1/4 max-w-sm pointer-events-auto"
            >
                <h1 className="text-5xl font-bold mb-2 tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                    {planet.name}
                </h1>

                <div className="mb-6 flex gap-4 text-sm text-gray-400">
                    <div>
                        <span className="block text-xs uppercase tracking-widest text-gray-500">Distance from sun</span>
                        <span>{(planet.distance / 15).toFixed(2)} AU</span>
                    </div>
                    <div>
                        <span className="block text-xs uppercase tracking-widest text-gray-500">Radius</span>
                        <span>{planet.radius.toFixed(2)}x Earth</span>
                    </div>
                </div>

                <div className="space-y-4">
                    {planet.facts.map((fact, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 + 0.3 }}
                            className="bg-white/5 backdrop-blur-md rounded-lg p-4 border border-white/10 shadow-xl"
                        >
                            <p className="text-gray-200 text-sm leading-relaxed">{fact}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
