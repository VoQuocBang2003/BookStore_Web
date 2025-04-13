const bucket = require('../config/firebaseConfig');
const { createResponse } = require('../jsend.js');
//tạo chuỗi uuidv4 ngẫu nhiên để đặt tên file duy I, tránh xung đột
const { v4: uuidv4 } = require('uuid');

const imageUploadController = {
    uploadImage: async (req, res) => {
        try {
            // xem có file tải lên thông qua multer không
            if (!req.file) {
                return res.status(400).json(createResponse(false, null, 'No file uploaded'));
            }
            
            const file = req.file; //oriname, mimetype, file.buffer (dl nhị phân)
            //tạo tham chiếu đến file trong firebase storage
            const blob = bucket.file(`images/${uuidv4()}_${file.originalname}`);
            //tạo luồng ghi dữ liệu từ buffer vào firebase storage 
            const blobStream = blob.createWriteStream({
                metadata: {
                    contentType: file.mimetype
                }
            });

            blobStream.on('error', (err) => {
                console.error('Error uploading file:', err);
                res.status(500).json(createResponse(false, null, 'Error uploading file'));
            });

            blobStream.on('finish', async () => {
                //tên bucket firebase storage, đường dẫn file trong bucket
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                res.status(200).json(createResponse(true, { url: publicUrl }, 'File uploaded successfully'));
            });

            blobStream.end(file.buffer);
        } catch (err) {
            console.error(err);
            res.status(500).json(createResponse(false, null, 'Error uploading image'));
        }
    }
};

module.exports = imageUploadController; 