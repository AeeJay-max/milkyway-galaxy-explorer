import { Suspense, Component, type ErrorInfo, type ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import { Stars } from './Stars';
import { SolarSystem } from './SolarSystem';
import { CameraController } from './CameraController';
import { planets } from '../../config/planets';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

class SceneErrorBoundary extends Component<Props, State> {
    public state: State = { hasError: false };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Canvas Error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="absolute inset-0 flex items-center justify-center bg-space-900 text-red-500 z-50 p-8 text-center">
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Space Module Offline</h1>
                        <p>We encountered a graphical glitch while rendering the 3D scene (likely a missing texture or WebGL crash).</p>
                        <p className="mt-4 text-sm text-gray-400">Please refresh or wait while assets are downloaded.</p>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export function Scene() {
    return (
        <div className="w-full h-screen absolute inset-0 z-0 bg-space-900 pointer-events-auto">
            <SceneErrorBoundary>
                <Canvas shadows camera={{ position: [0, 20, 40], fov: 45 }}>
                    <fog attach="fog" args={['#0b0f19', 30, 200]} />
                    <Suspense fallback={null}>
                        <ScrollControls pages={planets.length + 2} damping={0.25}>
                            <Stars />
                            <SolarSystem />
                            <CameraController />
                        </ScrollControls>
                    </Suspense>
                </Canvas>
            </SceneErrorBoundary>
        </div>
    );
}
