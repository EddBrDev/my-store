const express = require('express');
const cors = require('cors');

const routerApi = require('./routes');

const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whiteList = ['http://127.0.0.1:5500','https://myapp.co'];
const options = {
    origin: (origin, callback) => {
        if (whiteList.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('No permitido'));
        }
    }
}
app.use(cors(options));

app.get('/', (req, res) => {
    res.send('Hola, mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
    res.send('Hola, soy una nueva ruta');
});

app.listen(port,() =>{
    console.log('Mi port' + port);
});

/*
Todo lo específico debe ir antes de lo dinámico: Los endpoints de forma específica deben ir antes que los endpoints de forma dinámica
 */ 

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);