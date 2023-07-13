class Player extends gameObject {
  constructor(x, y, r, sprite = null) {
    super(x, y, r, 0, 0, true, sprite, "green")
  }

  move() {
    this.x = mouseX
    this.y = this.y
  }

  display() {
    imageMode(CENTER);
    image(this.sprite, mouseX, this.y, this.r , this.r);
  }
}