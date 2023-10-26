var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

var con = new pg.Pool({
  host: "localhost",
  user: "postgres",
  password: "123456",
  database: "postgres",
  port: "5432"
});

app.post('/login', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;

  con.connect(function(err, client, done) {
    if (err) throw err;
    client.query("SELECT * FROM users WHERE username = $1 AND password = $2", [username, password], function (err, result) {
      done();
      if (err) throw err;
      if (result.rows.length > 0) {
        res.send('Đăng nhập thành công!');
      } else {
        res.send('Tên đăng nhập hoặc mật khẩu không đúng.');
      }
    });
  });
});

app.listen(3000, function () {
  console.log('Server is running.. on Port 3000');
});
