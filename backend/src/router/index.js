const express = require('express');
const { checkAuthorization } = require('../middlewares/user');
const userRouter = require('./user.route.js');
const taskRouter = require('./task.route.js');
const adminRouter= require('./admin.js');
import authenticationRouter from './authentication.js';

const router = express.Router();

router.use(authenticationRouter)

//OTHER
router.use(checkAuthorization);

//ADMIN ROUTER
router.use('/admin',adminRouter);

router.use(userRouter);
router.use(taskRouter);

module.exports = router;