import { useState, useRef } from "react";
import { pendulumsInitialState } from "./constants/pendulums";
import Canvas from "./components/Canvas";
import ControlPanel from "./components/ControlPanel";
import axios from 'axios';

function App() {
  const [pendulums, setPendulums] = useState(pendulumsInitialState);
  const [isSimulating, setIsSimulating] = useState(false);
  const currentSimulationInterval = useRef();

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

  const runSimulations = () => {
    setIsSimulating(true);
    clearInterval(currentSimulationInterval.current);
    const promises = pendulums.map((pendulum) =>
      axios.post(`http://localhost:300${pendulum.id}/start`, {
        angle: pendulum.angle,
        bob: pendulum.bob,
        pendulumLength: pendulum.pendulumLength,
        origin: pendulum.origin,
      })
    );

    Promise.all(promises)
      .then(() => {
        currentSimulationInterval.current = setInterval(() => {
          const otherPromises = pendulums.map((pendulum) =>
            axios.get(`http://localhost:300${pendulum.id}/position`)
          );
          Promise.all(otherPromises)
            .then((responses) => {
              const newPendulums = responses.map((response) => response.data);
              newPendulums.sort((a, b) => a.id - b.id);
              setPendulums(newPendulums);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button onClick={() => runSimulations()}>Start</button>
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
