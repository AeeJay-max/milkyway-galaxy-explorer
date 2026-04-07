import { motion } from 'framer-motion';
import { Mail, Phone, ExternalLink } from 'lucide-react';
import { useStore } from '../../store/useStore';

const Github = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
);

export function Portfolio() {
    const viewMode = useStore((state) => state.viewMode);

    if (viewMode !== 'portfolio') return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 z-20 flex items-center justify-center overflow-y-auto pointer-events-none bg-space-900/60 backdrop-blur-sm p-4 md:p-12"
        >
            <div className="max-w-4xl w-full bg-space-800/80 border border-white/10 rounded-2xl shadow-2xl p-8 backdrop-blur-xl custom-scrollbar max-h-[90vh] overflow-y-auto pointer-events-none">

                {/* Header */}
                <header className="border-b border-white/10 pb-8 mb-8 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2">
                            Tatenda Ainos Junior Makura
                        </h1>
                        <p className="text-xl text-gray-400 tracking-wide">Full-Stack TypeScript Developer & 3D Experience Designer</p>
                    </div>
                    <div className="flex gap-4 pointer-events-auto">
                        <a href="https://github.com/AeeJay-max" target="_blank" rel="noreferrer" className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors group">
                            <Github className="w-6 h-6 text-gray-300 group-hover:text-white" />
                        </a>
                        <a href="mailto:h240150p@hit.ac.zw" className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors group">
                            <Mail className="w-6 h-6 text-gray-300 group-hover:text-white" />
                        </a>
                        <a href="tel:+263785669109" className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors group">
                            <Phone className="w-6 h-6 text-gray-300 group-hover:text-white" />
                        </a>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* About & Skills */}
                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-white/90 flex items-center gap-2">
                                <span className="w-8 h-1 bg-gradient-to-r from-blue-500 to-transparent rounded-full"></span>
                                About Me
                            </h2>
                            <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                                I am a passionate software engineer specializing in modern web and mobile applications.
                                With a strong foundation in TypeScript, React, and 3D rendering technologies, I build
                                interactive, high-performance digital experiences that bridge the gap between imagination and reality.
                                Currently pushing the boundaries of what is possible on the web with tools like Three.js and React Three Fiber.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-white/90 flex items-center gap-2">
                                <span className="w-8 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full"></span>
                                Tech Stack
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {['TypeScript', 'React', 'Next.js', 'Vite', 'React Native / Expo', 'Three.js', 'R3F', 'Tailwind CSS', 'Zustand', 'Framer Motion', 'Node.js'].map((skill) => (
                                    <span key={skill} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 transition-colors cursor-default">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Projects & Contact Info Detailed */}
                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-white/90 flex items-center gap-2">
                                <span className="w-8 h-1 bg-gradient-to-r from-emerald-500 to-transparent rounded-full"></span>
                                Featured Projects
                            </h2>
                            <div className="space-y-4 pointer-events-auto">
                                <a href="#" className="block p-5 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all group pointer-events-auto">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-white/90 group-hover:text-emerald-400 transition-colors">Cosmic Explorer</h3>
                                        <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-emerald-400" />
                                    </div>
                                    <p className="text-sm text-gray-400 mb-3">A 3D interactive journey through the solar system with real-time physics and engaging educational data.</p>
                                    <div className="flex gap-2">
                                        <span className="text-xs text-emerald-300/70 bg-emerald-500/10 px-2 py-1 rounded">Three.js</span>
                                        <span className="text-xs text-emerald-300/70 bg-emerald-500/10 px-2 py-1 rounded">React</span>
                                    </div>
                                </a>

                                <a href="https://github.com/AeeJay-max" target='_blank' className="block p-5 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all group pointer-events-auto">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-white/90 group-hover:text-blue-400 transition-colors">AeeJay-max Portfolio</h3>
                                        <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-blue-400" />
                                    </div>
                                    <p className="text-sm text-gray-400 mb-3">My personal digital space, showcasing my work, technical articles, and creative experiments.</p>
                                    <div className="flex gap-2">
                                        <span className="text-xs text-blue-300/70 bg-blue-500/10 px-2 py-1 rounded">Next.js</span>
                                        <span className="text-xs text-blue-300/70 bg-blue-500/10 px-2 py-1 rounded">Tailwind</span>
                                    </div>
                                </a>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4 text-white/90 flex items-center gap-2">
                                <span className="w-8 h-1 bg-gradient-to-r from-orange-500 to-transparent rounded-full"></span>
                                Contact Details
                            </h2>
                            <div className="space-y-3 bg-white/5 p-5 rounded-xl border border-white/5 pointer-events-auto">
                                <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                                    <Mail className="w-5 h-5 text-orange-400/80" />
                                    <a href="mailto:h240150p@hit.ac.zw">h240150p@hit.ac.zw</a>
                                </div>
                                <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                                    <Mail className="w-5 h-5 text-orange-400/80" />
                                    <a href="mailto:tatendaajmakura@gmail.com">tatendaajmakura@gmail.com</a>
                                </div>
                                <div className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                                    <Phone className="w-5 h-5 text-orange-400/80" />
                                    <a href="tel:+263785669109">+263 78 566 9109</a>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
