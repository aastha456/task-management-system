import { useEffect } from "react";
import {
    Box, Typography, Grid, Paper,
    Chip, Avatar, CircularProgress
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { fetchTasks } from "../../store/slices/taskSlice";
import { fetchUsers } from "../../store/slices/userSlice";
import { fetchWorkspaces } from "../../store/slices/workspaceSlice";
import { COLORS } from "../../constants/theme";

const AdminDashboard = () => {
    const dispatch = useAppDispatch();
    const { tasks, loading: tasksLoading } = useAppSelector((state) => state.tasks);
    const { users } = useAppSelector((state) => state.users);
    const { workspaces } = useAppSelector((state) => state.workspaces);

    useEffect(() => {
        dispatch(fetchTasks());
        dispatch(fetchUsers());
        dispatch(fetchWorkspaces());
    }, [dispatch]);

    const stats = [
        { label: "Total Users", value: users.length, color: COLORS.primary },
        { label: "Total Tasks", value: tasks.length, color: "#d97706" },
        { label: "Workspaces", value: workspaces.length, color: "#16a34a" },
        { label: "Completed", value: tasks.filter(t => t.status === "done").length, color: "#6b7280" },
    ];

    if (tasksLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                <CircularProgress sx={{ color: COLORS.primary }} />
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Admin Dashboard
                </Typography>
                <Typography sx={{ fontSize: 13, color: "text.secondary", mt: 0.5 }}>
                    Overview of all platform activity
                </Typography>
            </Box>

            {/* Stats */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
                {stats.map((stat) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.label}>
                        <Paper elevation={0} sx={{
                            p: 3,
                            border: "1px solid #e5e7eb",
                            borderRadius: 3,
                        }}>
                            <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                                {stat.label}
                            </Typography>
                            <Typography sx={{
                                fontSize: 28,
                                fontWeight: 600,
                                color: stat.color,
                                mt: 0.5
                            }}>
                                {stat.value}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            {/* Recent Users */}
            <Paper elevation={0} sx={{
                border: "1px solid #e5e7eb",
                borderRadius: 3,
                overflow: "hidden",
                mb: 3
            }}>
                <Box sx={{ px: 3, py: 2, borderBottom: "1px solid #e5e7eb" }}>
                    <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
                        Recent Users
                    </Typography>
                </Box>
                {users.slice(0, 5).map((user) => (
                    <Box key={user._id} sx={{
                        px: 3, py: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        borderBottom: "1px solid #f3f4f6",
                        "&:last-child": { borderBottom: "none" }
                    }}>
                        <Avatar sx={{
                            width: 32, height: 32,
                            bgcolor: COLORS.primaryLight,
                            color: COLORS.primary,
                            fontSize: 13
                        }}>
                            {user.name?.[0]?.toUpperCase()}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                                {user.name}
                            </Typography>
                            <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                                {user.email}
                            </Typography>
                        </Box>
                        <Chip
                            label={user.role}
                            size="small"
                            sx={{
                                fontSize: 11, height: 22,
                                bgcolor: user.role === "admin"
                                    ? COLORS.primaryLight
                                    : "#f3f4f6",
                                color: user.role === "admin"
                                    ? COLORS.primary
                                    : "#374151",
                                fontWeight: 500
                            }}
                        />
                    </Box>
                ))}
            </Paper>

            {/* Recent Tasks */}
            <Paper elevation={0} sx={{
                border: "1px solid #e5e7eb",
                borderRadius: 3,
                overflow: "hidden"
            }}>
                <Box sx={{ px: 3, py: 2, borderBottom: "1px solid #e5e7eb" }}>
                    <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
                        Recent Tasks
                    </Typography>
                </Box>
                {tasks.slice(0, 5).map((task) => (
                    <Box key={task._id} sx={{
                        px: 3, py: 2,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        borderBottom: "1px solid #f3f4f6",
                        "&:last-child": { borderBottom: "none" }
                    }}>
                        <Box sx={{ flex: 1 }}>
                            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                                {task.title}
                            </Typography>
                        </Box>
                        <Chip
                            label={task.status}
                            size="small"
                            sx={{
                                fontSize: 11, height: 22,
                                bgcolor: task.status === "done"
                                    ? "#dcfce7"
                                    : task.status === "in-progress"
                                    ? "#fef3c7"
                                    : "#f3f4f6",
                                color: task.status === "done"
                                    ? "#16a34a"
                                    : task.status === "in-progress"
                                    ? "#d97706"
                                    : "#6b7280",
                            }}
                        />
                    </Box>
                ))}
            </Paper>
        </Box>
    );
};

export default AdminDashboard;