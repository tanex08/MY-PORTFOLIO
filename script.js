// ============================================
// LOADING SCREEN & HERO CHARACTER SYSTEM
// ============================================

// Enhanced Loading Screen with Slower Animation
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.getElementById('loadingProgress');
    const loadingPercent = document.getElementById('loadingPercent');
    let progress = 0;
    let isComplete = false;
    
    // Simulate slower, more realistic loading progress
    const loadingInterval = setInterval(() => {
        // Slower increment with variable speeds
        if (progress < 30) {
            progress += Math.random() * 8;
        } else if (progress < 60) {
            progress += Math.random() * 4;
        } else if (progress < 85) {
            progress += Math.random() * 2;
        } else {
            progress += Math.random() * 1;
        }
        
        // Stop at 95% until page fully loads
        if (progress > 95) progress = 95;
        
        loadingProgress.style.width = progress + '%';
        loadingPercent.textContent = Math.floor(progress) + '%';
    }, 400); // Slower interval = 400ms instead of 300ms
    
    // When page fully loads, complete to 100%
    window.addEventListener('load', () => {
        if (!isComplete) {
            clearInterval(loadingInterval);
            progress = 100;
            loadingProgress.style.width = '100%';
            loadingPercent.textContent = '100%';
            isComplete = true;
            
            // Hold at 100% for a moment longer
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
            }, 800);
        }
    });
    
    // Fallback: hide loading screen after 8 seconds max
    setTimeout(() => {
        if (!isComplete) {
            progress = 100;
            loadingProgress.style.width = '100%';
            loadingPercent.textContent = '100%';
            clearInterval(loadingInterval);
            isComplete = true;
            loadingScreen.classList.add('hidden');
        }
    }, 8000);
}

// Initialize loading screen on page start
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoadingScreen);
} else {
    initLoadingScreen();
}

// ============================================
// HERO CHARACTER EYE TRACKING SYSTEM
// ============================================

const heroCharacter = document.getElementById('heroCharacter');
const leftPupil = document.querySelector('.left-pupil');
const rightPupil = document.querySelector('.right-pupil');

// Track mouse position for eye tracking
document.addEventListener('mousemove', (e) => {
    if (!heroCharacter) return;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calculate eye tracking
    updateEyePosition(mouseX, mouseY);
});

// Eye tracking function - eyes follow cursor
function updateEyePosition(mouseX, mouseY) {
    const eyes = document.querySelectorAll('.pupil');
    
    eyes.forEach((pupil) => {
        const eye = pupil.parentElement;
        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;
        
        // Calculate angle from eye to cursor
        const angle = Math.atan2(mouseY - eyeCenterY, mouseX - eyeCenterX);
        
        // Calculate pupil position (smaller distance for larger character)
        const distance = 4;
        const pupilX = Math.cos(angle) * distance;
        const pupilY = Math.sin(angle) * distance;
        
        pupil.style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`;
    });
}

// Mobile menu functionality
const menuBtn = document.getElementById('menu-btn');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');

// Mobile menu button listener
menuBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    sidebar?.classList.toggle('active');
});

// Close sidebar when clicking outside on mobile
if (window.innerWidth <= 1024) {
    document.addEventListener('click', (e) => {
        if (sidebar?.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            e.target !== menuBtn) {
            sidebar.classList.remove('active');
        }
    });
}

// Close sidebar when clicking nav items
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        if (window.innerWidth <= 1024) {
            sidebar?.classList.remove('active');
        }
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        sidebar?.classList.remove('active');
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            e.preventDefault();
            return;
        }
        
        // Formspree will handle the submission automatically
        // Show success message after form submits
        setTimeout(() => {
            alert('Message sent successfully! Thank you for reaching out.');
            contactForm.reset();
        }, 500);
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .exp-header, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Download CV
document.querySelector('.btn-cv')?.addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:8000/api/cv');
        
        if (response.ok) {
            // Get the filename from header or use default
            const filename = response.headers
                .get('content-disposition')
                ?.split('filename=')[1]
                ?.replace(/"/g, '') || 'Tristan_Jay_GAID_CV.pdf';
            
            // Create blob and download
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } else if (response.status === 404) {
            alert('CV not available. Please ask the developer to upload their CV.');
        } else {
            alert('Failed to download CV');
        }
    } catch (error) {
        console.error('Error downloading CV:', error);
        alert('Backend not running. Please start the FastAPI server to download CV.');
    }
});

// Contact button in sidebar
document.querySelector('.btn-contact-sidebar')?.addEventListener('click', () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
});

// ============================================
// AI DODGE GAME - Canvas Game Logic
// ============================================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('startGameBtn');
const pauseBtn = document.getElementById('pauseGameBtn');
const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('highScore');
const healthDisplay = document.getElementById('health');

// Game variables
let gameState = 'idle'; // idle, playing, paused, gameOver
let score = 0;
let highScore = localStorage.getItem('aiGameHighScore') || 0;
let health = 3;
let gameSpeed = 2;
let spawnRate = 100;
let frameCount = 0;
let animationId = null;

// Player object
const player = {
    x: canvas.width / 2 - 15,
    y: canvas.height - 50,
    width: 30,
    height: 30,
    speed: 5,
    color: '#00ff88'
};

// Game arrays
let obstacles = [];
let bonuses = [];

// Input handling
const keys = {
    ArrowLeft: false,
    ArrowRight: false,
    a: false,
    A: false,
    d: false,
    D: false
};

document.addEventListener('keydown', (e) => {
    if (e.key in keys) {
        keys[e.key] = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key in keys) {
        keys[e.key] = false;
    }
});

// Obstacle class
class Obstacle {
    constructor() {
        this.width = 40;
        this.height = 40;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = -this.height;
        this.speed = gameSpeed;
        this.color = '#ff4444';
    }
    
    update() {
        this.y += this.speed;
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.shadowColor = 'rgba(255, 68, 68, 0.6)';
        ctx.shadowBlur = 10;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.shadowBlur = 0;
    }
    
    isOffScreen() {
        return this.y > canvas.height;
    }
}

// Bonus item class
class Bonus {
    constructor() {
        this.width = 25;
        this.height = 25;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = -this.height;
        this.speed = gameSpeed * 0.7;
        this.color = '#00ff88';
    }
    
    update() {
        this.y += this.speed;
    }
    
    draw() {
        ctx.fillStyle = this.color;
        ctx.shadowColor = 'rgba(0, 255, 136, 0.6)';
        ctx.shadowBlur = 15;
        
        // Draw star/bonus shape
        const x = this.x + this.width / 2;
        const y = this.y + this.height / 2;
        const radius = 12;
        
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
            const r = i % 2 === 0 ? radius : radius / 2;
            const px = x + r * Math.cos(angle);
            const py = y + r * Math.sin(angle);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
    }
    
    isOffScreen() {
        return this.y > canvas.height;
    }
}

// Update high score display
function updateHighScore() {
    highScoreDisplay.textContent = highScore;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('aiGameHighScore', highScore);
        highScoreDisplay.textContent = highScore;
    }
}

// Update health display
function updateHealth() {
    const hearts = '❤️'.repeat(Math.max(0, health));
    healthDisplay.textContent = hearts || '💀';
}

// Update score display
function updateScore() {
    scoreDisplay.textContent = score;
}

// Handle player movement
function updatePlayer() {
    if (keys.ArrowLeft || keys.a || keys.A) {
        player.x = Math.max(0, player.x - player.speed);
    }
    if (keys.ArrowRight || keys.d || keys.D) {
        player.x = Math.min(canvas.width - player.width, player.x + player.speed);
    }
}

// Spawn obstacles
function spawnObstacles() {
    if (frameCount % spawnRate === 0) {
        obstacles.push(new Obstacle());
    }
    if (frameCount % (spawnRate - 20) === 0 && spawnRate > 40) {
        if (Math.random() < 0.3) {
            bonuses.push(new Bonus());
        }
    }
}

// Check collisions
function checkCollisions() {
    // Check obstacle collisions
    for (let i = obstacles.length - 1; i >= 0; i--) {
        const obs = obstacles[i];
        if (rectanglesColliding(player, obs)) {
            obstacles.splice(i, 1);
            health--;
            updateHealth();
            
            if (health <= 0) {
                endGame();
            }
            continue;
        }
        
        if (obs.isOffScreen()) {
            obstacles.splice(i, 1);
            score += 1;
            updateScore();
        }
    }
    
    // Check bonus collisions
    for (let i = bonuses.length - 1; i >= 0; i--) {
        const bonus = bonuses[i];
        if (rectanglesColliding(player, bonus)) {
            bonuses.splice(i, 1);
            score += 10;
            updateScore();
            updateHighScore();
            continue;
        }
        
        if (bonus.isOffScreen()) {
            bonuses.splice(i, 1);
        }
    }
}

// Rectangle collision detection
function rectanglesColliding(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Draw background
function drawBackground() {
    ctx.fillStyle = '#0a0e1a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Grid pattern
    ctx.strokeStyle = 'rgba(0, 255, 136, 0.05)';
    ctx.lineWidth = 1;
    const gridSize = 20;
    
    for (let i = 0; i <= canvas.width; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
    }
    for (let i = 0; i <= canvas.height; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
}

// Draw player
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.shadowColor = 'rgba(0, 255, 136, 0.8)';
    ctx.shadowBlur = 20;
    
    // Draw player as glowing square
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Draw player border
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 2;
    ctx.strokeRect(player.x, player.y, player.width, player.height);
    
    ctx.shadowBlur = 0;
}

// Increase difficulty
function increaseDifficulty() {
    if (score % 50 === 0 && score > 0) {
        gameSpeed = Math.min(gameSpeed + 0.5, 6);
        spawnRate = Math.max(spawnRate - 5, 30);
    }
}

// Draw game over overlay
function drawGameOver() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#ff4444';
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'rgba(255, 68, 68, 0.8)';
    ctx.shadowBlur = 20;
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 40);
    
    ctx.fillStyle = '#00ff88';
    ctx.font = '24px Arial';
    ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
    ctx.fillText(`High Score: ${highScore}`, canvas.width / 2, canvas.height / 2 + 60);
    
    ctx.shadowBlur = 0;
}

// Main game loop
function gameLoop() {
    if (gameState === 'playing') {
        drawBackground();
        
        updatePlayer();
        checkCollisions();
        increaseDifficulty();
        spawnObstacles();
        
        // Update and draw obstacles
        for (let obs of obstacles) {
            obs.update();
            obs.draw();
        }
        
        // Update and draw bonuses
        for (let bonus of bonuses) {
            bonus.update();
            bonus.draw();
        }
        
        drawPlayer();
        frameCount++;
    } else if (gameState === 'paused') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#8a2be2';
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
    } else if (gameState === 'gameOver') {
        drawGameOver();
        return;
    }
    
    animationId = requestAnimationFrame(gameLoop);
}

// Start game
function startGame() {
    gameState = 'playing';
    score = 0;
    health = 3;
    gameSpeed = 2;
    spawnRate = 100;
    frameCount = 0;
    obstacles = [];
    bonuses = [];
    player.x = canvas.width / 2 - 15;
    
    updateScore();
    updateHealth();
    updateHighScore();
    
    startBtn.style.display = 'none';
    pauseBtn.style.display = 'inline-block';
    pauseBtn.textContent = '⏸️ PAUSE';
    
    gameLoop();
}

// Pause game
function pauseGame() {
    if (gameState === 'paused') {
        gameState = 'playing';
        pauseBtn.textContent = '⏸️ PAUSE';
    } else if (gameState === 'playing') {
        gameState = 'paused';
        pauseBtn.textContent = '▶️ RESUME';
    }
    gameLoop();
}

// End game
function endGame() {
    gameState = 'gameOver';
    pauseBtn.style.display = 'none';
    startBtn.style.display = 'inline-block';
    startBtn.textContent = '▶️ RESTART GAME';
}

// Event listeners for game buttons
startBtn.addEventListener('click', startGame);
pauseBtn.addEventListener('click', pauseGame);

// Initialize high score display
updateHighScore();
