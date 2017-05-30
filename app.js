const express    = require('express'),
      path       = require('path'),
      bodyParser = require('body-parser'),
      cors       = require('cors'),
      passport   = require('passport'),
      mongoose   = require('mongoose');

const config = require('./config/database');

// Connect to database
mongoose.connect(config.database);
// Connection message
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+ config.database);
});
mongoose.connection.on('error', (err) => {
    console.log('Database error: '+ err);
});

const app = express();

const users = require('./routes/users');

// Port Number
const port = process.env.PORT || 8080;

// CORS
app.use(cors());
// Set static folder
app.use(express.static(path.join(__dirname, 'public')));
// body parser
app.use(bodyParser.json());
// passport config
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Some Text Endpoint Invalid');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, () => {
    console.log('Server started on port: ' + port);
});
