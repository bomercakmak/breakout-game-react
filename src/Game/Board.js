import React, { useRef, useEffect } from "react";
import { BallMovement } from "./BallMovement";
import data from "./data";
import "../App.css";

function Board() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      let { ballObj } = data;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      BallMovement(ctx, ballObj);

      if (
        ballObj.y - ballObj.rad <= 0 ||
        ballObj.y + ballObj.rad >= canvas.height
      ) {
        ballObj.dy *= -1;
      }
      if (
        ballObj.x + ballObj.rad >= canvas.width ||
        ballObj.x - ballObj.rad <= 0
      ) {
        ballObj.dx *= -1;
      }

      requestAnimationFrame(render);
    };
    render();
  }, []);

  return (
    <canvas id="game-canvas" ref={canvasRef} height="500" width="800px;" />
  );
}

export default Board;
