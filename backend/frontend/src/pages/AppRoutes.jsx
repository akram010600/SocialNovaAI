import { Link } from "react-router-dom";


function Sidebar(){

return (

<div className="sidebar" dir="rtl">


<h2>
🚀 SocialNova
</h2>


<Link to="/">
🏠 الرئيسية
</Link>


<Link to="/create">
✨ إنشاء محتوى
</Link>


<Link to="/analytics">
📊 التحليلات
</Link>


<Link to="/posts">
📁 المنشورات
</Link>


<Link to="/settings">
⚙️ الإعدادات
</Link>


</div>

);


}


export default Sidebar;