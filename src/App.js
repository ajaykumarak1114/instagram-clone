
import { useState } from 'react';
import './App.css';
import Post from './components/Post';

function App() {
  const [posts, setPosts] = useState([
    {
      username: "Rakesh",
      caption: "Beautiful!!!",
      imageUrl: "https://cdn.iconscout.com/icon/free/png-512/react-1-282599.png"
    },
    {
      username: "Vivek",
      caption: "It is good!",
      imageUrl: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
    },
    {
      username: "Vinit",
      caption: "Elegant",
      imageUrl: "https://images.ctfassets.net/hrltx12pl8hq/4plHDVeTkWuFMihxQnzBSb/aea2f06d675c3d710d095306e377382f/shutterstock_554314555_copy.jpg"
    }
  ])
  return (
    <div className="App">
    {/* header */}
    {/* Post */}
     
      <div className="app_header">
        <img 
          className="app_headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="insta-logo"
        />
      </div>
       <h1>Instagram clone</h1>


       {
         posts.map(post => (
           <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
         ))
       }
     
    </div>
  );
}

export default App;
