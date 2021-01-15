import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';

export default function (app) => {
  app.use(fileUpload());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true,
    useTempFiles: true,
  }));
}
