const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = '08a4cb4017d7b828777070b49caaff65';
    const city = document.querySelector('.search-box input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {

            if (json.cod === '404') {
                container.style.height = '600px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.classList.remove('fadeIn');
            error404.style.display = 'none';

            const img = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity');
            const wind = document.querySelector('.weather-details .wind');
            const faSolid = document.querySelector('.weather-details .humidity .fa-solid');

            switch (json.weather[0].main) {
                case 'Clear':
                    img.src = 'img/clear.png';
                    break;
                case 'Clouds':
                    img.src = 'img/cloud.png';
                    break;
                case 'Mist':
                    img.src = 'img/mist.png';
                    break;
                case 'Rain':
                    img.src = 'img/rain.png';
                    break;
                case 'Snow':
                    img.src = 'img/snow.png';
                    break;

                default:
                    img.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '550px';
            faSolid.style.display = 'none';

        });
});

