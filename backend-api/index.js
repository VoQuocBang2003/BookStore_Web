const express = require('express');
const cors = require('cors');
const mysql = require('mysql2'); 
const app = express();
const _CONST = require('./config/constant')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const db = require('./knexfile.js');

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const authRoute = require('./routers/auth');
const userRoute = require('./routers/user');
const newsRouter = require('./routers/newsRouter');
const categoriesRouter = require('./routers/categoriesRouter');
const booksRouter = require('./routers/booksRouter');
const ordersRouter = require('./routers/ordersRouter');
const wishlistsRouter = require('./routers/wishlistsRouter');
const imageUploadRouter = require('./routers/imageUploadRouter');

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/news', newsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/books', booksRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/wishlists', wishlistsRouter);
app.use('/api/upload', imageUploadRouter);

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation for the bookstore application',
        },
        servers: [
            {
                url: 'http://localhost:3100',
            },
        ],
    },
    apis: ['./routers/*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || _CONST.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
