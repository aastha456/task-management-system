import { Box } from "@mui/material";
import Sidebar from "./SideBar";
import { Outlet } from "react-router";

const MainLayout = () => {
    return (
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f9fafb" }}>
            <Sidebar />
            <Box sx={{ flex: 1, overflow: "auto", p: 3}}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default MainLayout;