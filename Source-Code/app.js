//npm modules to be used
const express = require("express");
const bodyParser = require("body-parser"); 
const https = require("https");

//integrting npm modules with program
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

//GET request from the home route
app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

// Pressing Sign Me Up! Button
app.post("/",function(req,res){
const firstName = req.body.Fname;
const lastName = req.body.Lname;
const email = req.body.email;

//communication with Mailchip databases
const data = {
    members:[
        {
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: firstName,
                LNAME: lastName
                }
            }
        ]
    };
    var jsonData = JSON.stringify(data);

const url = ""; //removed access Mailchimp url

const options = {
method:"POST",
auth:"Moeez:",  //removed access key 
}

const request = https.request(url,options,function(response){
    if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");
    } 
    else{
        res.sendFile(__dirname + "/failure.html");
    }
    response.on("data",function(data){ 
    console.log(JSON.parse(data));
    })
});

request.write(jsonData);
request.end();
});

// Failure Page Button
app.post("/failure",function(req,res){
    res.redirect("/");
})

//Port Listening
app.listen(process.env.PORT || 3000,function(){
    console.log("The Server Is Now Running");
});
