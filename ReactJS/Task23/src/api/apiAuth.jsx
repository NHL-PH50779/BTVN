import axios from "axios";

export const RegisterAuth = async(data)=>{
    try {
        const res = await axios.post("http://localhost:3000/users",data,{
            headers:{"Content-Type":"Application/json"}
        })
        return res.data;
    } catch (error) {
        console.log("lỗi api", error)
    }
}

export const LoginAuth = async(data)=>{
    try {
        const res = await axios.post("http://localhost:3000/login",data,{
            headers:{"Content-Type":"Application/json"}
        })
        return res.data;
    } catch (error) {
        console.log("lỗi api", error)
    }
}