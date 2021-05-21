import React, { useRef, useEffect } from "react";
import { BallMovement } from "./BallMovement";
import WallBorder from "./util/WallBorder";
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
      //Handle Ball Movement
      BallMovement(ctx, ballObj);
      // Ball and Wall Border
      WallBorder(ballObj, canvas);

      requestAnimationFrame(render);
    };
    render();
  }, []);

  return (
    <canvas id="game-canvas" ref={canvasRef} height="500" width="800px;" />
  );
}

export default Board;
