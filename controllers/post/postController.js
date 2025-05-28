const Post = require("../../models/posts/Post");
const User = require("../../models/user/User");

exports.createPost = async (req, res, next) => {
  const { text } = req.body;
  try {
    const user = await User.findById(req.user.id).select("-password");
    const newPost = new Post({
      text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
      media: [],
    });
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const type = file.mimetype.startsWith("video/") ? "video" : "image";
        newPost.media.push({
          url: file.path,
          type,
        });
      });
    }

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

exports.getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    return res.json(post);
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await post.deleteOne();
    res.json({ msg: "Post removed" });
  } catch (err) {
    next(err);
  }
};

exports.likePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.likes.some((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: "Post already liked" });
    }
    post.likesCount++;
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
};

exports.unLikePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    post.likesCount--;
    post.likes = post.likes.filter(
      (like) => like.user.toString() !== req.user.id
    );
    await post.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
};

exports.addComment = async (req, res, next) => {
  const { text } = req.body;
  try {
    const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.id);
    const newComment = {
      text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };
    post.comments.unshift(newComment);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(
      (co) => co._id.toString() === req.params.comment_id
    );
    if (!comment) return res.status(404).json({ msg: "Comment not found" });
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    post.comments = post.comments.filter((co) => co._id.toString() !== req.params.comment_id);
    console.log(post)
    await post.save();
    res.json(post.comments);
  } catch (err) {
    next(err);
  }
};


