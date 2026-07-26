from sqlalchemy import create_engine, Column, Integer, String, Text
from sqlalchemy.orm import declarative_base, sessionmaker


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


class Post(Base):

    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)

    idea = Column(String)

    field = Column(String)

    goal = Column(String)

    platform = Column(String)

    content_type = Column(String)

    content = Column(Text)



Base.metadata.create_all(bind=engine)



# حفظ منشور جديد

def save_post(
    idea,
    field,
    goal,
    platform,
    content_type,
    content
):

    db = SessionLocal()

    post = Post(
        idea=idea,
        field=field,
        goal=goal,
        platform=platform,
        content_type=content_type,
        content=content
    )


    db.add(post)

    db.commit()

    db.refresh(post)

    db.close()

    return post



# جلب كل المنشورات

def get_posts():

    db = SessionLocal()

    posts = db.query(Post).all()

    db.close()

    return posts