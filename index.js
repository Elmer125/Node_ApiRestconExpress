const express = require('express');
const routerApi = require('./routes/routerApi');
const cors = require('cors');
const app = express();
const port = 3000;
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/errorHandler');
app.use(express.json());
const whiteList = ['http://localhost:8080','', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  },
};
app.use(cors(options));
routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Corriendo en el puerto ${port}`);
});
