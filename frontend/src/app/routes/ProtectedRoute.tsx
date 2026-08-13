import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "@/entities/user/model/store";

export function ProtectedRoute(){
    const user = useUserStore((state) => state.user)

    if(!user) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}