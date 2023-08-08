import { useState, useRef, useEffect } from "react";
import { pendulumsInitialState } from "./constants/pendulums";
import Canvas from "./components/Canvas";
import Controls from "./components/Controls";
import axios from "axios";

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

  const pauseSimulation = () => {
    const promises = pendulums.map((pendulum) =>
      axios.post(`http://localhost:300${pendulum.id}/pause`).catch((err) => {
        console.log(err);
      })
    );
    Promise.all(promises).then((responses) => {
      const data = responses.map((response) => response.data);
      console.log(data);
    });
  };

  const resetPendulums = () => {
    pendulums.forEach((pendulum) =>
      axios.post(`http://localhost:300${pendulum.id}/reset`)
    );
  };

  useEffect(resetPendulums, []);

  return (
    <div>
      <Controls
        pendulums={pendulums}
        updatePendulum={updatePendulum}
        isSimulating={isSimulating}
        buttons={[
          {
            id: 0,
            text: "Start",
            clickHandler: () => runSimulations(),
          },
          {
            id: 1,
            text: "Pause",
            clickHandler: () => pauseSimulation(),
          },
        ]}
      />
      <Canvas pendulums={pendulums} />
    </div>
  );
}

export default App;
