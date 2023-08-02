const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GAME_WIDTH = 800;
const GAME_HEIGHT = 200;

let scaleRatio = null;
let previousTime = null;
const PLAYER_WIDTH = 88 / 1.5; // 58
const PLAYER_HEIGHT = 94 / 1.5; // 62

function setScreen() {
  scaleRatio = getScaleRatio();
  canvas.width = GAME_WIDTH * scaleRatio;
  canvas.height = GAME_HEIGHT * scaleRatio;
}

setScreen();

// use setTimeout on Safari mobile rotation otherwise works fine on desktop
window.addEventListener("resize", () => setTimeout(setScreen, 500))

if (screen.orientation) {
    screen.orientation.addEventListener("change", setScreen)
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
    if (screenWidth / screenHeight < GAME_WIDTH / GAME_HEIGHT){
        return screenWidth / GAME_WIDTH;
    } else {
        return screenHeight / GAME_HEIGHT
    }
}

function clearScreen() {
    ctx.fillStyle  = "white";
    ctx.fillRect(0,0, canvas.width, canvas.height)
}

function gameLoop(currentTime) {
    if (previousTime === null) {
        previousTime = currentTime
        requestAnimationFrame(gameLoop)
        return;
    }
    const frameTimeDelta = currentTime - previousTime;
    previousTime = currentTime;
    console.log(frameTimeDelta)
    clearScreen()
    requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)
