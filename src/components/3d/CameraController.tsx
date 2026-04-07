import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { useStore } from '../../store/useStore';
import * as THREE from 'three';
import { planets } from '../../config/planets';

export function CameraController() {
    const { camera } = useThree();
    const scroll = useScroll();
    const setActivePlanetIndex = useStore((state) => state.setActivePlanetIndex);
    const setViewMode = useStore((state) => state.setViewMode);
    const setScrollProgress = useStore((state) => state.setScrollProgress);

    const targetPos = new THREE.Vector3(0, 30, 45);
    const lookAtTarget = new THREE.Vector3(0, 0, 0);
    const currentLookAt = new THREE.Vector3(0, 0, 0);

    useFrame((_state, delta) => {
        if (!scroll) return;

        // Set global scroll progress for UI mapping
        setScrollProgress(scroll.offset);

        // Sections: 0 (Sun/Overview) -> 1-8 (Planets) -> 9 (Portfolio)
        const numSections = planets.length + 2;
        const currentSectionFloat = scroll.offset * (numSections - 1);
        const currentSection = Math.round(currentSectionFloat);

        const currentStoreIndex = useStore.getState().activePlanetIndex;
        let newIndex = currentSection - 1;

        if (currentSection === 0) {
            newIndex = -1;
            if (useStore.getState().viewMode !== 'solar_system') setViewMode('solar_system');
        } else if (currentSection <= planets.length) {
            newIndex = currentSection - 1;
            if (useStore.getState().viewMode !== 'solar_system') setViewMode('solar_system');
        } else {
            newIndex = planets.length;
            if (useStore.getState().viewMode !== 'portfolio') setViewMode('portfolio');
        }

        if (currentStoreIndex !== newIndex) {
            setActivePlanetIndex(newIndex);
        }

        // Only handle camera interpolation when looking at Sun/Overview or Portfolio
        if (newIndex === -1 || newIndex === planets.length) {
            targetPos.set(0, 30, 45);
            lookAtTarget.set(0, 0, 0);

            camera.position.lerp(targetPos, delta * 2);
            currentLookAt.lerp(lookAtTarget, delta * 2);
            camera.lookAt(currentLookAt);
        }
        // When looking at a planet, Planet.tsx itself handles the camera dynamically
    });

    return null;
}
