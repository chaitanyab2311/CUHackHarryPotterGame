/**
 * Class Enemy
 */
class Enemy {
    constructor(data) {
        this.isAnimating = false;

        this.x = data.x;
        this.y = data.y;
        this.speed = data.speed;
        this.scale = data.scale;

        this.vx = this.speed;

        this.container = new Game.Container();
        this.container.position.set(this.x, this.y);
        this.container.scale.set(this.scale, this.scale);

        let texture = Game.assets[`${Game.assetsDir}darkmark.png`].texture;
        this.sprite = new Game.Sprite(texture);
        this.container.addChild(this.sprite);

        Game.layers.enemies.addChild(this.container);
        Game.enemies.push(this);
    }

    destroy() {
        Game.layers.enemies.removeChild(this.container);
        let index = Game.enemies.indexOf(this);
        Game.enemies.splice(index,1);
    }

    explode() {
        if(!this.isAnimating) {
            this.isAnimating = true;
            this.sprite.visible = false;
            this.destroy();
        }
    }

    move() {
        this.container.x += (this.vx * -1);
    }
    
    update() {
        if(this.container.x < 0) {
            this.destroy();
        }

        if(Collision.box(this.container, Game.player.sprite) && !this.isAnimating) {
            Game.player.hit();
            this.explode();
        }
    }
}