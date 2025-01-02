const prisma = require("../helpers/prisma");
const { postSchema } = require("../helpers/schema");

const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    return res.json({
      success: true,
      data: posts,
      message: "Berhasil mendapatkan data post",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createPost = async (req, res) => {
  try {
    const parse = postSchema.safeParse(req.body);
    if (!parse.success) {
      const errorMessage = parse.error.issues.map(
        (err) => `${err.path}: ${err.message}`
      );
      return res.status(400).json({
        success: false,
        message: errorMessage,
        data: null,
      });
    }
    const post = await prisma.post.create({
      data: {
        title: parse.data.title,
        content: parse.data.content,
        published: parse.data.published,
      },
    });
    return res.json({
      success: true,
      data: post,
      message: "Post berhasil dibuat",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const parse = postSchema.safeParse(req.body);
    if (!parse.success) {
      const errorMessage = parse.error.issues.map(
        (err) => `${err.path}: ${err.message}`
      );
      return res.status(400).json({
        success: false,
        message: errorMessage,
        data: null,
      });
    }
    const post = await prisma.post.update({
      where: {
        id: Number.parseInt(id),
      },
      data: {
        title: parse.data.title,
        content: parse.data.content,
        published: parse.data.published,
      },
    });
    return res.json({
      success: true,
      data: post,
      message: "Post berhasil diupdate",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await prisma.post.delete({
            where: {
                id: Number.parseInt(id),
            },
        });
        return res.json({
            success: true,
            data: post,
            message: "Post berhasil dihapus",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: error.message,
        });
    }
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
};
