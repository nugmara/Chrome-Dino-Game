import Player from "./Player.js";
import Ground from "./Ground.js";
import CactiController from "./CactiController.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


const GAME_SPEED_START = 1; // 1.0
const GAME_SPEED_INCREMENT = 0.00001;

const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;
const PLAYER_WIDTH = 88 / 1.5; // 58
const PLAYER_HEIGHT = 94 / 1.5; // 62
const MAX_JUMP_HEIGHT = GAME_HEIGHT;
const MIN_JUMP_HEIGHT = 150;
const GROUND_WIDTH = 2400;
const GROUND_HEIGHT = 24;
const GROUND_AND_CACTUS_SPEED = 0.5;
const CACTI_CONFIG = [
  { width: 48 / 1.5, height: 100 / 1.5, image: "/images/cactus_1.png" },
  { width: 98 / 1.5, height: 100 / 1.5, image: "/images/cactus_2.png" },
  { width: 68 / 1.5, height: 70 / 1.5, image: "/images/cactus_3.png" },
];

// Game Objects
let player = null;
let ground = null;
let cactiController = null;

let scaleRatio = null;
let previousTime = null;
let gameSpeed = GAME_SPEED_START;

function createSprites() {
  const playerWidthInGame = PLAYER_WIDTH * scaleRatio;
  const playerHeightInGame = PLAYER_HEIGHT * scaleRatio;
  const minJumpHeightInGame = MIN_JUMP_HEIGHT * scaleRatio;
  const maxJumpHeightInGame = MAX_JUMP_HEIGHT * scaleRatio;

  const groundWidthInGame = GROUND_WIDTH * scaleRatio;
  const groundHeightInGame = GROUND_HEIGHT * scaleRatio;

  player = new Player(
    ctx,
    playerWidthInGame,
    playerHeightInGame,
    minJumpHeightInGame,
    maxJumpHeightInGame,
    scaleRatio
  );

  ground = new Ground(
    ctx,
    groundWidthInGame,
    groundHeightInGame,
    GROUND_AND_CACTUS_SPEED,
    scaleRatio
  );

  const cactiImages = CACTI_CONFIG.map((cactus) => {
    const image = new Image();
    // image.onload = () => console.log("Cactus Image Loaded:", cactus)
    image.src = cactus.image;
    return {
      image: image,
      width: cactus.width * scaleRatio,
      height: cactus.height * scaleRatio,
    };
  });
  cactiController = new CactiController(
    ctx,
    cactiImages,
    scaleRatio,
    ground,
    GROUND_AND_CACTUS_SPEED
  );
  // console.log(cactiImages)
}

function setScreen() {
  scaleRatio = getScaleRatio();
  canvas.width = GAME_WIDTH * scaleRatio;
  canvas.height = GAME_HEIGHT * scaleRatio;
  console.log("Canvas width:", canvas.width, "Canvas height:", canvas.height);
  createSprites();
}

setScreen();

// use setTimeout on Safari mobile rotation otherwise works fine on desktop
window.addEventListener("resize", () => setTimeout(setScreen, 500));

if (screen.orientation) {
  screen.orientation.addEventListener("change", setScreen);
}

function getScaleRatio() {
  const screenHeight = Math.min(
    window.innerHeight,
    document.documentElement.clientHeight
  );
  const screenWidth = Math.min(
    window.innerWidth,
    document.documentElement.clientWidth
  );

  // window is wider than the game width
  if (screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT) {
    return screenWidth / GAME_WIDTH;
  } else {
    return screenHeight / GAME_HEIGHT;
  }
}

function clearScreen() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function gameLoop(currentTime) {
  if (previousTime === null) {
    previousTime = currentTime;
    requestAnimationFrame(gameLoop);
    return;
  }
  const frameTimeDelta = currentTime - previousTime;
  previousTime = currentTime;

  clearScreen();

  // Update game objects
  ground.update(gameSpeed, frameTimeDelta);
  cactiController.update(gameSpeed, frameTimeDelta);
  player.update(gameSpeed, frameTimeDelta);

  // Draw game objects
  ground.draw();
  cactiController.draw();
  player.draw();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
