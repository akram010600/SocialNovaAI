import { useState } from "react";


function PostCard({ post }) {

    const [copied, setCopied] = useState(false);


    function copyContent(){

        navigator.clipboard.writeText(post.content);

        setCopied(true);


        setTimeout(()=>{

            setCopied(false);

        },2000);

    }



    return (

        <div className="card post-card" dir="rtl">


            <h2>
                {post.idea}
            </h2>


            <p>
                📂 المجال: {post.field}
            </p>


            <p>
                🎯 الهدف: {post.goal}
            </p>


            <p>
                📱 المنصة: {post.platform}
            </p>


            <p>
                📌 النوع: {post.content_type}
            </p>



            <div className="content-box">

                {post.content}

            </div>



            <button onClick={copyContent}>

                {copied ? "✅ تم النسخ" : "📋 نسخ المحتوى"}

            </button>



        </div>

    );

}


export default PostCard;