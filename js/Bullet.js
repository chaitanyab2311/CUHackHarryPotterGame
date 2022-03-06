/**
 * Bullet Class
 */
class Bullet {
    constructor(data) {
        this.x = data.x;
        this.y = data.y;
        this.speed = data.speed;
        this.scale = data.scale;

        this.vx = this.speed;
        this.texture = Game.assets['assets/images/lightening_rotated.png'].texture;
        this.sprite = new Game.Sprite(this.texture);
        this.sprite.position.set(this.x, this.y);
        this.sprite.scale.set(this.scale, this.scale);
        Game.layers.bullets.addChild(this.sprite);
    }

    destroy() {
        Game.layers.bullets.removeChild(this.sprite);
        let index = Game.bullets.indexOf(this);
        Game.bullets.splice(index, 1);
    }

    move() {
        this.sprite.x += this.vx;
    }

    update() {
        if(this.sprite.x > Game.stage.width) {
            this.destroy();
        }

        for(let i in Game.enemies) {
            if(Collision.box(this.sprite, Game.enemies[i].container) && !Game.enemies[i].isAnimating) {
                Game.player.score++;
                Game.enemies[i].explode();
                this.destroy();
                if(Game.player.score % 10 == 0){
                    for(let i =0 ;i < Game.enemies.length ;i++){
                        Game.enemies[i].destroy();
                    }
                    Game.player.level++;
                }

                if(Game.player.level == 5){
                    Game.EnemiesStopped = true;
                    let text = new PIXI.Text(`Boss Incominggg!`, Game.textFont);
                    text.position.set((Game.stage.width / 2) - (text.width / 2), (Game.stage.height / 2) - (text.height / 2));
                    Game.layers.text.addChild(text);

                    setTimeout(() => {
                        Game.layers.text.removeChild(text);
                    }, 2000);
                }

            }
        }

        if(Collision.box(this.sprite, Game.layers.boss)){
            this.destroy();
            Game.boss.hits++;
            Game.player.score+=2;

            if(Game.boss.hits % 5 == 0){
                console.log("Boss Attacking");
                Game.boss.attack();
            }

            if(Game.boss.hits == 30){
                Game.boss.destroy();
                let text = new PIXI.Text(`Boss Defeated! You won!`, Game.textFont);
                text.position.set((Game.stage.width / 2) - (text.width / 2), (Game.stage.height / 2) - (text.height / 2));
                Game.layers.text.addChild(text);
            }
        }


    }
}