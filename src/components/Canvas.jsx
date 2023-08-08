import { useRef, useEffect } from "react";

const Canvas = ({ pendulums }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pendulums.forEach((pendulum) => {
      const bobX = pendulum.bob.x;
      const bobY = pendulum.bob.y;
      const pivotX = pendulum.origin.x;
      const pivotY = pendulum.origin.y;

      // Draw the pivot
      ctx.fillStyle = "#000000";
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, 5, 0, 2 * Math.PI);
      ctx.fill();

      // Draw the pendulum arm
      ctx.strokeStyle = "#000000";
      ctx.beginPath();
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(bobX, bobY);
      ctx.stroke();

      // Draw the bob
      ctx.fillStyle = pendulum.color;
      ctx.beginPath();
      ctx.arc(bobX, bobY, 10, 0, 2 * Math.PI);
      ctx.fill();
    });
  }, [pendulums]);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

export default Canvas;
