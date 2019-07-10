const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const dbConnections = require('./config/db.Connections');
const Split = require('./Split');
const Encrypt = require('./config/Encrypt');
const moment = require('moment');

app.use(cors());
app.use(bodyParser.json());

app.listen(4000, () => {
    console.log('On port 4000');
});


//Consulta en Tiempo Real
app.get('/', (req, res) => {
    res.redirect('/');
});

app.post('/', (req, res) => {
    const idCarName = req.body;
    console.log(idCarName)
    var datos = [];

    var con = dbConnections();
    for (var i = 0; i < idCarName.length; i++) {
        con.query('SELECT * FROM dsyrus where idCar = ? order by ID desc limit 1', [idCarName[i]], function (err, results) {
            if (results[0] == undefined) {
                results = [];
            }
            datos.push(results[0]);
            if (datos.length >= idCarName.length) {
                console.log("results => ", datos);
                return res.send(datos)
            }
        });
    }
    con.end();
});


//Consulta Historicos Ubicación
app.get('/ubicacion', (req, res) => {
    res.redirect('/ubicacion');
});

app.post('/ubicacion', function (req, res) {
    const datos = req.body;
    var idd = "'" + datos.idCar[0] + "'";
    var i = 1;
    while (i < datos.idCar.length) {
        idd = idd + " or idCar = '" + datos.idCar[i] + "'";
        i += 1;
    }
    const mysql = "SELECT * FROM dsyrus WHERE Fecha between ? and ? and lat between ? and ? and lng between ? and ? and ( idCar = " + idd + " ) ORDER BY iidd ASC";


    console.log("SELECT * FROM dsyrus WHERE Fecha between " + datos.start + " and " + datos.end + " and lat between " + datos.startlat + " and " + datos.endlat + " and lng between " + datos.startlng + " and " + datos.endlng + " and ( idCar = " + idd + " ) ORDER BY iidd ASC");

    var con = dbConnections();
    con.query(mysql, [datos.start, datos.end, parseFloat(datos.startlat), parseFloat(datos.endlat), parseFloat(datos.endlng), parseFloat(datos.startlng)], function (err, results) {
        console.log("results => ", results.length);
        if (err) {
            return res.send(err)
        } else {
            return res.send(results)
        }
    });
    con.end();
});


//Consulta Historicos Fecha
app.get('/fecha', (req, res) => {
    res.redirect('/fecha');
});

app.post('/fecha', function (req, res) {
    const datos = req.body;
    var idd = "'" + datos.idCar[0] + "'";
    var i = 1;
    while (i < datos.idCar.length) {
        idd = idd + " or idCar = '" + datos.idCar[i] + "'";
        i += 1;
    }
    const mysql = "SELECT * FROM dsyrus WHERE Fecha between ? and ?  and ( idCar = " + idd + " ) ORDER BY iidd ASC";
    console.log("SELECT * FROM dsyrus WHERE Fecha between " + datos.start + " and " + datos.end + "  and ( idCar = " + idd + " ) ORDER BY iidd ASC;");

    var con = dbConnections();
    con.query(mysql, [datos.start, datos.end], function (err, results) {
        console.log("results => ", results.length);
        if (err) {
            return res.send(err)
        } else {
            return res.send(results)
        }
    });
    con.end();
});


//Agregar carro
app.get('/addcar', (req, res) => {
    res.redirect('/addcar');
});

app.post('/addcar', async function (req, res) {
    const datos = req.body;
    console.log("datos : ", datos)
    var con = dbConnections();
    con.query('SELECT * FROM users where email = ? order by ID desc limit 1', [datos.email], function (err, resultss) {
        if (resultss[0] !== undefined) {
            idCars = "'" + resultss[0].idCar + "," + datos.idCar + "'";
        } else {
            idCars = datos.idCar;
        }
        var con1 = dbConnections();
        const mysql = "UPDATE users SET idCar = " + idCars + " WHERE email = '" + datos.email + "';"
        con1.query(mysql, function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
            return res.send({
                data: 'Auto agregado'
            });
        });
        con1.end();
    });
    con.end();
});


//Sniffer App
app.get('/app', (req, res) => {
    res.redirect('/app');
});

app.post('/app', async function (req, res) {
    const datos = req.body;
    console.log(datos);
    var id = null;
    var Fecha = datos.Fecha;
    var lat = JSON.parse(datos.location).coords.latitude;
    var lng = JSON.parse(datos.location).coords.longitude;
    var idCar = datos.idCar;
    var vel = parseInt(JSON.parse(datos.location).coords.speed.toString()) * 3.6;
    console.log("velocidad :  ", vel, "   ", parseFloat(JSON.parse(datos.location).coords.speed.toString()))

    var con = dbConnections();
    con.query('SELECT * FROM dsyrus where idCar = ? order by ID desc limit 1', [idCar], function (err, resultss) {
        if (resultss[0] !== undefined) {
            id = parseInt(resultss[0].ID) + 1;
        } else {
            id = 1;
        }
        var con1 = dbConnections();
        console.log(idCar, " => ", id);
        con1.query("INSERT INTO `dsyrus` (`iidd`,`Fecha`, `lat`, `lng`, `idCar`, `vel`, `ID`) VALUES ?;", [[['NULL', Fecha, lat, lng, idCar, vel, id.toString()]]], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
            return res.send({
                data: "Enviado!"
            });
        });
        con1.end();
    });
    con.end();
});


//Sniffer App-Sensor
app.get('/appS', (req, res) => {
    res.redirect('/appS');
});

app.post('/appS', async function (req, res) {
    const datos = req.body;
    console.log(datos);
    var id = null;
    var now = new Date(datos.timestamp);
    var Fecha = moment(new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), 0)).subtract(5, "hours").toISOString().slice(0, 19).replace('T', ' ');
    var lat = datos.latitude;
    var lng = datos.longitude;
    var idCar = datos.vahicleid;
    if (datos.readings.SPEED) {
        var vel = datos.readings.SPEED.replace('km/h', '');
    } else {
        var vel = 0;
    }
    var sensor = datos.readings.ENGINE_RPM.replace('RPM', '');

    var con = dbConnections();
    con.query('SELECT * FROM dsyrus where idCar = ? order by ID desc limit 1', [idCar], function (err, resultss) {
        if (resultss[0] !== undefined) {
            id = parseInt(resultss[0].ID) + 1;
        } else {
            id = 1;
        }
        var con1 = dbConnections();
        console.log(idCar, " => ", id);
        con1.query("INSERT INTO `dsyrus` (`iidd`,`Fecha`, `lat`, `lng`, `idCar`, `vel`, `ID`, Sensor) VALUES ?;", [[['NULL', Fecha, lat, lng, idCar, vel, id.toString(), sensor]]], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
            return res.send({
                data: "Enviado!"
            });
        });
        con1.end();
    });
    con.end();
});

//Sniffer UDP
server.on('message', async (msg, rinfo) => {
    var mes = req.body.datus;
    var todo = "";
    todo = Split(mes);
    var { Fecha, lat, lng, todo } = todo;
    console.log("Fecha: ", Fecha, "latitud: ", lat, "longitud: ", lng);

    var con = dbConnections();
    var sql = "INSERT INTO `dsyrus` (`ID`, `Fecha`, `lat`, `lng`) VALUES ?;";
    values = [['NULL', todo, lat, lng]];
    con.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
    con.end();
});

server.bind(45826);


// Iniciar Sesión
app.get('/signin', (req, res) => {
    res.redirect('/signin');
});

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    var con = dbConnections();
    con.query("SELECT * FROM users WHERE `email` = ?", [email], async function (err, results) {
        if (err) {
            return res.send({ data: 'Usuario no existe' });
        } else {
            const match = await Encrypt.matchPassword(password, results[0].password);
            console.log(match)
            if (match) {
                return res.send({
                    data: 'Iniciado', datos: results[0]
                });
            } else {
                return res.send({ data: 'Contraseña incorrecta' });
            }
        }
    });
    con.end();
});


// Crear Usuario
app.get('/signup', (req, res) => {
    res.redirect('/signup');
});

app.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password, idCar } = req.body;
    const passwordE = await Encrypt.encryptPassword(password);
    console.log("body: ", req.body);

    var con = dbConnections();
    con.query("SELECT * FROM users WHERE `email` = ?", [email], function (err, results) {
        if (err) {
            console.log("err: ", err)
            return res.send({ data: 'Error' });
        } else {
            if (results[0] == null) {
                console.log("es nulo")
                var con1 = dbConnections();
                var sql = "INSERT INTO `users` (`ID`, `firstName`, `lastName`, `email`, `password`, `idCar`) VALUES ?;";
                values = [['NULL', firstName, lastName, email, passwordE, idCar]];
                con1.query(sql, [values], function (err, result) {
                    if (err) {
                        console.log("errr:", err)
                        return res.send({ data: "No se registró" });
                    } else {
                        console.log("Number of records inserted: " + result.affectedRows);
                        return res.send({ data: "Registrado" });
                    }
                });
                con1.end();
            } else {
                return res.send({ data: 'Correo ya existe' });
            }
        }
    });
    con.end();
});


//"Auto eliminado"

//Agregar carro
app.get('/remcar', (req, res) => {
    res.redirect('/remcar');
});

app.post('/remcar', async function (req, res) {
    const datos = req.body;
    console.log("datos : ", datos)
    var con = dbConnections();
    con.query('SELECT * FROM users where email = ? order by ID desc limit 1', [datos.email], function (err, resultss) {
        if (resultss[0] !== undefined) {
            var rr = resultss[0].idCar.split(",");
            var si = false;
            for (var i = 0; i < rr.length; i++) {
                if (rr[i] == datos.idCarRem) {
                    console.log("si")
                    si = true;
                }
            }
            if (!si) {
                console.log("!si")
                return res.send({
                    data: 'Auto no existe'
                });
            }
            idCars = "'" + resultss[0].idCar.replace("," + datos.idCarRem, "") + "'";
        } else {
            console.log("resultss[0] == undefined")
            return res.send({
                data: 'Auto no existe'
            });
        }
        var con1 = dbConnections();
        const mysql = "UPDATE users SET idCar = " + idCars + " WHERE email = '" + datos.email + "';"
        con1.query(mysql, function (err, result) {
            console.log("hizo")
            if (err) throw err;
            console.log("Number of records inserted: " + result.affectedRows);
            return res.send({
                data: 'Auto eliminado'
            });
        });
        con1.end();
    });
    con.end();
});