// Get canvas and context for fluid flow visualization
const flowCanvas = document.getElementById('flowCanvas');
const flowCtx = flowCanvas.getContext('2d');

// Get input elements for fluid flow parameters
const velocityInput = document.getElementById('velocity');
const angleInput = document.getElementById('angle');

// Get canvas and context for stress visualization
const stressCanvas = document.getElementById('stressCanvas');
const stressCtx = stressCanvas.getContext('2d');

// Get input element for applied force
const forceInput = document.getElementById('force');

// Function to draw fluid flow visualization
function drawFlow(velocity, angle) {
  const centerX = flowCanvas.width / 2;
  const centerY = flowCanvas.height / 2;
  const arrowLength = 30;

  flowCtx.clearRect(0, 0, flowCanvas.width, flowCanvas.height);

  flowCtx.beginPath();
  flowCtx.moveTo(centerX, centerY);

  const radians = (angle - 90) * (Math.PI / 180);
  const arrowX = centerX + arrowLength * Math.cos(radians);
  const arrowY = centerY + arrowLength * Math.sin(radians);
  flowCtx.lineTo(arrowX, arrowY);
  flowCtx.stroke();

  flowCtx.beginPath();
  flowCtx.moveTo(arrowX, arrowY);

  // Simulate fluid particles
  const particleCount = 20;
  for (let i = 0; i < particleCount; i++) {
    const particleX = centerX + (Math.random() * 40 - 20);
    const particleY = centerY + (Math.random() * 40 - 20);
    flowCtx.lineTo(particleX, particleY);
  }

  flowCtx.strokeStyle = 'blue';
  flowCtx.lineWidth = 1;
  flowCtx.stroke();
}

// Function to draw stress visualization
function drawStress(force) {
  const centerX = stressCanvas.width / 2;
  const centerY = stressCanvas.height / 2;
  const maxStress = 500; // Adjust this value based on your requirement

  stressCtx.clearRect(0, 0, stressCanvas.width, stressCanvas.height);

  const stressColor = `rgba(255, 0, 0, ${force / maxStress})`;
  stressCtx.fillStyle = stressColor;
  stressCtx.fillRect(0, 0, stressCanvas.width, stressCanvas.height);
}

// Event listeners for input changes
velocityInput.addEventListener('input', () => {
  const velocity = parseFloat(velocityInput.value);
  velocityValue.textContent = `${velocity.toFixed(1)} m/s`;
  drawFlow(velocity, parseFloat(angleInput.value));
});

angleInput.addEventListener('input', () => {
  const angle = parseFloat(angleInput.value);
  angleValue.textContent = `${angle}°`;
  drawFlow(parseFloat(velocityInput.value), angle);
});

forceInput.addEventListener('input', () => {
  const force = parseFloat(forceInput.value);
  forceValue.textContent = `${force} N`;
  drawStress(force);
});

// Initial drawing
drawFlow(parseFloat(velocityInput.value), parseFloat(angleInput.value));
drawStress(parseFloat(forceInput.value));
