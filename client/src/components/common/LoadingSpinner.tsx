import { Box, CircularProgress } from "@mui/material";
import { COLORS } from "../../constants/theme";

const LoadingSpinner = () => {
    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
        }}>
            <CircularProgress sx={{ color: COLORS.primary }} />
        </Box>
        
    )
}
export default LoadingSpinner;