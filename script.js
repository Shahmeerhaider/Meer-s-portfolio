// ============================================
// PARTICLE SYSTEM
// ============================================

function createParticles() {
  const particleCount = 80;
  for (let i = 0; i < particleCount; i++) {
    let particle = document.createElement('div');
    particle.classList.add('particle');
    let size = Math.random() * 4 + 1;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.position = 'fixed';
    particle.style.background = 'radial-gradient(circle, #00f2ff, #a855f7)';
    particle.style.borderRadius = '50%';
    particle.style.opacity = '0.25';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '-1';
    particle.style.filter = 'blur(1px)';
    particle.style.animation = `floatParticle ${Math.random() * 12 + 6}s infinite ease-in-out`;
    particle.style.animationDelay = Math.random() * 5 + 's';
    document.body.appendChild(particle);
  }
}

const particleStyle = document.createElement('style');
particleStyle.textContent = `
  @keyframes floatParticle {
    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
    50% { transform: translateY(-40px) translateX(25px); opacity: 0.55; }
  }
`;
document.head.appendChild(particleStyle);
createParticles();

// ============================================
// SKILL BARS
// ============================================

function animateSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  bars.forEach(bar => {
    const width = bar.getAttribute('data-width');
    if (width) {
      bar.style.width = width + '%';
    }
  });
}

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateSkillBars();
      skillObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const skillsContainer = document.querySelector('.skills-container');
if (skillsContainer) skillObserver.observe(skillsContainer);

setTimeout(() => animateSkillBars(), 500);

// ============================================
// TERMINAL
// ============================================

const termOutput = document.getElementById('termOutput');
const termInput = document.getElementById('termInput');

function addTermLine(text, isError = false) {
  const line = document.createElement('div');
  line.className = 'term-line';
  line.style.color = isError ? '#ff88bb' : '#88f7ff';
  line.innerHTML = `> ${text}`;
  termOutput.appendChild(line);
  termOutput.scrollTop = termOutput.scrollHeight;
}

function processCommand(cmd) {
  const lower = cmd.toLowerCase().trim();
  
  if (lower === 'help') {
    addTermLine('Available: about | skills | projects | github | clear');
  } 
  else if (lower === 'about') {
    addTermLine('Shahmeer Haider - Software Engineer specializing in C++, DSA, and Algorithm Design.');
  }
  else if (lower === 'skills') {
    addTermLine('C++/DSA: 92% | Algorithms: 88% | JavaScript: 82%');
    addTermLine('Python: 78% | Web Dev: 80% | System Design: 75%');
  }
  else if (lower === 'projects') {
    addTermLine('1. Mini Insta DSA - Social graph implementation');
    addTermLine('2. Dynamic Pathfinding Agent - A* & Dijkstra visualizer');
    addTermLine('3. TicTacToe Security Demo - Secure game design');
  }
  else if (lower === 'github') {
    addTermLine('Mini Insta: https://github.com/Shahmeerhaider/Mini-insta-DSA-project');
    addTermLine('Pathfinding: https://github.com/Shahmeerhaider/Dynamic-Pathfinding-Agent');
    addTermLine('TicTacToe: https://github.com/Shahmeerhaider/tictactoe-security-demo');
  }
  else if (lower === 'clear') {
    termOutput.innerHTML = '';
    addTermLine('Terminal cleared. Type "help" for commands.');
  }
  else if (lower !== '') {
    addTermLine(`Unknown: "${cmd}". Try "help" for commands.`, true);
  }
}

if (termInput) {
  termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = termInput.value;
      if (val.trim() !== '') {
        addTermLine(`$ ${val}`);
        processCommand(val);
      }
      termInput.value = '';
    }
  });
}

// ============================================
// SCROLL REVEAL
// ============================================

function setupScrollReveal() {
  const revealElements = document.querySelectorAll('.project-card, .skill-item, .soft-skill, .terminal-section');
  revealElements.forEach(el => el.classList.add('reveal-on-scroll'));
  
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  
  revealElements.forEach(el => scrollObserver.observe(el));
}

// ============================================
// CARD GLOW ROTATION
// ============================================

function continuousCardGlow() {
  const cards = document.querySelectorAll('.project-card');
  if (cards.length === 0) return;
  
  let index = 0;
  setInterval(() => {
    cards.forEach((card, i) => {
      if (i === index) {
        card.style.borderColor = '#00f2ff';
        card.style.boxShadow = '0 0 30px rgba(0, 242, 255, 0.4)';
      } else {
        card.style.borderColor = '#00f2ff44';
        card.style.boxShadow = 'none';
      }
    });
    index = (index + 1) % cards.length;
  }, 3000);
}

// ============================================
// TYPEWRITER EFFECT
// ============================================

function typewriterEffect() {
  const tagline = document.querySelector('.tagline');
  if (!tagline) return;
  
  const originalText = tagline.textContent;
  tagline.textContent = '';
  let i = 0;
  
  const interval = setInterval(() => {
    if (i < originalText.length) {
      tagline.textContent += originalText[i];
      i++;
    } else {
      clearInterval(interval);
    }
  }, 50);
}

// ============================================
// INITIALIZE ALL
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  setupScrollReveal();
  continuousCardGlow();
  typewriterEffect();
});

setTimeout(() => {
  if (typeof addTermLine === 'function') {
    addTermLine('> Interactive terminal ready.');
    addTermLine('> Commands: help, about, skills, projects, github, clear');
  }
}, 500);    addTermLine(`Unknown: "${cmd}". Try 'help' for commands.`, true);
  }
}

termInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const val = termInput.value;
    if (val.trim() !== '') {
      addTermLine(`$ ${val}`);
      processCommand(val);
    }
    termInput.value = '';
  }
});

// Welcome message
setTimeout(() => {
  addTermLine('> Interactive terminal ready.');
  addTermLine('> Commands: help, about, skills, projects, github, clear');
}, 500);
