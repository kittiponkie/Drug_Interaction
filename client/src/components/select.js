let mysql = require("mysql");
const express = require('express')
const app = express()

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nmpcd"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    sql = "SELECT TPID , FSN FROM tp WHERE (FSN LIKE 'tylenol 500%');";
    var query = mysql_conn.query(sql);
    query
        .on('error', function (err) {
            if (err) throw err; // Handle error, an 'end' event will be emitted after this as well
        })
        .on('result', function (row) {
            // Pausing the connnection is useful if your processing involves I/O
            mysql_conn.pause();
            // 
            mysql_conn.resume();
            console.log(result);
            });
        })
        .on('end', function () {
            // all rows have been received
        });
});

app.listen{8082, () => {
    console.log("Server is up and listening on 8082 port ...")
}}