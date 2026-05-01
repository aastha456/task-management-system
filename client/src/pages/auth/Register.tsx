import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Box, Typography, TextField, Button,
    CircularProgress, Alert, InputAdornment, IconButton
} from "@mui/material";
import { useState } from 'react';
import { useNavigate, Link } from "react-router";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { registerUser } from "../../store/slices/authSlice";
import { registerSchema } from "../../schemas/auth";
import { z } from "zod";
import { COLORS } from "../../constants/theme";
import { toast } from "react-toastify";

export type RegisterForm = z.infer<typeof registerSchema>;

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error } = useAppSelector((state) => state.auth);

    const { handleSubmit, register, formState: { errors } } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data: RegisterForm) => {
    const result = await dispatch(registerUser(data));

    if (registerUser.fulfilled.match(result)) {
        toast.success("Account created successfully");

        setTimeout(() => {
            navigate("/login");
        }, 1000);
    }
};

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>

            {/* LEFT SIDE — same as login */}
                        <Box sx={{
                width: { xs: 0, md: "50%" },
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                bgcolor: COLORS.primary,
                p: 6,
            }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}>
                    <Box sx={{
                        width: 36, height: 36, borderRadius: 2,
                        bgcolor: "rgba(255,255,255,0.12)",
                        display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                        <Typography sx={{ color: COLORS.primaryText, fontSize: 18 }}>✓</Typography>
                    </Box>
                    <Typography sx={{ fontSize: 20, fontWeight: 500, color: COLORS.primaryText }}>
                        FlowTask
                    </Typography>
                </Box>

                <Typography sx={{ fontSize: 26, fontWeight: 500, color: COLORS.primaryText, lineHeight: 1.3, mb: 1 }}>
                    Manage tasks,<br />not complexity
                </Typography>
                <Typography sx={{ fontSize: 13, color: COLORS.primaryMuted, lineHeight: 1.7, mb: 4, maxWidth: 280 }}>
                    A clean workspace for teams to plan, track, and ship work — without the clutter.
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, width: "100%" }}>
                    {[
                        { title: "Workspaces + Projects", desc: "Organize your team into focused spaces" },
                        { title: "Role-based access", desc: "Owner, admin and member permissions" },
                        { title: "Task tracking", desc: "Todo, in-progress and done — at a glance" },
                    ].map((f) => (
                        <Box key={f.title} sx={{
                            bgcolor: "rgba(255,255,255,0.12)",
                            border: "0.5px solid rgba(255,255,255,0.15)",
                            borderRadius: 2, p: 2
                        }}>
                            <Typography sx={{ fontSize: 13, fontWeight: 500, color: COLORS.primaryText, mb: 0.5 }}>
                                {f.title}
                            </Typography>
                            <Typography sx={{ fontSize: 12, color: COLORS.primaryMuted }}>
                                {f.desc}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* RIGHT SIDE */}
            <Box sx={{
                width: { xs: "100%", md: "50%" },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#f9fafb",
                p: 4
            }}>
                <Box sx={{ width: "100%", maxWidth: 360 }}>

                    <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>
                        Create account
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 3 }}>
                        Join FlowTask today
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2, borderRadius: 2, fontSize: 13 }}>
                            {error}
                        </Alert>
                    )}

                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                        <TextField
                            label="Full name"
                            size="small"
                            fullWidth
                            {...register("name")}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />

                        <TextField
                            label="Email"
                            type="email"
                            size="small"
                            fullWidth
                            {...register("email")}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />

                        <TextField
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        size="small"
                        fullWidth
                        {...register("password")}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        slotProps={{
                            input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                    size="small"
                                >
                                    {showPassword
                                    ? <VisibilityOff fontSize="small" />
                                    : <Visibility fontSize="small" />
                                    }
                                </IconButton>
                                </InputAdornment>
                            )
                            }
                        }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={loading}
                            sx={{
                                bgcolor: COLORS.primary,
                                "&:hover": { bgcolor: COLORS.primaryDark },
                                textTransform: "none",
                                fontWeight: 500,
                                height: 40,
                                borderRadius: 2,
                                mt: 1
                            }}
                        >
                            {loading
                                ? <CircularProgress size={18} color="inherit" />
                                : "Create account"
                            }
                        </Button>
                    </Box>

                    <Typography sx={{ fontSize: 12, color: "text.secondary", textAlign: "center", mt: 2.5 }}>
                        Have account?{" "}
                        <Link
                            to="/login"
                            style={{ color: COLORS.primary, fontWeight: 500, textDecoration: "none" }}
                        >
                            Sign in
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Register;


