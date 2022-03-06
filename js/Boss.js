/**
 * Boss class
 */
 class Boss {
    constructor(data) {
        this.x = data.x;
        this.y = data.y;
        this.speed = data.speed;
        this.scale = data.scale;

        this.vx = this.speed;
        this.vy = this.speed;
        this.moveDown = true;

        this.hits = 0;

        this.texture = Game.assets["assets/images/bellatrix.png"].texture;

        this.container = new Game.Container();
        this.sprite = new Game.Sprite(this.texture);

        this.container.position.set(this.x, this.y);
        this.container.scale.set(this.scale, this.scale);
    
        this.container.addChild(this.sprite);
        Game.layers.boss.addChild(this.sprite);
        
    }

    hit() {
        if (!this.isHitting) {
            this.isHitting = true;
            this.lifes--;

            if (this.lifes < 1) {
               Game.gameStatus = 2;
           }

            this.sprite.texture = Game.assets["assets/images/harry_hit.png"].texture;

            setTimeout(() => {
                this.sprite.texture = Game.assets["assets/images/harry.png"].texture;
                this.isHitting = false;
            }, 500)
        }
    }

    move() {

        Game.layers.boss.x = Game.stage.width/2 + 100;

        if(this.moveDown){
            Game.layers.boss.y+=1;
        }
        else{
            Game.layers.boss.y -= 1;
        }
        
        if(Game.layers.boss.y + 500 > Game.stage.height){
            this.moveDown = false;
        }
        else if(Game.layers.boss.y <= 0){
            this.moveDown = true;
        }

        

   }

    setMovement() {
       
    }


    update() {
        // 

        if(Collision.box(Game.layers.boss, Game.player.sprite)) {
            console.log("here");
            Game.player.hit();
        }
    }

    destroy() {
        Game.layers.boss.removeChild(this.sprite);
    }

}