import { useEffect, useState } from "react";
import "./App.css";

function App() {

  const [idea, setIdea] = useState("");
  const [field, setField] = useState("عام");
  const [goal, setGoal] = useState("زيادة المبيعات");
  const [type, setType] = useState("إعلان");
  const [platform, setPlatform] = useState("فيسبوك");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const [dashboard, setDashboard] = useState({
    total_posts: 0,
    top_field: "",
    top_platform: "",
    latest_posts: []
  });



  async function loadDashboard(){

    try {

      const response = await fetch(
        "http://127.0.0.1:8000/api/dashboard"
      );

      const data = await response.json();

      setDashboard(data);

    } catch(error){

      console.log(error);

    }

  }



  useEffect(()=>{

    loadDashboard();

  },[]);





  async function createPost(){

    if(!idea){
      return;
    }


    setLoading(true);


    try{

      const response = await fetch(
        "http://127.0.0.1:8000/api/create",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            idea,
            field,
            goal,
            type,
            platform
          })
        }
      );


      const data = await response.json();


      setResult(data.result);


      loadDashboard();


    }catch(error){

      setResult(
        "حدث خطأ في الاتصال بالخادم"
      );

    }


    setLoading(false);

  }





  function copyContent(){

    navigator.clipboard.writeText(result);

    setCopied(true);


    setTimeout(()=>{

      setCopied(false);

    },2000);

  }




  return (

    <div className="container" dir="rtl">


      <header>

        <h1>
          🚀 SocialNova AI
        </h1>

        <p>
          لوحة التحكم الذكية لإدارة وصناعة المحتوى
        </p>

      </header>



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





      <div className="card">


        <h2>
          ✨ إنشاء منشور جديد
        </h2>



        <textarea

          placeholder="اكتب فكرة المنشور هنا..."

          value={idea}

          onChange={(e)=>setIdea(e.target.value)}

        />




        <select value={field}
        onChange={(e)=>setField(e.target.value)}>

          <option>عام</option>
          <option>عقارات</option>
          <option>مطاعم</option>
          <option>حضانة</option>
          <option>خدمات</option>

        </select>





        <select value={goal}
        onChange={(e)=>setGoal(e.target.value)}>


          <option>
            زيادة المبيعات
          </option>

          <option>
            زيادة المتابعين
          </option>

          <option>
            إعلان ممول
          </option>


        </select>





        <select value={type}
        onChange={(e)=>setType(e.target.value)}>


          <option>
            إعلان
          </option>

          <option>
            منشور تسويقي
          </option>

          <option>
            عرض منتج
          </option>


        </select>





        <select value={platform}
        onChange={(e)=>setPlatform(e.target.value)}>


          <option>
            فيسبوك
          </option>

          <option>
            انستجرام
          </option>

          <option>
            تيك توك
          </option>


        </select>




        <button onClick={createPost}>

          {
            loading
            ?
            "جاري الإنشاء..."
            :
            "إنشاء بالذكاء الاصطناعي"
          }

        </button>




        {
          result &&

          <div className="result">


            <h3>
              النتيجة:
            </h3>


            <p>
              {result}
            </p>



            <button onClick={copyContent}>

              {
                copied
                ?
                "✅ تم النسخ"
                :
                "📋 نسخ المحتوى"
              }

            </button>


          </div>

        }




      </div>





      <div className="card">


        <h2>
          📋 آخر المنشورات
        </h2>



        {
          dashboard.latest_posts.map(post=>(

            <div className="post"
            key={post.id}>


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


export default App;