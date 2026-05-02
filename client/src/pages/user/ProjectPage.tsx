import { useEffect, useState } from "react";
import {
    Box, Typography, Paper, Button, Avatar,
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Select, MenuItem, FormControl,
    InputLabel, CircularProgress, IconButton
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { fetchProjects, createProject, deleteProject } from "../../store/slices/projectSlice";
import { fetchWorkspaces } from "../../store/slices/workspaceSlice";
import { COLORS } from "../../constants/theme";

const ProjectPage = () => {
    const dispatch = useAppDispatch();
    const { projects, loading } = useAppSelector((state) => state.projects);
    const { workspaces } = useAppSelector((state) => state.workspaces);

    const [open, setOpen] = useState(false);
    const [selectedWorkspace, setSelectedWorkspace] = useState("");
    const [form, setForm] = useState({
        name: "",
        description: "",
        workspace: ""
    });

    useEffect(() => {
        dispatch(fetchWorkspaces());
    }, [dispatch]);

    useEffect(() => {
        if (selectedWorkspace) {
            dispatch(fetchProjects(selectedWorkspace));
        }
    }, [selectedWorkspace, dispatch]);

    const handleSubmit = async () => {
        if (!form.name || !form.workspace) return;
        await dispatch(createProject(form));
        setOpen(false);
        setForm({ name: "", description: "", workspace: "" });
    };

    const handleDelete = async (id: string) => {
        if (confirm("Delete this project?")) {
            await dispatch(deleteProject(id));
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
            <Box sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3
            }}>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        Projects
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: "text.secondary", mt: 0.5 }}>
                        {projects.length} projects
                    </Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setOpen(true)}
                    sx={{
                        bgcolor: COLORS.primary,
                        "&:hover": { bgcolor: COLORS.primaryDark },
                        fontSize: 13
                    }}
                >
                    New Project
                </Button>
            </Box>

            {/* Workspace Filter */}
            <FormControl size="small" sx={{ mb: 3, minWidth: 200 }}>
                <InputLabel>Filter by Workspace</InputLabel>
                <Select
                    value={selectedWorkspace}
                    label="Filter by Workspace"
                    onChange={(e) => setSelectedWorkspace(e.target.value)}
                >
                    {workspaces.map((ws) => (
                        <MenuItem key={ws._id} value={ws._id}>{ws.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Projects Grid */}
            <Box sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)"
                },
                gap: 2
            }}>
                {projects.length === 0 ? (
                    <Paper elevation={0} sx={{
                        p: 4, textAlign: "center",
                        border: "1px solid #e5e7eb",
                        borderRadius: 3,
                        gridColumn: "1 / -1"
                    }}>
                        <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                            {selectedWorkspace
                                ? "No projects in this workspace"
                                : "Select a workspace to see projects"
                            }
                        </Typography>
                    </Paper>
                ) : (
                    projects.map((project) => (
                        <Paper key={project._id} elevation={0} sx={{
                            p: 3,
                            border: "1px solid #e5e7eb",
                            borderRadius: 3,
                            "&:hover": { borderColor: COLORS.primary },
                            transition: "all 0.15s"
                        }}>
                            <Box sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                mb: 2
                            }}>
                                <Avatar sx={{
                                    width: 40, height: 40,
                                    bgcolor: COLORS.primaryLight,
                                    color: COLORS.primary,
                                    fontSize: 16,
                                    fontWeight: 600
                                }}>
                                    {project.name?.[0]?.toUpperCase()}
                                </Avatar>
                                <IconButton
                                    size="small"
                                    onClick={() => handleDelete(project._id)}
                                    sx={{ color: "#6b7280", "&:hover": { color: "#dc2626" } }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                            <Typography sx={{ fontWeight: 500, fontSize: 14, mb: 0.5 }}>
                                {project.name}
                            </Typography>
                            <Typography sx={{ fontSize: 12, color: "text.secondary", lineHeight: 1.5 }}>
                                {project.description || "No description"}
                            </Typography>
                        </Paper>
                    ))
                )}
            </Box>

            {/* Create Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 500, fontSize: 16 }}>New Project</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
                    <TextField
                        label="Name"
                        fullWidth
                        size="small"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        size="small"
                        multiline
                        rows={2}
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                    />
                    <FormControl size="small" fullWidth>
                        <InputLabel>Workspace</InputLabel>
                        <Select
                            value={form.workspace}
                            label="Workspace"
                            onChange={(e) => setForm({ ...form, workspace: e.target.value })}
                        >
                            {workspaces.map((ws) => (
                                <MenuItem key={ws._id} value={ws._id}>{ws.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setOpen(false)} sx={{ color: "#6b7280" }}>
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
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProjectPage;