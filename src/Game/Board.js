import React, { useRef, useEffect } from "react";
import { BallMovement } from "./BallMovement";
import WallBorder from "./util/WallBorder";
import data from "./data";
import "../App.css";
import Paddle from "./Paddle";
import Brick from "./Brick";
import BrickCollision from "./util/BrickCollision";

let bricks = [];

let { ballObj, paddleProps,brickObj } = data;

function Board() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      // Assign Bricks
      let newBricks = Brick(2,bricks,canvas,brickObj);
      if(newBricks && newBricks.length > 0){
        bricks = newBricks;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bricks.map((brick)=> {
        return brick.draw(ctx)
      })
      //Handle Ball Movement
      BallMovement(ctx, ballObj);
      // Ball and Wall Border
      WallBorder(ballObj, canvas);

      let brickCollision;

      for (let i = 0; i < bricks.length; i++) {
        brickCollision = BrickCollision(ballObj, bricks[i]);

        if (brickCollision.hit && !bricks[i].broke) {
          if (brickCollision.axis === "X") {
            ballObj.dx *= -1;
            bricks[i].broke = true;
          } else if (brickCollision.axis === "Y") {
            ballObj.dy *= -1;
            bricks[i].broke = true;
          }
        }
      }

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
