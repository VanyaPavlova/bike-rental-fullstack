import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Box, IconButton, Button, useTheme } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ManageAccounts from "@mui/icons-material/ManageAccounts";

import { ColorModeContext, tokens } from "../../theme";
import { useUserContext } from "../../context/UserContext";

export const AppBar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { currentUser, setCurrentUser, userService } = useUserContext();
  const navigate = useNavigate();

  const logout = async () => {
    await userService.logOut();
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <Box
      display="flex"
      justifyContent="right"
      alignItems="center"
      p={2}
      sx={{ borderBottom: 1, color: colors.grey[700] }}
    >
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === "dark" ? (
          <DarkModeOutlinedIcon />
        ) : (
          <LightModeOutlinedIcon />
        )}
      </IconButton>
      {currentUser?.role === "user" && (
        <IconButton
          component={Link}
          to="/manager"
          color="secondary"
          variant="outlined"
        >
          <ManageAccounts />
        </IconButton>
      )}
      <Box display="flex">
        {currentUser ? (
          <>
            <Button
              component={Link}
              to="/login"
              color="secondary"
              variant="outlined"
              startIcon={<PersonOutlinedIcon />}
            >
              {currentUser.email}
            </Button>
          </>
        ) : (
          <Button component={Link} to="/login" color="secondary">
            Login
          </Button>
        )}
        {currentUser && (
          <Button
            component={Link}
            to="/login"
            onClick={logout}
            color="secondary"
          >
            Logout
          </Button>
        )}
      </Box>
    </Box>
  );
};
