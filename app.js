var express = require('express')
var mysql = require('mysql')

var app = express();

app.use(express.json());
// para iniciar el servidor es node app

// establecemos los parametros de conexion

// https://www.npmjs.com/package/mysql

// https://www.youtube.com/watch?v=k08tcsGcX8s&list=PLrAw40DbN0l2dg--IB6xTsEQTD1Qb1aBa&index=4

var conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'articulosdb'
})

conexion.connect(function(error) {
    if (error) {
        throw error;
    } else {
        console.log('Conexion Exitosa a la Base de datos');
    }
})


app.get('/', function(req, res) {
    res.send('Ruta Inicio')
})

// consulta a la base de datos para traer todos los resultados
app.get('/api/articulos', (req, res) => {
    conexion.query('SELECT * FROM articulos', (error, filas) => {
        if (error) {
            throw error;
        } else {
            res.send(filas);
        }
    });
});

// consulta a la base de datos para traer dato en especificos
app.get('/api/articulos/:id', (req, res) => {
    conexion.query('SELECT * FROM articulos WHERE id = ?', [req.params.id], (error, fila) => {
        if (error) {
            throw error;
        } else {
            // res.send(fila); para mostrar todos los datos de la fila seleccionada
            res.send(fila[0].descripcion) // para mostrar solo una columna seleccionada
        }
    });
});

// insertar un articulo en la base de datos
app.post('/api/articulos', (req, res) => {
    let datos = {
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        stock: req.body.stock
    };
    let sql = "INSERT INTO articulos SET ?";
    conexion.query(sql, datos, function(error, resultado) {
        if (error) {
            throw error;
        } else {
            res.send(resultado);
        }
    });
});

// Actualizar un registro en especifico de la tabla
app.put('/api/articulos/:id', (req, res) => {
    let id = req.params.id;
    let descripcion = req.body.descripcion;
    let precio = req.body.precio;
    let stock = req.body.stock;
    let sql = "UPDATE  articulos SET descripcion = ?, precio = ?, stock = ? WHERE id = ?";
    conexion.query(sql, [descripcion, precio, stock, id], function(error, resultado) {
        if (error) {
            throw error;
        } else {
            res.send(resultado);
        }
    });
});

app.delete('/api/articulos/:id', (req, res) => {
    conexion.query('DELETE FROM articulos WHERE id = ?', [red.params.id], function(error, resultado) {
        if (error) {
            throw error;
        } else {
            res.send(resultado);
        }
    })
})

const puerto = process.env.PUERTO || 3000;

app.listen(puerto, function() {
    console.log("servidor en el puerto:" + puerto);
});