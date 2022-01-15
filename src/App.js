import { Box, Card, Paper } from "@mui/material";
import logo from "./assets/namedroplogowhite.png";
import bgImage from "./assets/bg.jpg";

function App() {
  return (
    <Box className="App">
      <Box sx={{ height: "100vh", backgroundImage: `url(${bgImage})`, backgroundSize: "cover", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box sx={{ p: 5, position: "absolute", top: "5px", left: "10px" }}>
          {/* logo */}

          <Box component="img" src={logo} alt="sd" />
        </Box>
        {/* card */}
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

          
        </Box>
      </Box>
    </Box>
  );
}

export default App;
