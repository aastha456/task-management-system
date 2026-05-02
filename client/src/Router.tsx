import {Route,Routes } from 'react-router';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';
import UserDashboard from './pages/user/UserDashboard';
import TaskPage from './pages/user/TaskPage';
import WorkspacePage from './pages/user/WorkspacePage';
import ProjectPage from './pages/user/ProjectPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AdminTasksPage from './pages/admin/AdminTasksPage';
import AdminWorkspacePage from './pages/admin/AdminWorkspacePage';


const Router = () => {
    return (
        <Routes>

            <Route index element={<Home/>}/>


            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>

             <Route path="/" element={
                <ProtectedRoute>
                    <MainLayout />
                </ProtectedRoute>
            }>
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="tasks" element={<TaskPage />} />
                <Route path="workspaces" element={<WorkspacePage />} />
                <Route path="projects" element={<ProjectPage />} />
            </Route>

             <Route path="/admin" element={
                <ProtectedRoute requireAdmin>
                    <MainLayout />
                </ProtectedRoute>
            }>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsersPage />} />
                <Route path="tasks" element={<AdminTasksPage />} />
                <Route path="workspaces" element={<AdminWorkspacePage />} />
            </Route>

            <Route path="*" element={<h1>Not found</h1>}/>


        </Routes>
    )
}

export default Router;