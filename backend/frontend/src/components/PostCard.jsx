function PostCard({post}){


return (

<div className="post-card">


<h3>
{post.idea}
</h3>


<p>
📂 {post.field}
</p>


<p>
🎯 {post.goal}
</p>


<p>
📱 {post.platform}
</p>


</div>

);


}


export default PostCard;