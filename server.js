const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
})

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log',log + '\n',(err)=>{
        if(err){
            console.log('unable to append server.log');
        }
    })
    next();
})

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs',{
//         title:'under maintenance :(',
//         content:'Sorry. But,we are working hard behind the scences to make your experience better.'
//     })
// })

app.use(express.static(path.join(__dirname, '/public'))); //if used above the middleware with no next(),it will execute

app.get('/',(req,res,next)=>{
    res.render('home.hbs',{
        pageTitle: "Home Sweet Home",
        content: "Here is something to make you feel like home ;)"
    })
});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page'
    });
})

app.listen(port,(err)=>{
    console.log(`magic happens on port ${port}`);
})