const path = require('path')
const express = require('express')
const hbs =require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
// console.log(__dirname)
// // console.log(__filename)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port=process.env.port || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
// const viewspath=path.join(__dirname,'../templates')
const viewspath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')
// app.set('views', path.join(__dirname, '../views'));

//setuo handlebars engine and location
app.set('views',viewspath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialPath)
//static take the path to the folder we want to serve that

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//req =incoming request to the server
//res =contain a bunch of method allowing us to customize what we,re going to send back to the requester
// app.get('',(req,res)=>{
//     res.send('hello express!')
// })

app.get('', (req, res) => {
   res.render('index',{
    title:'Weather ',
    name:'Anurag'
   })
})


app.get('/about',(req,res)=>{
     res.render('about',{
        title:'About me',
        name:'Anurag'
     })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'this is some helpful text',
        title:'Help',
        name:'Anurag Pandey'
    })
})
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help',(req,res)=>{
//      res.send([{
//         name:'Anurag'
//         // age:27
//      },{
//         name:'Sarah'
//      }])
// })
// app.get('/help',(req,res)=>{
//      res.send('Help page')
// })

// app.get('/about',(req,res)=>{
//   res.send('<h1>About</h1>')
// }) 

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error:'you must provide a Address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send({error})
            }

            forecast(latitude,longitude,(error,forecastData)=>{
                if(error){
                    return res.send({error});
                }
                res.send({
                    forecast:forecastData,
                    location,
                    address:req.query.address

                })
            })
    })
    // res.send({
    //     city: 'New Delhi',
    //     temp: '25°C',
    //     condition: 'Sunny',
    //     address: req.query.address

    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }

    console.log(req.query.search)
     res.send({
        product:[]
     })
})
app.get('/help/*',(req,res)=>{
    // res.send('Help article not found')
    res.render('404',{
        title:'404',
        name:'Anurag',
        errorMessage:'help article not found'
    })

})
app.get('*',(req, res)=>{
    // res.send('My 404 page')
    res.render('404',{
        title:'404',
        name:'Anurag',
        errorMessage:'Page not found.'
    })
})

// app.listen(3000, () => {
//     console.log('Server is up on port 3000')
// })
app.listen(port, () => {
    console.log('Server is up on port '+ port)
})

