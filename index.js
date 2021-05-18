require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = process.env.port || 3001;

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running");
});

app.post("/tvsearch", async (req, res) => {
  const { query } = req.body;

  try {
    const tvResponse = await axios.get(
      `https://api.themoviedb.org/3/search/tv?api_key=${process.env.TMDB_KEY}&language=en-US&query=${query}`
    );

    res.json(tvResponse.data);
  } catch (error) {
    res.send(error);
  }
});
app.post("/moviesearch", async (req, res) => {
  const { query } = req.body;

  try {
    const movieResponse = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_KEY}&language=en-US&query=${query}`
    );

    res.json(movieResponse.data);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
