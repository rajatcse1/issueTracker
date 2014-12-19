var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var port = process.env.PORT || 3000;

var mongoose = require("mongoose");

var path = require("path");
var clientPath = path.join(__dirname, "build");
app.use(express.static(clientPath));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//craete router
var router = express.Router();

router.use(function(req, res, next){
	console.log("something is happening");
	next();
});

//api: goto client
router.get("/", function(req, res){
	//console.info(res);
	res.sendFile(clientPath,"index.html");
});


//-----Connection Events----------
//-----------When Successfully Conected----------
mongoose.connection.on('connected', function(){
	console.log("DB Connected Successfully");
});

mongoose.connection.on('error', function(err){
	console.log("DB Connection error: "+ err);
});

mongoose.connection.on('disconnected', function(){
	console.log("DB Disconnected");
});

mongoose.connect('mongodb://localhost:27017/Issue');

var Schema = mongoose.Schema;
var IssueSchema = new Schema({
	title: String,
	desc: String,
	img: String
});

var Issue = mongoose.model("Issue", IssueSchema);


router.route('/issues')
.get(function(req, res){
	Issue.find(function(err, result){
		if(err){
			res.send(err);
		}
		res.json(result);
	});
})
.post(function(req, res){
	console.info("req:",req.body);
	var issue = new Issue();
	issue.title = req.body.ttl;
	issue.desc = req.body.dsc;
	issue.img = req.body.img;

	issue.save(function(err){
		if(err){
			res.send(err);
		}
		res.json({message : "Data has saved"});
	});
});

router.route('/issues/:issue_id')
.get(function(req, res){
	Issue.findById(req.params.issue_id, function(err, result){
		if(err){
			res.send(err);
		}
		res.json(result);
	});
})
.put(function(req, res){
	Issue.findById(req.params.issue_id, function(err, result){
		if(err){
			res.send(err);
		}

		result.title = req.body.ttl;
		result.desc = req.body.dsc;
		result.img = req.body.img;

		result.save(function(err){
			if(err){
				res.send(err);
			}
			res.json({message : "Data has updated"});
		});
	});	
})
.delete(function(req, res){
	Issue.remove({
		_id:req.params.issue_id
	},function(err){
		if(err){
			res.send(err);
		}
		res.json({message : "Data successfully deleted"});
	});
});
	

app.use('/api/v1', router);

// start server
app.listen(port);
console.log("server started at : "+ port);