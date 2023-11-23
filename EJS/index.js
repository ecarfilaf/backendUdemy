//Ejemplo uso EJS

import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// // morgan middleware entrega en console datos de solicitudes al server
//app.use(morgan("tiny"));

app.use(bodyParser.urlencoded({extended: true}));

// // index page first EJS /*********************/
// app.get('/', function(req, res) {
// 	var fec = new Date();
// 	var day = fec.getDay();
// 	if (day > 0 && day < 6){
// 		res.render('index',{typeDay:'weekday',descDay:'work hard!'});
// 	}else{
// 		res.render('index',{typeDay:'weekend',descDay:'have fun!'});
// 	}
// });

// // index2 page second EJS tags /*********************/
// app.get('/', function(req, res) {
// 	const data = {
// 		title: "EJS Tags",
// 		seconds: new Date().getSeconds(),
// 		items: ["apple","banana","cherry"],
// 		htmlContent : "<em> This is some em text </em>"
// 	};

// 	res.render('index2',data);
// });

// // index3 page three Passing data /*********************/
// app.get("/", (req, res) => {
// 	res.render('index3');
// });

// app.post("/submit", (req, res) => {
// 	//console.log(req.body);
// 	const numLetters = req.body["fName"].length + req.body["lName"].length;
// 	res.render('index3',{letterNumber :numLetters});
// });

// index3 page fuor Partials /*********************/
/* Write your code here:
Step 1: Render the home page "/" index.ejs
Step 2: Make sure that static files are linked to and the CSS shows up.
Step 3: Add the routes to handle the render of the about and contact pages.
  Hint: Check the nav bar in the header.ejs to see the button hrefs
Step 4: Add the partials to the about and contact pages to show the header and footer on those pages. */

app.use(express.static("public"));

app.get("/", (req, res) => {
	res.render('index4');
});
app.get("/about", (req, res) => {
	res.render('about');
});
app.get("/contact", (req, res) => {
	res.render('contact');
});
//*********************/*********************/
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
