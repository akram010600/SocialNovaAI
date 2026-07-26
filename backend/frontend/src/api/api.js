const API_URL = "http://127.0.0.1:8000/api";


async function request(url, options = {}) {

    try {

        const response = await fetch(
            `${API_URL}${url}`,
            {
                ...options,
                headers:{
                    "Content-Type":"application/json",
                    ...options.headers
                }
            }
        );


        if(!response.ok){

            throw new Error(
                `API Error: ${response.status}`
            );

        }


        return await response.json();


    } catch(error){

        console.error(
            "API Connection Error:",
            error
        );

        throw error;

    }

}



export function getDashboard(){

    return request(
        "/dashboard"
    );

}



export function getPosts(){

    return request(
        "/posts"
    );

}



export function createPost(data){

    return request(
        "/create",
        {
            method:"POST",
            body:JSON.stringify(data)
        }
    );

}