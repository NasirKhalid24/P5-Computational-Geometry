const points = [];
let hullLines = [];

// points
let num_p = 9;

// 2 edge loops
let p = 0;
let q = p+1;

// Point loop
let s = 0;

// left and right bools
let LeftEmpty = true;
let RightEmpty = true;

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
}

function next_loop(){
  s += 1;

  if(s >= points.length){
    if(LeftEmpty || RightEmpty) hullLines.push([points[p].x, points[p].y, points[q].x, points[q].y]);

    LeftEmpty = true;
    RightEmpty = true;


    q += 1;
    s = 0;
  }

  if(q >= points.length){
    p += 1;
    q = p+1;
    s = 0;
  }

  if(p >= points.length){
    noLoop();
    
    stroke(255, 0, 255);
    strokeWeight(1);
    hullLines.forEach(element => {
      line(element[0], element[1], element[2], element[3]);
    });

  } 
}

function to_left(a_p, b_p, c_p){
  return ( ((a_p.x * b_p.y) - (a_p.y * b_p.x)) + ((b_p.x * c_p.y) - (b_p.y * c_p.x)) + ((c_p.x * a_p.y) - (c_p.y * a_p.x))) < 0;
}



// Render loop
function draw() {
  
  make_scene();

  if(p < num_p && q < num_p && s < num_p){

    // Edge points
    let v1 = points[p];
    let v2 = points[q];

    // // To ensure clockwise triangle
    if (v1.x > v2.x){
      let temp = v1;
      v1 = v2;
      v2 = temp;
    }

    // Line
    stroke(255, 0, 255);
    strokeWeight(1);
    line(v1.x, v1.y, v2.x, v2.y);
    stroke(255, 0, 0);
    strokeWeight(8);
    point(v1.x, v1.y);
    stroke(0, 255, 0);
    strokeWeight(8);
    point(v2.x, v2.y);

    // Point
    if(points[s] != v1 && points[s] != v2){
      stroke(255, 255, 0);
      strokeWeight(20);
      point(points[s].x, points[s].y);
      
      if(to_left(points[p], points[q], points[s])){
        LeftEmpty = false;
      }else{
        RightEmpty = false;
      }
    }

    stroke(255, 0, 255);
    strokeWeight(1);
    hullLines.forEach(element => {
      line(element[0], element[1], element[2], element[3]);
    });
  }

  next_loop();

}
