import { useState } from "react";


function PostCard({ post, refreshPosts }) {

    const [copied, setCopied] = useState(false);
    const [deleting, setDeleting] = useState(false);


    function copyContent(){

        navigator.clipboard.writeText(post.content);

        setCopied(true);


        setTimeout(()=>{

            setCopied(false);

        },2000);

    }



    async function deletePost(){

        const confirmDelete = window.confirm(
            "هل تريد حذف هذا المنشور؟"
        );


        if(!confirmDelete) return;


        setDeleting(true);


        try {

            await fetch(
                `http://127.0.0.1:8000/api/posts/${post.id}`,
                {
                    method:"DELETE"
                }
            );


            if(refreshPosts){

                refreshPosts();

            }


        }

        catch(error){

            alert(
                "حدث خطأ أثناء حذف المنشور"
            );

        }


        setDeleting(false);

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



            <button 
                onClick={deletePost}
                disabled={deleting}
                style={{marginTop:"10px"}}
            >

                {
                    deleting
                    ?
                    "جاري الحذف..."
                    :
                    "🗑 حذف المنشور"
                }

            </button>



        </div>

    );

}


export default PostCard;