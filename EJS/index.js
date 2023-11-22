//Ejemplo uso EJS

import express from "express";
import bodyParser from "body-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');

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

// index3 page three Passing data /*********************/
app.get("/", (req, res) => {
	res.render('index3');
});

app.post("/submit", (req, res) => {
	//console.log(req.body);
	const numLetters = req.body["fName"].length + req.body["lName"].length;
	res.render('index3',{letterNumber :numLetters});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
