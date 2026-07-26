import sqlite3


DB_NAME = "socialnova.db"


def get_connection():
    return sqlite3.connect(DB_NAME)



def save_post(
    idea,
    field,
    goal,
    platform,
    content_type,
    result
):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO posts
        (
            idea,
            field,
            goal,
            platform,
            content_type,
            result
        )
        VALUES (?, ?, ?, ?, ?, ?)
        """,
        (
            idea,
            field,
            goal,
            platform,
            content_type,
            result
        )
    )

    conn.commit()
    conn.close()



def get_posts():

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT *
        FROM posts
        ORDER BY id DESC
        """
    )

    rows = cursor.fetchall()

    conn.close()

    return rows



def get_dashboard_stats():

    conn = get_connection()
    cursor = conn.cursor()


    cursor.execute(
        "SELECT COUNT(*) FROM posts"
    )

    total = cursor.fetchone()[0]


    cursor.execute(
        """
        SELECT field, COUNT(*)
        FROM posts
        GROUP BY field
        ORDER BY COUNT(*) DESC
        LIMIT 1
        """
    )

    field = cursor.fetchone()


    cursor.execute(
        """
        SELECT platform, COUNT(*)
        FROM posts
        GROUP BY platform
        ORDER BY COUNT(*) DESC
        LIMIT 1
        """
    )

    platform = cursor.fetchone()


    conn.close()


    return {
        "total_posts": total,
        "top_field": field[0] if field else "عام",
        "top_platform": platform[0] if platform else "فيسبوك"
    }



def delete_post(post_id):

    conn = get_connection()

    cursor = conn.cursor()


    cursor.execute(
        "DELETE FROM posts WHERE id=?",
        (post_id,)
    )


    conn.commit()
    conn.close()


    return True