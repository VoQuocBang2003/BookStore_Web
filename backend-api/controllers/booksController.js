const db = require('../knexfile.js');
const { createResponse } = require('../jsend.js');

const booksController = {
    getAllBooks: async (req, res) => {
        try {
            const books = await db('books')
                .select('books.*', 'categories.name as category_name')
                .leftJoin('categories', 'books.categories_id', 'categories.id');
            res.status(200).json(createResponse(true, books, 'Books retrieved successfully'));
        } catch (err) {
            console.error(err);
            res.status(500).json(createResponse(false, null, 'Error retrieving books'));
        }
    },

    getBookById: async (req, res) => {
        try {
            const book = await db('books')
                .select('books.*', 'categories.name as category_name')
                .leftJoin('categories', 'books.categories_id', 'categories.id')
                .where('books.id', req.params.id)
                .first();
            if (!book) {
                return res.status(404).json(createResponse(false, null, 'Book not found'));
            }
            res.status(200).json(createResponse(true, book, 'Book retrieved successfully'));
        } catch (err) {
            console.error(err);
            res.status(500).json(createResponse(false, null, 'Error retrieving book'));
        }
    },

    getBooksByCategory: async (req, res) => {
        try {
            const books = await db('books')
                .select('books.*', 'categories.name as category_name')
                .leftJoin('categories', 'books.categories_id', 'categories.id')
                .where('categories.id', req.params.categoryId);
            res.status(200).json(createResponse(true, books, 'Books retrieved by category successfully'));
        } catch (err) {
            console.error(err);
            res.status(500).json(createResponse(false, null, 'Error retrieving books by category'));
        }
    },

    createBook: async (req, res) => {
        try {
            const [id] = await db('books').insert(req.body);
            const newBook = await db('books').where('id', id).first();
            res.status(201).json(createResponse(true, newBook, 'Book created successfully'));
        } catch (err) {
            console.error(err);
            res.status(500).json(createResponse(false, null, 'Error creating book'));
        }
    },

    updateBook: async (req, res) => {
        try {
            await db('books').where('id', req.params.id).update(req.body);
            const updatedBook = await db('books').where('id', req.params.id).first();
            res.status(200).json(createResponse(true, updatedBook, 'Book updated successfully'));
        } catch (err) {
            console.error(err);
            res.status(500).json(createResponse(false, null, 'Error updating book'));
        }
    },

    deleteBook: async (req, res) => {
        try {
            await db('books').where('id', req.params.id).del();
            res.status(200).json(createResponse(true, null, 'Book deleted successfully'));
        } catch (err) {
            console.error(err);
            res.status(500).json(createResponse(false, null, 'Error deleting book'));
        }
    },

    searchBooks: async (req, res) => {
        const { query } = req.query;
        try {
            const books = await db('books')
            .select('*')
            .where('title', 'like', `%${query}%`)
            .orWhere('author', 'like', `%${query}%`);
            res.status(200).json(createResponse(true, books, 'Books searched successfully'));
        } catch (error) {
            console.error('Error searching books:', error);
            res.status(500).json(createResponse(false, null, 'Error searching books'));
        }
    },
};

module.exports = booksController;
