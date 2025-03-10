document.getElementById('submit-button').addEventListener('click', fetchCountryInfo);

async function fetchCountryInfo() {
    const countryName = document.getElementById('country-input').value.trim();
    
    if (!countryName) {
        alert('Please enter a country name');
        return;
    }

    try {
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        const data = await response.json();

        if (data.status === 404) {
            alert('Country not found!');
            return;
        }

        const country = data[0];
        
        // Update country info
        document.getElementById('capital').textContent = country.capital ? country.capital[0] : 'N/A';
        document.getElementById('population').textContent = country.population.toLocaleString();
        document.getElementById('region').textContent = country.region;
        document.getElementById('flag').src = country.flags.svg;

        // Update bordering countries
        const borderingCountries = country.borders || [];
        const borderingList = document.getElementById('bordering-list');
        borderingList.innerHTML = ''; // Clear previous list
        
        borderingCountries.forEach(async (borderCode) => {
            const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`);
            const borderData = await borderResponse.json();
            const borderCountry = borderData[0];

            const listItem = document.createElement('li');
            listItem.innerHTML = `${borderCountry.name.common}: <img src="${borderCountry.flags.svg}" alt="${borderCountry.name.common} Flag" width="30">`;
            borderingList.appendChild(listItem);
        });

    } catch (error) {
        alert('An error occurred while fetching country data');
    }
}
