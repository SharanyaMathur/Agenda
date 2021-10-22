const mongoose = require("mongoose");
const express = require("express");
const UserX = require('./models/Post');
const bodyParser = require('body-parser');
const Agenda = require('agenda');

const agenda = new Agenda();
const app = express();

app.use(bodyParser.json());
// app.get('/', async (req, res) => {
//     console.log(res.json(UserX.find()));
// });

const postsRoute = require('./posts')
app.use('/posts', postsRoute);

mongoose.connect("mongodb://localhost/testagenda");
mongoose.connection.once('open', () => {console.log("connection successful");})
app.listen(3000);


let x=0;
agenda.database("localhost:27017/testagenda", "posts");
agenda.define("printReport", (job) => {

    console.log("Hi!!");
    
    UserX.find({}, (err, UserX) => {
        if(err) console.warn("!!!Warning!!!")
        console.log(UserX[x++].name);
        
        if(x==5) x=0;

        
    });
  });
  agenda.on('ready', function () {
    agenda.every('1 minute', 'printReport');
    agenda.start();
    //agenda.end();
});