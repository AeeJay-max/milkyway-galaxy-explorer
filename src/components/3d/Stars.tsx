import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars as DreiStars } from '@react-three/drei';
import * as THREE from 'three';

export function Stars() {
    const starsRef = useRef<THREE.Points>(null);

    useFrame(() => {
        if (starsRef.current) {
            starsRef.current.rotation.y += 0.0002;
            starsRef.current.rotation.x += 0.0001;
        }
    });

    return (
        <group>
            <DreiStars
                ref={starsRef}
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={1}
            />
        </group>
    );
}
