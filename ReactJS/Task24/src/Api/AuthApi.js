import axios from "axios";
import api from ".";

export const RegisterApi = async (useData) => {
  const { data } = await api.post("/register", useData);
  return data;
};

export const LoginAuth = async(data)=>{
    try {
        const res = await axios.post("http://localhost:3000/login",data,{
            headers:{"Content-Type":"Application/json"}
        })
        return res.data;
    } catch (error) {
        console.log("lỗi api", error)
    }
};
