import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import fs from "fs";
import lineReader from "line-reader";
import parser from "csv-parser";

import { dirname } from "path";
import { fileURLToPath } from "url";
import { version } from "os";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

var postData = [];

const filePost = 'blog.csv';

// set the view engine to ejs
app.set('view engine', 'ejs');

// morgan middleware
app.use(morgan("tiny"));

// body-parser middleware
app.use(bodyParser.urlencoded({extended: true}));

// Define static public folder
app.use(express.static("public"));

function addPost(data){
	var fec_post = new Date();
	var msg = fec_post.getFullYear().toString() +'-'+ ('0'+fec_post.getMonth().toString()).slice(-2) +'-'+ ('0'+fec_post.getDate().toString()).slice(-2) 
	msg += ';'+ ('0'+fec_post.getHours()).slice(-2) +':'+ ('0'+fec_post.getMinutes()).slice(-2) +':'+ ('0'+fec_post.getSeconds()).slice(-2) 
	msg += ';'+ data.email + ';' + data.password + ';' + data.tittle + ';' + data.post + '\n';
	// console.log(msg);
	let aMsg = msg.split(";");
	let newpost = {fecha: aMsg[0], hora: aMsg[1], email: aMsg[2], password: aMsg[3], tittle: aMsg[4], post: aMsg[5]};
	postData.unshift(newpost);
	try{
		fs.appendFile(filePost, msg, (err) => {
			if (err) throw err;
			// console.log("The file has been saved!");
		});
	}catch (ex){
		console.log(ex);
	}
	return postData;
};

function updatePost(vbody, vid){
	// console.log(vbody);
	// console.log(vid);
	postData[vid].tittle = vbody.tittle;
	postData[vid].post = vbody.post;
};

function deletePost(vid){
	postData.splice(vid,1);
};

function readPost(){
	const result = [];
	fs.access(filePost, fs.constants.F_OK, (err) => {
		// console.log(`${filePost} ${err ? 'does not exist' : 'exists'}`);
		return null;
	});
	fs.access(filePost, fs.constants.R_OK, (err) => {
		// console.log(`${filePost} ${err ? 'is not readable' : 'is readable'}`);
		return null;
	});
	fs.open(filePost, 'r', (err, fd) => {
		if (err) {
			if (err.code === 'ENOENT') {
				console.error('myfile does not exist');
				return null;
			}
			throw err;
		}
	
		try {
			// // readMyData(fd);
			// fs.readFile(filePost,function(err, fdata) {
			// 	if (err) throw err;
			// 	let result = fdata.toString('utf-8');
			// 	console.log('result');
			// 	console.log(result);
			// 	return resp;
			// });
			fs.createReadStream(filePost)
				.pipe(parser({
					separator: ';',
					newline: '\n',
					skipLines: 1,
					headers: ['fecha', 'hora', 'email', 'password','tittle','post'],
				}))
				.on('data', row => result.push(row))
				.on('end', () => {
					console.log('End Read File');
					return result;
				})
				;
		} finally {
			fs.close(fd, (err) => {
				if (err) throw err;
			});
		}
	});
};

app.get("/", (req, res) => {
	// var fdata = readPost();
	// console.log(req);
	res.render('index',{data : postData});
});
app.get("/addpost", (req, res) => {
	res.render('addpost');
});
app.post("/submit", (req, res) => {
	addPost(req.body);
	res.render('index',{data : postData});
});

app.get("/editpost", (req, res) => {
	// console.log(req.query);
	if (postData.length > 0){
		res.render('editpost',{data : postData, id: req.query.id});
	}else{
		res.render('index',{data : postData});
	}
});

app.post("/update", (req,res) => {
	// console.log("update");
	// console.log(postData);
	//  console.log(req.body);
	let c=0;
	for (let i=0; i<req.rawHeaders.length; i++){
		// console.log(req.rawHeaders[i]);
		if (i>0){
			if (req.rawHeaders[i-1].toLowerCase() == "referer"){
				c=i;
				break;
			}
		}
	};	
	let id = req.rawHeaders[c].split('?')[1].split('=')[1];
	updatePost(req.body,id);
	res.render('index',{data : postData});
});

app.post("/delete", (req,res) => {
	console.log("delete");
	// console.log(postData);
	//  console.log(req.body);
	let c=0;
	for (let i=0; i<req.rawHeaders.length; i++){
		// console.log(req.rawHeaders[i]);
		if (i>0){
			if (req.rawHeaders[i-1].toLowerCase() == "referer"){
				c=i;
				break;
			}
		}
	};	
	let id = req.rawHeaders[c].split('?')[1].split('=')[1];
	deletePost(id);
	res.render('index',{data : postData});
});

//*********************/*********************/
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
