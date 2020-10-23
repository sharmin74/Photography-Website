 const express = require("express");
 const bodyParser = require("body-parser");
 const ejs = require("ejs");
 const path = require("path");
 const env = require("dotenv").config();
 const nodemailer = require("nodemailer");


 const app = express();

 app.set('view engine', 'ejs');

 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());

 app.use(express.static('public'));


 // JANVIS'S DATA 
 const name1 = "JANVI DHUMAL";
 const janviPara = "In this amist of the beautiful world a cup of tea can do wonders." +
     "A sip of the tea can make you fell at ease at any given moment no matter what considering you enjoy the taste of it." +
     "You can find a chai wallas the (people who sells tea for livelihood) on every corner of the street in India." +
     "The consumption of tea in india on daily basis is way " +
     "high that any other country. Because Chai is not just a drink but an emotion." +
     "Past to future, the universe to the end of it ," +
     "The earnings of the college Xerox shop to how you would end " +
     "up opening one this endless thought accompanied by tea at college canteens with your friends." +
     "Those 5 minutes tea break from your 9 to 5 job thinking how life would have been different." +
     "To how your grandparent dwell upon the memories when the were young " +
     "Discussion of politics to steaming hot gossips everything and anything can happen over a cup of tea ." +
     "Everyone has a whole different story to tell" +
     "All you have to do is listen " +
     "India is a place where it is a ritual to offer a cup of tea stanger or not." +
     "That 5 min tea break is what everyone needs right now so let's explore through my gallery over it?"

 // PRANJAL'S DATA
 const name2 = "PRANJAL SAWANT";
 const pranjalPara = "-MUMBAI LOCAL aka Lifeline of Mumbai. If you haven't " +
     " travelled in the local just try it " +
     " during the peak hours , if you survive, the victory is yours.!!" +
     " -MUMBAI LOCAL aka Lifeline of Mumbai. Imagine traveling during the peak hours everyday, " +
     " frustrated due to the crowd and one fine day you get a seat, without even struggling for it." +
     "That happiness is something else. Nothing can match that level of happiness. " +
     " - You could only know the importance of these handles if you've ever travelled in Mumbai " +
     "locals especially during the peak hours. It has saved so many lives." +
     "So many people out there who risk their lives by travelling in " +
     "the rush just to go and work for 8 to 9 hours. " +
     "It's not that easy but no one can stop" + "Mumbaikars. Mumbai local is" +
     "called Mumbai's lifeline for a reason!- Travelling is not something you're good at " +
     ",infact its something you do, like breathing.";

 // ABOUT PAGE DATA
 const aboutUs = "We have an inherent quality, to see beauty in unexpected places and capture that beauty in " +
     "a photograph. Photography, for all intent and " +
     "purpose, is a form of art. We see a million different ways to interpret, " +
     "something ordinary or even extraordinary, that we see, and have an inbuilt " +
     "quality to convey those interpretations in beautiful and meaningful photos. " +
     "We have a very keen eye on every detail of our Photograph, we take care of every element that our " +
     "photo comprises of like lightening, the " +
     "composition, the subject and everything in the between works really " +
     "well, because we believe that even a tinest detail can make or " +
     "break a photograph. We believe being meticulous is extremely important. " +

     "It takes a lot of time and effort to make it as a professional photographer, and we believe " +
     "ourselves as we are truely passionate towards our work and interest. " +
     "And there are times when, we are never tired of taking billions of pictures " +
     "to get that one perfect shot.Our photographs have emotions, and a meaning and " +
     "ofcourse a story behind it, each of our photograph is filled with so many things. " +
     "We Love Photography ♥️ ";


 // HOME ROUTE
 app.get("/", function(req, res) {
     res.render("index", {
         name1: name1,
         name2: name2,
         janviPara: janviPara,
         pranjalPara: pranjalPara
     });
 });

 app.post("/", function(req, res) {});

 app.get("/contact", function(req, res) {
     let msg = " ";
     res.render("contact", { msg: msg });
 });

 app.post("/contact", function(req, res) {

     /* const name = req.body.name;
      const email = req.body.email;*/
     const name = req.body.name;
     const text = req.body.text;
     console.log(name, text);
     "use strict";
     // async..await is not allowed in global scope, must use a wrapper
     async function main() {
         // Generate test SMTP service account from ethereal.email
         // Only needed if you don't have a real mail account for testing
         let testAccount = await nodemailer.createTestAccount();

         // create reusable transporter object using the default SMTP transport
         let transporter = nodemailer.createTransport({
             service: 'gmail', // true for 465, false for other ports
             auth: {
                 user: process.env.GMAIL_EMAIL, // generated ethereal user
                 pass: process.env.GMAIL_PASSWORD // generated ethereal password
             }
         });

         // send mail with defined transport object
         let info = await transporter.sendMail({
             from: name, // sender address
             to: "photographywork74@gmail.com", // list of receivers
             subject: text, // Subject line
             // plain text body
         });
     }
     main().catch(console.error);

     res.render("contact", { msg: "Thank you so much, your Message has been received!" });
 });

 // CUSTOM ROUTES
 app.get("/:customName", function(req, res) {
     let name = (req.params.customName);

     if (name === "janvi") {
         res.render("janvi");
     } else if (name === "pranjal") {
         res.render("pranjal");
     } else {
         res.render("about", {
             aboutUs: aboutUs,
         });
     }
 });


 app.listen(process.env.PORT || 5000, function(req, res) {
     console.log("Server running on port 5000!");
 });