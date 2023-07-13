class Asteroid extends gameObject {
    constructor(x, y, r, sprite = null) {
      super(x, y, r, 0, 5, true, sprite, "red")
    }
  
    move() {
      this.x = this.x
      this.y = this.y + 3
    }
  
    display() {
      imageMode(CENTER);
      image(this.sprite, this.x, this.y, this.r , this.r);
    }

    intersects(player) {
      let distance = dist(this.x, this.y, player.x, player.y);
      return distance < this.r / 2 + player.r / 2;
    }
}