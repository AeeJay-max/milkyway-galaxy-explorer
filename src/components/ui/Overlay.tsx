import { Navigation } from './Navigation';


export function Overlay() {
    return (
        <div className="fixed inset-0 pointer-events-none z-[50] w-full h-full">
            <Navigation />
        </div>
    );
}
