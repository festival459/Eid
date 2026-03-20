// 1. Extract Name from URL (Agar kisi dost ne bheja ho)
const urlParams = new URLSearchParams(window.location.search);
const senderName = urlParams.get('name');

if (senderName) {
    // XSS Protection ke liye naam ko clean karna
    const cleanName = senderName.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    
    // Welcome Screen Title Update
    document.getElementById('welcome-title').innerHTML = 
        `🌙 Eid Surprise From<br><span class="sender-name-welcome">${cleanName}</span> 🎁`;
    
    // Main Screen Title Update
    document.getElementById('main-title').innerHTML = 
        `🌙✨ Eid Mubarak ✨🌙<br><span class="sender-name-main">Sent by: ${cleanName}</span>`;
}

// 2. Remove Loader on Window Load
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
const whatsappBtn = document.getElementById('whatsapp-btn');

// Text for Typing Animation
const messageText = "Aaj ka din sirf khushi ka nahi,\nbalki duaon ka bhi hai...\nAllah aapki zindagi ko\nnoor se bhar de 🤲💫";
let charIndex = 0;

function typeWriter() {
    if (charIndex < messageText.length) {
        let char = messageText.charAt(charIndex);
        if(char === '\n') {
            document.getElementById('typing-text').innerHTML += '<br>';
        } else {
            document.getElementById('typing-text').innerHTML += char;
        }
        charIndex++;
        setTimeout(typeWriter, 50);
    }
}

// Enter Button Click Event
enterBtn.addEventListener('click', () => {
    bgMusic.play().catch(error => console.log("Audio playback failed:", error));
    welcomeScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
    createConfetti();
    startFloatingElements();
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

// ---------------------------------------------------------
// 🔥 WHATSAPP SHARE LOGIC (Name Prompt & Custom URL)
// ---------------------------------------------------------
whatsappBtn.addEventListener('click', () => {
    // Step 1: User se uska naam poochna
    let userName = prompt("Doston ko bhejne ke liye apna naam likhein (Enter your name):");
    
    if (userName && userName.trim() !== "") {
        let encodedName = encodeURIComponent(userName.trim());
        
        // Step 2: Custom link generate karna (Puraane query params hata kar)
        let baseUrl = window.location.origin + window.location.pathname;
        let shareLink = baseUrl + "?name=" + encodedName;
        
        // Step 3: WhatsApp ke liye message banana
        let whatsappMessage = `🌙 *${userName.trim()}* ne aapke liye ek khubsurat Eid surprise bheja hai! 🎁✨\n\nJaldi is link par click karke dekhein: 👇\n${shareLink}`;
        
        // Step 4: WhatsApp par redirect karna
        let whatsappApiUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Link ko naye tab ya whatsapp app me open karna
        window.location.href = whatsappApiUrl;
    } else {
        alert("Naam likhna zaroori hai tabhi aapke doston ko pata chalega ki kisne bheja hai! 😊");
    }
});

// Confetti Generator
function createConfetti() {
    const colors = ['#fbbf24', '#fcd34d', '#10b981', '#ffffff'];
    for (let i = 0; i < 100; i++) {
        let confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = Math.random() * 8 + 4 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Floating Elements Generator
function startFloatingElements() {
    const elements = ['✨', '🌙', '🤍', '⭐'];
    const container = document.getElementById('floating-elements');
    setInterval(() => {
        let el = document.createElement('div');
        el.classList.add('floating-icon');
        el.innerText = elements[Math.floor(Math.random() * elements.length)];
        el.style.left = Math.random() * 100 + 'vw';
        el.style.fontSize = Math.random() * 1.5 + 0.8 + 'rem';
        el.style.animationDuration = Math.random() * 5 + 5 + 's';
        container.appendChild(el);
        setTimeout(() => el.remove(), 10000);
    }, 600);
}

// ---------------------------------------------------------
// ⏳ COUNTDOWN TIMER LOGIC
// ---------------------------------------------------------
// 👉 YAHAN DATE CHANGE KAREIN: 'Month DD, YYYY 00:00:00'
const eidDate = new Date('April 10, 2024 00:00:00').getTime(); 
let isEidAnnounced = false;

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eidDate - now;

    if (distance <= 0) {
        document.getElementById('countdown-timer').style.display = 'none';
        document.getElementById('countdown-title').style.display = 'none';
        document.getElementById('eid-arrived-msg').style.display = 'block';
        if(!isEidAnnounced) {
            createConfetti();
            isEidAnnounced = true;
        }
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = days < 10 ? '0' + days : days;
    document.getElementById('hours').innerText = hours < 10 ? '0' + hours : hours;
    document.getElementById('minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();
