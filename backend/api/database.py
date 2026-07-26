from sqlalchemy import create_engine, Column, Integer, String, Text, func
from sqlalchemy.orm import declarative_base, sessionmaker

# ==========================
# Database Configuration
# ==========================

DATABASE_URL = "sqlite:///./socialnova.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


# ==========================
# Database Model
# ==========================

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)

    idea = Column(String(255), nullable=False)
    field = Column(String(100), nullable=False)
    goal = Column(String(100), nullable=False)
    platform = Column(String(100), nullable=False)
    content_type = Column(String(100), nullable=False)

    content = Column(Text, nullable=False)


Base.metadata.create_all(bind=engine)


# ==========================
# Save New Post
# ==========================

def save_post(
    idea: str,
    field: str,
    goal: str,
    platform: str,
    content_type: str,
    content: str,
):
    db = SessionLocal()

    try:
        post = Post(
            idea=idea,
            field=field,
            goal=goal,
            platform=platform,
            content_type=content_type,
            content=content,
        )

        db.add(post)
        db.commit()
        db.refresh(post)

        return post

    finally:
        db.close()


# ==========================
# Get All Posts
# ==========================

def get_posts():
    db = SessionLocal()

    try:
        return (
            db.query(Post)
            .order_by(Post.id.desc())
            .all()
        )

    finally:
        db.close()


# ==========================
# Dashboard Statistics
# ==========================

def get_dashboard_stats():
    db = SessionLocal()

    try:
        total_posts = db.query(Post).count()

        latest_posts = (
            db.query(Post)
            .order_by(Post.id.desc())
            .limit(5)
            .all()
        )

        top_field = (
            db.query(
                Post.field,
                func.count(Post.id).label("count")
            )
            .group_by(Post.field)
            .order_by(func.count(Post.id).desc())
            .first()
        )

        top_platform = (
            db.query(
                Post.platform,
                func.count(Post.id).label("count")
            )
            .group_by(Post.platform)
            .order_by(func.count(Post.id).desc())
            .first()
        )

        return {
            "total_posts": total_posts,
            "top_field": top_field[0] if top_field else "لا يوجد",
            "top_platform": top_platform[0] if top_platform else "لا يوجد",
            "latest_posts": [
                {
                    "id": post.id,
                    "idea": post.idea,
                    "field": post.field,
                    "goal": post.goal,
                    "platform": post.platform,
                    "content_type": post.content_type,
                    "content": post.content,
                }
                for post in latest_posts
            ],
        }

    finally:
        db.close()