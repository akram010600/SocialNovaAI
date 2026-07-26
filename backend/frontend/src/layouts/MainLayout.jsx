import Sidebar from "../components/Sidebar";
import Header from "../components/Header";


function MainLayout({children}){


    return (

        <div className="app-layout" dir="rtl">


            <Sidebar />


            <div className="main-area">


                <Header />


                <main>

                    {children}

                </main>


            </div>


        </div>

    );

}


export default MainLayout;