export interface PlanetConfig {
    id: string;
    name: string;
    radius: number;
    distance: number;
    speed: number;
    color: string;
    textureUrl: string;
    atmosphereColor?: string;
    emissive?: string;
    facts: string[];
}

const DistanceScale = 15;
const SizeScale = 1;

// Using downloaded local high-quality 2K textures to completely stop 404 crashes
const TEXTURE_BASE = '/textures';

export const planets: PlanetConfig[] = [
{
    id: 'mercury',
    name: 'Mercury',
    radius: 0.38 * SizeScale,
    distance: 0.39 * DistanceScale + 4,
    speed: 0.04,
    color: '#ffffff',
    textureUrl: `${TEXTURE_BASE}/mercury.jpg`,
    facts: [
        'Smallest planet in the solar system.',
        'A year lasts only 88 Earth days.',
        'A single day on Mercury lasts 176 Earth days.',
        'Temperatures swing from −180°C to 430°C.',
        'Mercury has no atmosphere to retain heat.',
        'Its surface resembles Earth’s Moon with many craters.'
    ],
},
{
    id: 'venus',
    name: 'Venus',
    radius: 0.95 * SizeScale,
    distance: 0.72 * DistanceScale + 4,
    speed: 0.015,
    color: '#ffffff',
    atmosphereColor: '#ffaa00',
    textureUrl: `${TEXTURE_BASE}/venus.jpg`,
    facts: [
        'Hottest planet in the solar system (~465°C surface temperature).',
        'Rotates backwards compared to most planets.',
        'A day on Venus is longer than its year.',
        'Its thick CO₂ atmosphere creates extreme greenhouse heating.',
        'Surface pressure is 92× stronger than Earth’s.',
        'Often called Earth’s “twin” because of similar size.'
    ],
},
{
    id: 'earth',
    name: 'Earth',
    radius: 1 * SizeScale,
    distance: 1 * DistanceScale + 4,
    speed: 0.01,
    color: '#ffffff',
    atmosphereColor: '#4ca5ff',
    textureUrl: `${TEXTURE_BASE}/earth.jpg`,
    facts: [
        'Only known planet supporting life.',
        '71% of Earth’s surface is covered by water.',
        'Earth has one natural satellite: the Moon.',
        'Strong magnetic field protects life from solar radiation.',
        'Atmosphere contains 78% nitrogen and 21% oxygen.',
        'Earth rotates once every 24 hours.'
    ],
},
{
    id: 'mars',
    name: 'Mars',
    radius: 0.53 * SizeScale,
    distance: 1.52 * DistanceScale + 4,
    speed: 0.008,
    color: '#ffffff',
    atmosphereColor: '#ff6b3d',
    textureUrl: `${TEXTURE_BASE}/mars.jpg`,
    facts: [
        'Known as the Red Planet due to iron oxide dust.',
        'Home to Olympus Mons, tallest volcano in solar system.',
        'Has two moons: Phobos and Deimos.',
        'Evidence suggests Mars once had flowing liquid water.',
        'Mars gravity is only 38% of Earth’s.',
        'Future human missions are planned for Mars exploration.'
    ],
},
{
    id: 'jupiter',
    name: 'Jupiter',
    radius: 2.2 * SizeScale,
    distance: 5.2 * DistanceScale * 0.5 + 4,
    speed: 0.002,
    color: '#ffffff',
    textureUrl: `${TEXTURE_BASE}/jupiter.jpg`,
    facts: [
        'Largest planet in the solar system.',
        'Great Red Spot storm has lasted over 300 years.',
        'Has at least 95 known moons.',
        'Strongest magnetic field of any planet.',
        'Protects inner planets by absorbing many asteroids.',
        'A day on Jupiter lasts only about 10 hours.'
    ],
},
{
    id: 'saturn',
    name: 'Saturn',
    radius: 1.8 * SizeScale,
    distance: 9.5 * DistanceScale * 0.4 + 4,
    speed: 0.0009,
    color: '#ffffff',
    textureUrl: `${TEXTURE_BASE}/saturn.jpg`,
    facts: [
        'Famous for its beautiful ring system.',
        'Density is so low it could float in water.',
        'Has over 140 moons including Titan.',
        'Titan has lakes made of liquid methane.',
        'Saturn’s rings are mostly ice particles.',
        'Wind speeds can exceed 1,800 km/h.'
    ],
},
{
    id: 'uranus',
    name: 'Uranus',
    radius: 1.2 * SizeScale,
    distance: 19.2 * DistanceScale * 0.25 + 4,
    speed: 0.0004,
    color: '#ffffff',
    atmosphereColor: '#00ffff',
    textureUrl: `${TEXTURE_BASE}/uranus.jpg`,
    facts: [
        'Rotates sideways with a tilt of 98 degrees.',
        'Coldest planetary atmosphere recorded.',
        'Appears blue-green due to methane gas.',
        'Has 27 known moons.',
        'Each pole experiences 42 years of sunlight followed by 42 years of darkness.',
        'Classified as an ice giant.'
    ],
},
{
    id: 'neptune',
    name: 'Neptune',
    radius: 1.15 * SizeScale,
    distance: 30.1 * DistanceScale * 0.2 + 4,
    speed: 0.0001,
    color: '#ffffff',
    atmosphereColor: '#4f4fbd',
    textureUrl: `${TEXTURE_BASE}/neptune.jpg`,
    facts: [
        'Farthest known major planet from the Sun.',
        'Strongest winds in the solar system (over 2,000 km/h).',
        'First planet discovered using mathematics before observation.',
        'Has 14 known moons including Triton.',
        'Triton orbits Neptune backwards.',
        'Neptune completes one orbit every 165 Earth years.'
    ],
}
];
