const express = require('express');
const app = express();
const path = require('path');
const { getWeather } = require('./utils/getWeather');

require('dotenv').config();
const port = process.env.PORT || 8888

const pathPublic = path.join(__dirname, './public');
app.set('view engine', 'hbs');
app.use(express.static(pathPublic));

app.get('/', async (req, res) => {
    const { location } = req.query;
    if (location) {
        const weather = await getWeather(location);
        res.render('index',{
            ...weather,
        })
    } else {
        res.render('index',{
            success: false,
        })
    }
})

app.listen(port, () => {
    console.log('run on port ' + port);
});