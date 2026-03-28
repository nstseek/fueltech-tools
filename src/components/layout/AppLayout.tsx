import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const SIDEBAR_WIDTH = 300;

export default function AppLayout() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar width={SIDEBAR_WIDTH} />
      <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <Header sidebarWidth={SIDEBAR_WIDTH} />
        <Toolbar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
