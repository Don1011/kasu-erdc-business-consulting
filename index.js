const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const auth = require("./routes/auth.js");
const admin = require("./routes/admin.js");
const client = require("./routes/client.js");
const misc = require("./routes/misc.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('', auth)
app.use('', admin)
app.use('', client)
app.use('', misc)

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})


// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('./frontend/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    })
}



const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server running on ${IP_ADDRESS}:${port}`);
})