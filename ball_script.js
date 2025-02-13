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