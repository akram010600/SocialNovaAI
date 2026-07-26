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
    version="1.8"
)



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



class PostRequest(BaseModel):

    idea: str

    field: str = "عام"

    goal: str = "زيادة المبيعات"

    content_type: str = "إعلان"

    platform: str = "فيسبوك"




@app.get("/api/")
def home():

    return {
        "message": "SocialNova AI API Working 🚀"
    }




@app.post("/api/create")
def create_post(data: PostRequest):


    result = generate_content(
        data.idea,
        data.field,
        data.goal,
        data.content_type,
        data.platform
    )


    save_post(
        data.idea,
        data.field,
        data.goal,
        data.platform,
        data.content_type,
        result
    )


    return {

        "result": result

    }




@app.get("/api/posts")
def posts():

    return get_posts()




@app.get("/api/dashboard")
def dashboard():

    return get_dashboard_stats()