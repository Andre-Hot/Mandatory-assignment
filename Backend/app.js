import express, { response } from "express";

const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;
app.use(cors());

app.get("/api", (req, res) => {
    console.log("Http Get request received");
})

app.post("/api", (req, res) => {
  console.log("Http  request received");
});

app.put("/api", (req, res) => {
  console.log("Http Get request received");
});

app.delete("/api", (req, res) => {
  console.log("Http Get request received");
});

app.listen(port, () => {
    console.log(`App running on  + ${port}`);
});


app.get("/artist/:id", async (request, response) => {
    const id = Number(request.params.id);
    const artist = await readArtists();
    const result = artists.find(artist => artist.id === id);
    console.log(result);

    if (!result) {
        response.status(404).json({ error: "Artist not found" });
    } else {
        response.json(result);
    }
});

app.post("/artist", async (request, response) => {
    const newArtist = {
        id: new Date().getTime(),
        ...request.body
    };
})
