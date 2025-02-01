// Calculator logic
let currentInput = '';
let secondaryInput = '';
let operator = null;

// Get display elements
const mainDisplay = document.querySelector('.mainDisplay');
const secondaryDisplay = document.querySelector('.secondaryDisplay');

// Function to update the display
function updateDisplay() {
    mainDisplay.textContent = currentInput || '0';
    secondaryDisplay.textContent = secondaryInput;
}

// Function to handle button clicks
function handleButtonClick(value) {
    if (value === 'C') {
        // Clear everything
        currentInput = '';
        secondaryInput = '';
        operator = null;
    } else if (value === 'CE') {
        // Clear current input
        currentInput = '';
    } else if (value === 'DEL') {
        // Delete the last character
        currentInput = currentInput.slice(0, -1);
    } else if (value === '=') {
        // Perform calculation
        if (operator && currentInput && secondaryInput) {
            const num1 = parseFloat(secondaryInput);
            const num2 = parseFloat(currentInput);
            let result;
            switch (operator) {
                case '+': result = num1 + num2; break;
                case '-': result = num1 - num2; break;
                case '*': result = num1 * num2; break;
                case '/': result = num1 / num2; break;
                default: result = 'Error';
            }
            currentInput = result.toString();
            secondaryInput = '';
            operator = null;
        }
    } else if (['+', '-', '*', '/'].includes(value)) {
        // Handle operators
        if (currentInput) {
            if (secondaryInput) {
                // Perform the previous operation
                handleButtonClick('=');
            }
            secondaryInput = currentInput;
            currentInput = '';
            operator = value;
        }
    } else {
        // Append numbers or decimal point
        currentInput += value;
    }

    updateDisplay();
}

// Add event listeners to buttons
document.querySelectorAll('.controls button').forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        handleButtonClick(value);
    });
});

// Bouncing balls logic (unchanged)
class Ball {
    constructor() {
        this.element = document.createElement('div');
        this.element.className = 'bouncing-ball';

        // Random properties
        this.size = Math.random() * 70 + 70; // Size between 30px and 100px
        this.speedX = (Math.random() - 0.5) * 1; // Speed between -2 and 2
        this.speedY = (Math.random() - 0.5) * 1;
        this.x = Math.random() * (window.innerWidth - this.size);
        this.y = Math.random() * (window.innerHeight - this.size);

        // Apply initial styles
        this.element.style.width = `${this.size}px`;
        this.element.style.height = `${this.size}px`;

        document.body.appendChild(this.element); // Append to body
        this.updatePosition(); // Set initial position
    }

    updatePosition() {
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }

    update(balls) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off walls
        if (this.x <= 0 || this.x >= window.innerWidth - this.size) {
            this.speedX *= -1;
            if (this.x <= 0) this.x = 0; // Prevent going out of bounds
            if (this.x >= window.innerWidth - this.size) this.x = window.innerWidth - this.size;
        }

        if (this.y <= 0 || this.y >= window.innerHeight - this.size) {
            this.speedY *= -1;
            if (this.y <= 0) this.y = 0; // Prevent going out of bounds
            if (this.y >= window.innerHeight - this.size) this.y = window.innerHeight - this.size;
        }

        // Collision detection with other balls
        balls.forEach((ball) => {
            if (ball !== this) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.size / 2 + ball.size / 2) {
                    // Calculate overlap
                    const overlap = (this.size / 2 + ball.size / 2) - distance;

                    // Normalize direction vector
                    const nx = dx / distance;
                    const ny = dy / distance;

                    // Adjust positions to prevent sticking
                    this.x += nx * overlap / 2;
                    this.y += ny * overlap / 2;
                    ball.x -= nx * overlap / 2;
                    ball.y -= ny * overlap / 2;

                    // Swap speeds
                    const tempSpeedX = this.speedX;
                    const tempSpeedY = this.speedY;
                    this.speedX = ball.speedX;
                    this.speedY = ball.speedY;
                    ball.speedX = tempSpeedX;
                    ball.speedY = tempSpeedY;
                }
            }
        });

        // Apply position
        this.updatePosition();
    }
}

// Create multiple balls
const balls = [];
const ballCount = 15; // Adjust number of balls

for (let i = 0; i < ballCount; i++) {
    balls.push(new Ball());
}

// Animation loop
function animate() {
    balls.forEach((ball) => ball.update(balls));
    requestAnimationFrame(animate);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    balls.forEach((ball) => {
        if (ball.x > window.innerWidth - ball.size) ball.x = window.innerWidth - ball.size;
        if (ball.y > window.innerHeight - ball.size) ball.y = window.innerHeight - ball.size;
    });
});