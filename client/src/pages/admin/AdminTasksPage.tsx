import { useEffect } from "react";
import {
    Box, Typography, Paper, Chip,
    CircularProgress, IconButton
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { fetchTasks, deleteTask } from "../../store/slices/taskSlice";
import { COLORS } from "../../constants/theme";

const AdminTasksPage = () => {
    const dispatch = useAppDispatch();
    const { tasks, loading } = useAppSelector((state) => state.tasks);

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleDelete = async (id: string) => {
        if (confirm("Delete this task?")) {
            await dispatch(deleteTask(id));
        }
    };

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

    if (loading) {
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
                    All Tasks
                </Typography>
                <Typography sx={{ fontSize: 13, color: "text.secondary", mt: 0.5 }}>
                    {tasks.length} tasks total
                </Typography>
            </Box>

            <Paper elevation={0} sx={{
                border: "1px solid #e5e7eb",
                borderRadius: 3,
                overflow: "hidden"
            }}>
                {/* Header */}
                <Box sx={{
                    px: 3, py: 1.5,
                    display: "grid",
                    gridTemplateColumns: "1fr 120px 120px 48px",
                    gap: 2,
                    bgcolor: "#f9fafb",
                    borderBottom: "1px solid #e5e7eb"
                }}>
                    {["Title", "Priority", "Status", ""].map((h) => (
                        <Typography key={h} sx={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: "text.secondary",
                            textTransform: "uppercase",
                            letterSpacing: 0.5
                        }}>
                            {h}
                        </Typography>
                    ))}
                </Box>

                {tasks.length === 0 ? (
                    <Box sx={{ p: 4, textAlign: "center" }}>
                        <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                            No tasks found
                        </Typography>
                    </Box>
                ) : (
                    tasks.map((task) => (
                        <Box key={task._id} sx={{
                            px: 3, py: 2,
                            display: "grid",
                            gridTemplateColumns: "1fr 120px 120px 48px",
                            gap: 2,
                            alignItems: "center",
                            borderBottom: "1px solid #f3f4f6",
                            "&:last-child": { borderBottom: "none" },
                            "&:hover": { bgcolor: "#f9fafb" }
                        }}>
                            <Box>
                                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                                    {task.title}
                                </Typography>
                                {task.description && (
                                    <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                                        {task.description}
                                    </Typography>
                                )}
                            </Box>
                            <Chip
                                label={task.priority}
                                size="small"
                                sx={{
                                    fontSize: 11, height: 22,
                                    width: "fit-content",
                                    bgcolor: `${priorityColor[task.priority]}15`,
                                    color: priorityColor[task.priority],
                                    fontWeight: 500
                                }}
                            />
                            <Chip
                                label={task.status}
                                size="small"
                                sx={{
                                    fontSize: 11, height: 22,
                                    width: "fit-content",
                                    bgcolor: `${statusColor[task.status]}15`,
                                    color: statusColor[task.status],
                                    fontWeight: 500
                                }}
                            />
                            <IconButton
                                size="small"
                                onClick={() => handleDelete(task._id)}
                                sx={{ color: "#6b7280", "&:hover": { color: "#dc2626" } }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    ))
                )}
            </Paper>
        </Box>
    );
};

export default AdminTasksPage;