document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.getElementById('calculate-btn');
    calculateBtn.addEventListener('click', calculateEmissions);
    
    calculateEmissions();
});

function calculateEmissions() {
    const B_coal = parseFloat(document.getElementById("coal-amount").value) || 0;
    const B_mazut = parseFloat(document.getElementById("mazut-amount").value) || 0;
    const B_gas = parseFloat(document.getElementById("gas-amount").value) || 0;

    const Qr_coal = 20.47;
    const Qr_mazut = 39.48;
    const Qr_gas = 33.08;

    const k_tv_coal = 150;
    const k_tv_mazut = 0.57;
    const k_tv_gas = 0;

    const E_coal = 1e-6 * k_tv_coal * Qr_coal * B_coal;
    const E_mazut = 1e-6 * k_tv_mazut * Qr_mazut * B_mazut;
    const E_gas = 1e-6 * k_tv_gas * Qr_gas * B_gas * 1000 * 0.723;

    updateResults(k_tv_coal, k_tv_mazut, k_tv_gas, E_coal, E_mazut, E_gas);
    
    animateResults();
}

function updateResults(k_tv_coal, k_tv_mazut, k_tv_gas, E_coal, E_mazut, E_gas) {
    document.getElementById('coal-emission-factor').textContent = k_tv_coal.toFixed(2);
    document.getElementById('coal-gross-emission').textContent = E_coal.toFixed(2);

    document.getElementById('mazut-emission-factor').textContent = k_tv_mazut.toFixed(2);
    document.getElementById('mazut-gross-emission').textContent = E_mazut.toFixed(2);

    document.getElementById('gas-emission-factor').textContent = k_tv_gas.toFixed(3);
    document.getElementById('gas-gross-emission').textContent = E_gas.toFixed(2);

    const totalEmissions = E_coal + E_mazut + E_gas;
    document.getElementById('total-gross-emission').textContent = totalEmissions.toFixed(2);
}

function animateResults() {
    const resultsTable = document.querySelector('.results');
    resultsTable.style.opacity = '0';
    resultsTable.style.transform = 'translateY(20px)';
    resultsTable.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    setTimeout(() => {
        resultsTable.style.opacity = '1';
        resultsTable.style.transform = 'translateY(0)';
    }, 100);
}