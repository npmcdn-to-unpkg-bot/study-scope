import express  from 'express';
import multer from 'multer';
import rootPath from 'app-root-path';
import File from './../models/file';
import guid from 'guid';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {

    var getFileExt = function(fileName){
      var fileExt = fileName.split(".");
      if( fileExt.length === 1 || ( fileExt[0] === "" && fileExt.length === 2 ) ) {
        return "";
      }
      return fileExt.pop();
    };
    cb(null, guid.raw() + '.' + getFileExt(file.originalname))
  }
});

router.post('/upload', multer({storage: storage}).single('upl'), (req, res) => {
  const user = req.user;
  let title = req.body.title;
  let roomId = req.body.roomId;
  let file = req.file;

  File.create({
    title: title,
    originalName: file.originalname,
    encoding: file.encoding,
    mimetype: file.mimetype,
    filename: file.filename,
    path: file.path,
    size: file.size,
    downloadedById: user.id,
    roomId: roomId
  })
    .then((file) => {
    console.log(file);
    res.status(204).end();
  });
});

router.get('/:filename', (req, res) => {
  const filename = req.params.filename;
  File.findOne({where: {filename: filename}})
    .then(file => {
      const filePath = rootPath + '/uploads/' + file.filename;

      // res.set('Content-disposition', 'attachment; filename=' + file.filename);
      // res.set('Content-type', 'application/msword');
      // TODO: .doc/.xlsx files
      res.download(filePath, file.originalName);
    });
});

module.exports = router;