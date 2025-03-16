import {
    Typography,
} from "@mui/material";

export default function NotFound() {
    const style = {
        fontSize: 18,
        fontWeight: 'bold',
    };

    return <Typography style={style} variant="body1"> client not found</ Typography>;
}