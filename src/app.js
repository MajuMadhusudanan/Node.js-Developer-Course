const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//setup express config directory
const publicDirectory = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,"../templates/partials");

//set views handler and view engine config
app.set("view engine","hbs");
app.set("views",viewsPath);
hbs.registerPartials(partialsPath);

//set static directory to serve static pages
app.use(express.static(publicDirectory));


// app.get('/', (req,res) => {
//     res.send("Hello Express");
// })

// app.get("/help",(req,res) => {
//     res.send("Help Page");
// })

// app.get("/about",(req,res) => {
//     res.send("<h1>About Page</h1>");

// })
app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Maju Madhusudanan'
    });
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Maju Madhusudanan'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        message: 'This is my test message - dynamic pages',
        title: "My help page",
        name:'Maju Madhusudanan'
    })
})

app.get("/weather",(req,res) => {

    if (!req.query.address) {
        return res.send({
            errorMessage: "No address specified"
        });
    }

    let location = req.query.address;
    geocode(location,(error,{latitude,longtitude,location}={}) => {
   
        if (error) {
            return res.send({error});
        }
    
        forecast(latitude,longtitude,(error,data) => {
    
            if (error) {
                return res.send({error});
            }
            else {
                console.log("Error: ",error);
                console.log("Data: ",data);
                res.send({
                    forecast: data,
                    location: data,
                    address: location
                })
            }
        })
    })

    
    // res.send({
    //         forecast: 'It feels like 34',
    //         location: 'kochi',
    //         address: address
    // });
})

app.get("/products",(req,res) => {

    if (!req.query.search) {
        return res.send({
            errorMessage: "You must provide search term"
        });
    }
    console.log(req.query.search);
    return res.send({
            products: []
    });
})

app.get('/help/*', (req,resp) => {
   // resp.send('404 error - help not found');
   resp.render('404',{
       title: '404 sepcifc error',
       name: 'Maju',
       errorMessage: '404 specific error'
   })
})

app.get('*',(req,resp) => {
    //resp.send('404 error');
    resp.render('404',{
        title:'My error',
        name:'Maju Madhusudanan',
        errorMessage: 'THis is my 404 error'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running on port 3000');
})