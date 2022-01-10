const express = require('express');
const compression = require('compression');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());
app.use(compression());

if (process.env.NODE_ENV == "prod") {
    require("dotenv").config({ path: ".env.prd" });
} else if (process.env.NODE_ENV == "dev") {
    require("dotenv").config({ path: ".env.dev" });
} else {
    require("dotenv").config({ path: ".env.dev" });
} 

// Connect To Database 
mongoose.connect(process.env.DB_URI, 
    {   
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }
);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('📦 Tigre connected to DB ' + process.env.DB_HOST)
});

// On Error
mongoose.connection.on('error', (err) => {
    console.log('📦 Tigre DB connection error ' + process.env.DB_HOST)
});

const users = require('./routes/users');

const port = process.env.PORT || 8080;

const corsOptions = {
    origin: JSON.parse(process.env.CORS),
    credentials: true,
}

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname,'public_html')));

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', parameterLimit: 50000, extended: true}));

app.use(`/api/${process.env.NODE_ENV}/users`, users);

// Index Route
app.get('/', (_req, res) => {
    res.send('Method not allowed');
})

app.get("*",(_req,res) => {
    res.sendFile(path.join(__dirname, 'public_html/index.html'));
})

app.listen(port, () => {
    console.log(`💻 Tigre running on env ->`, process.env.NODE_ENV);
    console.log(`🚀 Tigre running on port http://localhost:${port}`);
}); 


