const multer = require('multer')

const multerStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, "public/files/cleaningImage")
    },
    filename:(req, file, cb)=>{
        cb(null,  `batch-${Date.now()}.${file.originalname}`)
    }
})

const upload = multer({
	storage: multerStorage,
});

module.exports = upload;