let cookies = 0;
let cookiesPerClick = 1;
let cookiesPerSecond = 0;

const cookieBtn = document.getElementById('cookie-btn');
const cookieCountDisplay = document.getElementById('cookie-count');
const upgradeClickBtn = document.getElementById('upgrade-click');
const upgradeAutoBtn = document.getElementById('upgrade-auto');

cookieBtn.addEventListener('click', () => {
    cookies += cookiesPerClick;
    updateCookieCount();
});

upgradeClickBtn.addEventListener('click', () => {
    const cost = parseInt(upgradeClickBtn.getAttribute('data-cost'));
    if (cookies >= cost) {
        cookies -= cost;
        cookiesPerClick++;
        upgradeClickBtn.setAttribute('data-cost', cost * 2);
        upgradeClickBtn.textContent = `Upgrade Click (+${cookiesPerClick} per click) - ${cost * 2} cookies`;
        updateCookieCount();
    }
});

upgradeAutoBtn.addEventListener('click', () => {
    const cost = parseInt(upgradeAutoBtn.getAttribute('data-cost'));
    if (cookies >= cost) {
        cookies -= cost;
        cookiesPerSecond++;
        upgradeAutoBtn.setAttribute('data-cost', cost * 2);
        upgradeAutoBtn.textContent = `Auto Clicker (${cookiesPerSecond} cookie per second) - ${cost * 2} cookies`;
        updateCookieCount();
    }
});

function updateCookieCount() {
    cookieCountDisplay.textContent = cookies;
}

function autoClick() {
    cookies += cookiesPerSecond;
    updateCookieCount();
}

setInterval(autoClick, 1000);
