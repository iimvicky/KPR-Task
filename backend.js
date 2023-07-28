const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB Compass (make sure you have MongoDB running)
mongoose.connect('mongodb://localhost:27017/blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Blog = mongoose.model('Blog', blogSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API endpoint to create a blog
app.post('/api/blogs', (req, res) => {
  const { title, content } = req.body;
  const blog = new Blog({ title, content });

  blog.save((err) => {
    if (err) {
      console.error('Error saving blog:', err);
      res.status(500).json({ error: 'Error saving blog' });
    } else {
      res.status(201).json({ message: 'Blog created successfully' });
    }
  });
});

// API endpoint to get all blogs
app.get('/api/blogs', (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.error('Error fetching blogs:', err);
      res.status(500).json({ error: 'Error fetching blogs' });
    } else {
      res.status(200).json(blogs);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
