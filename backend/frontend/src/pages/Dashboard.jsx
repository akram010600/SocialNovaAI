import { useEffect, useState } from "react";

import DashboardCards from "../components/DashboardCards";
import CreatePost from "../components/CreatePost";

import { getDashboard } from "../api/api";


function Dashboard(){


    const [dashboard,setDashboard] = useState({

        total_posts:0,
        top_field:"",
        top_platform:"",
        latest_posts:[]

    });



    async function loadDashboard(){

        try{

            const data = await getDashboard();


            setDashboard({

                total_posts: data.total_posts || 0,

                top_field: data.top_field || "",

                top_platform: data.top_platform || "",

                latest_posts: data.latest_posts || []

            });


        }

        catch(error){

            console.log(
                "Dashboard Error:",
                error
            );


        }

    }




    useEffect(()=>{

        loadDashboard();

    },[]);





    return (

        <div className="container" dir="rtl">


            <DashboardCards

                dashboard={dashboard}

            />




            <CreatePost

                refreshDashboard={loadDashboard}

            />





            <div className="card">


                <h2>
                    📋 آخر المنشورات
                </h2>




                {

                    dashboard.latest_posts.length === 0

                    ?

                    <p>
                        لا توجد منشورات حالياً
                    </p>


                    :


                    dashboard.latest_posts.map(post=>(


                        <div

                            className="post"

                            key={post.id}

                        >


                            <b>
                                {post.idea}
                            </b>



                            <p>
                                المجال: {post.field}
                            </p>



                            <p>
                                المنصة: {post.platform}
                            </p>



                            <p>
                                النوع: {post.content_type}
                            </p>



                        </div>


                    ))


                }



            </div>



        </div>

    );


}


export default Dashboard;