import React, { useRef, Suspense, Component, type ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useStore, engineState } from '../../store/useStore';
import type { PlanetConfig } from '../../config/planets';

interface PlanetProps {
    planet: PlanetConfig;
    index: number;
}

/*
Texture Error Boundary
Prevents crashes if a texture fails to load
*/

class TextureErrorBoundary extends Component<
    { fallbackColor: string; children: ReactNode },
    { hasError: boolean }
> {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: any) {
        console.warn(
            "Texture failed to load. Falling back to color material.",
            error
        );
    }

    render() {
        if (this.state.hasError) {
            return <meshStandardMaterial color={this.props.fallbackColor} />;
        }

        return this.props.children;
    }
}

/*
Planet Surface Material
Loads texture safely with Suspense
*/

function PlanetSurface({
    planet,
    isActive,
    isEarth
}: {
    planet: PlanetConfig;
    isActive: boolean;
    isEarth: boolean;
}) {
    const texture = useTexture(planet.textureUrl);

    return (
        <meshStandardMaterial
            map={texture}
            roughness={isEarth ? 0.4 : 0.8}
            metalness={isEarth ? 0.1 : 0.05}
            emissive={planet.emissive || '#000000'}
            emissiveIntensity={isActive ? 0.2 : 0}
        />
    );
}

/*
Main Planet Component
Handles:

orbit movement
rotation
camera cinematic tracking
hover UI panel
*/

export function Planet({ planet, index }: PlanetProps) {
    const planetRef = useRef<THREE.Group>(null);
    const orbitGroupRef = useRef<THREE.Group>(null);

    const angleRef = useRef(Math.random() * Math.PI * 2);
    const timeRef = useRef(0);

    const activePlanetIndex = useStore(
        (state) => state.activePlanetIndex
    );

    const isActive = activePlanetIndex === index;
    const isEarth = planet.name === 'Earth';

    useFrame((state, delta) => {

        timeRef.current += delta;

        /*
        Planet rotation animation
        Uses scaled orbital speed for realism
        */

        if (planetRef.current) {

            planetRef.current.rotation.y += planet.speed * 2;

            const targetScale = isActive ? 1.2 : 1.0;

            planetRef.current.scale.lerp(
                new THREE.Vector3(
                    targetScale,
                    targetScale,
                    targetScale
                ),
                delta * 5
            );
        }


        /*
        Planet orbital motion around Sun
        */

        if (orbitGroupRef.current) {

            angleRef.current -= planet.speed;

            orbitGroupRef.current.position.x =
                Math.cos(angleRef.current) * planet.distance;

            orbitGroupRef.current.position.z =
                Math.sin(angleRef.current) * planet.distance;


            /*
            Update shared engine state positions
            */

            engineState.planetPositions[index].copy(
                orbitGroupRef.current.position
            );


            /*
            Cinematic camera orbit around active planet
            */

            if (isActive) {

                const orbitSpeed = 0.6;

                const orbitRadius = planet.radius * 4.5;

                const angle =
                    timeRef.current * orbitSpeed;

                const offset = new THREE.Vector3(
                    Math.cos(angle) * orbitRadius,

                    planet.radius * 1.2 +
                        Math.sin(angle * 0.8) * 0.4,

                    Math.sin(angle) * orbitRadius
                );

                const desiredPos =
                    orbitGroupRef.current.position
                        .clone()
                        .add(offset);


                state.camera.position.lerp(
                    desiredPos,
                    delta * 2.2
                );

                state.camera.lookAt(
                    orbitGroupRef.current.position
                );
            }
        }
    });


    return (
        <>
            {/* Planet Orbit Group */}
            <group ref={orbitGroupRef}>

                {/* Planet Mesh */}
                <group ref={planetRef}>

                    <mesh castShadow receiveShadow>

                        <sphereGeometry
                            args={[planet.radius, 128, 128]}
                        />

                        <TextureErrorBoundary
                            fallbackColor={planet.color}
                        >
                            <Suspense
                                fallback={
                                    <meshStandardMaterial
                                        color={planet.color}
                                    />
                                }
                            >
                                <PlanetSurface
                                    planet={planet}
                                    isActive={isActive}
                                    isEarth={isEarth}
                                />
                            </Suspense>
                        </TextureErrorBoundary>

                    </mesh>


                    {/* Atmosphere Glow */}
                    {planet.atmosphereColor && (

                        <mesh scale={1.03}>

                            <sphereGeometry
                                args={[planet.radius, 64, 64]}
                            />

                            <meshBasicMaterial
                                color={planet.atmosphereColor}
                                transparent
                                opacity={0.15}
                                blending={
                                    THREE.AdditiveBlending
                                }
                                side={THREE.BackSide}
                            />

                        </mesh>

                    )}

                </group>


                {/* Planet Info Panel */}
                {isActive && (

                    <Html
                        position={[
                            planet.radius * 1.5,
                            0,
                            0
                        ]}
                        center
                        zIndexRange={[100, 0]}
                    >

                        <div className="bg-space-900/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl text-white w-72 shadow-2xl pointer-events-none animate-in fade-in zoom-in duration-500">

                            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 border-b border-white/20 pb-3 mb-3">
                                {planet.name}
                            </h2>

                            <ul className="space-y-3 text-sm text-gray-300">

                                {planet.facts.map(
                                    (fact, idx) => (

                                        <li
                                            key={idx}
                                            className="flex items-start gap-3"
                                        >
                                            <span className="text-blue-400 mt-0.5 text-lg leading-none">
                                                •
                                            </span>

                                            <span className="leading-snug">
                                                {fact}
                                            </span>

                                        </li>

                                    )
                                )}

                            </ul>

                        </div>

                    </Html>

                )}

            </group>


            {/* Orbit Ring Indicator */}
            <mesh
                rotation={[Math.PI / 2, 0, 0]}
                receiveShadow
            >

                <ringGeometry
                    args={[
                        planet.distance - 0.05,
                        planet.distance + 0.05,
                        128
                    ]}
                />

                <meshBasicMaterial
                    color="#ffffff"
                    transparent
                    opacity={isActive ? 0.2 : 0.08}
                    side={THREE.DoubleSide}
                />

            </mesh>
        </>
    );
}