        var towerImg, tower;
        var doorImg, door, doorsGroup;
        var climberImg, climber, climbersGroup;
        var ghost, ghostImg;
        var invisibleBlockGroup, invisibleBlock;
        var gameState = "play";
        var score = 0;

        function preload(){
          towerImg = loadImage("tower.png");
          doorImg = loadImage("door.png");
          climberImg = loadImage("climber.png");
          ghostImg = loadImage("ghost-standing.png");
          spookySound = loadSound("spooky.wav");
        }

        function setup() {
          createCanvas(600, 600);
          tower = createSprite(300,300);
          tower.addImage("tower",towerImg);
          tower.velocityY = 1;
          
          ghost = createSprite(200,200,50,50);
          ghost.addImage(ghostImg);
          ghost.scale = 0.3;

          doorsGroup = new Group();
          climbersGroup = new Group();
          invisibleBlockGroup = new Group();
          
          
        }

        function draw() {
          background("black");
          
          if(gameState == "play"){
            if(tower.y > 400){
              tower.y = 300
            }
            
            if(keyDown("space")){
              ghost.velocityY = -5;
            }

            ghost.velocityY = ghost.velocityY + 0.8;

            if(keyDown("left")){
              ghost.x = ghost.x -3;
            }

            if(keyDown("right")){
              ghost.x = ghost.x+3;
            }

            if(climbersGroup.isTouching(ghost)){
              ghost.velocityY = 0;
              score = score + 1;
            }

            if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
              ghost.destroy();
              gameState = "end";
            }
          
            drawSprites();

            text("score"+score,50,50);
            

          spawnDoors();
          }

            
            if(gameState == "end"){
              stroke("red");
              fill("black");
              textSize(30);
              text("gameOver",300,300);
            }
        }
        
        function spawnDoors(){
          if(frameCount%240 == 0){
            door = createSprite(200,-50);
            door.addImage(doorImg);
            door.velocityY = 1.5; 
            door.lifetime = 800;
            doorsGroup.add(door);

            door.x = Math.round(random(120,400));
            

            climber = createSprite(200,10)
            climber.addImage(climberImg);
            climber.velocityY = 1.5; 
            climber.lifetime = 800;
            climbersGroup.add(climber);

            invisibleBlock = createSprite(200,15,climber.width,2);
            invisibleBlock.visible = false;
            invisibleBlock.velocityY = 1.5; 
            invisibleBlock.lifetime = 800;
            invisibleBlockGroup.add(invisibleBlock);

            climber.x = door.x;
            invisibleBlock.x = door.x;
            ghost.depth = door.depth;
            ghost.depth = ghost.depth + 1;

          }
          
        }















