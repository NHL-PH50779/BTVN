import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children})=>{
    const Token = localStorage.getItem("accessToken"||"");
    const user = JSON.parse(localStorage.getItem("user")||"{}");
    const checkAdmin = ["admin"].includes(user.role)
    if(Token && checkAdmin) return <>{children}</>;
    return <Navigate to="/403" />
}
export default ProtectedRoute