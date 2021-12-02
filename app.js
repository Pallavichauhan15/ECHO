var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://localhost:27017/Echo',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"));

// app.get("/", (req, res) => {
//       res.sendFile(__dirname + 'index.html');
//  });

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    res.sendFile(__dirname + '/index.html');
}).listen(3000);

app.post("/sign_up",(req,res)=>{
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var dob = req.body.dob;
    var age = req.body.age;
    var contact = req.body.contact;
    var gender = req.body.gender;
    var city = req.body.city;
    var country = req.body.country;
    var agree = req.body.agree;
    

    var data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        dob: dob,
        age: age,
        contact: contact,
        gender: gender,
        city: city,
        country: country,
        agree: agree
        
    }

    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    res.sendFile(__dirname + '/sign.html');

})




console.log("Listening on PORT 3000");










// var express = require("express");
// var app = express();
// var port = 3000;
// var bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true}));

// var mongoose = require("mongoose");
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!

//   console.log("We are connected...")
// });
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/Echo', {useNewUrlParser: true , useUnifiedTopology: true});
// var nameSchema = new mongoose.Schema({
//     firstName: String,
//     lastName: String,
//     email: String,
//     dob: Date,
//     age: String,
//     contact: String,
//     gender: String,
//     city: String,
//     country: String,
//     agree: String
// });
// var User = mongoose.model("User", nameSchema);

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// app.post("index.html", (req, res) => {
//     var myData = new User(req.body);
//     // myData.firstName = req.body.firstName;
//     // myData.lastName = req.body.lastName;
//     // myData.email = req.body.email;
//     // myData.dob = req.body.dob;
//     // myData.age = req.body.age;
//     // myData.contact = req.body.contact;
//     // myData.gender = req.body.gender;
//     // myData.city = req.body.city;
//     // myData.agree = req.body.agree;
//     console.log(req.body.email);
//     myData.save()
//         // .then(item => {
//         //     res.send("Name saved to database");
//         // })
//         // .catch(err => {
//         //     res.status(400).send("Unable to save to database");
//         // });
//         return res.redirect('index.html');
// });

// app.listen(port, () => {
//     console.log("Server listening on port " + port);
// });