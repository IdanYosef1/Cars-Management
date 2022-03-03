const express = require('express'); 
const path = require('path');
const app = express();
const connectDB = require('./Config/database');
const cors = require('cors');
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
connectDB();

// Your static site folder name
const routerCars = require('./Routes/cars');
app.use('/api/cars', routerCars);
app.use(express.static("Client"));


app.use('/', function(req,res){
    res.sendFile(path.join(__dirname+'../Client/index.html'));
  });

app.listen(port, () => {
    console.log("server is running on " + port);
})