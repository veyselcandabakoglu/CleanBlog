const express = require('express');
const methodOverride = require('method-override');
const ejs = require('ejs');
const mongoose = require('mongoose');

const postController = require('./controllers/postController');
const pageController = require('./controllers/pageController');

const app = express();

// CONNECT DB

mongoose
  .connect(
    'mongodb+srv://veysel:lebronjames6@cluster0.i9vez.mongodb.net/cleanblog-db?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('DB CONNECTED!');
  })
  .catch((err) => {
    console.log(err);
  });

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);
// ROUTE
app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.get('/about', pageController.AboutPage);
app.get('/add_post', pageController.AddPAge);
app.get('/posts/edit/:id', pageController.editPage);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`);
});
