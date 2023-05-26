require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        app.emit('Ready');
    }).catch(e => console.log(e));
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flashMessages = require('connect-flash'); 
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const { meuMiddleware, csrfMiddleware, checkCrsfError } = require('./src/middlewares/middleware');

app.use(helmet());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'axdorjtmnvusnrh0onrwxenr()',
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flashMessages());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
//Nossos próporios middlewares
app.use(meuMiddleware);
app.use(checkCrsfError);
app.use(csrfMiddleware); 
app.use(routes);

app.on("Ready", () => {
    app.listen(3000, () => {
        console.log("Acessar http://localhost:3000");
        console.log("Servidor rodando na porta 3000");
    });
});

