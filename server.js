const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

// Implementing cors
app.use(cors());

// connect to database
connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./backend/routes/authRoutes/signup')(app);
require('./backend/routes/authRoutes/login')(app);
require('./backend/routes/authRoutes/googleAuth')(app);
require('./backend/routes/profilepostsRoutes/profile')(app);
require('./backend/routes/profilepostsRoutes/post')(app);
require('./backend/routes/event')(app);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log('Listen to Port to 3000');
});

// Socket setup
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('Hey i am socket.io and it seems that i am connected');

  // Handle hello event
  socket.on('hello', (data) => {
    // console.log(data);
    io.sockets.emit('hello', data);
  });

  socket.on('changelike', (data) => {
    socket.broadcast.emit('changelike', data);
  });
});
