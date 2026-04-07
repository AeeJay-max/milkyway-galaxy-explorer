import { Navigation } from './Navigation';
import { PlanetInfo } from './PlanetInfo';
import { Portfolio } from './Portfolio';

export function Overlay() {
    return (
        <div className="fixed inset-0 pointer-events-none z-[50] w-full h-full">
            <Navigation />
            <PlanetInfo />
            <Portfolio />
        </div>
    );
}
