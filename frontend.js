// Fetch blogs from the server and display them
fetch('/api/blogs')
  .then((response) => response.json())
  .then((blogs) => {
    const blogList = document.getElementById('blogList');
    blogs.forEach((blog) => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${blog.title}</strong><br>${blog.content}<br><br>`;
      blogList.appendChild(li);
    });
  });

// Handle form submission
const blogForm = document.getElementById('blogForm');
blogForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const formData = { title, content };

  fetch('/api/blogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      blogForm.reset();
      window.location.reload();
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred while submitting the blog.');
    });
});
