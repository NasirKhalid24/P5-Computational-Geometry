// NEEDS REFACTORING REALLY BAD CODE

let points = [];
let stack_s = [];
let stack_t = [];

// points
let num_p = 50;

// Setup to generate and store points
function setup() {
  // frameRate(0.5);
  var myCanvas = createCanvas(500, 500);
  myCanvas.parent("canv");
  let buffer = 20;
  for (let i = 0; i < num_p; i++) {
    points.push(
      createVector(
        random(buffer, width - buffer),
        random(buffer, height - buffer)
      )
    );
  }
  points.sort((a, b) => b.y - a.y);
  
  const lowest = points[0]
  stack_s.push(lowest);

  points.splice(0, 1);
  points.sort((a, b) =>  atan2(b.y - stack_s[0].y, b.x - stack_s[0].x) - atan2(a.y - stack_s[0].y, a.x - stack_s[0].x));

  stack_s.push(points[0]);

  for (let i = points.length-1; i > 0 ; i--) {
    stack_t.push(points[i]);
  }

  points.push(stack_s[0])
}

function make_scene(){
  clear();
  
  // Drawing background and points
  background(0);
  stroke(255);
  strokeWeight(8);
  for (let p of points) {
    point(p.x, p.y);
  }

  stroke(255, 0, 0);
  point(stack_s[0].x, stack_s[0].y);

}

function to_left(a, b, c){
  return p5.Vector.sub(a, c).cross(p5.Vector.sub(b, c)).z <= 0
}



// Render loop
function draw() {
  
  make_scene();

  if(stack_t.length != 0){
    let p1 = stack_s[stack_s.length-1];
    let p2 = stack_t[stack_t.length-1];

    stack_s.push(stack_t.pop())
    
    stroke(0, 0, 255);
    strokeWeight(4);
    fill(0, 0, 255, 50);
    beginShape();
    for (let p of stack_s) {
      vertex(p.x, p.y);
    }
    endShape(CLOSE);

    stroke(0, 255, 0);
    strokeWeight(1);
    noFill();
    beginShape();
    vertex(p1.x, p1.y);
    vertex(p2.x, p2.y);
    endShape();

    if(!to_left(p1, p2, stack_s[stack_s.length-3])){
      stack_t.push(stack_s.pop());
      stack_s.pop();
    }
  }
  else{
    stroke(0, 0, 255);
    fill(0, 0, 255, 50);
    beginShape();
    for (let p of stack_s) {
      vertex(p.x, p.y);
    }
    endShape(CLOSE);
  }
  
}
