const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    //res.send() is used to send static HTML or JS Object (JSON) data 
    res.render('index', {
        title: 'Weather',
        name: 'Ryan Thatcher'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Ryan Thatcher'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help me Rhonda',
        title: 'Help',
        name: 'Ryan Thatcher'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'No address provided'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => { //passing empty object as defailt parameter stops javascript error from destructuring "undefined" object
        if (error){
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            
            res.send({
                location,
                forecastData
            })
        })
    })


    // res.send({
    //     forcast: 'Rochacha',
    //     location: req.query.address
    // })
})

app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide search term'
        })
    }

    res.send({
        products : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Ryan Thatcher'
    })
})


app.get('/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'My 404 page',
        name: 'Ryan Thatcher'
    })
})

app.listen(port, () => { // this starts up the server
    console.log('Server is up on port '+port)
})