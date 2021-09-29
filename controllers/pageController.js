const Post = require('../module/Post');

exports.AboutPage = (req, res) => {
  res.render('about');
};

exports.AddPAge = (req, res) => {
  res.render('add_post');
};

exports.editPage = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  res.render('edit', {
    post,
  });
};
