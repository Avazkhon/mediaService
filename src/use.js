import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import session from 'express-session';
import passwords from '../passwords';

export default function (app) => {
  app.use(fileUpload());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
    useTempFiles: true,
  }));
  app.use(session({
    secret: passwords.secret,
    saveUninitialized: false,
    resave: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 3 },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 1000 * 60 * 60 * 24 * 3
    }),
  }));
}
