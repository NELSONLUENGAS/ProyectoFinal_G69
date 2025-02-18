const { Router } = require('express');
const { uploader } = require('../middlewares/uploadMiddleware');
const {
	uploadSingle,
	uploadMultiple,
	getPublicFile,
	getPrivateFile,
} = require('../controllers/upload.controller');

const router = Router();

router.post('/', uploader.single('file'), uploadSingle);
router.post('/multiple', uploader.array('files'), uploadMultiple);

router.get('/public/:filename', getPublicFile);
router.get('/private/:filename', getPrivateFile);

module.exports = router;
