const API_URL = "http://127.0.0.1:8000/api";


export async function createPost(data){

    const response = await fetch(
        `${API_URL}/create`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }
    );

    return await response.json();

}



export async function getDashboard(){

    const response = await fetch(
        `${API_URL}/dashboard`
    );

    return await response.json();

}