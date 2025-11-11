import axios from "axios";

const api="https://dummyjson.com/products"
export const getProducts = async () => {
    
    try {
        const res = await axios.get(api)
        return res.data
    } catch (error) {
        console.log("lỗi api",error)
    }
};
