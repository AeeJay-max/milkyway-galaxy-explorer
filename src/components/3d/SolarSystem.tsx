import React, {
    useRef,
    Component,
    Suspense,
    type ReactNode
} from 'react';

import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

import * as THREE from 'three';

import { planets } from '../../config/planets';
import { Planet } from './Planet';


/*
Texture protection boundary
Prevents crashes if sun texture fails
*/

class SunErrorBoundary extends Component<
    { fallbackColor: string; children: ReactNode },
    { hasError: boolean }
> {

    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: any) {

        console.warn(
            "Sun texture failed to load. Using fallback emission.",
            error
        );

    }

    render() {

        if (this.state.hasError)
            return (
                <meshBasicMaterial
                    color={this.props.fallbackColor}
                />
            );

        return this.props.children;

    }

}


/*
Sun surface material
*/

function SunSurface() {

    const sunTexture =
        useTexture('/textures/sun.jpg');

    return (

        <meshBasicMaterial
            map={sunTexture}
            toneMapped={false}
        />

    );

}


/*
Main Solar System Scene
*/

export function SolarSystem() {

    const sunRef =
        useRef<THREE.Group>(null);

    const coronaRef =
        useRef<THREE.Mesh>(null);

    const timeRef =
        useRef(0);


    useFrame((_state, delta) => {

        timeRef.current += delta;


        /*
        Rotate Sun slowly
        */

        if (sunRef.current) {

            sunRef.current.rotation.y += 0.005;

        }


        /*
        Animate solar corona pulse
        */

        if (coronaRef.current) {

            const pulse =
                1.08 +
                Math.sin(timeRef.current * 1.5) * 0.015;

            coronaRef.current.scale.set(
                pulse,
                pulse,
                pulse
            );

            coronaRef.current.rotation.y += 0.002;

        }

    });


    return (

        <group>

            {/* MAIN SUN LIGHT SOURCE */}

            <pointLight
                position={[0, 0, 0]}
                intensity={420}
                color="#fff4cc"
                distance={180}
                decay={1.25}
                castShadow
                shadow-mapSize={[2048, 2048]}
                shadow-bias={-0.0001}
            />


            {/* AMBIENT FILL LIGHT */}

            <ambientLight
                intensity={0.18}
                color="#ffffff"
            />


            {/* SUN OBJECT */}

            <group ref={sunRef}>

                {/* SUN CORE */}

                <mesh>

                    <sphereGeometry
                        args={[3, 128, 128]}
                    />

                    <SunErrorBoundary
                        fallbackColor="#ffcc00"
                    >

                        <Suspense
                            fallback={
                                <meshBasicMaterial
                                    color="#ffcc00"
                                />
                            }
                        >

                            <SunSurface />

                        </Suspense>

                    </SunErrorBoundary>

                </mesh>


                {/* SOLAR CORONA */}

                <mesh
                    ref={coronaRef}
                    scale={1.08}
                >

                    <sphereGeometry
                        args={[3, 64, 64]}
                    />

                    <meshBasicMaterial
                        color="#ff6600"
                        transparent
                        opacity={0.35}
                        blending={
                            THREE.AdditiveBlending
                        }
                        side={THREE.BackSide}
                        depthWrite={false}
                    />

                </mesh>

            </group>


            {/* PLANETS */}

            {planets.map(
                (planet, index) => (

                    <Planet
                        key={planet.id}
                        planet={planet}
                        index={index}
                    />

                )
            )}

        </group>

    );

}