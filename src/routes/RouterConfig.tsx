import Loader from "@/components/ui/Loader";
import { Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from "react";
import { ProtectedRoute } from "./protectedRoute";


const Login = lazy(() => import('../pages/auth/LoginPage'));
const SignUp = lazy(() => import('../pages/auth/SignUpPage'));
const Dashboard = lazy(() => import('../pages/Dashboard'));

export function RouterConfig() {
    return (
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={
                    <ProtectedRoute>
                    <Dashboard />
                    </ProtectedRoute>}/>
            </Routes>
        </Suspense>
    )
}