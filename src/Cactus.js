export default class Cactus {
    constructor(ctx, x, y, height, width, image) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height
        this.image = image
    }
}