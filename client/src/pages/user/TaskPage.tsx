import { useEffect, useState } from "react";
import {
    Box, Typography, Paper, Chip, Button,
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Select, MenuItem, FormControl,
    InputLabel, CircularProgress, IconButton
} from "@mui/material";
import {
    Add as AddIcon,
    Delete as DeleteIcon,
    Edit as EditIcon
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { fetchTasks, createTask, updateTask, deleteTask } from "../../store/slices/taskSlice";
import { COLORS } from "../../constants/theme";
import type { Task, TaskForm } from "../../interfaces/task";

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

const TaskPage = () => {
    const dispatch = useAppDispatch();
    const { tasks, loading } = useAppSelector((state) => state.tasks);
 

    const [open, setOpen] = useState(false);
    const [editTask, setEditTask] = useState<Task | null>(null);
    const [form, setForm] = useState<TaskForm>({
        title: "",
        description: "",
        priority: "medium",
        status: "todo",
        dueDate: "",
    });

    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    const handleOpen = (task?: Task) => {
        if (task) {
            setEditTask(task);
            setForm({
                title: task.title,
                description: task.description || "",
                priority: task.priority,
                status: task.status,
                dueDate: task.dueDate?.split("T")[0] || "",
            });
        } else {
            setEditTask(null);
            setForm({ title: "", description: "", priority: "medium", status: "todo", dueDate: "" });
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditTask(null);
    };

    const handleSubmit = async () => {
        if (!form.title) return;
        const payload: TaskForm = {
        ...form,
        description: form.description || "",
    };

        if (editTask) {
            await dispatch(updateTask({ id: editTask._id, data: payload }));
        } else {
            await dispatch(createTask(payload));
        }
        handleClose();
    };

    const handleDelete = async (id: string) => {
        if (confirm("Delete this task?")) {
            await dispatch(deleteTask(id));
        }
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
            {/* Header */}
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3
            }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600, color: "#111827" }}>
                        My Tasks
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: "text.secondary", mt: 0.5 }}>
                        {tasks.length} tasks total
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpen()}
                    sx={{
                        bgcolor: COLORS.primary,
                        "&:hover": { bgcolor: COLORS.primaryDark },
                        fontSize: 13
                    }}
                >
                    New Task
                </Button>
            </Box>

            {/* Task List */}
            <Paper elevation={0} sx={{
                border: "1px solid #e5e7eb",
                borderRadius: 3,
                overflow: "hidden"
            }}>
                {tasks.length === 0 ? (
                    <Box sx={{ p: 6, textAlign: "center" }}>
                        <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                            No tasks yet — create your first task!
                        </Typography>
                    </Box>
                ) : (
                    tasks.map((task) => (
                        <Box key={task._id} sx={{
                            px: 3, py: 2.5,
                            borderBottom: "1px solid #f3f4f6",
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            "&:last-child": { borderBottom: "none" },
                            "&:hover": { bgcolor: "#f9fafb" }
                        }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ fontSize: 14, fontWeight: 500, color: "#111827" }}>
                                    {task.title}
                                </Typography>
                                {task.description && (
                                    <Typography sx={{ fontSize: 12, color: "text.secondary", mt: 0.3 }}>
                                        {task.description}
                                    </Typography>
                                )}
                                {task.dueDate && (
                                    <Typography sx={{ fontSize: 11, color: "text.secondary", mt: 0.5 }}>
                                        Due: {new Date(task.dueDate).toLocaleDateString()}
                                    </Typography>
                                )}
                            </Box>

                            <Chip
                                label={task.priority}
                                size="small"
                                sx={{
                                    fontSize: 11, height: 22,
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
                                    bgcolor: `${statusColor[task.status]}15`,
                                    color: statusColor[task.status],
                                    fontWeight: 500
                                }}
                            />

                            <IconButton
                                size="small"
                                onClick={() => handleOpen(task)}
                                sx={{ color: "#6b7280", "&:hover": { color: COLORS.primary } }}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
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

            {/* Create/Edit Dialog */}
            <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 500, fontSize: 16 }}>
                    {editTask ? "Edit Task" : "New Task"}
                </DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
                    <TextField
                        label="Title"
                        fullWidth
                        size="small"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        required
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        size="small"
                        multiline
                        rows={3}
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                    <FormControl size="small" fullWidth>
                        <InputLabel>Priority</InputLabel>
                        <Select
                            value={form.priority}
                            label="Priority"
                            onChange={(e) => setForm({ ...form, priority: e.target.value as Task["priority"] })}
                        >
                            <MenuItem value="low">Low</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl size="small" fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={form.status}
                            label="Status"
                            onChange={(e) => setForm({ ...form, status: e.target.value as Task["status"] })}
                        >
                            <MenuItem value="todo">Todo</MenuItem>
                            <MenuItem value="in-progress">In Progress</MenuItem>
                            <MenuItem value="done">Done</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Due Date"
                        type="date"
                        fullWidth
                        size="small"
                        value={form.dueDate}
                        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                        slotProps={{
                            inputLabel: { shrink: true }
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={handleClose} sx={{ color: "#6b7280" }}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            bgcolor: COLORS.primary,
                            "&:hover": { bgcolor: COLORS.primaryDark }
                        }}
                    >
                        {editTask ? "Update" : "Create"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default TaskPage;