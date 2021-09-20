var express = require('express')
var mysql = require('mysql')

var app = express();

// establecemos los parametros de conexion

https://www.npmjs.com/package/mysql

https://www.youtube.com/watch?v=k08tcsGcX8s&list=PLrAw40DbN0l2dg--IB6xTsEQTD1Qb1aBa&index=4

var conexion = mysql.createConnection({
    host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'articulosdb'
})

app.get('/', function(req,res){
    res.send('Ruta Inicio')
})

const puerto = process.env.PUERTO || 3000;

app.listen(puerto, function(){
    console.log("servidor en el puerto:"+puerto);
});