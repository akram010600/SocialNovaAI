from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from database import (
    save_post,
    get_posts,
    get_dashboard_stats
)

from ai_engine import generate_content


app = FastAPI(
    title="SocialNova AI API",
    version="1.9"
)


# ==========================
# CORS
# ==========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================
# Request Model
# ==========================

class PostRequest(BaseModel):

    idea: str

    field: str = "عام"

    goal: str = "زيادة المبيعات"

    type: str = "إعلان"

    platform: str = "فيسبوك"



# ==========================
# Home
# ==========================

@app.get("/api/")
def home():

    return {
        "message": "SocialNova AI API Working 🚀"
    }



# ==========================
# Create AI Post
# ==========================

@app.post("/api/create")
def create_post(data: PostRequest):


    content = generate_content(

        data.idea,

        data.field,

        data.goal,

        data.type,

        data.platform

    )


    save_post(

        idea=data.idea,

        field=data.field,

        goal=data.goal,

        platform=data.platform,

        content_type=data.type,

        content=content

    )


    return {

        "success": True,

        "result": content

    }



# ==========================
# All Posts
# ==========================

@app.get("/api/posts")
def posts():

    return get_posts()



# ==========================
# Dashboard
# ==========================

@app.get("/api/dashboard")
def dashboard():

    return get_dashboard_stats()