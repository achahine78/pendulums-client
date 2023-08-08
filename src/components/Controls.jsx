import ControlPanel from "./ControlPanel";
import { Row, Col, Button } from "antd";
const Controls = ({ pendulums, buttons, updatePendulum, isSimulating }) => {
  return (
    <>
      <Row>
        {buttons.map((button) => (
          <Col key={button.id} style={{ marginRight: "16px" }}>
            <Button onClick={button.clickHandler}>{button.text}</Button>
          </Col>
        ))}
      </Row>
      <Row
        style={{ marginTop: "16px", marginBottom: "16px" }}
        className={`controls-control-panels-container ${
          isSimulating ? "controls-control-panels-container-disabled" : ""
        }`}
      >
        {pendulums.map((pendulum) => (
          <Col key={pendulum.id} style={{ marginRight: "16px" }}>
            <ControlPanel pendulum={pendulum} updatePendulum={updatePendulum} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Controls;
