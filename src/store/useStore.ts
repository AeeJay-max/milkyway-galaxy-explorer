import { create } from 'zustand';
import * as THREE from 'three';

export const engineState = {
    // We use a predefined number of Vector3s to prevent allocation per frame
    planetPositions: Array.from({ length: 8 }, () => new THREE.Vector3()),
}; interface SpaceState {
    activePlanetIndex: number;
    setActivePlanetIndex: (index: number) => void;
    scrollProgress: number;
    setScrollProgress: (progress: number) => void;
    viewMode: 'solar_system' | 'portfolio';
    setViewMode: (mode: 'solar_system' | 'portfolio') => void;
}

export const useStore = create<SpaceState>((set) => ({
    activePlanetIndex: -1, // -1 means Sun/Overview
    setActivePlanetIndex: (index) => set({ activePlanetIndex: index }),
    scrollProgress: 0,
    setScrollProgress: (progress) => set({ scrollProgress: progress }),
    viewMode: 'solar_system',
    setViewMode: (mode) => set({ viewMode: mode })
}));
