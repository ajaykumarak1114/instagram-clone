import { Avatar } from '@material-ui/core'
import React from 'react'
import "./Post.css"

function Post({username, caption, imageUrl}) {
    return (
        <div className="post">
             {/* post-header--> avatar + username  */}
             <div className="post_header">
                 <Avatar className="post_avatar" alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <h3>{username}</h3>
             </div>
            
            
             {/* image */}
             <img className="post_image" src={imageUrl} alt="react-img"/>
             {/* username + caption */}
             <h4 className="post_text"><strong>{username}</strong> {caption}</h4>
        </div>
    )
}

export default Post
