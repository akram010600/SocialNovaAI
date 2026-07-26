import { useState } from "react";
import { createPost } from "../api/api";


function CreatePost({ refreshDashboard }) {


    const [idea, setIdea] = useState("");

    const [field, setField] = useState("عام");
    const [goal, setGoal] = useState("زيادة المبيعات");
    const [type, setType] = useState("إعلان");
    const [platform, setPlatform] = useState("فيسبوك");

    const [result, setResult] = useState("");

    const [loading, setLoading] = useState(false);



    async function handleCreate() {


        if (!idea.trim()) return;


        setLoading(true);


        try {


            const data = await createPost({

                idea,

                field,

                goal,

                content_type: type,

                platform

            });


            setResult(data.result);


            if (refreshDashboard) {

                refreshDashboard();

            }


        } catch (error) {


            console.log(error);


            setResult(
                "حدث خطأ في الاتصال بالخادم"
            );


        }


        setLoading(false);


    }





    return (


        <div className="card" dir="rtl">


            <h2>
                ✨ إنشاء منشور جديد
            </h2>



            <textarea

                placeholder="اكتب فكرة المنشور هنا..."

                value={idea}

                onChange={
                    e => setIdea(e.target.value)
                }

            />



            <select

                value={field}

                onChange={
                    e => setField(e.target.value)
                }

            >

                <option>عام</option>
                <option>عقارات</option>
                <option>مطاعم</option>
                <option>حضانة</option>
                <option>خدمات</option>
                <option>ملابس</option>
                <option>تسويق</option>
                <option>تعليم</option>

            </select>





            <select

                value={goal}

                onChange={
                    e => setGoal(e.target.value)
                }

            >

                <option>
                    زيادة المبيعات
                </option>

                <option>
                    زيادة المتابعين
                </option>

                <option>
                    إعلان ممول
                </option>


                <option>
                    بناء العلامة التجارية
                </option>


            </select>





            <select

                value={type}

                onChange={
                    e => setType(e.target.value)
                }

            >

                <option>
                    إعلان
                </option>

                <option>
                    منشور تسويقي
                </option>

                <option>
                    عرض منتج
                </option>

                <option>
                    محتوى تعليمي
                </option>


            </select>






            <select

                value={platform}

                onChange={
                    e => setPlatform(e.target.value)
                }

            >

                <option>
                    فيسبوك
                </option>

                <option>
                    انستجرام
                </option>

                <option>
                    تيك توك
                </option>

                <option>
                    لينكدإن
                </option>


            </select>







            <button

                onClick={handleCreate}

                disabled={loading}

            >

                {

                    loading

                    ?

                    "⏳ جاري الإنشاء..."

                    :

                    "🚀 إنشاء بالذكاء الاصطناعي"

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


                </div>


            }



        </div>


    );


}


export default CreatePost;