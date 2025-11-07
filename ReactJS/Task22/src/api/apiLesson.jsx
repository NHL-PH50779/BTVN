import axios from "axios";

export const getLesson = async (courseId) => {
    try {
        // Lấy danh sách bài học thuộc 1 khóa học cụ thể
        const res = await axios.get(`http://localhost:3000/lessons?courseId=${courseId}`, {
            headers: { "Content-Type": "application/json" }
        });
        return res.data;
    } catch (error) {
        console.log("lỗi api", error);
    }
};

export const createLesson = async (data) => {
    try {
        const res = await axios.post("http://localhost:3000/lessons", data, {
            headers: { "Content-Type": "Application/json" }
        })
        return res.data;
    } catch (error) {
        console.log("lỗi api", error)
    }
}

export const updateLesson = async (id, data) => {
    try {
        const res = await axios.patch(`http://localhost:3000/lessons/${id}`, data, {
            headers: { "Content-Type": "application/json" }
        });
        return res.data;
    } catch (error) {
        console.log("lỗi api", error);
    }
};

export const getLessonDetail = async (id, data) => {
    try {
        const res = await axios.patch(`http://localhost:3000/lessons/${id}`, data, {
            headers: { "Content-Type": "application/json" }
        });
        return res.data;
    } catch (error) {
        console.log("lỗi api", error);
    }
};

export const deleteLesson = async (id) => {
    try {
        const res = await axios.delete(`http://localhost:3000/lessons/${id}`, {
            headers: { "Content-Type": "application/json" }
        });
        return res.data;
    } catch (error) {
        console.log("lỗi api", error);
    }
};