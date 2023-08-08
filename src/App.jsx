import { useState } from "react";
import { pendulumsInitialState } from "./constants/pendulums";
import Canvas from "./components/Canvas";

function App() {
  const [pendulums] = useState(pendulumsInitialState);
  return (
    <div>
      <Canvas pendulums={pendulums} />
    </div>
  );
}

export default App;
