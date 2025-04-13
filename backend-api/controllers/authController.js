/* eslint-disable no-undef */
const db = require("../knexfile.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const _const = require("../config/constant");
const { createResponse } = require("../jsend.js");

const authController = {
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);

            // Kiểm tra email đã tồn tại trong cơ sở dữ liệu chưa
            const existingUser = await db('users').where('email', req.body.email).first();

            if (existingUser) {
                return res.status(200).json('Email is exist');
            }

            // Thêm người dùng mới vào cơ sở dữ liệu
            const [userId] = await db('users').insert({
                username: req.body.username,
                email: req.body.email,
                password: hashed,
                phone: req.body.phone,
                role: req.body.role,
                status: req.body.status
            });

            const user = {
                id: userId,
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                role: req.body.role,
                status: req.body.status
            };

            res.status(200).json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json('Register fails');
        }
    },

    login: async (req, res) => {
        try {
            // Kiểm tra xem email có tồn tại trong cơ sở dữ liệu không
            const user = await db('users').where('email', req.body.email).first();

            if (!user) {
                return res.status(200).json({ message: 'Unregistered account!', status: false });
            }

            // So sánh mật khẩu
            const validatePassword = await bcrypt.compare(req.body.password, user.password);

            if (!validatePassword) {
                return res.status(200).json({ message: 'Wrong password!', status: false });
            }

            // Tạo mã thông báo JWT
            const token = jwt.sign({ user: user }, _const.JWT_ACCESS_KEY, { expiresIn: '1d' });

            res.header('Authorization', token);
            res.status(200).json(createResponse(true, { token, user }, 'Login successful'));
        } catch (error) {
            console.error(error);
            res.status(500).json(createResponse(false, null, 'Error during login'));
        }
    },
   
};

module.exports = authController;
