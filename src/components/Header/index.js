import React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { capitalizeFirstLetter } from "../../utils";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { menuOptions } from "../constants";

const AppTitle = ({ headerHeight, drawerWidth }) => (
  <AppBar
    position="fixed"
    sx={{
      width: `calc(100% - ${drawerWidth}px)`,
      ml: `${drawerWidth}px`,
    }}
  >
    <Box
      sx={{
        height: headerHeight,
        display: "flex",
        alignItems: "center",
        ml: 3,
      }}
    >
      <Typography variant="h6" component="div">
        Contacts & Contracts
      </Typography>
    </Box>
  </AppBar>
);

const NavBar = ({ headerHeight, drawerWidth }) => {
  const drawer = (
    <>
      <Box
        sx={{
          height: headerHeight,
          display: "flex",
          alignItems: "center",
          ml: 3,
        }}
      />
      <Divider />
      <List>
        {menuOptions.map((text, index) => (
          <Link
            to={`/${text}`}
            key={index}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem button>
              <ListItemText primary={capitalizeFirstLetter(text)} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </>
  );

  return (
    <Box component="nav">
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

const Main = ({ drawerWidth }) => (
  <Box
    component="main"
    sx={{
      flexGrow: 1,
      p: 3,
      width: `calc(100% - ${drawerWidth}px)`,
      mt: 5,
    }}
  ></Box>
);

const ResponsiveDrawer = (props) => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppTitle {...props}/>
      <NavBar {...props}/>
      <Main {...props}/>
    </Box>
  );
};

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
