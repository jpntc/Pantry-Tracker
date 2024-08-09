"use client";
import React, {useState} from "react";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";


const Navbar = ({handleButtonPress}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));


  return (
    <AppBar position="fixed" sx={{ backgroundColor: "orange" }}>
      <Container>
        <Toolbar disableGutters>
          <Box
            sx={{
              width: "100%",
              justifyItems:"center",
              alignItems:"center"
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", borderRadius: 100 }}>
                <Image
                  src="/images/logo.jpg"
                  alt="Logo"
                  className="rounded-md"
                  width={48}
                  height={48}
                />

                <Typography variant="h6" sx={{ ml: 2 }}>
                  Inventory-Hand
                </Typography>
              </Box>
              <IconButton color="inherit" aria-label="user" size="medium" sx={{ display: "flex", alignItems: "center", borderRadius: 100 }}>
                <Image
                  src="/images/logo.jpg"
                  alt="User Icon"
                  className="rounded-full"
                  width={40}
                  height={40}
                />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Button color="inherit" onClick={()=>{handleButtonPress('Management')}}>Management</Button>
              <Button color="inherit" onClick={()=>{handleButtonPress('Analytics')}}>Analytics</Button>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
