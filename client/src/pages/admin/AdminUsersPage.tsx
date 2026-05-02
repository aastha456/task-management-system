import { useEffect } from "react";
import {
    Box, Typography, Paper, Avatar,
    Chip, IconButton, CircularProgress
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { fetchUsers, deleteUser } from "../../store/slices/userSlice";
import { COLORS } from "../../constants/theme";

const AdminUsersPage = () => {
    const dispatch = useAppDispatch();
    const { users, loading } = useAppSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleDelete = async (id: string) => {
        if (confirm("Delete this user?")) {
            await dispatch(deleteUser(id));
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
            <Box sx={{ mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Manage Users
                </Typography>
                <Typography sx={{ fontSize: 13, color: "text.secondary", mt: 0.5 }}>
                    {users.length} users total
                </Typography>
            </Box>

            <Paper elevation={0} sx={{
                border: "1px solid #e5e7eb",
                borderRadius: 3,
                overflow: "hidden"
            }}>
                {/* Table Header */}
                <Box sx={{
                    px: 3, py: 1.5,
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 120px 48px",
                    gap: 2,
                    bgcolor: "#f9fafb",
                    borderBottom: "1px solid #e5e7eb"
                }}>
                    {["Name", "Email", "Role", ""].map((h) => (
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

                {/* Table Rows */}
                {users.map((user) => (
                    <Box key={user._id} sx={{
                        px: 3, py: 2,
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 120px 48px",
                        gap: 2,
                        alignItems: "center",
                        borderBottom: "1px solid #f3f4f6",
                        "&:last-child": { borderBottom: "none" },
                        "&:hover": { bgcolor: "#f9fafb" }
                    }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Avatar sx={{
                                width: 30, height: 30,
                                bgcolor: COLORS.primaryLight,
                                color: COLORS.primary,
                                fontSize: 12
                            }}>
                                {user.name?.[0]?.toUpperCase()}
                            </Avatar>
                            <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                                {user.name}
                            </Typography>
                        </Box>
                        <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                            {user.email}
                        </Typography>
                        <Chip
                            label={user.role}
                            size="small"
                            sx={{
                                fontSize: 11, height: 22,
                                width: "fit-content",
                                bgcolor: user.role === "admin"
                                    ? COLORS.primaryLight
                                    : "#f3f4f6",
                                color: user.role === "admin"
                                    ? COLORS.primary
                                    : "#374151",
                                fontWeight: 500
                            }}
                        />
                        <IconButton
                            size="small"
                            onClick={() => handleDelete(user._id)}
                            sx={{ color: "#6b7280", "&:hover": { color: "#dc2626" } }}
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                ))}
            </Paper>
        </Box>
    );
};

export default AdminUsersPage;