const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = 8000;



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}));

app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/teamdb")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(error => {
    console.error("MongoDB connection error:", error);
  });
  
  
// Team model
const teamSchema = new mongoose.Schema({
  teamName: String,
  totalGamesPlayed: Number,
  score: Number,
  image: String
});
const Team = mongoose.model('Team', teamSchema);
app.post('/sendData', async (req, res) => {
    try {
       const receivedData = req.body;
        for (const teamData of receivedData) {
        
        const team = new Team(teamData);
         await team.save();
      }
  
      console.log('Data saved to the database:', receivedData);
      res.send('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).send('Error saving data');
    }
  });
  app.post('/getData', async (req, res) => {
    try {
    
      const teams = await Team.find();
    res.json(teams);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send('Error fetching data');
    }
  });
  
app.post('/', (req, res) => {
    res.send('Received a POST request on the root endpoint');
  });
  
  
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
