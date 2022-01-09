const express = require('express');
const compression = require('compression');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./settings/settings');
const app = express();

app.use(express.json());
app.use(compression());

if (process.env.NODE_ENV == "Prd") {
    require("dotenv").config({ path: ".env.prd" });
} else if (process.env.NODE_ENV == "Dev") {
    require("dotenv").config({ path: ".env.dev" });
} else {
    require("dotenv").config({ path: ".env.dev" });
} 

// Connect To Database 
mongoose.connect(config.database, 
    {   
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }
);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('📦 Tigre connected to DB ' + config.dbHost)
});

// On Error
mongoose.connection.on('error', (err) => {
    console.log('📦 Tigre DB connection error ' + config.dbHost)
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


