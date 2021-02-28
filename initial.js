const bodyParser = require("body-parser");
const ejs = require("ejs");
const express = require("express");
const routes = require("./Routes/routes");
const app = express();
const morgan = require("morgan");

// app.use(morgan('dev'));

app.set('views', './views')
app.set('view-engine', ejs);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', routes);

// app.put();
// app.post();
// app.delete();

const port = process.env.PORT || 400;

app.listen(port, () => console.log("Server started at ", port));