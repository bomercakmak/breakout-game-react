import React, { useRef, useEffect } from "react";
import { BallMovement } from "./BallMovement";
import WallBorder from "./util/WallBorder";
import data from "./data";
import "../App.css";
import Paddle from "./Paddle";
import Brick from "./Brick";
import BrickCollision from "./util/BrickCollision";
import PaddleHitPosition from "./util/PaddleHitPosition";
import PlayerInfo from "./PlayerInfo";
import AllBroken from "./util/AllBroken";
import ResetBall from "./util/ResetBall"

let bricks = [];

let { ballObj, paddleProps, brickObj, player } = data;

function Board() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.canvas.width  = window.innerWidth - 300;
      ctx.canvas.height = window.innerHeight - 200;
      paddleProps.y = canvas.height - 30;
      // Assign Bricks

      let newBricks = Brick(player.level, bricks, canvas, brickObj);
      if (newBricks && newBricks.length > 0) {
        bricks = newBricks;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      PlayerInfo(ctx, player, canvas);

      bricks.map((brick) => {
        return brick.draw(ctx);
      });

      //Handle Ball Movement
      BallMovement(ctx, ballObj);

      AllBroken(bricks,player,canvas,ballObj);

      if (player.lives === 0) {
        alert("Game Over! Press ok to restart");

        player.lives = 5;
        player.level = 1;
        player.score = 0;
        ResetBall(ballObj, canvas, paddleProps);
        bricks.length = 0;
      }
      // Ball and Wall Border
      WallBorder(ballObj, canvas, player,paddleProps);

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
          player.score += 10;
        }
      }

      Paddle(ctx, canvas, paddleProps);
      // Paddle + Ball Collision
      PaddleHitPosition(ballObj, paddleProps);
      requestAnimationFrame(render);
    };
    render();
  }, []);

  return (
    <canvas
      id="game-canvas"
      onMouseMove={(event) =>
        (paddleProps.x = event.clientX - paddleProps.width / 2 - 10)
      }
      ref={canvasRef}
      height="500px;"
      width="800px;"
    />
  );
}

export default Board;
