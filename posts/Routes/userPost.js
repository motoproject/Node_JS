import express from 'express';
import userPostsController from '../Controller/userPost';

const router = express.Router();

router.get('/userposts', userPostsController.findUsersPosts );

module.exports = router;