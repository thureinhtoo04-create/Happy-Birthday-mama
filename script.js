function triggerSurprise() {
    // Create floating hearts
    for (let i = 0; i < 30; i++) {
        createHeart();
    }
    
    // Play celebration sound effect (optional)
    playSound();
    
    // Trigger confetti
    createConfetti();
}

function createHeart() {
    const heartsContainer = document.getElementById('hearts');
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤️';
    
    const randomX = Math.random() * window.innerWidth;
    const randomDelay = Math.random() * 0.3;
    
    heart.style.left = randomX + 'px';
    heart.style.bottom = '-50px';
    heart.style.animationDelay = randomDelay + 's';
    
    heartsContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 2300);
}

function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#ffd93d', '#6bcf7f', '#c77dff'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '999';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        const duration = 2 + Math.random() * 1;
        const horizontalDistance = (Math.random() - 0.5) * 200;
        
        confetti.animate([
            {
                transform: 'translateY(0) translateX(0) rotate(0deg)',
                opacity: 1
            },
            {
                transform: `translateY(${window.innerHeight}px) translateX(${horizontalDistance}px) rotate(360deg)`,
                opacity: 0
            }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}

function playSound() {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    const notes = [523, 587, 659]; // C5, D5, E5
    
    notes.forEach((note, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = note;
        oscillator.type = 'sine';
        
        const startTime = audioContext.currentTime + (index * 0.1);
        gainNode.gain.setValueAtTime(0.3, startTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + 0.1);
    });
}

// Automatically create hearts on page load
window.addEventListener('load', () => {
    // Optional: Create initial decorative hearts
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 500);
    }
});