import axios from "axios";

export const getCourses = async (data) => {
    try {
        const res = await axios.get("http://localhost:3000/courses", data, {
            headers: { "Content-Type": "Application/json" }
        })
        return res.data;
    } catch (error) {
        console.log("lỗi api", error)
    }
}

export const createCourse = async (data) => {
    try {
        const res = await axios.post("http://localhost:3000/courses", data, {
            headers: { "Content-Type": "Application/json" }
        })
        return res.data;
    } catch (error) {
        console.log("lỗi api", error)
    }
}

export const updateCourse = async (id, data) => {
    try {
        const res = await axios.patch(`http://localhost:3000/courses/${id}`, data, {
            headers: { "Content-Type": "application/json" }
        });
        return res.data;
    } catch (error) {
        console.log("lỗi api", error);
    }
};

export const getCourseDetail = async (id, data) => {
    try {
        const res = await axios.patch(`http://localhost:3000/courses/${id}`, data, {
            headers: { "Content-Type": "application/json" }
        });
        return res.data;
    } catch (error) {
        console.log("lỗi api", error);
    }
};

export const deleteCourse = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:3000/courses/${id}`, {
            headers: { "Content-Type": "application/json" }
        });
        return res.data;
    } catch (error) {
        console.log("lỗi api", error);
    }
};