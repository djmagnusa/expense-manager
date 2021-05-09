const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath)); //telling express t use public directry to serve up all of our static assets

//if what the person request isn't in the public folder just give them back index.html
app.get('*', (req, res) => { //* to match all unmatched routes
    res.sendFile(path.join(publicPath, 'index.html'));
}) 

app.listen(port, () => { //second argument is a callback function which just gets called when the server is actually up
    console.log('Server is up!');
});