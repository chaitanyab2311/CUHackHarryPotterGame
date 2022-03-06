class Cloud {
    constructor() {
        this.movement = Math.floor(Math.random() * 6) + 1;
    
        let landscapeTexture = PIXI.Texture.fromImage('assets/images/Hogwarts_background.jpeg');
        this.sprite = new Game.Sprite(landscapeTexture);
        this.container = new Game.Container();
        this.container.addChild(this.sprite);
        Game.layers.background.addChild(this.container);
    }

    move() {
        this.container.x -= this.movement;
    }

    destroy() {
        Game.layers.background.removeChild(this.container);
    }
}