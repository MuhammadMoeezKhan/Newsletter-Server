const express = require("express");
const bodyParser = require("body-parser"); 
const https = require("https");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

// Pressing Sign Me Up! Button
app.post("/",function(req,res){
const firstName = req.body.Fname;
const lastName = req.body.Lname;
const email = req.body.email;

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

const url = "https://us14.api.mailchimp.com/3.0/lists/975e94fe66";
const options = {
method:"POST",
auth:"Moeez:a97c2a96f2074b5979be503d9f6f4e71-us14",
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

// API KEY //a97c2a96f2074b5979be503d9f6f4e71-us14
// List ID // 975e94fe66 