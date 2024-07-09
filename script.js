let cookies = 0;
let cookiesPerClick = 1;  // Start with +1 cookie per click
let cookiesPerSecond = 0;
let totalUpgrades = 0;

const cookieBtn = document.getElementById('cookie-btn');
const cookieCountDisplay = document.getElementById('cookie-count');
const upgradeClickBtn = document.getElementById('upgrade-click');
const upgradeAutoBtn = document.getElementById('upgrade-auto');
const upgradeFactoryBtn = document.getElementById('upgrade-factory');
const upgradeBakeryBtn = document.getElementById('upgrade-bakery');
const upgradeFarmBtn = document.getElementById('upgrade-farm');
const upgradeMineBtn = document.getElementById('upgrade-mine');
const upgradeLabBtn = document.getElementById('upgrade-lab');
const upgradePortalBtn = document.getElementById('upgrade-portal');
const upgradeUniverseBtn = document.getElementById('upgrade-universe');
const upgradeGalaxyBtn = document.getElementById('upgrade-galaxy');
const upgradeDimensionBtn = document.getElementById('upgrade-dimension');
const upgradeTimeMachineBtn = document.getElementById('upgrade-time-machine');
const cookieImg = cookieBtn.querySelector('img');
const fallingCookiesContainer = document.querySelector('.falling-cookies');
const upgradesTab = document.getElementById('upgrades-tab');
const toggleUpgradesBtn = document.getElementById('toggle-upgrades');
const investingTab = document.getElementById('investing-tab');
const toggleInvestingBtn = document.getElementById('toggle-investing');

const upgradeCounts = {
    'upgrade-click': 0,
    'upgrade-auto': 0,
    'upgrade-factory': 0,
    'upgrade-bakery': 0,
    'upgrade-farm': 0,
    'upgrade-mine': 0,
    'upgrade-lab': 0,
    'upgrade-portal': 0,
    'upgrade-universe': 0,
    'upgrade-galaxy': 0,
    'upgrade-dimension': 0,
    'upgrade-time-machine': 0
};

const cookiesPerSecondValues = {
    'upgrade-auto': 2,
    'upgrade-factory': 4,
    'upgrade-bakery': 20,
    'upgrade-farm': 50,
    'upgrade-mine': 200,
    'upgrade-lab': 1000,
    'upgrade-portal': 5000,
    'upgrade-universe': 20000,
    'upgrade-galaxy': 100000,
    'upgrade-dimension': 500000,
    'upgrade-time-machine': 1000000
};

toggleUpgradesBtn.addEventListener('click', () => {
    upgradesTab.classList.toggle('open');
    toggleUpgradesBtn.classList.add('pulse');
    setTimeout(() => toggleUpgradesBtn.classList.remove('pulse'), 200);
});

toggleInvestingBtn.addEventListener('click', () => {
    if (!toggleInvestingBtn.disabled) {
        investingTab.classList.toggle('open');
        toggleInvestingBtn.classList.add('pulse');
        setTimeout(() => toggleInvestingBtn.classList.remove('pulse'), 200);
    }
});

cookieBtn.addEventListener('click', () => {
    increaseCookies(cookiesPerClick);
    pulseCookie();
    createFallingCookie(); // Ensure cookies fall when clicking from the start
});

upgradeClickBtn.addEventListener('click', () => {
    purchaseUpgrade(upgradeClickBtn, () => {
        cookiesPerClick += 1;
    });
});

upgradeAutoBtn.addEventListener('click', () => {
    purchaseUpgrade(upgradeAutoBtn, () => {
        cookiesPerSecond += cookiesPerSecondValues['upgrade-auto'];
    });
});

upgradeFactoryBtn.addEventListener('click', () => {
    purchaseUpgrade(upgradeFactoryBtn, () => {
        cookiesPerSecond += cookiesPerSecondValues['upgrade-factory'];
    });
});

upgradeBakeryBtn.addEventListener('click', () => {
    purchaseUpgrade(upgradeBakeryBtn, () => {
        cookiesPerSecond += cookiesPerSecondValues['upgrade-bakery'];
    });
});

upgradeFarmBtn.addEventListener('click', () => {
    purchaseUpgrade(upgradeFarmBtn, () => {
        cookiesPerSecond += cookiesPerSecondValues['upgrade-farm'];
    });
});

upgradeMineBtn.addEventListener('click', () => {
    purchaseUpgrade(upgradeMineBtn, () => {
        cookiesPerSecond += cookiesPerSecondValues['upgrade-mine'];
    });
});

upgradeLabBtn.addEventListener('click', () => {
    purchaseUpgrade(upgradeLabBtn, () => {
        cookiesPerSecond += cookiesPerSecondValues['upgrade-lab'];
    });
});

upgradePortalBtn.addEventListener('click', () => {
    purchaseUpgrade(upgradePortalBtn, () => {
        cookiesPerSecond += cookiesPerSecondValues['upgrade-portal'];
    });
});

upgradeUniverseBtn.addEventListener('click', () => {
    purchaseUpgrade(upgradeUniverseBtn, () => {
        cookiesPerSecond += cookiesPerSecondValues['upgrade-universe'];
    });
});

upgradeGalaxyBtn.addEventListener('click', () => {
    purchaseUpgrade(upgradeGalaxyBtn, () => {
        cookiesPerSecond += cookiesPerSecondValues['upgrade-galaxy'];
    });
});

upgradeDimensionBtn.addEventListener('click', () => {
    purchaseUpgrade(upgradeDimensionBtn, () => {
        cookiesPerSecond += cookiesPerSecondValues['upgrade-dimension'];
    });
});

upgradeTimeMachineBtn.addEventListener('click', () => {
    purchaseUpgrade(upgradeTimeMachineBtn, () => {
        cookiesPerSecond += cookiesPerSecondValues['upgrade-time-machine'];
    });
});

function increaseCookies(amount) {
    cookies += amount;
    updateCookieCount();
    if (cookies >= 100000) {
        toggleInvestingBtn.disabled = false;
        toggleInvestingBtn.style.backgroundColor = '#fff';
    }
}

function purchaseUpgrade(button, upgradeEffect) {
    const cost = parseInt(button.getAttribute('data-cost'));
    if (cookies >= cost) {
        cookies -= cost;
        totalUpgrades++;
        upgradeEffect();
        const upgradeId = button.id;
        upgradeCounts[upgradeId]++;
        document.getElementById(`${upgradeId}-count`).textContent = upgradeCounts[upgradeId];
        button.setAttribute('data-cost', Math.floor(cost * 2));
        button.textContent = `${button.textContent.split(' - ')[0]} - ${Math.floor(cost * 2)} cookies`;
        updateCookieCount();
    }
}

function updateCookieCount() {
    cookieCountDisplay.textContent = Math.floor(cookies);
}

function autoClick() {
    increaseCookies(cookiesPerSecond);
}

setInterval(autoClick, 1000);

function pulseCookie() {
    cookieImg.classList.remove('pulse');
    // Force reflow to restart the animation
    void cookieImg.offsetWidth;
    cookieImg.classList.add('pulse');
}

function createFallingCookies() {
    for (let i = 0; i < totalUpgrades; i++) {
        setTimeout(createFallingCookie, Math.random() * 2000); // Random delay up to 2 seconds
    }
}

function createFallingCookie() {
    const fallingCookie = document.createElement('img');
    fallingCookie.src = 'images/cookie.png';
    fallingCookie.className = 'falling-cookie';
    fallingCookie.style.left = Math.random() * 100 + 'vw';
    fallingCookie.style.animationDuration = Math.random() * 2 + 3 + 's'; // Random duration between 3s and 5s

    fallingCookiesContainer.appendChild(fallingCookie);

    // Remove the cookie after it falls
    fallingCookie.addEventListener('animationend', () => {
        fallingCookie.remove();
    });
}

// Continuously create falling cookies based on the total upgrades
setInterval(createFallingCookies, 1000);
