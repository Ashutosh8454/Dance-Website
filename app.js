const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const port = 80;
const app = express();
mongoose.connect('mongodb://localhost/ashutoshkart', { useNewUrlParser: true });
//express stuf
app.use('/static', express.static('static'));
app.use(express.urlencoded());

//pug stuf

app.set('view engine', 'pug'); //set the tamplate engine as pug 
app.set('views', path.join(__dirname, 'views')); //set the view dirctory

//end points

app.get('/', (req, res) => {
    const params = {};
    res.status(200).render("home.pug", params);
})
app.get('/about', (req, res) => {
    const params = {};
    res.status(200).render("about.pug", params);
})
app.get('/service', (req, res) => {
    const params = {};
    res.status(200).render("service.pug", params);
})
app.get('/classInfo', (req, res) => {
    const params = {};
    res.status(200).render("classInfo.pug", params);
})
app.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render("contact.pug", params);
})
app.get('*', (req, res) => {
    const params = {};
    res.status(200).render("404.pug", params);
})

///contact page 
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    age: String,
    dance: String
});
const Contact = mongoose.model('ashutoshkart', contactSchema);

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database")
    }).catch(() => {
        res.status(400).send("item was not saved to the databse")
    })
})



//listion 
app.listen(port, (req, res) => {
    console.log(`Server is started at port ${port}`);
})