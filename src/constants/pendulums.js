export const pendulumsInitialState = [
  {
    id: 0,
    angle: 0,
    bob: {
      x: 200 * Math.sin(0),
      y: 200 * Math.cos(0),
    },
    pendulumLength: 200,
    origin: {
      x: 0,
      y: 0,
    },
    color: "red",
  },
  {
    id: 1,
    angle: 0,
    bob: {
      x: 200 * Math.sin(0) + 100,
      y: 200 * Math.cos(0),
    },
    pendulumLength: 200,
    origin: {
      x: 100,
      y: 0,
    },
    color: "green",
  },
  {
    id: 2,
    angle: 0,
    bob: {
      x: 200 * Math.sin(0) + 200,
      y: 200 * Math.cos(0),
    },
    pendulumLength: 200,
    origin: {
      x: 200,
      y: 0,
    },
    color: "purple",
  },
  {
    id: 3,
    angle: 0,
    bob: {
      x: 200 * Math.sin(0) + 300,
      y: 200 * Math.cos(0),
    },
    pendulumLength: 200,
    origin: {
      x: 300,
      y: 0,
    },
    color: "yellow",
  },
  {
    id: 4,
    angle: 0,
    bob: {
      x: 200 * Math.sin(0) + 400,
      y: 200 * Math.cos(0),
    },
    pendulumLength: 200,
    origin: {
      x: 400,
      y: 0,
    },
    color: "blue",
  },
];
