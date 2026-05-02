// import { useEffect, useState } from "react";
// import {
//     Box,
//     Typography,
//     Paper,
//     Button,
//     Avatar,
//     Dialog,
//     DialogTitle,
//     DialogContent,
//     DialogActions,
//     TextField,
//     Switch,
//     FormControlLabel,
//     CircularProgress,
//     IconButton,
//     Chip
// } from "@mui/material";

// import {
//     Add as AddIcon,
//     Delete as DeleteIcon
// } from "@mui/icons-material";

// import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
// import {
//     fetchWorkspaces,
//     createWorkspace,
//     deleteWorkspace
// } from "../../store/slices/workspaceSlice";

// import { COLORS } from "../../constants/theme";

// const AdminWorkspacePage = () => {
//     const dispatch = useAppDispatch();
//     const { workspaces, loading } = useAppSelector((state) => state.workspaces);

//     const [createOpen, setCreateOpen] = useState(false);

//     const [form, setForm] = useState({
//         name: "",
//         description: "",
//         isPrivate: false
//     });

//     useEffect(() => {
//         dispatch(fetchWorkspaces());
//     }, [dispatch]);

//     // Create workspace
//     const handleCreate = async () => {
//         if (!form.name) return;

//         await dispatch(createWorkspace(form));

//         setCreateOpen(false);
//         setForm({
//             name: "",
//             description: "",
//             isPrivate: false
//         });
//     };

//     // Delete workspace (global admin / owner permission backend handles it)
//     const handleDelete = async (id: string) => {
//         if (confirm("Are you sure you want to delete this workspace?")) {
//             await dispatch(deleteWorkspace(id));
//         }
//     };

//     if (loading) {
//         return (
//             <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
//                 <CircularProgress sx={{ color: COLORS.primary }} />
//             </Box>
//         );
//     }

//     return (
//         <Box>

//             {/* HEADER */}
//             <Box sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 mb: 3
//             }}>
//                 <Box>
//                     <Typography variant="h5" sx={{ fontWeight: 600 }}>
//                         Workspaces
//                     </Typography>

//                     <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
//                         {workspaces.length} total workspaces
//                     </Typography>
//                 </Box>

//                 <Button
//                     variant="contained"
//                     startIcon={<AddIcon />}
//                     onClick={() => setCreateOpen(true)}
//                     sx={{
//                         bgcolor: COLORS.primary,
//                         "&:hover": { bgcolor: COLORS.primaryDark }
//                     }}
//                 >
//                     New Workspace
//                 </Button>
//             </Box>

//             {/* WORKSPACE GRID */}
//             <Box
//                 sx={{
//                     display: "grid",
//                     gridTemplateColumns: {
//                         xs: "1fr",
//                         sm: "repeat(2, 1fr)",
//                         md: "repeat(3, 1fr)"
//                     },
//                     gap: 2
//                 }}
//             >
//                 {workspaces.length === 0 ? (
//                     <Paper
//                         elevation={0}
//                         sx={{
//                             p: 4,
//                             textAlign: "center",
//                             border: "1px solid #e5e7eb",
//                             borderRadius: 3,
//                             gridColumn: "1 / -1"
//                         }}
//                     >
//                         <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
//                             No workspaces found
//                         </Typography>
//                     </Paper>
//                 ) : (
//                     workspaces.map((ws) => (
//                         <Paper
//                             key={ws._id}
//                             elevation={0}
//                             sx={{
//                                 p: 3,
//                                 border: "1px solid #e5e7eb",
//                                 borderRadius: 3,
//                                 "&:hover": {
//                                     borderColor: COLORS.primary
//                                 }
//                             }}
//                         >
//                             {/* TOP */}
//                             <Box sx={{
//                                 display: "flex",
//                                 justifyContent: "space-between",
//                                 mb: 2
//                             }}>
//                                 <Avatar
//                                     sx={{
//                                         width: 40,
//                                         height: 40,
//                                         bgcolor: COLORS.primaryLight,
//                                         color: COLORS.primary,
//                                         fontWeight: 600
//                                     }}
//                                 >
//                                     {ws.name?.[0]?.toUpperCase()}
//                                 </Avatar>

//                                 <IconButton
//                                     size="small"
//                                     onClick={() => handleDelete(ws._id)}
//                                     sx={{
//                                         color: "#6b7280",
//                                         "&:hover": { color: "#dc2626" }
//                                     }}
//                                 >
//                                     <DeleteIcon fontSize="small" />
//                                 </IconButton>
//                             </Box>

//                             {/* INFO */}
//                             <Typography sx={{ fontWeight: 600, fontSize: 15 }}>
//                                 {ws.name}
//                             </Typography>

//                             <Typography
//                                 sx={{
//                                     fontSize: 12,
//                                     color: "text.secondary",
//                                     mt: 0.5,
//                                     mb: 2
//                                 }}
//                             >
//                                 {ws.description || "No description"}
//                             </Typography>

//                             {/* STATUS */}
//                             <Chip
//                                 label={ws.isPrivate ? "Private" : "Public"}
//                                 size="small"
//                                 sx={{
//                                     fontSize: 11,
//                                     height: 22,
//                                     bgcolor: ws.isPrivate
//                                         ? "#FEF2F2"
//                                         : COLORS.primaryLight,
//                                     color: ws.isPrivate
//                                         ? "#dc2626"
//                                         : COLORS.primary
//                                 }}
//                             />
//                         </Paper>
//                     ))
//                 )}
//             </Box>

//             {/* CREATE WORKSPACE DIALOG */}
//             <Dialog
//                 open={createOpen}
//                 onClose={() => setCreateOpen(false)}
//                 fullWidth
//                 maxWidth="sm"
//             >
//                 <DialogTitle sx={{ fontWeight: 600 }}>
//                     Create Workspace
//                 </DialogTitle>

//                 <DialogContent sx={{ pt: 2 }}>

//                     <TextField
//                         fullWidth
//                         label="Name"
//                         size="small"
//                         value={form.name}
//                         onChange={(e) =>
//                             setForm({ ...form, name: e.target.value })
//                         }
//                         sx={{ mb: 2 }}
//                     />

//                     <TextField
//                         fullWidth
//                         label="Description"
//                         size="small"
//                         multiline
//                         rows={2}
//                         value={form.description}
//                         onChange={(e) =>
//                             setForm({
//                                 ...form,
//                                 description: e.target.value
//                             })
//                         }
//                         sx={{ mb: 2 }}
//                     />

//                     <FormControlLabel
//                         control={
//                             <Switch
//                                 checked={form.isPrivate}
//                                 onChange={(e) =>
//                                     setForm({
//                                         ...form,
//                                         isPrivate: e.target.checked
//                                     })
//                                 }
//                             />
//                         }
//                         label="Private workspace"
//                     />

//                 </DialogContent>

//                 <DialogActions>
//                     <Button onClick={() => setCreateOpen(false)}>
//                         Cancel
//                     </Button>

//                     <Button
//                         variant="contained"
//                         onClick={handleCreate}
//                         sx={{
//                             bgcolor: COLORS.primary,
//                             "&:hover": { bgcolor: COLORS.primaryDark }
//                         }}
//                     >
//                         Create
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//         </Box>
//     );
// };

// export default AdminWorkspacePage;

import { useEffect, useState } from "react";
import {
    Box, Typography, Paper, Button, Avatar,
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Switch, FormControlLabel, CircularProgress,
    IconButton, Chip, Select, MenuItem, FormControl, InputLabel, List,
    ListItem, ListItemAvatar, ListItemText
} from "@mui/material";
import {
    Add as AddIcon, Delete as DeleteIcon,
    Group as GroupIcon, Close as CloseIcon
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { fetchWorkspaces, createWorkspace, deleteWorkspace } from "../../store/slices/workspaceSlice";
import { fetchUsers } from "../../store/slices/userSlice";
import { COLORS } from "../../constants/theme";
import http from "../../utils/http";
import type { Workspace, WorkspaceMember } from "../../interfaces/workspace";

const AdminWorkspacePage = () => {
    const dispatch = useAppDispatch();
    const { workspaces, loading } = useAppSelector((state) => state.workspaces);
    const { users } = useAppSelector((state) => state.users);

    const [createOpen, setCreateOpen] = useState(false);
    const [membersOpen, setMembersOpen] = useState(false);
    const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);
    const [members, setMembers] = useState<WorkspaceMember[]>([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [form, setForm] = useState({
        name: "", description: "", isPrivate: false
    });

    useEffect(() => {
        dispatch(fetchWorkspaces());
        dispatch(fetchUsers());
    }, [dispatch]);

    const fetchMembers = async (workspaceId: string) => {
        try {
            const res = await http.get(`/workspaces/${workspaceId}/members`);
            setMembers(res.data.data);
        } catch { setMembers([]); }
    };

    const handleOpenMembers = async (ws: Workspace) => {
        setSelectedWorkspace(ws);
        await fetchMembers(ws._id);
        setMembersOpen(true);
    };

    const handleAddMember = async () => {
        if (!selectedUser || !selectedWorkspace) return;
        try {
            await http.post(`/workspaces/${selectedWorkspace._id}/members`, {
                userId: selectedUser
            });
            await fetchMembers(selectedWorkspace._id);
            setSelectedUser("");
        } catch (err) { console.error(err); }
    };

    const handleRemoveMember = async (userId: string) => {
        if (!confirm("Remove this member?")) return;
        if (!selectedWorkspace) return;
        try {
            await http.delete(`/workspaces/${selectedWorkspace._id}/members`, {
                data: { userId }
            });
            await fetchMembers(selectedWorkspace._id);
        } catch (err) { console.error(err); }
    };

    const handleCreate = async () => {
        if (!form.name) return;
        await dispatch(createWorkspace(form));
        setCreateOpen(false);
        setForm({ name: "", description: "", isPrivate: false });
    };

    const handleDelete = async (id: string) => {
        if (confirm("Delete this workspace?")) {
            await dispatch(deleteWorkspace(id));
        }
    };

    const memberIds = members.map(m => m.user?._id);
    const nonMembers = users.filter(u => !memberIds.includes(u._id));

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
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>Workspaces</Typography>
                    <Typography sx={{ fontSize: 13, color: "text.secondary", mt: 0.5 }}>
                        {workspaces.length} workspaces
                    </Typography>
                </Box>
                <Button variant="contained" startIcon={<AddIcon />}
                    onClick={() => setCreateOpen(true)}
                    sx={{
                        bgcolor: COLORS.primary,
                        "&:hover": { bgcolor: COLORS.primaryDark }, fontSize: 13
                    }}>
                    New Workspace
                </Button>
            </Box>

            <Box sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
                gap: 2
            }}>
                {workspaces.length === 0 ? (
                    <Paper elevation={0} sx={{
                        p: 4, textAlign: "center",
                        border: "1px solid #e5e7eb",
                        borderRadius: 3, gridColumn: "1 / -1"
                    }}>
                        <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                            No workspaces yet
                        </Typography>
                    </Paper>
                ) : (
                    workspaces.map((ws) => (
                        <Paper key={ws._id} elevation={0} sx={{
                            p: 3, border: "1px solid #e5e7eb", borderRadius: 3,
                            "&:hover": { borderColor: COLORS.primary }, transition: "all 0.15s"
                        }}>
                            <Box sx={{
                                display: "flex", justifyContent: "space-between",
                                alignItems: "flex-start", mb: 2
                            }}>
                                <Avatar sx={{
                                    width: 40, height: 40,
                                    bgcolor: COLORS.primaryLight,
                                    color: COLORS.primary, fontSize: 16, fontWeight: 600
                                }}>
                                    {ws.name?.[0]?.toUpperCase()}
                                </Avatar>
                                <Box sx={{ display: "flex", gap: 0.5 }}>
                                    <IconButton size="small"
                                        onClick={() => handleOpenMembers(ws)}
                                        sx={{ color: "#6b7280", "&:hover": { color: COLORS.primary } }}>
                                        <GroupIcon fontSize="small" />
                                    </IconButton>
                                    <IconButton size="small"
                                        onClick={() => handleDelete(ws._id)}
                                        sx={{ color: "#6b7280", "&:hover": { color: "#dc2626" } }}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Typography sx={{ fontWeight: 500, fontSize: 14, mb: 0.5 }}>
                                {ws.name}
                            </Typography>
                            <Typography sx={{ fontSize: 12, color: "text.secondary", mb: 2, lineHeight: 1.5 }}>
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

            {/* Create Workspace Dialog */}
            <Dialog open={createOpen} onClose={() => setCreateOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 500, fontSize: 16 }}>New Workspace</DialogTitle>
                <DialogContent sx={{
                    display: "flex", flexDirection: "column",
                    gap: 2, pt: "16px !important"
                }}>
                    <TextField label="Name" fullWidth size="small"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                    <TextField label="Description" fullWidth size="small"
                        multiline rows={2} value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })} />
                    <FormControlLabel
                        control={
                            <Switch checked={form.isPrivate}
                                onChange={(e) => setForm({ ...form, isPrivate: e.target.checked })}
                                sx={{
                                    "& .MuiSwitch-switchBase.Mui-checked": { color: COLORS.primary },
                                    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: COLORS.primary }
                                }} />
                        }
                        label={<Typography sx={{ fontSize: 13 }}>Private workspace</Typography>}
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={() => setCreateOpen(false)} sx={{ color: "#6b7280" }}>Cancel</Button>
                    <Button variant="contained" onClick={handleCreate}
                        sx={{ bgcolor: COLORS.primary, "&:hover": { bgcolor: COLORS.primaryDark } }}>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Members Dialog */}
            <Dialog open={membersOpen} onClose={() => setMembersOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 500, fontSize: 16, pb: 1 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span>{selectedWorkspace?.name} — Members</span>
                        <IconButton size="small" onClick={() => setMembersOpen(false)}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent sx={{ pt: "8px !important" }}>

                    {/* Add member */}
                    {nonMembers.length > 0 && (
                        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                            <FormControl size="small" fullWidth>
                                <InputLabel>Add member</InputLabel>
                                <Select value={selectedUser} label="Add member"
                                    onChange={(e) => setSelectedUser(e.target.value)}>
                                    {nonMembers.map((u) => (
                                        <MenuItem key={u._id} value={u._id}>
                                            {u.name} — {u.email}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button variant="contained"
                                onClick={handleAddMember}
                                disabled={!selectedUser}
                                sx={{
                                    bgcolor: COLORS.primary,
                                    "&:hover": { bgcolor: COLORS.primaryDark },
                                    minWidth: 80, fontSize: 13
                                }}>
                                Add
                            </Button>
                        </Box>
                    )}

                    {/* Members list */}
                    <List disablePadding>
                        {members.length === 0 ? (
                            <Typography sx={{
                                fontSize: 13, color: "text.secondary",
                                textAlign: "center", py: 2
                            }}>
                                No members yet
                            </Typography>
                        ) : (
                            members.map((member) => (
                                <ListItem key={member._id}
                                    disablePadding
                                    sx={{
                                        py: 1,
                                        borderBottom: "1px solid #f3f4f6",
                                        "&:last-child": { borderBottom: "none" }
                                    }}
                                    secondaryAction={
                                        member.role !== "owner" && (
                                            <IconButton size="small"
                                                onClick={() => handleRemoveMember(member.user?._id)}
                                                sx={{ color: "#6b7280", "&:hover": { color: "#dc2626" } }}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        )
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar sx={{
                                            width: 32, height: 32,
                                            bgcolor: COLORS.primaryLight,
                                            color: COLORS.primary, fontSize: 13
                                        }}>
                                            {member.user?.name?.[0]?.toUpperCase()}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                                                    {member.user?.name}
                                                </Typography>
                                                <Chip label={member.role} size="small" sx={{
                                                    fontSize: 10, height: 20,
                                                    bgcolor: member.role === "owner"
                                                        ? COLORS.primaryLight : "#f3f4f6",
                                                    color: member.role === "owner"
                                                        ? COLORS.primary : "#374151",
                                                }} />
                                            </Box>
                                        }
                                        secondary={
                                            <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                                                {member.user?.email}
                                            </Typography>
                                        }
                                    />
                                </ListItem>
                            ))
                        )}
                    </List>
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default AdminWorkspacePage;