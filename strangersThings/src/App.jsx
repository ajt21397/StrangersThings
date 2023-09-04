import React, { useState, useEffect } from 'react';
import {makePost, fetchPosts, registerUser, login } from "./AjaxHelpers/strangers";
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import './App.css';



function CreatePost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [willDeliver, setWillDeliver] = useState(false);
  const [postMessage, setPostMessage] = useState('');

  const handlePostSubmit = async () => {
    try {
      const result = await makePost({
        title,
        description,
        price,
        willDeliver
      });

      if (result.success) {
        setPostMessage('Post created successfully');
      } else {
        setPostMessage('Failed to create post, must be logged in.');
      }
    } catch (error) {
      console.error(error);
      setPostMessage('Error creating post');
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <label>
        Will Deliver:
        <input
          type="checkbox"
          checked={willDeliver}
          onChange={(e) => setWillDeliver(e.target.checked)}
        />
      </label>
      <button onClick={handlePostSubmit}>Create Post</button>
      <p>{postMessage}</p>
    </div>
  );
}




function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts()
      .then(response => {
        const postsArray = response.data.posts;
        setPosts(postsArray);
        setIsLoading(false);
      })
      .catch(error => console.error(error));
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-container">
      {posts.map(post => (
        <div key={post._id} className="post post-card">
          <h2 className="post-title">{post.title}</h2>
          <p className="post-content">{post.price}</p>
          <div className="post-metadata">{/* Metadata here */}</div>
        </div>
      ))}
    </div>
  );
}


function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');

  const handleRegister = () => {
    registerUser(username, password)
      .then(data => {
        if (data.success) {
          setRegistrationMessage('Registration successful');
        } else {
          setRegistrationMessage('Registration failed');
        }
      })
      .catch(error => {
        console.error(error);
        setRegistrationMessage('Registration error');
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <p>{registrationMessage}</p>
    </div>
  );
}

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleLogin = () => {
    login(username, password)
      .then(data => {
        if (data.success) {
          setLoginMessage('Login successful');
        } else {
          setLoginMessage('Login failed');
        }
      })
      .catch(error => {
        console.error(error);
        setLoginMessage('Login error');
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>{loginMessage}</p>
    </div>
  );
}


function UpdatePost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [willDeliver, setWillDeliver] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  const handleUpdateSubmit = async () => {
    try {
      const postId = '5e8d1bd48829fb0017d2233b'; // Replace with the actual post ID
      const result = await updatePost({
        postId,
        title,
        description,
        price,
        location,
        willDeliver
      });

      if (result.success) {
        setUpdateMessage('Post updated successfully');
      } else {
        setUpdateMessage('Failed to update post');
      }
    } catch (error) {
      console.error(error);
      setUpdateMessage('Error updating post');
    }
  };

  return (
    <div>
      <h2>Update Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <label>
        Will Deliver:
        <input
          type="checkbox"
          checked={willDeliver}
          onChange={(e) => setWillDeliver(e.target.checked)}
        />
      </label>
      <button onClick={handleUpdateSubmit}>Update Post</button>
      <p>{updateMessage}</p>
    </div>
  );
}





function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Strangers Things App</h1>

        {/* Navigation Links */}
        <nav>
          <Link to="/posts">Posts</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/create-post">Create Post</Link>
          <Link to="/update-post">Update Post</Link>


          
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/posts" element={<Posts />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post" element={<UpdatePost />} />



          {/* Add more routes here */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
