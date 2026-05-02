import { useEffect, useState } from "react";
import {
    Box, Typography, Paper, Button, Avatar,
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Switch, FormControlLabel, CircularProgress,
    IconButton, Chip
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { fetchWorkspaces, createWorkspace, deleteWorkspace } from "../../store/slices/workspaceSlice";
import { COLORS } from "../../constants/theme";

const WorkspacePage = () => {
    const dispatch = useAppDispatch();
    const { workspaces, loading } = useAppSelector((state) => state.workspaces);

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        name: "",
        description: "",
        isPrivate: false
    });

    useEffect(() => {
        dispatch(fetchWorkspaces());
    }, [dispatch]);

    const handleSubmit = async () => {
        if (!form.name) return;
        await dispatch(createWorkspace(form));
        setOpen(false);
        setForm({ name: "", description: "", isPrivate: false });
    };

    const handleDelete = async (id: string) => {
        if (confirm("Delete this workspace?")) {
            await dispatch(deleteWorkspace(id));
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
                    <Typography variant="h5" sx={{ fontWeight: 600, color: "#111827" }}>
                        Workspaces
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: "text.secondary", mt: 0.5 }}>
                        {workspaces.length} workspaces
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
                    New Workspace
                </Button>
            </Box>

            {/* Workspace Grid */}
            <Box sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)"
                },
                gap: 2
            }}>
                {workspaces.length === 0 ? (
                    <Paper elevation={0} sx={{
                        p: 4, textAlign: "center",
                        border: "1px solid #e5e7eb",
                        borderRadius: 3,
                        gridColumn: "1 / -1"
                    }}>
                        <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                            No workspaces yet — create your first!
                        </Typography>
                    </Paper>
                ) : (
                    workspaces.map((ws) => (
                        <Paper key={ws._id} elevation={0} sx={{
                            p: 3,
                            border: "1px solid #e5e7eb",
                            borderRadius: 3,
                            "&:hover": { borderColor: COLORS.primary },
                            transition: "all 0.15s"
                        }}>
                            <Box sx={{
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "space-between",
                                mb: 2
                            }}>
                                <Avatar sx={{
                                    width: 40, height: 40,
                                    bgcolor: COLORS.primaryLight,
                                    color: COLORS.primary,
                                    fontSize: 16,
                                    fontWeight: 600
                                }}>
                                    {ws.name?.[0]?.toUpperCase()}
                                </Avatar>
                                <IconButton
                                    size="small"
                                    onClick={() => handleDelete(ws._id)}
                                    sx={{ color: "#6b7280", "&:hover": { color: "#dc2626" } }}
                                >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                            <Typography sx={{ fontWeight: 500, fontSize: 14, mb: 0.5 }}>
                                {ws.name}
                            </Typography>
                            <Typography sx={{
                                fontSize: 12, color: "text.secondary",
                                mb: 2, lineHeight: 1.5
                            }}>
                                {ws.description || "No description"}
                            </Typography>
                            <Chip
                                label={ws.isPrivate ? "Private" : "Public"}
                                size="small"
                                sx={{
                                    fontSize: 11, height: 22,
                                    bgcolor: ws.isPrivate ? "#FEF2F2" : COLORS.primaryLight,
                                    color: ws.isPrivate ? "#dc2626" : COLORS.primary,
                                }}
                            />
                        </Paper>
                    ))
                )}
            </Box>

            {/* Create Dialog */}
            <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 500, fontSize: 16 }}>
                    New Workspace
                </DialogTitle>
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
                    <FormControlLabel
                        control={
                            <Switch
                                checked={form.isPrivate}
                                onChange={(e) => setForm({ ...form, isPrivate: e.target.checked })}
                                sx={{
                                    "& .MuiSwitch-switchBase.Mui-checked": {
                                        color: COLORS.primary
                                    },
                                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                                        bgcolor: COLORS.primary
                                    }
                                }}
                            />
                        }
                        label={<Typography sx={{ fontSize: 13 }}>Private workspace</Typography>}
                    />
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

export default WorkspacePage;