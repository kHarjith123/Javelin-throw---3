class Javelin{
    constructor(x, y,angle) {
        var options = {
            'isStatic' : true,
            'friction':1.0,
            'density':1.0
        }
        this.body = Bodies.rectangle(x, y, 200,100,options);
        this.width = 200;
        this.height = 100;
        this.image = loadImage("Images/spear.png");
        Matter.Body.setAngle(this.body, angle);
        World.add(world, this.body);
      }
      display(){
        var angle = this.body.angle;
        push();
        translate(this.body.position.x, this.body.position.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0, 0, this.width, this.height);
        pop();
      }
}