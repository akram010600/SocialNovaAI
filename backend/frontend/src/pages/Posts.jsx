import { useEffect, useState } from "react";
import { getPosts } from "../api/api";
import PostCard from "../components/PostCard";


function Posts(){

    const [posts,setPosts] = useState([]);

    const [search,setSearch] = useState("");

    const [field,setField] = useState("الكل");

    const [platform,setPlatform] = useState("الكل");



    useEffect(()=>{

        async function load(){

            const data = await getPosts();

            setPosts(data);

        }

        load();

    },[]);



    const fields = [
        "الكل",
        ...new Set(posts.map(post => post.field))
    ];


    const platforms = [
        "الكل",
        ...new Set(posts.map(post => post.platform))
    ];



    const filteredPosts = posts.filter(post=>{


        const matchSearch =
            post.idea
            .toLowerCase()
            .includes(search.toLowerCase());



        const matchField =
            field === "الكل" ||
            post.field === field;



        const matchPlatform =
            platform === "الكل" ||
            post.platform === platform;



        return (
            matchSearch &&
            matchField &&
            matchPlatform
        );


    });



    return (

        <div className="container" dir="rtl">


            <h1>
                📁 جميع المنشورات
            </h1>



            <div className="card">


                <input

                    type="text"

                    placeholder="🔍 ابحث عن منشور..."

                    value={search}

                    onChange={(e)=>setSearch(e.target.value)}

                />



                <select

                    value={field}

                    onChange={(e)=>setField(e.target.value)}

                >

                    {
                        fields.map(item=>(

                            <option key={item}>
                                {item}
                            </option>

                        ))
                    }

                </select>



                <select

                    value={platform}

                    onChange={(e)=>setPlatform(e.target.value)}

                >

                    {
                        platforms.map(item=>(

                            <option key={item}>
                                {item}
                            </option>

                        ))
                    }

                </select>


            </div>




            {

                filteredPosts.map(post=>(

                    <PostCard

                        key={post.id}

                        post={post}

                    />

                ))

            }



        </div>

    );

}


export default Posts;