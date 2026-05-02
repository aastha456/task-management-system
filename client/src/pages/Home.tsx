import {
    Box, Typography, Button, Container
} from "@mui/material";
import { useNavigate } from "react-router";

import TaskAltIcon from "@mui/icons-material/TaskAlt";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import SecurityIcon from "@mui/icons-material/Security";
import InsightsIcon from "@mui/icons-material/Insights";

import { COLORS } from "../constants/theme";

const LandingPage = () => {
    const navigate = useNavigate();

    const features = [
        {
            icon: <TaskAltIcon sx={{ color: COLORS.primary, fontSize: 28 }} />,
            title: "Task Tracking",
            desc: "Create, assign and track tasks across projects with ease."
        },
        {
            icon: <GroupWorkIcon sx={{ color: COLORS.primary, fontSize: 28 }} />,
            title: "Team Workspaces",
            desc: "Organize your team into focused workspaces and projects."
        },
        {
            icon: <SecurityIcon sx={{ color: COLORS.primary, fontSize: 28 }} />,
            title: "Role-based Access",
            desc: "Owner, admin and member permissions per workspace."
        },
        {
            icon: <InsightsIcon sx={{ color: COLORS.primary, fontSize: 28 }} />,
            title: "Progress Dashboard",
            desc: "Track task status and team progress at a glance."
        },
    ];

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#faf8ff" }}>

            {/* NAVBAR */}
            <Box sx={{
                px: 4, py: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                bgcolor: "white",
                borderBottom: "1px solid #e5e7eb",
                position: "sticky",
                top: 0,
                zIndex: 10
            }}>
                {/* Logo */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box sx={{
                        width: 32, height: 32,
                        bgcolor: COLORS.primary,
                        borderRadius: 1.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <Typography sx={{ color: "white", fontSize: 18 }}>✓</Typography>
                    </Box>
                    <Typography sx={{ fontWeight: 600, fontSize: 16 }}>
                        FlowTask
                    </Typography>
                </Box>

                {/* Nav buttons */}
                <Box sx={{ display: "flex", gap: 1.5 }}>
                    <Button
                        onClick={() => navigate("/login")}
                        sx={{
                            textTransform: "none",
                            color: "#374151",
                            fontSize: 13,
                            fontWeight: 500
                        }}
                    >
                        Sign in
                    </Button>
                    <Button
                        onClick={() => navigate("/register")}
                        variant="contained"
                        sx={{
                            textTransform: "none",
                            bgcolor: COLORS.primary,
                            "&:hover": { bgcolor: COLORS.primaryDark },
                            fontSize: 13,
                            fontWeight: 500,
                            borderRadius: 2,
                            px: 2.5
                        }}
                    >
                        Get started
                    </Button>
                </Box>
            </Box>

            {/* HERO */}
            <Container maxWidth="lg">
                <Box sx={{
                    textAlign: "center",
                    py: 10,
                    px: 2
                }}>
                    {/* Tag */}
                    <Box sx={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 1,
                        bgcolor: COLORS.primaryLight,
                        color: COLORS.primaryDark,
                        fontSize: 12,
                        fontWeight: 500,
                        px: 2,
                        py: 0.6,
                        borderRadius: 20,
                        mb: 3
                    }}>
                        <Box sx={{
                            width: 6, height: 6,
                            bgcolor: COLORS.primary,
                            borderRadius: "50%"
                        }} />
                        Simple. Focused. Productive.
                    </Box>

                    <Typography
                        variant="h3"
                        sx={{
                            fontWeight: 600,
                            color: "#111827",
                            mb: 2,
                            lineHeight: 1.2
                        }}
                    >
                        Manage tasks,{" "}
                        <Box component="span" sx={{ color: COLORS.primary }}>
                            not complexity
                        </Box>
                    </Typography>

                    <Typography sx={{
                        fontSize: 16,
                        color: "#6b7280",
                        mb: 5,
                        maxWidth: 480,
                        mx: "auto",
                        lineHeight: 1.7
                    }}>
                        A clean workspace for teams to plan, track, and ship work — without the clutter.
                    </Typography>

                    {/* CTA Buttons */}
                    <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                        <Button
                            onClick={() => navigate("/register")}
                            variant="contained"
                            size="large"
                            sx={{
                                textTransform: "none",
                                bgcolor: COLORS.primary,
                                "&:hover": { bgcolor: COLORS.primaryDark },
                                fontSize: 14,
                                fontWeight: 500,
                                borderRadius: 2,
                                px: 4,
                                py: 1.4
                            }}
                        >
                            Start for free
                        </Button>
                        <Button
                            onClick={() => navigate("/login")}
                            variant="outlined"
                            size="large"
                            sx={{
                                textTransform: "none",
                                borderColor: "#d1d5db",
                                color: "#374151",
                                fontSize: 14,
                                fontWeight: 500,
                                borderRadius: 2,
                                px: 4,
                                py: 1.4,
                                "&:hover": {
                                    borderColor: COLORS.primary,
                                    color: COLORS.primary,
                                    bgcolor: "transparent"
                                }
                            }}
                        >
                            Sign in
                        </Button>
                    </Box>

                    {/* Stats */}
                    <Box sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 6,
                        mt: 8,
                        pt: 6,
                        borderTop: "1px solid #e5e7eb"
                    }}>
                        {[
                            { num: "3k+", label: "Teams using it" },
                            { num: "99%", label: "Uptime" },
                            { num: "5min", label: "Setup time" },
                        ].map((stat) => (
                            <Box key={stat.label} sx={{ textAlign: "center" }}>
                                <Typography sx={{
                                    fontSize: 24,
                                    fontWeight: 600,
                                    color: "#111827"
                                }}>
                                    {stat.num}
                                </Typography>
                                <Typography sx={{
                                    fontSize: 13,
                                    color: "#6b7280"
                                }}>
                                    {stat.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Container>

            {/* FEATURES */}
            <Box sx={{ bgcolor: "white", py: 10, borderTop: "1px solid #e5e7eb" }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 600,
                            textAlign: "center",
                            mb: 1,
                            color: "#111827"
                        }}
                    >
                        Everything your team needs
                    </Typography>
                    <Typography sx={{
                        textAlign: "center",
                        color: "#6b7280",
                        fontSize: 14,
                        mb: 6
                    }}>
                        Simple tools to keep your team aligned and productive
                    </Typography>

                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                            md: "repeat(4, 1fr)"
                        },
                        gap: 3
                    }}>
                        {features.map((f) => (
                            <Box
                                key={f.title}
                                sx={{
                                    p: 3,
                                    border: "1px solid #e5e7eb",
                                    borderRadius: 3,
                                    bgcolor: "white",
                                    boxShadow: "0 4px 20px rgba(124,58,237,0.08)",
                                    "&:hover": {
                                        borderColor: COLORS.primary,
                                        bgcolor: COLORS.primaryLight
                                    },
                                    transition: "all 0.2s"
                                }}
                            >
                                <Box sx={{ mb: 1.5 }}>{f.icon}</Box>
                                <Typography sx={{
                                    fontWeight: 600,
                                    fontSize: 14,
                                    mb: 0.8,
                                    color: "#111827"
                                }}>
                                    {f.title}
                                </Typography>
                                <Typography sx={{
                                    fontSize: 13,
                                    color: "#6b7280",
                                    lineHeight: 1.6
                                }}>
                                    {f.desc}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* CTA BOTTOM */}
            <Box sx={{
                bgcolor: COLORS.primary,
                py: 8,
                textAlign: "center"
            }}>
                <Typography
                    variant="h5"
                    sx={{ color: COLORS.primaryText, fontWeight: 600, mb: 1 }}
                >
                    Ready to get started?
                </Typography>
                <Typography sx={{
                    color: COLORS.primaryMuted,
                    fontSize: 14,
                    mb: 4
                }}>
                    Join your team on FlowTask today
                </Typography>
                <Button
                    onClick={() => navigate("/register")}
                    variant="contained"
                    size="large"
                    sx={{
                        textTransform: "none",
                        bgcolor: "white",
                        color: COLORS.primary,
                        fontWeight: 600,
                        fontSize: 14,
                        borderRadius: 2,
                        px: 4,
                        py: 1.4,
                        "&:hover": { bgcolor: "#f9fafb" }
                    }}
                >
                    Create free account
                </Button>
            </Box>

            {/* FOOTER */}
            <Box sx={{
                bgcolor: "white",
                py: 3,
                textAlign: "center",
                borderTop: "1px solid #e5e7eb"
            }}>
                <Typography sx={{ fontSize: 13, color: "#9ca3af" }}>
                    © 2025 FlowTask. Built with trust for teams.
                </Typography>
            </Box>
        </Box>
    );
};

export default LandingPage;