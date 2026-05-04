import {
    Box, Typography, List, ListItem,
    ListItemButton, ListItemText, ListItemIcon,
    Divider, Avatar, Button
} from "@mui/material";
import {
    Dashboard as DashboardIcon,
    Task as TaskIcon,
    Workspaces as WorkspaceIcon,
    FolderOpen as ProjectIcon,
    People as PeopleIcon,
    Logout as LogoutIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { logoutUser } from "../../store/slices/authSlice";
import { COLORS } from "../../constants/theme";
import { toast } from "react-toastify";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { role, name } = useAppSelector((state) => state.auth);

    const isAdmin = role === "admin";

    const userNavItems = [
        { label: "Dashboard", icon: <DashboardIcon fontSize="small" />, path: "/dashboard" },
        { label: "My Tasks", icon: <TaskIcon fontSize="small" />, path: "/tasks" },
        { label: "Workspaces", icon: <WorkspaceIcon fontSize="small" />, path: "/workspaces" },
        { label: "Projects", icon: <ProjectIcon fontSize="small" />, path: "/projects" },
    ];

    const adminNavItems = [
        { label: "Dashboard", icon: <DashboardIcon fontSize="small" />, path: "/admin" },
        { label: "Users", icon: <PeopleIcon fontSize="small" />, path: "/admin/users" },
        { label: "Tasks", icon: <TaskIcon fontSize="small" />, path: "/admin/tasks" },
        { label: "Workspaces", icon: <WorkspaceIcon fontSize="small" />, path: "/admin/workspaces" },
    ];

    const navItems = isAdmin ? adminNavItems : userNavItems;

    const handleLogout = async () => {
        await dispatch(logoutUser());
        toast.success("Logged out successful");
        navigate("/login");
    };

    console.log("ROLE:", role);

    return (
        <Box sx={{
            width: 220,
            minHeight: "100vh",
            bgcolor: "white",
            borderRight: "1px solid #e5e7eb",
            display: "flex",
            flexDirection: "column",
            flexShrink: 0
        }}>
            {/* Logo */}
            <Box sx={{
                p: 2.5,
                borderBottom: "1px solid #e5e7eb",
                display: "flex",
                alignItems: "center",
                gap: 1.5
            }}>
                <Box sx={{
                    width: 30, height: 30,
                    bgcolor: COLORS.primary,       
                    borderRadius: 1.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                    <Typography sx={{ color: "white", fontSize: 16 }}>✓</Typography>
                </Box>
                <Typography sx={{ fontWeight: 500, fontSize: 15 }}>
                    FlowTask
                </Typography>
            </Box>

            {/* Role badge */}
            {/* <Box sx={{ px: 2, pt: 2, pb: 1 }}>
                <Box sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    bgcolor: isAdmin ? COLORS.primaryLight : "#F3F4F6",  
                    color: isAdmin ? COLORS.primaryDark : "#374151",      
                    fontSize: 11,
                    fontWeight: 500,
                    px: 1.5,
                    py: 0.4,
                    borderRadius: 10
                }}>
                    {isAdmin ? "Admin" : "User"}
                </Box>
            </Box> */}

            {/* Nav items */}
            <List sx={{ px: 1, flex: 1 }}>
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                onClick={() => navigate(item.path)}
                                sx={{
                                    borderRadius: 2,
                                    bgcolor: isActive ? COLORS.primaryLight : "transparent", 
                                    "&:hover": { bgcolor: "#f3f4f6" },
                                    py: 0.8
                                }}
                            >
                                <ListItemIcon sx={{
                                    minWidth: 32,
                                    color: isActive ? COLORS.primary : "#6b7280" 
                                }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.label}
                                    slotProps={{
                                        primary: {
                                            sx: {
                                                fontSize: 13,
                                                fontWeight: isActive ? 500 : 400,
                                                color: isActive ? COLORS.primary : "#374151" 
                                            }
                                        }
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            {/* Bottom — User info + Logout */}
            <Divider />
            <Box sx={{ p: 2 }}>
                <Box sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1.5
                }}>
                    <Avatar sx={{
                        width: 28, height: 28,
                        bgcolor: COLORS.primaryLight,  
                        color: COLORS.primaryDark,     
                        fontSize: 12
                    }}>
                        {name?.[0]?.toUpperCase()}
                    </Avatar>
                    <Box>
                        <Typography sx={{ fontSize: 12, fontWeight: 500 }}>
                            {name || "Unknown User"}
                        </Typography>
                        <Typography sx={{ fontSize: 11, color: "text.secondary" }}>
                            {role}
                        </Typography>
                    </Box>
                </Box>
                <Button
                    fullWidth
                    startIcon={<LogoutIcon fontSize="small" />}
                    onClick={handleLogout}
                    sx={{
                        justifyContent: "flex-start",
                        color: "#6b7280",
                        fontSize: 13,
                        textTransform: "none",
                        "&:hover": { bgcolor: "#fef2f2", color: "#dc2626" }
                    }}
                >
                    Logout
                </Button>
            </Box>
        </Box>
    );
};

export default Sidebar;