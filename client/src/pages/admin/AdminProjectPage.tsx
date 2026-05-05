import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  CircularProgress,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import {
  fetchAllProjects,
  deleteProject,
} from "../../store/slices/projectSlice";
import { COLORS } from "../../constants/theme";
import type { Project } from "../../interfaces/project";

const AdminProjectPage = () => {
  const dispatch = useAppDispatch();
  const { projects, loading } = useAppSelector((state) => state.projects);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this project? This action is permanent.")) {
      await dispatch(deleteProject(id));
    }
  };

  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress sx={{ color: COLORS.primary }} />
      </Box>
    );

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            All Projects
          </Typography>
          <Typography variant="body2" color="text.secondary">
            View and manage all projects across workspaces
          </Typography>
        </Box>

        <TextField
          size="small"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
          sx={{ width: 260 }}
        />
      </Box>

      <Paper
        elevation={0}
        sx={{
          border: "1px solid #e5e7eb",
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 3,
            py: 1.5,
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 180px 120px 80px",
            gap: 2,
            bgcolor: "#f9fafb",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          {["Project", "Workspace", "Created By", "Date", ""].map((h) => (
            <Typography
              key={h}
              sx={{
                fontSize: 11,
                fontWeight: 500,
                color: "text.secondary",
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              {h}
            </Typography>
          ))}
        </Box>

        {/* Body */}
        {filteredProjects.length === 0 ? (
          <Box sx={{ p: 4, textAlign: "center" }}>
            <Typography sx={{ color: "text.secondary", fontSize: 13 }}>
              No projects found
            </Typography>
          </Box>
        ) : (
          filteredProjects.map((project: Project) => (
            <Box
              key={project._id}
              sx={{
                px: 3,
                py: 2,
                display: "grid",
                gridTemplateColumns: "1.5fr 1fr 180px 120px 80px",
                gap: 2,
                alignItems: "center",
                borderBottom: "1px solid #f3f4f6",
                "&:last-child": { borderBottom: "none" },
                "&:hover": { bgcolor: "#f9fafb" },
              }}
            >
              {/* Project */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    fontSize: 12,
                    bgcolor: COLORS.primaryLight,
                    color: COLORS.primary,
                  }}
                >
                  {project.name[0].toUpperCase()}
                </Avatar>
                <Typography sx={{ fontSize: 13, fontWeight: 500 }}>
                  {project.name}
                </Typography>
              </Box>

              {/* Workspace */}
              <Chip
                label={project.workspace?.name || "—"}
                size="small"
                sx={{
                  fontSize: 11,
                  bgcolor: COLORS.primaryLight,
                  color: COLORS.primaryDark,
                  justifySelf: "start",
                  maxWidth: "100%", 
                }}
              />

              {/* Created By */}
              <Box>
                <Typography sx={{ fontSize: 13 }}>
                  {project.createdBy?.name || "—"}
                </Typography>
                <Typography sx={{ fontSize: 11, color: "text.secondary" }}>
                  {project.createdBy?.email}
                </Typography>
              </Box>

              {/* Date */}
              <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                {new Date(project.createdAt).toLocaleDateString()}
              </Typography>

              {/* Actions */}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <IconButton
                  size="small"
                  onClick={() => handleDelete(project._id)}
                  sx={{ color: "#9ca3af", "&:hover": { color: "#dc2626" } }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          ))
        )}
      </Paper>
    </Box>
  );
};

export default AdminProjectPage;
