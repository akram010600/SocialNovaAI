from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from database import save_post, get_posts


app = FastAPI()


app.add_middleware(
    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)



class PostRequest(BaseModel):

    idea: str

    type: str = "إعلان"

    platform: str = "فيسبوك"

    field: str = "عام"

    goal: str = "زيادة المبيعات"




@app.get("/api/")
def home():

    return {
        "message": "SocialNova AI API Working"
    }




@app.post("/api/create")
def create_post(data: PostRequest):


    result = f"""
🚀 SocialNova AI

✨ {data.idea}


📂 المجال: {data.field}

🎯 الهدف: {data.goal}

📌 نوع المحتوى: {data.type}

📱 المنصة: {data.platform}



🔥 اصنع حضوراً قوياً لعلامتك التجارية!

نقدم لك محتوى احترافي مصمم لجذب العملاء
وزيادة التفاعل وتحقيق نتائج أفضل.


✅ جودة

✅ احتراف

✅ نمو


📩 تواصل معنا الآن


#تسويق #نجاح #SocialNovaAI
"""


    save_post(

        data.idea,

        data.field,

        data.goal,

        data.type,

        data.platform,

        result

    )


    return {

        "result": result

    }




@app.get("/api/posts")
def posts():

    return get_posts()