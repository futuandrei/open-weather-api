navigator.geolocation.getCurrentPosition(
    async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        // console.log(`Latitude: ${lat}, Longitude: ${lon}`);

        // Function to fetch API key from the backend
        const fetchApiKey = async () => {
            try {
                const response = await fetch('/api/config');
                const data = await response.json();
                return data.apiKey;
            } catch (error) {
                console.error("Error fetching API key:", error);
                return null;
            }
        };

        document.getElementById("fetch-button").addEventListener("click", async () => {
            const apiKey = await fetchApiKey();
            if (!apiKey) {
                console.error("API key is missing. Check your server.");
                return;
            }

            const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=hourly,daily&appid=${apiKey}`;

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