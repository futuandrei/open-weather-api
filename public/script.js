navigator.geolocation.getCurrentPosition(
    async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // console.log(`Latitude: ${lat}, Longitude: ${lon}`);

        document.getElementById("fetch-button").addEventListener("click", async () => {

            const apiKey = '26991474c599204a4c3563a41548edb4'; // Replace with your actual API key

            const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&units=metric&exclude=hourly,daily&appid=${apiKey}`;

            // console.log(apiKey.data);

            try {
                const response = await fetch(url);
                const data = await response.json();
                console.log("Wind: " + data.current.wind_speed);
                console.log(data);
                const textContainer = document.getElementById("text-container");
                textContainer.innerHTML =
                    `<li>Timezone: ${data.timezone}</li>
                    <li>Temperature: ${data.current.temp}</li>
                    <li>Wind: ${data.current.wind_speed}</li>`;
            } catch (error) {
                console.error("Error fetching the image:", error);
            }
        },
            (error) => {
                console.error("Error getting geolocation:", error);
            }
        )
    });