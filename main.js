
/**
 * FuturisticRobot Web Component
 */
class FuturisticRobot extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    height: 100%;
                    position: relative;
                }
                svg {
                    width: 100%;
                    height: 100%;
                    filter: drop-shadow(0 0 25px var(--robot-glow));
                    transition: filter var(--transition-speed);
                }
                .robot-body {
                    fill: var(--robot-metal);
                    stroke: var(--text-color);
                    stroke-width: 1;
                    transition: fill var(--transition-speed);
                }
                .robot-accent {
                    fill: var(--robot-accent);
                    filter: blur(2px);
                    transition: fill var(--transition-speed);
                }
                .eye {
                    fill: #fff;
                    filter: drop-shadow(0 0 8px var(--accent-glow));
                    animation: blink 4s infinite;
                }
                .floating {
                    animation: float 3s ease-in-out infinite;
                }
                .head {
                    animation: headMove 5s ease-in-out infinite;
                    transform-origin: center 150px;
                }
                .arm-left {
                    animation: armMove 4s ease-in-out infinite;
                    transform-origin: 220px 200px;
                }
                .arm-right {
                    animation: armMove 4s ease-in-out infinite reverse;
                    transform-origin: 80px 200px;
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-15px); }
                }
                @keyframes blink {
                    0%, 90%, 100% { transform: scaleY(1); }
                    95% { transform: scaleY(0.1); }
                }
                @keyframes headMove {
                    0%, 100% { transform: rotate(0deg); }
                    50% { transform: rotate(5deg) translateY(-5px); }
                }
                @keyframes armMove {
                    0%, 100% { transform: rotate(-5deg); }
                    50% { transform: rotate(5deg); }
                }
            </style>
            <svg viewBox="0 0 300 450" xmlns="http://www.w3.org/2000/svg">
                <!-- Floating Base Effects -->
                <ellipse cx="150" cy="420" rx="60" ry="15" fill="rgba(0,0,0,0.2)" filter="blur(10px)" class="floating" />
                
                <g class="floating">
                    <!-- Legs/Base -->
                    <path d="M120 350 L100 400 L140 400 L150 380 L160 400 L200 400 L180 350 Z" class="robot-body" />
                    
                    <!-- Torso -->
                    <rect x="90" y="200" width="120" height="150" rx="20" class="robot-body" />
                    
                    <!-- Arms -->
                    <g class="arm-left">
                        <rect x="210" y="210" width="20" height="100" rx="10" class="robot-body" />
                        <circle cx="220" cy="320" r="15" class="robot-body" />
                    </g>
                    <g class="arm-right">
                        <rect x="70" y="210" width="20" height="100" rx="10" class="robot-body" />
                        <circle cx="80" cy="320" r="15" class="robot-body" />
                    </g>
                    
                    <!-- Head -->
                    <g class="head">
                        <path d="M100 100 Q100 60 150 60 Q200 60 200 100 L200 180 Q200 200 150 200 Q100 200 100 180 Z" class="robot-body" />
                        <!-- Eyes -->
                        <circle cx="130" cy="130" r="8" class="eye" />
                        <circle cx="170" cy="130" r="8" class="eye" />
                        <!-- Antenna -->
                        <line x1="150" y1="60" x2="150" y2="30" stroke="var(--text-color)" stroke-width="3" />
                        <circle cx="150" cy="30" r="5" class="core" />
                    </g>
                </g>
            </svg>
        `;
    }
}

customElements.define('futuristic-robot', FuturisticRobot);

/**
 * ThemeSwitcher Web Component
 * Toggles between light and dark themes and persists preference.
 */
class ThemeSwitcher extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.applyTheme();
        this.render();
    }

    applyTheme() {
        if (this.currentTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem('theme', this.currentTheme);
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        this.render();
    }

    render() {
        const icon = this.currentTheme === 'light' 
            ? `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>` // Moon
            : `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`; // Sun

        this.shadowRoot.innerHTML = `
            <style>
                button {
                    width: 52px;
                    height: 52px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 2px solid var(--text-color);
                    clip-path: polygon(20% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%, 0% 20%);
                    background: var(--metal-gradient);
                    color: var(--text-color);
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
                    padding: 0;
                    box-shadow: var(--metal-shadow);
                }
                button:hover {
                    transform: scale(1.1);
                    box-shadow: var(--accent-glow);
                    filter: brightness(1.2);
                }
                button:active {
                    transform: scale(0.9);
                }
            </style>
            <button aria-label="Toggle Theme">${icon}</button>
        `;
        this.shadowRoot.querySelector('button').addEventListener('click', () => this.toggleTheme());
    }
}

customElements.define('theme-switcher', ThemeSwitcher);

/**
 * TotoGenerator Web Component
 */
class TotoGenerator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    generateNumbers() {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 49) + 1);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    }

    render() {
        const numbers = this.generateNumbers();
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 3rem;
                    background: var(--card-bg);
                    border: var(--card-border);
                    clip-path: polygon(5% 0%, 100% 0%, 100% 95%, 95% 100%, 0% 100%, 0% 5%);
                    box-shadow: var(--card-shadow);
                    transition: all var(--transition-speed);
                    max-width: 500px;
                    width: calc(100vw - 4rem);
                    position: relative;
                }
                :host::before {
                    content: "SYSTEM_ACTIVE";
                    position: absolute;
                    top: 10px;
                    left: 40px;
                    font-size: 0.6rem;
                    font-family: monospace;
                    opacity: 0.5;
                    letter-spacing: 2px;
                }
                .toto-title {
                    text-align: center;
                    margin-top: 1rem;
                    margin-bottom: 2.5rem;
                    font-size: 2rem;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 4px;
                    color: var(--text-color);
                    text-shadow: 2px 2px 0px rgba(0,0,0,0.1);
                    font-family: 'Syncopate', sans-serif;
                }
                .toto-numbers {
                    display: flex;
                    justify-content: center;
                    gap: 1.25rem;
                    margin-bottom: 3rem;
                    flex-wrap: wrap;
                }
                .toto-number {
                    width: 60px;
                    height: 60px;
                    background: var(--number-bg);
                    color: var(--number-text);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5rem;
                    font-weight: 800;
                    border: var(--number-border);
                    clip-path: polygon(25% 0%, 100% 0%, 100% 75%, 75% 100%, 0% 100%, 0% 25%);
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    animation: slideIn 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards;
                    opacity: 0;
                }
                @keyframes slideIn {
                    from { transform: translateX(-20px) skewX(-10deg); opacity: 0; }
                    to { transform: translateX(0) skewX(0deg); opacity: 1; }
                }
                ${[...Array(6)].map((_, i) => `
                    .toto-number:nth-child(${i + 1}) { animation-delay: ${i * 0.12}s; }
                `).join('')}

                .toto-number:hover {
                    transform: scale(1.1) translateY(-5px);
                    box-shadow: var(--accent-glow);
                }

                .toto-button {
                    display: block;
                    width: 100%;
                    padding: 1.25rem;
                    border: none;
                    background: var(--button-gradient);
                    color: var(--button-text);
                    font-size: 1rem;
                    font-weight: 900;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    cursor: pointer;
                    clip-path: polygon(0% 0%, 95% 0%, 100% 50%, 95% 100%, 0% 100%);
                    box-shadow: var(--button-shadow);
                    transition: all 0.3s;
                }
                .toto-button:hover {
                    filter: brightness(1.2);
                    padding-left: 1.5rem;
                    box-shadow: var(--accent-glow);
                }
                .toto-button:active {
                    transform: scale(0.98);
                }
            </style>
            <h2 class="toto-title">Quantum Lotto</h2>
            <div class="toto-numbers">
                ${numbers.map(n => `<div class="toto-number">${n}</div>`).join('')}
            </div>
            <button class="toto-button">Initiate Sequence</button>
        `;

        this.shadowRoot.querySelector('.toto-button').addEventListener('click', () => this.render());
    }
}

customElements.define('toto-generator', TotoGenerator);
