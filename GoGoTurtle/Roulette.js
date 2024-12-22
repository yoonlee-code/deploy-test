let options = ["5 shells", "10 shells", "15 shells", "20 shells", "30 shells"];
let angle = 0; // Current angle of the wheel
let spinSpeed = 0; // Speed of the wheel
let easing = 0.98; // Easing factor to slow down
let isSpinning = false; // Spinning state
let selectedOption = ""; // The selected option after spinning stops
let resultIndex = -1; // Index of the selected section
let bounce = 0; // Bounce effect offset
let bounceSpeed = 0.5; // Bounce speed

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  // Draw the roulette wheel
  translate(width / 2, height / 2);
  let radius = 150;
  let arcAngle = TWO_PI / options.length; // Angle per section

  noStroke();
  for (let i = 0; i < options.length; i++) {
    // Highlight the selected section
    if (i === resultIndex && !isSpinning) {
      fill(0, 100, 0); // Dark green
    } else {
      fill(120, 200, 120); // Light green
    }
    arc(0, 0, radius * 2, radius * 2, angle + i * arcAngle, angle + (i + 1) * arcAngle, PIE);
  }

  // Draw dividing lines between sections
  stroke(0); // Black line
  strokeWeight(2);
  for (let i = 0; i < options.length; i++) {
    let x1 = cos(angle + i * arcAngle) * radius;
    let y1 = sin(angle + i * arcAngle) * radius;
    line(0, 0, x1, y1);
  }

  // Draw the text for each option
  noStroke();
  fill(0);
  textSize(16);
  textAlign(CENTER, CENTER);
  for (let i = 0; i < options.length; i++) {
    let midAngle = angle + (i + 0.5) * arcAngle;
    let x = cos(midAngle) * radius * 0.7;
    let y = sin(midAngle) * radius * 0.7;
    text(options[i], x, y);
  }

  // Draw the green arrow on the right side
  fill(0);
  triangle(
    radius + 10, -10, // Top point of the arrow
    radius + 10, 10,  // Bottom point of the arrow
    radius - 20, 0    // Tip of the arrow
  );

  // Handle spinning logic
  if (isSpinning) {
    angle += spinSpeed; // Update the angle
    spinSpeed *= easing; // Apply easing to slow down
    if (spinSpeed < 0.001) {
      isSpinning = false;
      let normalizedAngle = (TWO_PI - (angle % TWO_PI)) % TWO_PI; // Normalize the angle
      resultIndex = floor(normalizedAngle / arcAngle) % options.length; // Determine the selected index
      selectedOption = options[resultIndex]; // Update the selected option
    }
  }

  // Display the selected option with bounce effect
  resetMatrix();
  if (!isSpinning && selectedOption) {
    fill(255, 0, 0); // Red color
    textSize(30 + bounce); // Apply bounce effect
    textAlign(CENTER, CENTER);
    text(`Selected: ${selectedOption}`, width / 2, height / 2);

    // Bounce effect logic
    bounce += bounceSpeed;
    if (bounce > 5 || bounce < 0) {
      bounceSpeed *= -1; // Reverse direction when reaching limits
    }
  }
}
  
function mousePressed() {
  if (!isSpinning) {
    spinSpeed = random(0.2, 0.5); // Random initial spin speed
    isSpinning = true;
    selectedOption = "";
    resultIndex = -1; // Reset result index
    bounce = 0; // Reset bounce effect
  }
}
