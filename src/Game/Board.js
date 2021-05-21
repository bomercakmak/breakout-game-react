import React, { useRef, useEffect } from "react";
import { BallMovement } from "./BallMovement";
import WallBorder from "./util/WallBorder";
import data from "./data";
import "../App.css";
import Paddle from "./Paddle";

let { ballObj, paddleProps } = data;

function Board() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      //Handle Ball Movement
      BallMovement(ctx, ballObj);
      // Ball and Wall Border
      WallBorder(ballObj, canvas);

      Paddle(ctx, canvas, paddleProps);

      requestAnimationFrame(render);
    };
    render();
  }, []);

  return (
    <canvas
      id="game-canvas"
      onMouseMove={(event) => (paddleProps.x = event.clientX- paddleProps.width / 2 - 10)}
      ref={canvasRef}
      height="500"
      width="800px;"
    />
  );
}

export default Board;
