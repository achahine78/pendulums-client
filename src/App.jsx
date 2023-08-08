import { useState } from "react";
import { pendulumsInitialState } from "./constants/pendulums";
import Canvas from "./components/Canvas";
import ControlPanel from "./components/ControlPanel";

function App() {
  const [pendulums, setPendulums] = useState(pendulumsInitialState);

  const updatePendulum = (newPendulum) => {
    const newPendulums = pendulums.map((pendulum) => {
      if (newPendulum.id === pendulum.id) {
        return {
          ...newPendulum,
        };
      }

      return pendulum;
    });
    setPendulums(newPendulums);
  };

  return (
    <div>
      <div>
        {pendulums.map((pendulum) => (
          <ControlPanel
            pendulum={pendulum}
            updatePendulum={updatePendulum}
            key={pendulum.id}
          />
        ))}
      </div>
      <Canvas pendulums={pendulums} />
    </div>
  );
}

export default App;
