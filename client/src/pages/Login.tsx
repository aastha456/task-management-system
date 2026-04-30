// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { Box, Typography, TextField, Button, CircularProgress, Alert } from "@mui/material";
// import { useState } from 'react';
// import { useNavigate } from "react-router";
// import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
// import { loginUser, registerUser } from "../store/slices/authSlice";
// import { loginSchema, registerSchema } from "../schemas/auth";
// import { z } from "zod";

// export type LoginForm = z.infer<typeof loginSchema>;
// export type RegisterForm = z.infer<typeof registerSchema>;

// const Login = () => {
//     const [isLogin, setIsLogin] = useState(true);
//     const dispatch = useAppDispatch();
//     const navigate = useNavigate();
//     const { loading, error } = useAppSelector((state) => state.auth);

//     const loginForm = useForm<LoginForm>({
//         resolver: zodResolver(loginSchema)
//     });

//     const registerForm = useForm<RegisterForm>({
//         resolver: zodResolver(registerSchema)
//     });

//     const onLoginSubmit = async (data: LoginForm) => {
//         const result = await dispatch(loginUser(data));
//         if (loginUser.fulfilled.match(result)) {
//             const role = result.payload.user;
//             if (role === "admin") {
//                 navigate("/admin");
//             } else {
//                 navigate("/dashboard");
//             }
//         }
//     };

//     const onRegisterSubmit = async (data: RegisterForm) => {
//         const result = await dispatch(registerUser(data));
//         if (registerUser.fulfilled.match(result)) {
//             setIsLogin(true);
//         }
//     };

//     const switchTab = (tab: "login" | "register") => {
//         setIsLogin(tab === "login");
//         loginForm.clearErrors();
//         registerForm.clearErrors();
//     };

//     return (
//         <Box sx={{ display: "flex", minHeight: "100vh" }}>

//             {/* LEFT SIDE */}
//             <Box sx={{
//                 width: { xs: 0, md: "50%" },
//                 display: { xs: "none", md: "flex" },
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "flex-start",
//                 bgcolor: "#1D9E75",
//                 p: 6,
//             }}>
//                 {/* Logo */}
//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}>
//                     <Box sx={{
//                         width: 36, height: 36,
//                         borderRadius: 2,
//                         bgcolor: "rgba(255,255,255,0.2)",
//                         display: "flex", alignItems: "center", justifyContent: "center"
//                     }}>
//                         <Typography sx={{ color: "#E1F5EE", fontSize: 18 }}>✓</Typography>
//                     </Box>
//                     <Typography sx={{ fontSize: 20, fontWeight: 500, color: "#E1F5EE" }}>
//                         FlowTask
//                     </Typography>
//                 </Box>

//                 {/* Hero */}
//                 <Typography sx={{ fontSize: 26, fontWeight: 500, color: "#E1F5EE", lineHeight: 1.3, mb: 1 }}>
//                     Manage tasks,<br />not complexity
//                 </Typography>
//                 <Typography sx={{ fontSize: 13, color: "#9FE1CB", lineHeight: 1.7, mb: 4, maxWidth: 280 }}>
//                     A clean workspace for teams to plan, track, and ship work — without the clutter.
//                 </Typography>

//                 {/* Feature cards */}
//                 <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, width: "100%" }}>
//                     {[
//                         { title: "Workspaces + Projects", desc: "Organize your team into focused spaces" },
//                         { title: "Role-based access", desc: "Owner, admin and member permissions" },
//                         { title: "Task tracking", desc: "Todo, in-progress and done — at a glance" },
//                     ].map((f) => (
//                         <Box key={f.title} sx={{
//                             bgcolor: "rgba(255,255,255,0.12)",
//                             border: "0.5px solid rgba(255,255,255,0.15)",
//                             borderRadius: 2,
//                             p: 2
//                         }}>
//                             <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#E1F5EE", mb: 0.5 }}>
//                                 {f.title}
//                             </Typography>
//                             <Typography sx={{ fontSize: 12, color: "#9FE1CB" }}>
//                                 {f.desc}
//                             </Typography>
//                         </Box>
//                     ))}
//                 </Box>
//             </Box>

//             {/* RIGHT SIDE */}
//             <Box sx={{
//                 width: { xs: "100%", md: "50%" },
//                 display: "flex",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 bgcolor: "#f9fafb",
//                 p: 4
//             }}>
//                 <Box sx={{ width: "100%", maxWidth: 360 }}>

//                     <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>
//                         {isLogin ? "Welcome back" : "Create account"}
//                     </Typography>
//                     <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 3 }}>
//                         {isLogin ? "Sign in to your account" : "Join FlowTask today"}
//                     </Typography>

//                     {/* Toggle Tabs */}
//                     <Box sx={{
//                         display: "flex",
//                         bgcolor: "#f3f4f6",
//                         borderRadius: 2,
//                         p: "3px",
//                         mb: 3,
//                         border: "0.5px solid #e5e7eb"
//                     }}>
//                         {["login", "register"].map((tab) => (
//                             <Box
//                                 key={tab}
//                                 onClick={() => switchTab(tab as "login" | "register")}
//                                 sx={{
//                                     flex: 1,
//                                     textAlign: "center",
//                                     py: 0.9,
//                                     fontSize: 13,
//                                     cursor: "pointer",
//                                     borderRadius: 1.5,
//                                     fontWeight: (isLogin && tab === "login") || (!isLogin && tab === "register") ? 500 : 400,
//                                     color: (isLogin && tab === "login") || (!isLogin && tab === "register")
//                                         ? "#0F6E56" : "text.secondary",
//                                     bgcolor: (isLogin && tab === "login") || (!isLogin && tab === "register")
//                                         ? "white" : "transparent",
//                                     border: (isLogin && tab === "login") || (!isLogin && tab === "register")
//                                         ? "0.5px solid #e5e7eb" : "none",
//                                     transition: "all 0.15s"
//                                 }}
//                             >
//                                 {tab === "login" ? "Sign in" : "Register"}
//                             </Box>
//                         ))}
//                     </Box>

//                     {/* Error */}
//                     {error && (
//                         <Alert severity="error" sx={{ mb: 2, borderRadius: 2, fontSize: 13 }}>
//                             {error}
//                         </Alert>
//                     )}

//                     {/* LOGIN FORM */}
//                     {isLogin && (
//                         <Box
//                             component="form"
//                             onSubmit={loginForm.handleSubmit(onLoginSubmit)}
//                             sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//                         >
//                             <TextField
//                                 label="Email"
//                                 type="email"
//                                 size="small"
//                                 fullWidth
//                                 {...loginForm.register("email")}
//                                 error={!!loginForm.formState.errors.email}
//                                 helperText={loginForm.formState.errors.email?.message}
//                             />
//                             <TextField
//                                 label="Password"
//                                 type="password"
//                                 size="small"
//                                 fullWidth
//                                 {...loginForm.register("password")}
//                                 error={!!loginForm.formState.errors.password}
//                                 helperText={loginForm.formState.errors.password?.message}
//                             />
//                             <Button
//                                 type="submit"
//                                 variant="contained"
//                                 fullWidth
//                                 disabled={loading}
//                                 sx={{
//                                     bgcolor: "#1D9E75",
//                                     "&:hover": { bgcolor: "#0F6E56" },
//                                     textTransform: "none",
//                                     fontWeight: 500,
//                                     height: 40,
//                                     borderRadius: 2,
//                                     mt: 1
//                                 }}
//                             >
//                                 {loading ? <CircularProgress size={18} color="inherit" /> : "Sign in"}
//                             </Button>
//                         </Box>
//                     )}

//                     {/* REGISTER FORM */}
//                     {!isLogin && (
//                         <Box
//                             component="form"
//                             onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
//                             sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//                         >
//                             <TextField
//                                 label="Full name"
//                                 size="small"
//                                 fullWidth
//                                 {...registerForm.register("name")}
//                                 error={!!registerForm.formState.errors.name}
//                                 helperText={registerForm.formState.errors.name?.message}
//                             />
//                             <TextField
//                                 label="Email"
//                                 type="email"
//                                 size="small"
//                                 fullWidth
//                                 {...registerForm.register("email")}
//                                 error={!!registerForm.formState.errors.email}
//                                 helperText={registerForm.formState.errors.email?.message}
//                             />
//                             <TextField
//                                 label="Password"
//                                 type="password"
//                                 size="small"
//                                 fullWidth
//                                 {...registerForm.register("password")}
//                                 error={!!registerForm.formState.errors.password}
//                                 helperText={registerForm.formState.errors.password?.message}
//                             />
//                             <Button
//                                 type="submit"
//                                 variant="contained"
//                                 fullWidth
//                                 disabled={loading}
//                                 sx={{
//                                     bgcolor: "#1D9E75",
//                                     "&:hover": { bgcolor: "#0F6E56" },
//                                     textTransform: "none",
//                                     fontWeight: 500,
//                                     height: 40,
//                                     borderRadius: 2,
//                                     mt: 1
//                                 }}
//                             >
//                                 {loading
//                                     ? <CircularProgress size={18} color="inherit" />
//                                     : "Create account"
//                                 }
//                             </Button>
//                         </Box>
//                     )}

//                     {/* Footer */}
//                     <Typography sx={{ fontSize: 12, color: "text.secondary", textAlign: "center", mt: 2.5 }}>
//                         {isLogin ? "No account?" : "Have account?"}{" "}
//                         <Box
//                             component="span"
//                             onClick={() => switchTab(isLogin ? "register" : "login")}
//                             sx={{ color: "#1D9E75", fontWeight: 500, cursor: "pointer" }}
//                         >
//                             {isLogin ? "Register here" : "Sign in"}
//                         </Box>
//                     </Typography>

//                 </Box>
//             </Box>
//         </Box>
//     );
// };

// export default Login;

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
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { loginUser } from "../store/slices/authSlice";
import { loginSchema } from "../schemas/auth";
import { z } from "zod";

export type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, error } = useAppSelector((state) => state.auth);

    const { handleSubmit, register, formState: { errors } } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data: LoginForm) => {
        const result = await dispatch(loginUser(data));
        if (loginUser.fulfilled.match(result)) {
            const role = result.payload.role;
            if (role === "admin") {
                navigate("/admin");
            } else {
                navigate("/dashboard");
            }
        }
    };

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>

            {/* LEFT SIDE */}
            <Box sx={{
                width: { xs: 0, md: "50%" },
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                bgcolor: "#1D9E75",
                p: 6,
            }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 4 }}>
                    <Box sx={{
                        width: 36, height: 36, borderRadius: 2,
                        bgcolor: "rgba(255,255,255,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                        <Typography sx={{ color: "#E1F5EE", fontSize: 18 }}>✓</Typography>
                    </Box>
                    <Typography sx={{ fontSize: 20, fontWeight: 500, color: "#E1F5EE" }}>
                        FlowTask
                    </Typography>
                </Box>

                <Typography sx={{ fontSize: 26, fontWeight: 500, color: "#E1F5EE", lineHeight: 1.3, mb: 1 }}>
                    Manage tasks,<br />not complexity
                </Typography>
                <Typography sx={{ fontSize: 13, color: "#9FE1CB", lineHeight: 1.7, mb: 4, maxWidth: 280 }}>
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
                            <Typography sx={{ fontSize: 13, fontWeight: 500, color: "#E1F5EE", mb: 0.5 }}>
                                {f.title}
                            </Typography>
                            <Typography sx={{ fontSize: 12, color: "#9FE1CB" }}>
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
                        Welcome back
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: "text.secondary", mb: 3 }}>
                        Sign in to your account
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
                            InputProps={{
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
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={loading}
                            sx={{
                                bgcolor: "#1D9E75",
                                "&:hover": { bgcolor: "#0F6E56" },
                                textTransform: "none",
                                fontWeight: 500,
                                height: 40,
                                borderRadius: 2,
                                mt: 1
                            }}
                        >
                            {loading
                                ? <CircularProgress size={18} color="inherit" />
                                : "Sign in"
                            }
                        </Button>
                    </Box>

                    <Typography sx={{ fontSize: 12, color: "text.secondary", textAlign: "center", mt: 2.5 }}>
                        No account?{" "}
                        <Link
                            to="/register"
                            style={{ color: "#1D9E75", fontWeight: 500, textDecoration: "none" }}
                        >
                            Register here
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;