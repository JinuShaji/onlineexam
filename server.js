const express = require('express')
const app = express()
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
var session = require('express-session')
const { Console } = require("console");
const cors = require('cors');
const hbs = require('hbs');
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
debug: true
});
const { v4: uuidV4 } = require('uuid');
const { WSATYPE_NOT_FOUND } = require('constants');

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(session({secret:'keyboardcat', cookie:{ maxAge: 6000000 }}))
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));
app.set("views", path.join(__dirname, "views"));

app.use('/peerjs', peerServer);
app.use(cors());
app.set('view engine', 'ejs')
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static('public'))

app.get('/live', (req, res) => {
  res.redirect(`/live${uuidV4()}`)
})

app.get('/live:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.sockets.on('connection', function(socket) {
  socket.on('username', function(username) {
      socket.username = username;
      io.emit('is_online', '🔵 <i>' + socket.username + ' join the chat..</i>');
  });

  socket.on('disconnect', function(username) {
      io.emit('is_online', '🔴 <i>' + socket.username + ' left the chat..</i>');
  })

  socket.on('chat_message', function(message) {
      io.emit('chat_message', '<strong>' + socket.username + '</strong>: ' + message);
  });

});

///---------------------------------------------------------------



connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "eexam",
});

connection.connect(function (error) {
  if (!!error) console.log(error);
  else console.log("Database is Connected!!!");
});
var questions;
var result2;

app.get("/", (req, res) => {
res.render("index");
});
app.get("/stafflogin", (req, res) => {
  res.render("stafflogin",{message:[]});
});
app.get("/studentprofile", (req, res) => {
  res.render("studentprofile");
});
app.get("/addquestion", (req, res) => {
  res.render("addquestion");
});
app.get("/addquestion2", (req, res) => {
  res.render("addquestion2");
});
app.get("/selectbatch", (req, res) => {
  res.render("selectbatch");
});
app.get("/viewans", (req, res) => {
  res.render("viewans");
});
app.get("/viewmultiple", (req, res) => {
  res.render("viewmultiple");
});
app.get("/selectbachmultiple", (req, res) => {
  res.render("selectbachmultiple");
});
app.get("/studentlogin", (req, res) => {
  res.render("studentlogin",{message:[]});
});
app.get("/staffprofile", (req, res) => {
  res.render("staffprofile");
});
app.get("/selectsub", (req, res) => {
  res.render("selectsub");
});
app.get("/selectsub2", (req, res) => {
  res.render("selectsub2");
});
app.get("/exampapper", (req, res) => {
  res.render("exampapper");
});
app.get("/defquestion", (req, res) => {
  res.render("defquestion");
});
app.get("/viewmultiplemark", (req, res) => {
  res.render("viewmultiplemark");
});
app.get("/viewdef", (req, res) => {
  res.render("viewdef");
});
app.get("/defmark", (req, res) => {
  res.render("defmark");
});
app.get("/chat", (req, res) => {
  res.render("chat");
});



var logResult;
var results;
app.post("/Staffreg", (req, res) => {
  var img_name;
  if (!req.files) return res.status(400).send("No files were uploaded.");

  var file = req.files.uploaded_image;
  var img_name = file.name;
  let sql = "INSERT INTO stafflog SET ?";
  let sql2 = "SELECT * FROM stafflog WHERE Uid = ?"
  var uid =  req.body.id;
  let query = connection.query(sql2,[uid],(err,row)=>{
    if (err)  {console.log(err)}
    else{
      if (row.length > 0 ){
      var m = "StaffID is Allready Registred "
      res.render("stafflogin",{message:m})
    }else{
  console.log(img_name);
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/gif"
  ) {
    file.mv("public/images/staffimg/" + file.name, function (err) {
      if (err) return res.status(500).send(err);
      console.log(img_name);

      let data = {
        Uid: req.body.id,
        password: req.body.password,
        pic: img_name,
        name: req.body.name,
      };
      let query = connection.query(sql, data, (err, results) => {
        if (err) console.log(err);
        else {
          res.render("stafflogin");
        }
      });
    });
  }
}
}
})
});
app.post("/stafflogin", (req, res) => {
  var uid = req.body.uid;
  var passw = req.body.pass;
  connection.query(
    "select * from stafflog where Uid=? and password=?",
    [uid, passw],
    function (error, result, fields) {
      logResult = result;
      logResult.forEach(function (s) {
        sclg = s.email;
      });

      if (!!error) console.log(error);
      if (result.length > 0) {
        req.session.staff = result[0];
        console.log(req.session.staff,"session created")
        res.render("staffprofile", { user: logResult[0] });
      } else {
        var m2 ="Incorrect RgNo or Password"
        res.render("stafflogin",{message:m2});
      }
    }
  );

});


app.get("/staffHome", (req, res) => {
    var staff = req.session.staff
  res.render("staffprofile", { user: staff });
  
});

app.post("/register", (req, res) => {
  var img_name;
  if (!req.files) return res.status(400).send("No files were uploaded.");

  var file = req.files.uploaded_image;
  var img_name = file.name;
  let sql = "INSERT INTO student SET ?";
  let sql2 = "SELECT * FROM student WHERE Uid	 = ?"
  var uid = req.body.Rgno;

  let query = connection.query(sql2,[uid],(err,row)=>{
    if (err) 
    {console.log(err)}
    else{
      if (row.length > 0 ){
        var m = " StudentId is Allready Registred "
        res.render("studentlogin",{message:m})
      }else
      {
  if (
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/png" ||
    file.mimetype == "image/gif"
  ) {
    file.mv("public/images/studentpro/" + file.name, function (err) {
      if (err) return res.status(500).send(err);
      console.log(img_name);

      let data = {
        Uid: req.body.id,
        password: req.body.password,
        Uid: req.body.Rgno,
        batch: req.body.batch,
        pic: img_name,
        name: req.body.name,
      };

      let query = connection.query(sql, data, (err, results) => {
        if (err) console.log(err);
        else {
         res.render("studentlogin",{message:[]})
        }
      });
    });
  }
  }
}
})
});
app.post("/login", (req, res) => {
  var uid = req.body.id;
  var pass = req.body.pass;
  var SlogResult;
  connection.query(
    "select * from student where Uid=? and password=?",
    [uid, pass],
    function (error, result, fields) {
      logResult = result;
      console.log(logResult);
      if (!!error) console.log(error);
      if (result.length > 0) {
        res.render("Studentprofile", { user: logResult });
      } else {
        var m2 ="Incorrect RgNo or Password"
        res.render("studentlogin",{message:m2});
      }
    }
  );
});

app.post("/addmultipleChoice", (req, res) => {
  let sql = "INSERT INTO multiple_choice SET ?";
  let data = {
    sub: req.body.subj,
    qid: req.body.qid,
    qno: req.body.qno,
    qtn: req.body.question,
    option1: req.body.option1,
    option2: req.body.option2,
    option3: req.body.option3,
    option4: req.body.option4,
    Roption: req.body.Right,
    time: req.body.time,
  };

  let query = connection.query(sql, data, (err, results) => {
    if (err) console.log(err);
    else {
      res.render("addquestion");
    }
  });
});
app.post("/defq", (req, res) => {
  let sql = "INSERT INTO defenition_type SET ?";
  let data = {
    sub: req.body.sub,
    qid: req.body.qid,
    qno: req.body.qno,
    qtn: req.body.qtn,
    time: req.body.time,
  };

  let query = connection.query(sql, data, (err, results) => {
    if (err) console.log(err);
    else {
      res.render("addquestion2");
    }
  });
});
app.post("/selectSubM", (req, res) => {
  var subject = req.body.sub;
  var pid = req.body.pid;

  connection.query(
    "select * from multiple_choice where sub=? and qid=?",
    [subject, pid],
    function (error, result, fields) {
      questions = result;
      if (!!error) console.log(error);
      else {
        console.log(result);
        res.render("exampapper", { user: result });
      }
    }
  );
});
app.post("/exam", (req, res) => {
  console.log(req.body);
  let sql = "INSERT INTO answers SET ?";
  let query = connection.query(sql, req.body, (err, results) => {
    if (err) console.log(err);
    else {
      res.render("exampapper", { user: questions });
    }
  });
});

app.post("/viewmul", (req, res) => {
  var rgno = req.body.Rgno;
  var pid = req.body.pid;
  connection.query(
    "select * from answers where Rgno=? and pid=?",
    [rgno, pid],
    function (error, result, fields) {
      questions = result;
      results = result;
      if (error) console.log(error);
      else {
        console.log(result);
        connection.query(
          "select * from multiple_choice where sub = ?",
          [pid],
          function (error, rs, fields) {
            if (!!error) console.log(error);
            console.log(rs);
            result2 = rs;
            res.render("viewans", { user: result, result: rs });
          }
        );
      }
    }
  );
});

app.post("/addmark", (req, res) => {
  var rgno = req.body.Rgno;
  var marks = req.body.mark;
  var subj = req.body.sub;
  var cata = req.body.catagory;
  let data = {
    Rgno: rgno,
    mark: marks,
    subject: subj,
    cata: cata,
  };
  let sql = "INSERT INTO marks SET ?";
  let query = connection.query(sql, data, (err, results) => {
    if (err) console.log(err);
    else {
      res.render("selectbachmultiple");
    }
  });
});
//add definition 
app.post("/adddefmark", (req, res) => {
 
  
  var cata = req.body.catagory;
  let data = {
    Rgno:  req.body.Rgno,
    mark: req.body.mark,
    papperid:req.body.papperid,
    
  };
  let sql = "INSERT INTO defmark SET ?";
  let query = connection.query(sql, data, (err, results) => {
    if (err) console.log(err);
    else {
      res.render("selectbatch");
    }
  });
});
//adding
var dquestions;
app.post("/selectdef", (req, res) => {
  var rg = req.body.Rgno;
  var qid = req.body.pid;

  connection.query(
    "select * from defenition_type where qid=?",
    [qid],
    function (error, result, fields) {
      dquestions = result;
      if (!!error) console.log(error);
      else {
        console.log(result);
        res.render("defquestion", { user: result });
      }
    }
  );
});

app.post("/defanswer", (req, res) => {
  console.log(req.body);
  let sql = "INSERT INTO defanswer SET ?";
  let query = connection.query(sql, req.body, (err, results) => {
    if (err) console.log(err);
    else {
      res.render("defquestion", { user: dquestions });

    }
  });
});
app.post("/viewDefine", (req, res) => {
  var rg = req.body.Rgno;
  var qid = req.body.pid;

  connection.query(
    "select * from defanswer where Subid=? and Rgno=?",
    [qid,rg],
    function (error, result, fields) {
      dquestions = result;
      if (!!error) console.log(error);
      else {
        console.log(result);
        res.render("Defanswer", { user: result });
      }
    }
  );
});
app.post("/markm", (req, res) => {
  var rg = req.body.Rgno;
  var subj = req.body.sub;

  connection.query(
    "select * from marks where Subject=? and Rgno=?",
    [subj,rg],
    function (error, result, fields) {
      dquestions = result;
      if (!!error) console.log(error);
      else {
        console.log(result);
        res.render("mulmark", { user: result });
      }
    }
  );
});
app.post("/markd", (req, res) => {
  var rg = req.body.Rgno;
  var subj = req.body.sub;

  connection.query(
    "select * from defmark where Rgno=? and papperid=?",
    [rg,subj],
    function (error, result, fields) {
      dquestions = result;
      if (!!error) console.log(error);
      else {
        console.log(result);
        res.render("defmark", { user: result });
      }
    }
  );
});

//-----------------------------------------------------------

server.listen(process.env.PORT||3030)
