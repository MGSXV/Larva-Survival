import { Player } from "./Player.js";
import { Obstacle } from "./Obstacle.js";
import { Egg } from "./Egg.js";
import { Enemy } from "./Enemy.js";

export class Game
{
	constructor(canvas)
	{
		this.canvas = canvas;
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.topMargin = 260;
		this.mouse = {
			x: this.width * 0.5,
			y: this.height * 0.5,
			down: false
		}
		this.player = new Player(this);
		this.obstacles = [];
		this.numberOfobstacles = 5;
		this.eggs = [];
		this.maxEggs = 5;
		this.eggTimer = 0;
		this.eggInerval = 1000;
		this.gameObjects = [];
		this.enemies = [];
		this.maxEnemies = 5;
		this.hatchlings = [];
		this.lostHatchlings = 0;
		this.score = 0;
		this.debugMode = false;
		this.fps = 90;
		this.timer = 0;
		this.interval = 1000 / this.fps;

		/*
		Event handlers:
		1. We use arrow function rather than a normal callback because callback functions runs on eventListeners
		they lose their context which leads lose "this" keyword context. 
		Arraow function automatically inherit the reference to "this" keyword from the parent scope.
		2. We need to use offsetX and offsetY properties ranther than x and y properties 
		to get the correct position of click events from canvas not from window
		*/
		this.canvas.addEventListener('mousedown', (e) => {
			this.mouse.x = e.offsetX;
			this.mouse.y = e.offsetY;
			this.mouse.down = true;
		});
		this.canvas.addEventListener('mouseup', (e) => {
			this.mouse.x = e.offsetX;
			this.mouse.y = e.offsetY;
			this.mouse.down = false;
		});
		this.canvas.addEventListener('mousemove', (e) => {
			if (this.mouse.down)
			{
				this.mouse.x = e.offsetX;
				this.mouse.y = e.offsetY;
			}
		});
		window.addEventListener('keypress', e => {
			if (e.key == 'd')
				this.debugMode = !this.debugMode;
		});
	}

	checkCollision(objectA, objectB)
	{
		const	deltaX = objectA.collisionX - objectB.collisionX;
		const	deltaY = objectA.collisionY - objectB.collisionY;
		const	distance = Math.hypot(deltaY, deltaX);
		const	sumOfRadius = objectA.collisionRadius + objectB.collisionRadius;
		return {
			'isColliding': (distance < sumOfRadius),
			'distance': distance,
			'sumOfRadius': sumOfRadius,
			'deltaX': deltaX,
			'deltaY': deltaY
		};
	}
	
	initObstacles()
	{
		let		attempts = 0;
		const	MAX_ATTEMPTS = 500;
		while (attempts < MAX_ATTEMPTS && this.obstacles.length < this.numberOfobstacles)
		{
			let	testObstacle = new Obstacle(this);
			let	isOverlap = false;
			this.obstacles.forEach(obstacle => {
				const	distanceBuffer = 100;
				const	dx = testObstacle.collisionX - obstacle.collisionX;
				const	dy = testObstacle.collisionY - obstacle.collisionY;
				const	distance = Math.hypot(dy, dx);
				const	sumOfRadius = testObstacle.collisionRadius + obstacle.collisionRadius + distanceBuffer;
				if (distance < sumOfRadius)
				isOverlap = true;
			});
			const	MARGIN = testObstacle.collisionRadius * 1.5;
			if (!isOverlap && testObstacle.spriteX > 0 && testObstacle.spriteX < this.width - testObstacle.width
				&& testObstacle.collisionY > this.topMargin + MARGIN && testObstacle.collisionY < this.height - MARGIN)
				this.obstacles.push(testObstacle);
			attempts++;
		}
	}

	addNewEgg(deltaTime)
	{
		if (this.eggTimer > this.eggInerval && this.eggs.length < this.maxEggs)
		{
			this.eggs.push(new Egg(this));
			this.eggTimer = 0;
		}
		else
			this.eggTimer += deltaTime;
	}

	addNewEnemy()
	{
		this.enemies.push(new Enemy(this));
	}

	removeGameObject()
	{
		this.eggs = this.eggs.filter(egg => !egg.markedForDeletion);
		this.hatchlings = this.hatchlings.filter(hatchling => !hatchling.markedForDeletion);
	}

	render(context, deltaTime)
	{
		if (this.timer > this.interval)
		{
			context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.gameObjects = [...this.eggs, ...this.obstacles, this.player, ...this.enemies, ...this.hatchlings];
			this.gameObjects.sort((a, b) => { return (a.collisionY - b.collisionY); });
			this.gameObjects.forEach(object => {
				object.draw(context);
				object.update(deltaTime);
			});
			this.timer = 0;
		}
		this.timer += deltaTime;
		this.addNewEgg(deltaTime);
		context.save();
		context.textAlign = 'left';
		context.fillText('Score: ' + this.score, 25, 50);
		context.restore();
	}

	init()
	{
		this.initObstacles();
		for (let i = 0; i < this.maxEnemies; i++)
		{
			this.addNewEnemy();
		}
	}
}