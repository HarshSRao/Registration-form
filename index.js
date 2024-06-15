var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://localhost:27017/Database')
var db = mongoose.connection
db.on('error', () => console.log("Error in Connecting to Database"))
db.once('open', () => console.log("Connected to Database"))

app.post("/sign-up", (req,res) => {
    var name = req.body.name
    var gender = req.body.gender
    var email = req.body.email
    var password = req.body.password

    var data = {
        "name" : name,
        "gender" : gender,
        "email" : email,
        "password" : password
    }
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully")
    })
    return res.redirect('signup_success.html')
})


app.get("/", (req, res) => {
    res.set({
        "Allow-acces-Allow-Origin" : '*'
    })
    return res.redirect('index.html')
}).listen(3000);

console.log("Listening on Port 3000")