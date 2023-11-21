//Ejemplo uso de Express server framework

import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
	// console.log(req.rawHeaders);
	res.send("<h1>Home Page</>");
} );

// Respuesta a request /about
// app.get("/about", (req, res) => {
// 	res.send("<h1>About Me</>");
// } );

// Respuesta a request /contact
// app.get("/contact", (req, res) => {
// 	res.send("<h1>Contact Me</>");
// } );

//Respuestas prueba de peticiones postman
app.post("/register", (req, res) => {
	res.sendStatus(201);
} );
app.put("/user/angela", (req, res) => {
	res.sendStatus(200);
} );
app.patch("/user/angela", (req, res) => {
	res.sendStatus(200);
} );
app.delete("/user/angela", (req, res) => {
	res.sendStatus(200);
} );

app.listen(port, () => {
	console.log(`Server runing on port ${port}.`);
});