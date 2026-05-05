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
import http from "../../utils/http";
import type { Task, TaskForm } from "../../interfaces/task";
import { toast } from "react-toastify";

const priorityColor: Record<string, string> = {
    high: "#dc2626", medium: "#d97706", low: "#16a34a"
};
const statusColor: Record<string, string> = {
    "todo": "#6b7280", "in-progress": "#d97706", "done": "#16a34a"
};

interface Member {
    _id: string;
    role: string;
    user: { _id: string; name: string; email: string; };
}

const AdminTasksPage = () => {
    const dispatch = useAppDispatch();
    const { tasks, loading } = useAppSelector((state) => state.tasks);
    const { workspaces } = useAppSelector((state) => state.workspaces);
    const { projects } = useAppSelector((state) => state.projects);

    const [open, setOpen] = useState(false);
    const [editTask, setEditTask] = useState<Task | null>(null);
    const [members, setMembers] = useState<Member[]>([]);
    const [form, setForm] = useState<TaskForm>({
        title: "",
        description: "",
        priority: "medium",
        status: "todo",
        dueDate: "",
        workspaceId: "",
        projectId: "",
        assignedTo: ""
    });

    useEffect(() => {
        dispatch(fetchTasks());
        dispatch(fetchWorkspaces());
    }, [dispatch]);

    const handleWorkspaceChange = async (workspaceId: string) => {
        if (!workspaceId) return;
        setForm({ ...form, workspaceId, assignedTo: undefined, projectId: undefined });
        dispatch(fetchProjects(workspaceId));
        try {
            const res = await http.get(`/workspaces/${workspaceId}/members`);
            setMembers(res.data.data);
        } catch { setMembers([]); }
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
                assignedTo: typeof task.assignedTo === "object"
        ? task.assignedTo._id
        : task.assignedTo || ""
                   
            });
        } else {
            setEditTask(null);
            setForm({
                title: "", description: "",
                priority: "medium", status: "todo",
                dueDate: "", workspaceId: "",
                projectId: "", assignedTo: ""
            });
            setMembers([]);
        }
        setOpen(true);
    };

    const handleSubmit = async () => {
        if (!form.title || !form.workspaceId) return;

        const cleanForm = {
          ...form,
           assignedTo: form.assignedTo || undefined,
           projectId: form.projectId || undefined,
           dueDate: form.dueDate || undefined
        };
        try {
            if (editTask) {
           await dispatch(updateTask({ id: editTask._id, data: cleanForm }));
           toast.success("Task updated successfully");
        } else {
           await dispatch(createTask(cleanForm));
           toast.success("Task created successfully", { type: "success"});
        }
        setOpen(false);
        setEditTask(null);
        dispatch(fetchTasks());

        }catch {
        toast.error("Something went wrong", {type: "error"});
    }
        

        
    };

    const handleDelete = async (id: string) => {
        if (confirm("Delete this task?")) {
            try {
            await dispatch(deleteTask(id)).unwrap();
            toast.success("Task deleted successfully", { type: "success"});
        } catch {
            toast.error("Failed to delete task", { type: "error"});
        }
        }
    };

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
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>All Tasks</Typography>
                    <Typography sx={{ fontSize: 13, color: "text.secondary", mt: 0.5 }}>
                        {tasks.length} tasks total
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
                <Box sx={{
                    px: 3, py: 1.5,
                    display: "grid",
                    gridTemplateColumns: "1fr 140px 110px 110px 80px",
                    gap: 2, bgcolor: "#f9fafb",
                    borderBottom: "1px solid #e5e7eb"
                }}>
                    {["Title", "Assigned To", "Priority", "Status", ""].map((h) => (
                        <Typography key={h} sx={{
                            fontSize: 11, fontWeight: 500,
                            color: "text.secondary",
                            textTransform: "uppercase", letterSpacing: 0.5
                        }}>
                            {h}
                        </Typography>
                    ))}
                </Box>

                {tasks.length === 0 ? (
                    <Box sx={{ p: 4, textAlign: "center" }}>
                        <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
                            No tasks yet — create one!
                        </Typography>
                    </Box>
                ) : (
                    tasks.filter((task): task is Task => task !== null)
                    .map((task) => (
                        <Box key={task._id} sx={{
                            px: 3, py: 2,
                            display: "grid",
                            gridTemplateColumns: "1fr 140px 110px 110px 80px",
                            gap: 2, alignItems: "center",
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
                                {task.dueDate && (
                                    <Typography sx={{ fontSize: 11, color: "text.secondary" }}>
                                        Due: {new Date(task.dueDate).toLocaleDateString()}
                                    </Typography>
                                )}
                            </Box>

                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                {task.assignedTo && typeof task.assignedTo === "object" ? (
                                    <>
                                        <Avatar sx={{
                                            width: 22, height: 22,
                                            bgcolor: COLORS.primaryLight,
                                            color: COLORS.primary, fontSize: 10
                                        }}>
                                             {task.assignedTo?.name ? task.assignedTo.name[0].toUpperCase() : "?"}
                                        </Avatar>
                                        <Typography sx={{ fontSize: 12 }}>
                                            {task.assignedTo?.name || "Unknown User"}
                                        </Typography>
                                    </>
                                ) : task.assignedTo ? (
                                        /* Yedi assignedTo string matra ho bhane ID matra dekhaucha or Loading state */
                                        <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                                            User Assigned (ID: {String(task.assignedTo).substring(0, 5)}...)
                                        </Typography>
                                    ) : (
                                    <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                                        Unassigned
                                    </Typography>
                                )}
                            </Box>

                            <Chip label={task.priority} size="small" sx={{
                                fontSize: 11, height: 22, width: "fit-content",
                                bgcolor: `${priorityColor[task.priority]}15`,
                                color: priorityColor[task.priority], fontWeight: 500
                            }} />

                            <Chip label={task.status} size="small" sx={{
                                fontSize: 11, height: 22, width: "fit-content",
                                bgcolor: `${statusColor[task.status]}15`,
                                color: statusColor[task.status], fontWeight: 500
                            }} />

                            <Box sx={{ display: "flex", gap: 0.5 }}>
                                <IconButton size="small" onClick={() => handleOpen(task)}
                                    sx={{ color: "#6b7280", "&:hover": { color: COLORS.primary } }}>
                                    <EditIcon fontSize="small" />
                                </IconButton>
                                <IconButton size="small" onClick={() => handleDelete(task._id)}
                                    sx={{ color: "#6b7280", "&:hover": { color: "#dc2626" } }}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
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

                    {members.length > 0 && (
                        <FormControl size="small" fullWidth>
                            <InputLabel>Assign To</InputLabel>
                            <Select value={form.assignedTo || ""} label="Assign To"
                                onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}>
                                <MenuItem value=""><em>Unassigned</em></MenuItem>
                                {members.map((m) => (
                                    <MenuItem key={m.user._id} value={m.user._id}>
                                        {m.user.name} — {m.user.email}
                                    </MenuItem>
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

export default AdminTasksPage;