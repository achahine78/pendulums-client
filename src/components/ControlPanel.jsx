import { Slider, Card } from "antd";

const ControlPanel = ({ pendulum, updatePendulum }) => {
  return (
    <Card style={{ width: 300 }} title={`Pendulum ${pendulum.id}`}>
      <div>
        Initial angle
        <Slider
          value={pendulum.angle}
          min={-Math.PI / 2}
          max={Math.PI / 2}
          step={0.01}
          onChange={(newValue) => {
            updatePendulum({
              ...pendulum,
              angle: newValue,
              bob: {
                x:
                  pendulum.pendulumLength * Math.sin(newValue) +
                  pendulum.origin.x,
                y:
                  pendulum.pendulumLength * Math.cos(newValue) +
                  pendulum.origin.y,
              },
            });
          }}
        />
      </div>
      <div>
        Length
        <Slider
          value={pendulum.pendulumLength}
          min={1}
          max={600}
          onChange={(newValue) => {
            updatePendulum({
              ...pendulum,
              pendulumLength: Number(newValue),
              bob: {
                x:
                  Number(newValue) * Math.sin(pendulum.angle) +
                  pendulum.origin.x,
                y:
                  Number(newValue) * Math.cos(pendulum.angle) +
                  pendulum.origin.y,
              },
            });
          }}
        />
      </div>
      <div>
        Origin
        <Slider
          value={pendulum.origin.x}
          min={0}
          max={800}
          onChange={(newValue) => {
            updatePendulum({
              ...pendulum,
              origin: {
                x: Number(newValue),
                y: 0,
              },
              bob: {
                x:
                  pendulum.pendulumLength * Math.sin(pendulum.angle) +
                  Number(newValue),
                y: pendulum.pendulumLength * Math.cos(pendulum.angle),
              },
            });
          }}
        />
      </div>
    </Card>
  );
};

export default ControlPanel;
