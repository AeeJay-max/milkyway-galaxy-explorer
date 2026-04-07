import { Scene } from './components/3d/Scene';
import { Overlay } from './components/ui/Overlay';

function App() {

  return (
    <>
      {/* 3D Canvas Background */}
      <Scene />

      {/* The overlay is fixed position and handles displaying current state */}
      <Overlay />
    </>
  );
}

export default App;
