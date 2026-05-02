import { useEffect } from "react";
import {
    Box, Typography, Paper, Grid,
    Chip, Avatar, CircularProgress
} from "@mui/material";
import {
    CheckCircle as CheckIcon,
    RadioButtonUnchecked as TodoIcon,
    Autorenew as InProgressIcon,
    Assignment as TotalIcon
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { fetchTasks } from "../../store/slices/taskSlice";
import { fetchWorkspaces } from "../../store/slices/workspaceSlice";
import { COLORS } from "../../constants/theme";


const StatCard = ({
    title, value, icon, color
}: {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
}) => (
    <Paper elevation={0} sx={{
        p: 3,
        border: "1px solid #e5e7eb",
        borderRadius: 3,
        display: "flex",
        alignItems: "center",
        gap: 2
    }}>
        <Box sx={{
            width: 44, height: 44,
            borderRadius: 2,
            bgcolor: `${color}20`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: color
        }}>
            {icon}
        </Box>
        <Box>
            <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                {title}
            </Typography>
            <Typography sx={{ fontSize: 24, fontWeight: 600, color: "#111827" }}>
                {value}
            </Typography>
        </Box>
    </Paper>
);

const priorityColor: Record<string, string> = {
    high: "#dc2626",
    medium: "#d97706",
    low: "#16a34a"
};

const statusColor: Record<string, string> = {
    "todo": "#6b7280",
    "in-progress": "#d97706",
    "done": "#16a34a"
};

const UserDashboard = () => {
    const dispatch = useAppDispatch();
    const { tasks, loading } = useAppSelector((state) => state.tasks);
    const { workspaces } = useAppSelector((state) => state.workspaces);

    useEffect(() => {
        dispatch(fetchTasks());
        dispatch(fetchWorkspaces());
    }, [dispatch]);

    const totalTasks = tasks.length;
    const todoTasks = tasks.filter(t => t.status === "todo").length;
    const inProgressTasks = tasks.filter(t => t.status === "in-progress").length;
    const doneTasks = tasks.filter(t => t.status === "done").length;

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                <CircularProgress sx={{ color: COLORS.primary }} />
            </Box>
        );
    }

    return (
        <Box>
            {/* Header */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: "#111827" }}>
                    Dashboard
                </Typography>
                <Typography sx={{ fontSize: 13, color: "text.secondary", mt: 0.5 }}>
                    Welcome back! Here's what's happening.
                </Typography>
            </Box>

            {/* Stats */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid size={{xs: 12, sm: 6, md: 3}}>
                    <StatCard
                        title="Total Tasks"
                        value={totalTasks}
                        icon={<TotalIcon />}
                        color={COLORS.primary}
                    />
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 3}}>
                    <StatCard
                        title="To Do"
                        value={todoTasks}
                        icon={<TodoIcon />}
                        color="#6b7280"
                    />
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 3}}>
                    <StatCard
                        title="In Progress"
                        value={inProgressTasks}
                        icon={<InProgressIcon />}
                        color="#d97706"
                    />
                </Grid>
                <Grid size={{xs: 12, sm: 6, md: 3}}>
                    <StatCard
                        title="Done"
                        value={doneTasks}
                        icon={<CheckIcon />}
                        color="#16a34a"
                    />
                </Grid>
            </Grid>

            {/* Recent Tasks */}
            <Paper elevation={0} sx={{
                border: "1px solid #e5e7eb",
                borderRadius: 3,
                overflow: "hidden",
                mb: 3
            }}>
                <Box sx={{
                    px: 3, py: 2,
                    borderBottom: "1px solid #e5e7eb",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
                        Recent Tasks
                    </Typography>
                    <Typography
                        sx={{ fontSize: 12, color: COLORS.primary, cursor: "pointer" }}
                        onClick={() => window.location.href = "/tasks"}
                    >
                        View all →
                    </Typography>
                </Box>

                {tasks.length === 0 ? (
                    <Box sx={{ p: 4, textAlign: "center" }}>
                        <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                            No tasks yet
                        </Typography>
                    </Box>
                ) : (
                    tasks.slice(0, 5).map((task) => (
                        <Box key={task._id} sx={{
                            px: 3, py: 2,
                            borderBottom: "1px solid #f3f4f6",
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            "&:last-child": { borderBottom: "none" }
                        }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#111827" }}>
                                    {task.title}
                                </Typography>
                                {task.description && (
                                    <Typography sx={{ fontSize: 12, color: "text.secondary", mt: 0.3 }}>
                                        {task.description}
                                    </Typography>
                                )}
                            </Box>
                            <Chip
                                label={task.priority}
                                size="small"
                                sx={{
                                    fontSize: 11,
                                    height: 22,
                                    bgcolor: `${priorityColor[task.priority]}20`,
                                    color: priorityColor[task.priority],
                                    fontWeight: 500
                                }}
                            />
                            <Chip
                                label={task.status}
                                size="small"
                                sx={{
                                    fontSize: 11,
                                    height: 22,
                                    bgcolor: `${statusColor[task.status]}20`,
                                    color: statusColor[task.status],
                                    fontWeight: 500
                                }}
                            />
                        </Box>
                    ))
                )}
            </Paper>

            {/* Workspaces */}
            <Paper elevation={0} sx={{
                border: "1px solid #e5e7eb",
                borderRadius: 3,
                overflow: "hidden"
            }}>
                <Box sx={{
                    px: 3, py: 2,
                    borderBottom: "1px solid #e5e7eb"
                }}>
                    <Typography sx={{ fontWeight: 500, fontSize: 14 }}>
                        My Workspaces
                    </Typography>
                </Box>

                {workspaces.length === 0 ? (
                    <Box sx={{ p: 4, textAlign: "center" }}>
                        <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                            No workspaces yet
                        </Typography>
                    </Box>
                ) : (
                    workspaces.map((ws) => (
                        <Box key={ws._id} sx={{
                            px: 3, py: 2,
                            borderBottom: "1px solid #f3f4f6",
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            "&:last-child": { borderBottom: "none" }
                        }}>
                            <Avatar sx={{
                                width: 32, height: 32,
                                bgcolor: COLORS.primaryLight,
                                color: COLORS.primary,
                                fontSize: 13,
                                fontWeight: 600
                            }}>
                                {ws.name?.[0]?.toUpperCase()}
                            </Avatar>
                            <Box>
                                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                                    {ws.name}
                                </Typography>
                                <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                                    {ws.description || "No description"}
                                </Typography>
                            </Box>
                            <Chip
                                label={ws.isPrivate ? "Private" : "Public"}
                                size="small"
                                sx={{
                                    ml: "auto",
                                    fontSize: 11,
                                    height: 22,
                                    bgcolor: ws.isPrivate ? "#FEF2F2" : COLORS.primaryLight,
                                    color: ws.isPrivate ? "#dc2626" : COLORS.primary,
                                }}
                            />
                        </Box>
                    ))
                )}
            </Paper>
        </Box>
    );
};

export default UserDashboard;