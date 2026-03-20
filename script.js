// Remove Loader on Window Load
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }, 1000);
});

// Elements
const enterBtn = document.getElementById('enter-btn');
const welcomeScreen = document.getElementById('welcome-screen');
const mainScreen = document.getElementById('main-screen');
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const shareBtn = document.getElementById('share-btn');

// Text for Typing Animation
const messageText = "Aaj ka din sirf khushi ka nahi,\nbalki duaon ka bhi hai...\nAllah aapki zindagi ko\nnoor se bhar de 🤲💫";
let charIndex = 0;

// Typing Animation Function
function typeWriter() {
    if (charIndex < messageText.length) {
        let char = messageText.charAt(charIndex);
        // Handle line breaks
        if(char === '\n') {
            document.getElementById('typing-text').innerHTML += '<br>';
        } else {
            document.getElementById('typing-text').innerHTML += char;
        }
        charIndex++;
        setTimeout(typeWriter, 50); // Speed of typing
    }
}

// Enter Button Click Event
enterBtn.addEventListener('click', () => {
    // 1. Play Music
    bgMusic.play().catch(error => console.log("Audio playback failed:", error));
    
    // 2. Hide Welcome, Show Main Content
    welcomeScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');

    // 3. Trigger Animations & Effects
    createConfetti();
    startFloatingElements();
    
    // Delay typing effect slightly for smooth transition
    setTimeout(typeWriter, 1000);
});

// Music Toggle Logic
musicToggle.addEventListener('click', () => {
    const icon = musicToggle.querySelector('i');
    if (bgMusic.paused) {
        bgMusic.play();
        icon.className = 'fas fa-volume-up';
    } else {
        bgMusic.pause();
        icon.className = 'fas fa-volume-mute';
    }
});

// Web Share API Logic
shareBtn.addEventListener('click', async () => {
    const shareData = {
        title: '🌙 Eid Mubarak!',
        text: 'Aapko meri taraf se Eid Mubarak! Is khubsurat link ko open karein ✨',
        url: window.location.href
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.log('Error sharing:', err);
        }
    } else {
        // Fallback for browsers that don't support Web Share API
        alert("Link Copied! You can now paste and send it to your friends.");
        navigator.clipboard.writeText(window.location.href);
    }
});

// Confetti Generator (Pure JS)
function createConfetti() {
    const colors = ['#fbbf24', '#fcd34d', '#10b981', '#ffffff'];
    for (let i = 0; i < 100; i++) {
        let confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Random styling
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 8 + 4 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        
        // Random animation duration and delay
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        
        document.body.appendChild(confetti);

        // Remove from DOM after animation
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Floating Stars & Hearts Generator
function startFloatingElements() {
    const elements = ['✨', '🌙', '🤍', '⭐'];
    const container = document.getElementById('floating-elements');

    setInterval(() => {
        let el = document.createElement('div');
        el.classList.add('floating-icon');
        el.innerText = elements[Math.floor(Math.random() * elements.length)];
        
        el.style.left = Math.random() * 100 + 'vw';
        el.style.fontSize = Math.random() * 1.5 + 0.8 + 'rem';
        el.style.animationDuration = Math.random() * 5 + 5 + 's'; // 5s to 10s
        
        container.appendChild(el);

        // Cleanup
        setTimeout(() => el.remove(), 10000);
    }, 600); // Create new element every 600ms
}
