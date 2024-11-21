const express = require('express');
const { logIn, logOut } = require('./auth.controller');

const authRouter = express.Router();

// Route for log in
authRouter.post('/api/v1/login', logIn);
//
authRouter.delete('/api/v1/logout', logOut);

module.exports = authRouter;
