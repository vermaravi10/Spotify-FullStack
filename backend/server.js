const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

const albumSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: String,
    desc: String,
    bgColor: String
});
const Album = mongoose.model('Album', albumSchema);

// POST request to add a new album
app.post('/albums', async (req, res) => {
    const album = new Album(req.body);
    try {
        const newAlbum = await album.save();
        res.status(201).json(newAlbum);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET request to fetch all albums
app.get('/albums', async (req, res) => {
    try {
        const albums = await Album.find();
        res.json(albums);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET request to fetch a specific album by ID
app.get('/albums/:id', async (req, res) => {
    try {
        const album = await Album.findById(req.params.id);
        if (album) {
            res.json(album);
        } else {
            res.status(404).json({ message: 'Album not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




// Artist Schema and Model
const artistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: Date,
    bio: String
});
const Artist = mongoose.model('Artist', artistSchema);

// Song Schema and Model
const songSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dateOfRelease: Date,
    coverImage: String,
    artists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Artist' }],
    ratings: [{ type: Number }]
});
const Song = mongoose.model('Song', songSchema);

// POST request to add a new artist
app.post('/artists', async (req, res) => {
    const artist = new Artist(req.body);
    try {
        const newArtist = await artist.save();
        res.status(201).json(newArtist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET request to fetch all artists
app.get('/artists', async (req, res) => {
    try {
        const artists = await Artist.find();
        res.json(artists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST request to add a new song
app.post('/songs', async (req, res) => {
    const song = new Song({
        ...req.body,
        artists: req.body.artists.map(id => mongoose.Types.ObjectId(id))
    });
    try {
        const newSong = await song.save();
        res.status(201).json(newSong);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// GET request to fetch all songs
app.get('/songs', async (req, res) => {
    try {
        const songs = await Song.find().populate('artists');
        res.json(songs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST request to rate a song
app.post('/songs/:songId/rate', async (req, res) => {
    const { rating } = req.body;
    const { songId } = req.params;
    try {
        const song = await Song.findById(songId);
        if (song) {
            song.ratings.push(rating);
            await song.save();
            res.status(201).json(song);
        } else {
            res.status(404).json({ message: 'Song not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to the Spotify Clone API!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
