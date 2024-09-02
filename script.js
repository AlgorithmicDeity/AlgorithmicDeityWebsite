document.addEventListener("DOMContentLoaded", function() {
    const twitchUsername = "algorithmicdeity";
    const twitchScheduleText = document.querySelector('.twitch-schedule-text p');

    fetch(`https://api.twitch.tv/helix/users?login=${twitchUsername}`, {
        headers: {
            'Client-ID': 'et9nzxm550p9y646e9swrp85uccvii', // Replace with your Twitch Client ID
            'Authorization': 'Bearer whepw03x900dl7pge6s7wwuhllo0uu' // Replace with your Twitch Access Token
        }
    })
    .then(response => response.json())
    .then(userData => {
        const broadcasterId = userData.data[0].id; // Extract broadcaster ID
        return fetch(`https://api.twitch.tv/helix/schedule?broadcaster_id=${broadcasterId}`, {
            headers: {
                'Client-ID': 'et9nzxm550p9y646e9swrp85uccvii',
                'Authorization': 'Bearer whepw03x900dl7pge6s7wwuhllo0uu'
            }
        });
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Twitch API responded with status ${response.status}`);
        }
        return response.json();
    })
    .then(scheduleData => {
        console.log(scheduleData); // Log the full response to debug
        if (scheduleData.data.segments && scheduleData.data.segments.length > 0) {
            const nextStream = scheduleData.data.segments[0];
            const startTime = new Date(nextStream.start_time);
            const title = nextStream.title;

            twitchScheduleText.innerHTML = `
                Next Stream: ${startTime.toLocaleString()} <br>
                ${title}
            `;
        } else {
            twitchScheduleText.innerHTML = "No upcoming streams scheduled.";
        }
    })
    .catch(error => {
        console.error("Error fetching Twitch schedule:", error);
        twitchScheduleText.innerHTML = "Unable to fetch Twitch schedule.";
    });
});

window.onscroll = function() {
    const navbar = document.querySelector('nav.navbar');
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        navbar.classList.add('shrink');
    } else {
        navbar.classList.remove('shrink');
    }
};
