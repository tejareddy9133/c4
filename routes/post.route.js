const express = require("express");
const { authentication } = require("../middleware/auth.middleware");
const { PostModel } = require("../model/post.model");

const postRouter = express.Router();
postRouter.use(authentication);

postRouter.post("/create", async (req, res) => {
  try {
    const post = new PostModel(req.body);
    await post.save();
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

postRouter.post("/", async (req, res) => {
  try {
    const posts = await PostModel.find({ userID: req.body.userID });
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});
postRouter.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const useridinuserdoc = req.body.userID;
  try {
    const posts = await PostModel.findone({ _id: id });
    const useridinpostdoc = posts.userID;
    if (useridinuserdoc === useridinpostdoc) {
      await PostModel.findByIdAndUpdate({ _id: id }, req.body);
      res.send({ msg: "updated" });
    } else {
      res.send({ msg: "not authourized" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});
postRouter.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const useridinuserdoc = req.body.userID;
  try {
    const posts = await PostModel.findone({ _id: id });
    const useridinpostdoc = posts.userID;
    if (useridinuserdoc === useridinpostdoc) {
      await PostModel.findByIdAndDelete({ _id: id });
      res.send({ msg: "updated" });
    } else {
      res.send({ msg: "not authourized" });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = { postRouter };
