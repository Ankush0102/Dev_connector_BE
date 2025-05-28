const express = require("express");
const {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  likePost,
  unLikePost,
  addComment,
  deleteComment,
} = require("../../controllers/post/postController");
const authMiddleware = require("../../middleware/authMiddleware/authMiddleware");
const { uploadMultiple } = require("../../middleware/uploadMiddleware/uploadMiddleware");
const router = express.Router();

router.post("/create_post", authMiddleware, uploadMultiple, createPost);
router.get("/get_all_posts", authMiddleware, getPosts);
router.get('/get_post/:id', authMiddleware, getPostById);
router.delete('/delete_post/:id', authMiddleware, deletePost);
router.put('/like_post/:id', authMiddleware, likePost);
router.put('/unlike_post/:id', authMiddleware, unLikePost);
router.post('/add_comment/:id', authMiddleware, addComment);
router.delete('/delete_comment/:id/:comment_id', authMiddleware, deleteComment)

module.exports = router;