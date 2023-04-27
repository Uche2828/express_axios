const axios = require("axios");
const express = require("express");

const PORT = process.env.PORT;
const API_KEY = process.env.API_KEY;


const app = express();


app.get("/", async (req, res) => {
    const joke = await fetchJoke();
    res.json(joke);
});


app.listen(PORT, () => {
    console.log("Started server by ", PORT);
});


async function fetchJoke() {
    const options = {
        method: 'GET',
        url: 'https://dad-jokes.p.rapidapi.com/random/joke',
        headers: {
            'content-type': 'application/octet-stream',
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': 'dad-jokes.p.rapidapi.com'
        }
    };

    const response = await axios.request(options);
    const joke = response.data.body[0];

    return {
        type: joke.type,
        setup: joke.setup,
        punchline: joke.punchline,
        shareableLink: joke.shareableLink,
    }
}
