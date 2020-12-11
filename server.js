var app = require('express')();
var http = require('http').createServer(app);
//var io = require('socket.io')(http);
const cors = require('cors');
var logger = require('morgan');
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser");
//for database
const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });
app.use(cors(corsOptions));
var corsOptions = {
    origin:"http://localhost:8081"
};
app.use(logger('dev'));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const io=require('socket.io')(http, {
    cors:{
        credentials:true
    }
})
app.get("/home", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
  });
io.on("connection", (socket)=>{
      console.log('Online');

      socket.on('canvas-data', (data) => {
            socket.broadcast.emit('canvas-data', data);
   })
})

var server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
app.listen(server_port, ()=>{
    console.log("Server started on: "+server_port);
})
//for collaboration
var port = process.env.PORT || 8081;
http.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});


require("./app/routes/routes")(app);
app.use(fileUpload());

// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/ui/whiteboard-collab/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});
module.exports=app;