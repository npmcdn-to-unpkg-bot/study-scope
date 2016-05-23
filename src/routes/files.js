import express  from 'express';
import multer from 'multer';
import path from 'path';
import rootPath from 'app-root-path';
import mime from 'mime';

const router = express.Router();

router.post('/upload', multer({ dest: './uploads/'}).single('upl'), (req, res) => {
  console.log(req.body); //form fields
  /* example output:
   { title: 'abc' }
   */
  console.log(req.file); //form files
  /* example output:
   { fieldname: 'upl',
   originalname: 'grumpy.png',
   encoding: '7bit',
   mimetype: 'image/png',
   destination: './uploads/',
   filename: '436ec561793aa4dc475a88e84776b1b9',
   path: 'uploads/436ec561793aa4dc475a88e84776b1b9',
   size: 277056 }
   */
  res.status(204).end();
});

router.get('/:name', (req, res) => {
  var file = rootPath + '/uploads/' + req.params.name;
  console.log(file);

  var filename = path.basename(file);
  var mimetype = mime.lookup(file);

  res.set('Content-disposition', 'attachment; filename=' + filename);
  res.set('Content-type', mimetype);

  res.download(file);
});

module.exports = router;