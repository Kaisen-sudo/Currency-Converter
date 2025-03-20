const fromCurrencySelect = document.getElementById('from-currency');
const toCurrencySelect = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const rateMessage = document.getElementById('rate-message');
const fromFlag = document.getElementById('from-flag');
const toFlag = document.getElementById('to-flag');

// Liste des devises et leurs drapeaux
const currencies = [
    { code: 'USD', flag: 'US' },
    { code: 'HTG', flag: 'HT' },
    { code: 'GBP', flag: 'GB' },
    { code: 'INR', flag: 'IN' },
    { code: 'AUD', flag: 'AU' },
    { code: 'CAD', flag: 'CA' },
    { code: 'JPY', flag: 'JP' },
    { code: 'CHF', flag: 'CH' },
    { code: 'CNY', flag: 'CN' },
    { code: 'MXN', flag: 'MX' },
    { code: 'PKR', flag: 'PK' },
    { code: 'SGD', flag: 'SG' },
    { code: 'HKD', flag: 'HK' },
    { code: 'NZD', flag: 'NZ' },
    { code: 'SEK', flag: 'SE' },
    { code: 'NOK', flag: 'NO' },
    { code: 'TRY', flag: 'TR' },
    { code: 'SAR', flag: 'SA' },
    { code: 'AED', flag: 'AE' },
    { code: 'ZAR', flag: 'ZA' },
    { code: 'BRL', flag: 'BR' },
    { code: 'RUB', flag: 'RU' },
    { code: 'THB', flag: 'TH' },
    { code: 'MYR', flag: 'MY' },
    { code: 'KRW', flag: 'KR' },
    { code: 'IDR', flag: 'ID' },
    { code: 'ILS', flag: 'IL' },
    { code: 'CLP', flag: 'CL' },
    { code: 'COP', flag: 'CO' },
    { code: 'HUF', flag: 'HU' }
];

// Remplir les menus déroulants des devises
function populateCurrencyDropdowns() {
    currencies.forEach(currency => {
        const optionFrom = document.createElement('option');
        optionFrom.value = currency.code;
        optionFrom.textContent = currency.code;
        fromCurrencySelect.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = currency.code;
        optionTo.textContent = currency.code;
        toCurrencySelect.appendChild(optionTo);
    });

    fromCurrencySelect.value = 'USD';  // Devise par défaut "From"
    toCurrencySelect.value = 'HTG';   // Devise par défaut "To"
    updateFlag('USD', 'HTG');
}

// Mettre à jour les drapeaux
function updateFlag(fromCurrency, toCurrency) {
    const from = currencies.find(c => c.code === fromCurrency);
    const to = currencies.find(c => c.code === toCurrency);
    fromFlag.src = `https://flagsapi.com/${from.flag}/flat/64.png`;
    toFlag.src = `https://flagsapi.com/${to.flag}/flat/64.png`;
}

// Récupérer le taux de change
async function fetchExchangeRate() {
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        rateMessage.textContent = 'Veuillez entrer un montant valide.';
        return;
    }

    try {
        const apiKey = 'f486682e2b94350c5d41953f'; // Remplacez par votre clé API
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`);
        const data = await response.json();

        if (data.result === 'error') {
            rateMessage.textContent = 'Échec de la récupération du taux de change.';
            return;
        }

        const rate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);

        rateMessage.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        rateMessage.textContent = 'Échec de la récupération du taux de change.';
    }
}

// Gérer la soumission du formulaire
document.getElementById('currency-form').addEventListener('submit', function(event) {
    event.preventDefault();
    fetchExchangeRate();
});

// Gérer le changement de devise
fromCurrencySelect.addEventListener('change', function() {
    updateFlag(fromCurrencySelect.value, toCurrencySelect.value);
});

toCurrencySelect.addEventListener('change', function() {
    updateFlag(fromCurrencySelect.value, toCurrencySelect.value);
});

// Initialiser les devises
populateCurrencyDropdowns();