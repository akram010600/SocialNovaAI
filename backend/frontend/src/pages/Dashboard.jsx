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

            setDashboard(data);

        }
        catch(error){

            console.log(error);

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


                        </div>

                    ))
                }


            </div>


        </div>

    );


}


export default Dashboard;