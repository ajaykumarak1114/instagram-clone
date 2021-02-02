
import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './components/Post';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 50 ;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}



function App() {
  const [posts, setPosts] = useState([])
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null)
  const [openSignIn, setOpenSignIn] = useState('')

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({id: doc.id, post: doc.data()})))
    })
  }, [])

  useEffect(() =>{
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser){
        // user has logged in
        console.log(authUser);
        setUser(authUser)
        // if(authUser.displayName){
        //   // don't upadate username
        // } else {
        //   // if we just created someone
        //   return authUser.updateProfile({
        //     displayName: username
        //   })
        // }

      } else {
        // user has logged out
        setUser(null)
      }
    }) 
    
    return () => {
      // perform some cleanup actions
      unsubscribe();
    }

  }, [ username])

  const signUp = (event) => {
   event.preventDefault();
    console.log("clicked");
    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return  authUser.user.updateProfile({
          displayName: username
        })
    })
    .catch(error => alert(error.message))
    setOpen(false)
  }

  const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .catch(error => alert(error.message))
    setOpenSignIn(false)
  }

  return (
    <div className="App">
      <div>
      {user ? (
          <Button type="button" onClick={() =>auth.signOut()}>Logout</Button>
      ): (
        <div className="app_loginContainer">
        <Button type="button" onClick={() => setOpenSignIn(true)}>Login</Button>
        <Button type="button" onClick={() => setOpen(true)}>Sign up</Button>
        </div>
      )}
        
        <Modal open={open} onClose={() => setOpen(false)}>
          <div style={modalStyle} className={classes.paper}>
            <form className="app_signUp">
              <center>
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="insta-logo"/>
              </center>
              <Input value={username} type="text" placeholder="username" onChange={(event) => setUsername(event.target.value)}/>
              <Input value={email} type="text" placeholder="email" onChange={(event) => setEmail(event.target.value)}/>
              <Input value={password} type="password" placeholder="password" onChange={(event) => setPassword(event.target.value)}/>
              <Button onClick={signUp}>Sign up</Button>
            </form>
          </div>
        </Modal>

         <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
          <div style={modalStyle} className={classes.paper}>
            <form className="app_signUp">
              <center>
                <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="insta-logo"/>
              </center>
            
              <Input value={email} type="text" placeholder="email" onChange={(event) => setEmail(event.target.value)}/>
              <Input value={password} type="password" placeholder="password" onChange={(event) => setPassword(event.target.value)}/>
              <Button onClick={signIn}>Sign in</Button>
            </form>
          </div>
        </Modal>
    </div>
    <div className="app_header">
        <img 
          className="app_headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="insta-logo"
        />
    </div>
    <h1>Instagram clone</h1>
      {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
        ))
      }
    </div>
  );
}

export default App;
