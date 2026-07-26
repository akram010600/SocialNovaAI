@app.delete("/api/posts/{post_id}")
def delete_post(post_id:int):

    return {
        "message":"Post deleted"
    }