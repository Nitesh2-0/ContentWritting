const express = require('express'); 
const app = express(); 
const path = require('path');
const { v4:uuidv4 } = require ('uuid');
const methodOverride = require('method-override');
const PORT = 3000; 

app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs'); 
app.set('views',path.join(__dirname,'views')); 
app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT, ()=>{
  console.log(`server is running at port ${PORT}`); 
})

let posts = [
  {
    id:uuidv4(),
    name: "Alice Smith",
    title: "Python",
    content: "Python is a high-level, interpreted programming language. It emphasizes code readability and its syntax allows programmers to express concepts in fewer lines of code."
  },
  {
    id:uuidv4(),
    name: "Michael Johnson",
    title: "JavaScript",
    content: "JavaScript is a lightweight, interpreted programming language. It is primarily known for adding interactivity to web pages and is essential for front-end web development."
  },
  {
    id:uuidv4(),
    name: "Emily Brown",
    title: "C++",
    content: "C++ is a general-purpose programming language. It is an extension of the C programming language and provides additional features such as classes and objects, making it suitable for complex software development."
  }

];

app.get('/',(req,res) => {
  res.render('index',{posts});
})

app.post('/newContent',(req,res) => {
  let {name, title, content} = req.body;
  let id = uuidv4();
  posts.push({id,name,title,content});
  res.redirect('/')
})

app.get('/newPost', (req,res) => {
  res.render('new')
})

app.delete('/Delete/:id', (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => p.id !== id); 
  res.redirect('/');
});

app.get('/details-of-:id',(req,res) => {
  let {id} = req.params; 
  let post = posts.find((post) => post.id === id);
  res.render('show',{post});
})

app.get('/:id/edit',(req,res) => {
  let {id} = req.params; 
  let post = posts.find((item) => item.id === id); 
  res.render('redetails',{post})
})

app.patch('/:id/edit',(req,res) => {
  let {id} = req.params; 
  let {name, title, content} = req.body; 
  let post = posts.find((item) => item.id === id); 
  post.name = name; 
  post.title = title; 
  post.content = content;
  res.redirect('/')
})