import { StarOutlined } from "@mui/icons-material";
import {
  Grid,
  Button,
  Box,
  Tabs,
  Tab
} from "@mui/material";
import Filter from "./filter";
import SearchResult from "./searchResult";

export default function SearchRating({ handleSwitch = () => { }, value }) {
  return (
    <Grid container xs={12} style={{ marginTop: 35 }}>
      {/** switch view action */}
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleSwitch} centered>
          <Tab sx={{
            fontSize: '16px',
            textTransform: 'none',
          }}
            label="Rate a client"
            value="1" />
          <Tab sx={{
            fontSize: '16px',
            textTransform: 'none',
          }} label="Get client's Rating"
            value="2" />
        </Tabs>
      </Box>

      {/* client info */}
      <Filter />

      {/* rating info */}
      <SearchResult />

    </Grid >
  );
}
