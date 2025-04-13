const express = require('express');
const multer = require('multer');
const imageUploadController = require('../controllers/imageUploadController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

//nơi gửi yc tải lên file, tải lên tệp đơn trong foem dữ liệu gửi lên từ client, sau khi multer xử lý xong
//chuyển đến imageUploadController để xử lý thêm: lưu vào firebase, trả về url  
router.post('/', upload.single('file'), imageUploadController.uploadImage);

module.exports = router; 