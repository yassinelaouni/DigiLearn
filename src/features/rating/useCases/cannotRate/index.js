import { Grid, Button, Typography } from "@mui/material";
import { StarOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function CannotRate({ setValue }) {
  const navigate = useNavigate();



  return (
    <Grid container justifyContent="center" alignItems="center" style={{ marginTop: 100 }}>
      <Grid item xs={12} textAlign="center">
        <Typography variant="body1" color="textSecondary">
          You need points to search for a client!
        </Typography>
      </Grid>

      <Grid item xs={12} textAlign="center" mt={2}>
        <Button variant="contained" color="success" size="small" onClick={() => navigate("/dashboard/deposit")}>
          Buy Points
        </Button>
      </Grid>

      <Grid item xs={12} textAlign="center" mt={2}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => setValue("1")}
          startIcon={<StarOutlined style={{ color: "white" }} />}
        >
          Rate to Earn Points
        </Button>
      </Grid>
    </Grid>
  );
}