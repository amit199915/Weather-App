const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicdirpath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialPath)

app.use(express.static(publicdirpath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Amit Gupta',
    })
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Amit Gupta',
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Amit Gupta',
    });
});
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'You must provide search address'
        })
        return;
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({ error });
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address,
            })
        })
    })
});


app.get('*', (req, res) => {
    res.render('errors', {
        title: '404',
        name: 'Amit Gupta',
        errorMessage: ' Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server Running on port ' + port);
})