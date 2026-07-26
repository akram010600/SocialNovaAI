import { useState } from "react";
import "./App.css";

function App() {

  const [idea, setIdea] = useState("");
  const [field, setField] = useState("عام");
  const [goal, setGoal] = useState("زيادة المبيعات");
  const [type, setType] = useState("إعلان");
  const [platform, setPlatform] = useState("فيسبوك");

  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);


  async function createPost(){

    if(!idea){
      return;
    }

    setLoading(true);

    try {

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


    } catch(error){

      setResult("حدث خطأ في الاتصال بالخادم");

    }


    setLoading(false);

  }



  return (

    <div className="container">

      <header>

        <h1>🚀 SocialNova AI</h1>

        <p>
        لوحة التحكم الذكية لإدارة وصناعة المحتوى
        </p>

      </header>



      <div className="card">


        <h2>✨ إنشاء منشور جديد</h2>


        <textarea

          placeholder="اكتب فكرة المنشور هنا..."

          value={idea}

          onChange={(e)=>setIdea(e.target.value)}

        />



        <select
        value={field}
        onChange={(e)=>setField(e.target.value)}
        >

          <option>عام</option>
          <option>مطاعم</option>
          <option>حضانة</option>
          <option>عقارات</option>
          <option>ملابس</option>
          <option>خدمات</option>

        </select>




        <select
        value={goal}
        onChange={(e)=>setGoal(e.target.value)}
        >

          <option>زيادة المبيعات</option>
          <option>زيادة المتابعين</option>
          <option>إعلان ممول</option>
          <option>بناء علامة تجارية</option>

        </select>




        <select
        value={type}
        onChange={(e)=>setType(e.target.value)}
        >

          <option>إعلان</option>
          <option>منشور تسويقي</option>
          <option>عرض منتج</option>
          <option>تهنئة</option>

        </select>




        <select
        value={platform}
        onChange={(e)=>setPlatform(e.target.value)}
        >

          <option>فيسبوك</option>
          <option>انستجرام</option>
          <option>تيك توك</option>
          <option>لينكدإن</option>

        </select>




        <button onClick={createPost}>

          {
          loading 
          ? "جاري الإنشاء..."
          : "إنشاء بالذكاء الاصطناعي"
          }

        </button>




        <div className="result">

          <h3>النتيجة:</h3>

          <p>{result}</p>

        </div>



      </div>


    </div>

  );

}


export default App;