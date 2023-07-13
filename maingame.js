let difficulty = 1;

let score = 0;
let gameOver = false;

let images = [];

let asteroids = [];
let coins = [];

let scoreTick = 2500;
let difficultyTick = 5000;
let coinSpawnTick = 2000;
let asteroidSpawnTick = 300;
let type = "";

function preload() {
  images.coin = loadImage("resources/coin.png");
  images.asteroid = loadImage("resources/asteroid.png");
  images.background = loadImage("resources/space.png");
  images.spaceship = loadImage("resources/spaceship.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  player = new Player(width / 2, height - 50, 20, images.spaceship);
  console.log("Lavet af Lucas L");
}

function draw() {
  background(0);
  imageMode(CORNER);
  image(images.background, 0, 0, windowWidth, windowHeight);

  //Stops drawing the player, coins and asteroids if the game has ended
  if (gameOver == false) {
    player.move();
    player.display();

    if (gameOver == false) {
      tickObjects();
      tickSpawning();
      tickScore();
      tickDifficulty();
    }
  }
  drawUI();
}

function spliceAll(array, splices) {
  for (let i = splices.length - 1; i >= 0; i--) {
    array.splice(splices[i], 1);
    console.log("Spliced");
  }
}

function tickScore() {
  if (millis() > scoreTick && gameOver == false) {
    score++;
    scoreTick = scoreTick + 2500;
  }
}

function tickDifficulty() {
  if (millis() > difficultyTick && gameOver == false) {
    difficulty++;
    difficultyTick = difficultyTick + 5000;
  }
}

function drawUI() {
  if (gameOver == false) {
    fill("white");
    strokeWeight(2);
    text("Score: " + score, 5, 20);
    text("Difficulty: " + difficulty, 5, 35);
  } else {
    textAlign(CENTER);
    fill("red");
    textSize(48);
    text("Game Over", width / 2, height / 2);

    //Displays Endstats
    fill("white");
    textSize(24);
    text("Final Score: " + score, width / 2, height / 2 + 30);
    text("Difficulty Reached: " + difficulty, width / 2, height / 2 + 60);
  }
}

function tickObjects() {
  let nonActiveCoins = [];

  //Coin Collision Check
  for (let coin of coins) {
    if (coin.collision(player) && coin.isActive == true) {
      console.log("Coin Grabed!");
      coin.isActive = false;
      score = score + 5;
      break;
    }
  }

  //Asteroid Collision Check
  for (let asteroid of asteroids) {
    if (asteroid.intersects(player)) {
      console.log("Spaceship Hit! Game Over");
      gameOver = true;
      break;
    }
  }

  //Renders Asteroids
  for (let asteroid of asteroids) {
    asteroid.display();
    asteroid.move();
  }

  //Renders Coins
  for (let coin of coins) {
    if (coin.isActive == true) {
      coin.move();
      coin.display();
    } else if (coin.isActive == false) {
      nonActiveCoins.push(coin);
    }
  }
  spliceAll(coins, nonActiveCoins);
}

function spawnNewObject(type) {
  if (type == "asteroid") {
    for (let i = 0; i < difficulty; i++) {
      asteroids.push(
        new Asteroid(
          random(50, width - 50),
          0,
          random(75, 159),
          images.asteroid
        )
      );
      console.log("Spawned Asteroids! ");
    }
  } else if (type == "coin") {
    coins.push(
      new Coin(random(50, width - 50), 0, random(25, 35), images.coin)
    );
    console.log("Spawned Coin!");
  }
}

function tickSpawning() {
  if (millis() > asteroidSpawnTick) {
    spawnNewObject("asteroid");
    asteroidSpawnTick = asteroidSpawnTick + int(random(100, 500));
  }

  if (millis() > coinSpawnTick) {
    spawnNewObject("coin");
    coinSpawnTick = coinSpawnTick + int(random(2000, 4000));
  }
}