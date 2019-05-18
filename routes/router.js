var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var moment = require('moment');
/*
var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "Ugongjae",
  password: "Ugongjae",
  database: "TodoList",
  dateStrings: true
});
*/
var connection = mysql.createConnection({
  host: "us-cdbr-iron-east-02.cleardb.net",
  port: 3306,
  user: "b4822b08158244",
  password: "4693047b",
  database: "heroku_9368258536a3369",
  dateStrings: true
});
connection.connect();

function goIndex(req, res) {

  if (req.cookies.order == 'priority') {
    connection.query("SELECT * from todolist order by priority,date", function (err, result) {
      if (err) {
        console.log(err);
      } else {
        var today = moment().format('YYYY-MM-DD');
        var obj = { result: result, today: today ,err: req.body.id};
        res.render('./index', obj);
      }
    });
  }
  else {
    connection.query("SELECT * from todolist order by date", function (err, result) {
      if (err) {
        console.log(err);
      } else {
        var today = moment().format('YYYY-MM-DD');
        var obj = { result: result, today: today ,err: req.body.id};
        res.render('./index', obj);
      }
    });
  }
}

//basic
router.get('/', function (req, res) {
  goIndex(req, res);
});

router.get('/index', function (req, res) {
  goIndex(req, res);
});

//error
router.get("*", function (req, res) {
  res.send('Incorrect page', 404);
})
router.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});


//post handle
router.post('/insert-post', function (req, res) {
  connection.query("INSERT INTO todolist(title,content,priority,date,blank) values(?,?,?,?,?)", [req.body.insert_title, req.body.insert_content, req.body.insert_priority, req.body.end_date, 0], function (err, re, fields) {
    if (err) {
      console.log(err);
      req.body.id=-1;
      goIndex(req,res);
    } else {
      res.redirect('./index');
    }
  });

});
router.post('/delete-post', function (req, res) {
  connection.query("DELETE FROM todolist where id=?", [req.body.data], function (err, result) {
    if (err){
      console.log(err);
      res.redirect('./index');
    }
    else {
      res.redirect('./index');
    }
  });
});

router.post('/modify-post', function (req, res) {
  connection.query("UPDATE todolist SET title=?,content=?,priority=?,date=? WHERE id=?", [req.body.modify_title, req.body.modify_content, req.body.modify_priority, req.body.modify_end_date, req.body.id], function (err, re, fields) {
    if (err) {
      console.log(err);
      req.body.id=-1;
      goIndex(req,res);
    } else {
      res.redirect('./index');
    }
  });

});

router.post('/blank-post', function (req, res) {
  connection.query("UPDATE todolist SET blank=? WHERE id=?", [req.body.data, req.body.id], function (err, result) {
    if (err)
      console.log(err);
    else {

    }
  });
});



module.exports = router;