function DashboardCards({dashboard}){


    return (

        <div className="dashboard">


            <div className="stat">

                📊

                <h3>
                    عدد المنشورات
                </h3>

                <strong>
                    {dashboard.total_posts}
                </strong>

            </div>



            <div className="stat">

                🏆

                <h3>
                    أكثر مجال
                </h3>

                <strong>
                    {dashboard.top_field}
                </strong>

            </div>



            <div className="stat">

                📱

                <h3>
                    أكثر منصة
                </h3>

                <strong>
                    {dashboard.top_platform}
                </strong>

            </div>


        </div>

    );

}


export default DashboardCards;