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

app.listen(PORT, () => {
  console.log('Listen to Port to 3000');
});
