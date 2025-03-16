import { StarBorderPurple500Outlined } from "@mui/icons-material";
import {
  Grid,
  Typography,
} from "@mui/material";

import NotFound from "./notFound";
import styles from "../styles";
import useSearchResult from "./service";

export default function SearchResult({ }) {
  const { result } = useSearchResult();
  // console.log("result sherch : ", result)

  return (
    <Grid
      item
      container
      xs={12}
      md={6}
      style={{
        marginTop: result?.by ? 34 : 0
      }}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      {
        result && Object.keys(result).length !== 0 ?
          <>
            {/** total reviews */}
            <Grid item container alignItems="center" justifyContent="space-between" style={styles.section}>
              <Typography variant="caption" color="GrayText" fontWeight="bold">Total reviews</Typography>
              <Grid xs={6} item container alignItems="center">
                <Typography variant="caption" color="GrayText">1505</Typography>
              </Grid>
            </Grid>

            {/** accumulated order value */}
            <Grid item container alignItems="center" justifyContent="space-between" style={styles.section}>
              <Typography variant="caption" color="GrayText" fontWeight="bold">Accumulated orders value</Typography>
              <Grid xs={6} item container alignItems="center">
                <Typography variant="caption" color="GrayText">10 000 DH</Typography>
              </Grid>
            </Grid>
            {/** communication rating */}
            <Grid item container alignItems="center" justifyContent="space-between" style={styles.section}>
              <Typography variant="caption" color="GrayText" fontWeight="bold">Communication</Typography>
              <Grid xs={6} item container alignItems="center">
                <StarBorderPurple500Outlined color="primary" />
                <Typography variant="caption" color="GrayText">4.7</Typography>
              </Grid>
            </Grid>
            {/** punctuality rating */}
            <Grid item container alignItems="center" justifyContent="space-between" style={styles.section}>
              <Typography variant="caption" color="GrayText" fontWeight="bold">Punctuality</Typography>
              <Grid xs={6} item container alignItems="center">
                <StarBorderPurple500Outlined color="primary" />
                <Typography variant="caption" color="GrayText">5</Typography>
              </Grid>
            </Grid>

            {/** order cancellation rating */}
            <Grid item container alignItems="center" justifyContent="space-between" style={styles.section}>
              <Typography variant="caption" color="GrayText" fontWeight="bold">Order cancellation</Typography>
              <Grid xs={6} item container alignItems="center">
                <Typography variant="caption" color="GrayText">3 %</Typography>
              </Grid>
            </Grid>

            {/** items return  rating */}
            <Grid item container alignItems="center" justifyContent="space-between" style={styles.section}>
              <Typography variant="caption" color="GrayText" fontWeight="bold">Return</Typography>
              <Grid xs={6} item container alignItems="center">
                <Typography variant="caption" color="GrayText">20 %</Typography>
              </Grid>
            </Grid>
          </>
          :
          (
            result && Object.keys(result).length === 0 && <NotFound />
          )
      }
    </Grid >
  );
}
