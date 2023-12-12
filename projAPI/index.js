import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke/Any?lang=es&blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

// set the view engine to ejs
app.set('view engine', 'ejs');

// // morgan middleware
// app.use(morgan("tiny"));

// body-parser middleware
app.use(bodyParser.urlencoded({extended: true}));

// Define static public folder
app.use(express.static("public"));

app.get("/", async (req, res) => {
	try {
		const result = await axios.get(API_URL);
		// console.log(result);
		res.render("index.ejs", {
			category: result.data.category,
			setup: result.data.setup,
			delivery: result.data.delivery,
		});
	} catch (error) {
		console.log(error.response.data);
		res.status(500);
	}
});

// Report Server Port Running
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
