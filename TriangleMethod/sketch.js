const points = [];
let extreme = [];


// points
let num_p = 9;

// 3 vertex loops
let p = 0;
let q = p+1;
let r = q+1;

// Point loop
let s = 0;

// Setup to generate and store points
function setup() {
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

  // Loop 1 - Set to extreme all points
  for (let index = 0; index < points.length; index++) {
    extreme.push(true);
  }
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
    r += 1;
    s = 0;
  }

  if(r >= points.length){
    q += 1;
    r = q+1;
    s = 0;
  }

  if(q >= points.length){
    p += 1;
    q = p+1;
    r = q+1;
    s = 0;
  }

  if(p >= points.length){
    // noLoop();
    // stroke(255, 100, 255);
    // strokeWeight(4);
    // noFill();
    // beginShape();

    // In triangle point
    stroke(255, 255, 0);
    strokeWeight(20);
        
    for (let final_check = 0; final_check < points.length; final_check++) {
      if(extreme[final_check] == true){
        point(points[final_check].x, points[final_check].y);
      }
    }

    // endShape(CLOSE);
  } 
}

function in_triangle(p_p, q_p, r_p, s_p){
  return (to_left(p_p, q_p, s_p) && to_left(q_p, r_p, s_p) && to_left(r_p, p_p, s_p));
}

function to_left(a_p, b_p, c_p){
  return ( ((a_p.x * b_p.y) - (a_p.y * b_p.x)) + ((b_p.x * c_p.y) - (b_p.y * c_p.x)) + ((c_p.x * a_p.y) - (c_p.y * a_p.x))) < 0;
}



// Render loop
function draw() {
  
  make_scene();

  if(p < num_p && q < num_p && r < num_p && s < num_p){

    // 3 vertices
    let v1 = points[p];
    let v2 = points[q];
    let v3 = points[r];

    // To ensure clockwise triangle
    if (v1.x > v2.x){
      let temp = v1;
      v1 = v2;
      v2 = temp;
    }

    // Triangle
    stroke(255, 0, 255);
    strokeWeight(1);
    line(v1.x, v1.y, v2.x, v2.y);
    line(v2.x, v2.y, v3.x, v3.y);
    line(v3.x, v3.y, v1.x, v1.y);
    stroke(255, 0, 0);
    strokeWeight(8);
    point(v1.x, v1.y);
    stroke(0, 255, 0);
    strokeWeight(8);
    point(v2.x, v2.y);
    stroke(0, 0, 255);
    strokeWeight(8);
    point(v3.x, v3.y);

    if(points[s].x != v1.x && points[s].x != v2.x && points[s].x != v3.x){
      // In triangle point
      stroke(255, 255, 0);
      strokeWeight(20);
      point(points[s].x, points[s].y);

      if(in_triangle(v1, v2, v3, points[s])){
        extreme[s] = false;
      }
    }
  }

  next_loop();

}
