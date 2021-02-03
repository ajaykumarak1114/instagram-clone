import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import "./Post.css";
import firebase from "firebase";

function Post({ username, caption, imageUrl, postId, user }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (e) => {
    e.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      username: user.displayName,
      text: comment,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };
  return (
    <div className="post">
      {/* post-header--> avatar + username  */}
      <div className="post_header">
        <Avatar
          className="post_avatar"
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
        />
        <h3>{username}</h3>
      </div>

      {/* image */}
      <img className="post_image" src={imageUrl} alt="react-img" />
      {/* username + caption */}
      <h4 className="post_text">
        <strong>{username}</strong> {caption}
      </h4>
      <div className="post_comments">
        {comments.map((comment) => (
          <p>
            <strong>{comment.username} </strong>
            {comment.text}
          </p>
        ))}
      </div>
      {user && (
        <form>
          <div className="post_commentBox">
            <input
              className="post_inputBox"
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button className="post_button" type="submit" onClick={postComment}>
              Post
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Post;
