import { CircularProgress } from "@mui/material";

export const LoadingScreen = () => {
    return (
        <div style={{ display: "flex", height: "100%", flex: 1, alignItems: "center", justifyContent: "center" }}>
            <CircularProgress size={64} />
        </div>
    );
};
