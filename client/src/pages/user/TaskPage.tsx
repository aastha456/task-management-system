import { useEffect, useState } from "react";
import {
    Box, Typography, Paper, Chip, Button,
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Select, MenuItem, FormControl,
    InputLabel, CircularProgress, IconButton, Avatar
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { fetchTasks, createTask, updateTask, deleteTask } from "../../store/slices/taskSlice";
import { fetchWorkspaces } from "../../store/slices/workspaceSlice";
import { fetchProjects } from "../../store/slices/projectSlice";
import { COLORS } from "../../constants/theme";
import type { Task, TaskForm } from "../../interfaces/task";
import { toast } from "react-toastify";

const priorityColor: Record<string, string> = {
    high: "#dc2626", medium: "#d97706", low: "#16a34a"
};


const UserTaskPage = () => {
    const dispatch = useAppDispatch();
    const { tasks, loading } = useAppSelector((state) => state.tasks);
    const { workspaces } = useAppSelector((state) => state.workspaces);
    const { projects } = useAppSelector((state) => state.projects);
    const { userId } = useAppSelector((state) => state.auth);

    const [open, setOpen] = useState(false);
    const [editTask, setEditTask] = useState<Task | null>(null);
    // const [members, setMembers] = useState<Member[]>([]);
    const [form, setForm] = useState<TaskForm>({
        title: "",
        description: "",
        priority: "medium",
        status: "todo",
        dueDate: "",
        workspaceId: "",
        projectId: "",
    });

    useEffect(() => {
        dispatch(fetchTasks());
        dispatch(fetchWorkspaces());
    }, [dispatch]);

    const handleWorkspaceChange = async (workspaceId: string) => {
        setForm({ ...form, workspaceId, assignedTo: "", projectId: "" });
        dispatch(fetchProjects(workspaceId));
    };

    const handleOpen = (task?: Task) => {
        if (task) {
            setEditTask(task);
            setForm({
                title: task.title,
                description: task.description || "",
                priority: task.priority,
                status: task.status,
                dueDate: task.dueDate?.split("T")[0] || "",
                workspaceId: task.workspaceId || "",
                projectId: task.projectId || "",
            });
        } else {
            setEditTask(null);
            setForm({
                title: "", description: "",
                priority: "medium", status: "todo",
                dueDate: "", workspaceId: "",
                projectId: "", assignedTo: ""
            });
        }
        setOpen(true);
    };

    const handleSubmit = async () => {
        if (!form.title || !form.workspaceId) return;
        try {
        if (editTask) {
            await dispatch(updateTask({ id: editTask._id, data: form })).unwrap();
            toast.success("Task updated successfully", { type: "success"});
        } else {
            await dispatch(createTask(form)).unwrap();
            toast.success("Task created successfully", {type: "error"});
        }

        setOpen(false);
        setEditTask(null);
        dispatch(fetchTasks());

    } catch {
        toast.error("Something went wrong ");
    }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Delete this task?")) {
        try {
            await dispatch(deleteTask(id)).unwrap();
            toast.success("Task deleted");
        } catch {
            toast.error("Failed to delete task");
        }
    }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setForm({ ...form, file: e.target.files[0] });
    }
};

    const handleStatusChange = async (
    taskId: string,
    status: "todo" | "in-progress" | "done"
      ) => {
    await dispatch(updateTask({ id: taskId, data: { status } }));
     };

    const myTasks = tasks.filter((t) => {
    const assignedId = typeof t.assignedTo === "object" ? t.assignedTo?._id : t.assignedTo;
    
    const creatorId = typeof t.createdBy === "object" ? t.createdBy?._id : t.createdBy;

    return (
        assignedId === userId || 
        creatorId === userId
    );
});

    if (loading) return (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
            <CircularProgress sx={{ color: COLORS.primary }} />
        </Box>
    );

    return (
        <Box>
            <Box sx={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", mb: 3
            }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>My Tasks</Typography>
                    <Typography sx={{ fontSize: 13, color: "text.secondary", mt: 0.5 }}>
                        {myTasks.length} tasks
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />}
                    onClick={() => handleOpen()}
                    sx={{
                        bgcolor: COLORS.primary,
                        "&:hover": { bgcolor: COLORS.primaryDark }, fontSize: 13
                    }}>
                    New Task
                </Button>
            </Box>

            <Paper elevation={0} sx={{
                border: "1px solid #e5e7eb", borderRadius: 3, overflow: "hidden"
            }}>
                {myTasks.length === 0 ? (
                    <Box sx={{ p: 6, textAlign: "center" }}>
                        <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                            No tasks yet — create your first task!
                        </Typography>
                    </Box>
                ) : (
                    myTasks.map((task: Task) => (
                        <Box key={task._id} sx={{
                            px: 3, py: 2.5,
                            borderBottom: "1px solid #f3f4f6",
                            display: "flex", alignItems: "center", gap: 2,
                            "&:last-child": { borderBottom: "none" },
                            "&:hover": { bgcolor: "#f9fafb" }
                        }}>
                            <Box sx={{ flex: 1 }}>
                                <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                                    {task.title}
                                </Typography>
                                {task.description && (
                                    <Typography sx={{ fontSize: 12, color: "text.secondary", mt: 0.3 }}>
                                        {task.description}
                                    </Typography>
                                )}

                                {/* Assignee — type check*/}
                                {task.assignedTo && typeof task.assignedTo === "object" && (
                                    <Box sx={{
                                        display: "flex", alignItems: "center",
                                        gap: 0.5, mt: 0.5
                                    }}>
                                        <Avatar sx={{
                                            width: 16, height: 16,
                                            bgcolor: COLORS.primaryLight,
                                            color: COLORS.primary, fontSize: 9
                                        }}>
                                            {task.assignedTo.name?.[0]?.toUpperCase() || "?"}
                                        </Avatar>
                                        <Typography sx={{ fontSize: 11, color: "text.secondary" }}>
                                            {task.assignedTo.name || "Assigned"}
                                        </Typography>
                                    </Box>
                                )}

                                {task.dueDate && (
                                    <Typography sx={{ fontSize: 11, color: "text.secondary", mt: 0.3 }}>
                                        Due: {new Date(task.dueDate).toLocaleDateString()}
                                    </Typography>
                                )}
                            </Box>

                            <Chip label={task.priority} size="small" sx={{
                                fontSize: 11, height: 22,
                                bgcolor: `${priorityColor[task.priority]}15`,
                                color: priorityColor[task.priority], fontWeight: 500
                            }} />

                            {/* Status dropdown */}
                            <Select
                                value={task.status}
                                size="small"
                                onChange={(e) => handleStatusChange(task._id, e.target.value)}
                                sx={{ fontSize: 12, height: 28, minWidth: 120 }}
                            >
                                <MenuItem value="todo" sx={{ fontSize: 12 }}> Todo</MenuItem>
                                <MenuItem value="in-progress" sx={{ fontSize: 12 }}> In Progress</MenuItem>
                                <MenuItem value="done" sx={{ fontSize: 12 }}> Done</MenuItem>
                            </Select>

                            <IconButton size="small" onClick={() => handleOpen(task)}
                                sx={{ color: "#6b7280", "&:hover": { color: COLORS.primary } }}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton size="small" onClick={() => handleDelete(task._id)}
                                sx={{ color: "#6b7280", "&:hover": { color: "#dc2626" } }}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    ))
                )}
            </Paper>

            <Dialog open={open} onClose={() => { setOpen(false); setEditTask(null); }}
                maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 500, fontSize: 16 }}>
                    {editTask ? "Edit Task" : "New Task"}
                </DialogTitle>
                <DialogContent sx={{
                    display: "flex", flexDirection: "column",
                    gap: 2, pt: "16px !important"
                }}>
                    <TextField label="Title *" fullWidth size="small"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })} />

                    <TextField label="Description" fullWidth size="small"
                        multiline rows={2} value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })} />

                    <FormControl size="small" fullWidth>
                        <InputLabel>Workspace *</InputLabel>
                        <Select value={form.workspaceId} label="Workspace *"
                            onChange={(e) => handleWorkspaceChange(e.target.value)}>
                            {workspaces.map((ws) => (
                                <MenuItem key={ws._id} value={ws._id}>{ws.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {projects.length > 0 && (
                        <FormControl size="small" fullWidth>
                            <InputLabel>Project</InputLabel>
                            <Select value={form.projectId || ""} label="Project"
                                onChange={(e) => setForm({ ...form, projectId: e.target.value })}>
                                <MenuItem value=""><em>No project</em></MenuItem>
                                {projects.map((p) => (
                                    <MenuItem key={p._id} value={p._id}>{p.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}

                    <FormControl size="small" fullWidth>
                        <InputLabel>Priority</InputLabel>
                        <Select value={form.priority} label="Priority"
                            onChange={(e) => setForm({ ...form, priority: e.target.value as Task["priority"] })}>
                            <MenuItem value="low">Low</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size="small" fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select value={form.status} label="Status"
                            onChange={(e) => setForm({ ...form, status: e.target.value as Task["status"] })}>
                            <MenuItem value="todo">Todo</MenuItem>
                            <MenuItem value="in-progress">In Progress</MenuItem>
                            <MenuItem value="done">Done</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField label="Due Date" type="date" fullWidth size="small"
                        value={form.dueDate}
                        onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                        slotProps={{ inputLabel: { shrink: true } }} />
                     <Box sx={{
                                        mt: 1,
                                        p: 2,
                                        border: "1px dashed #d1d5db",
                                        borderRadius: 2,
                                        backgroundColor: "#fafafa"
                                    }}>
                                        <Typography variant="caption" sx={{ mb: 1, display: "block" }}>
                                            Attachment (Max 5MB)
                                        </Typography>
                    
                                        <Button
                                            variant="outlined"
                                            component="label"
                                            fullWidth
                                            size="small"
                                            sx={{ borderStyle: "dashed" }}
                                        >
                                            {form.file ? form.file.name : "Upload File"}
                                            <input
                                                type="file"
                                                hidden
                                                onChange={handleFileChange}
                                                accept="image/*,application/pdf"
                                            />
                                        </Button>
                                    </Box>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => { setOpen(false); setEditTask(null); }}
                        sx={{ color: "#6b7280" }}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}
                        disabled={!form.title || !form.workspaceId}
                        sx={{ bgcolor: COLORS.primary, "&:hover": { bgcolor: COLORS.primaryDark } }}>
                        {editTask ? "Update" : "Create"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default UserTaskPage;