import React, { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import HomeIcon from "@mui/icons-material/Home";
import { Button } from "@mui/material";
import {
  createSearchParams,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_Root } from "../constants/links.js";
import Login from "../pages/Login.jsx";
import {
  checkUserLoginThunk,
  logoutThunk,
} from "../redux/slices/UserInfoSlice.js";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
}));
const StyledAppbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState();
  const [loginOpen, setLoginOpen] = useState(false);
  const [anchorEl2, setAnchorEl2] = useState();
  const open = Boolean(anchorEl2);
  const dispatch = useDispatch();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  //function
  const getResult = (data) => {
    const params = Object.fromEntries(searchParams);
    params["query"] = data.value;
    setSearchParams(createSearchParams(params));
  };

  //useEffect
  useEffect(() => {
    const params = Object.fromEntries(searchParams);
    params["query"] = "";
    setSearchParams(createSearchParams(params));
    dispatch(checkUserLoginThunk());
  }, []);

  //useSelector
  const isLogin = useSelector(
    (state) => state.rootReducer.UserInfoSlice.isLogin
  );
  const userName = useSelector(
    (state) => state.rootReducer.UserInfoSlice.data.userInfo.username
  );

  //function
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //component-1
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      {isLogin ? (
        <MenuItem
          onClick={() => {
            dispatch(logoutThunk());
            handleMenuClose();
          }}
        >
          Logout
        </MenuItem>
      ) : (
        <></>
      )}
    </Menu>
  );
  //component - 2
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Typography
          sx={{
            color: "black",
            borderColor: "black",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => {
            navigate(USER_Root);
          }}
        >
          <IconButton>
            <HomeIcon sx={{ color: "black" }} />
          </IconButton>
          Home
        </Typography>
      </MenuItem>
      <MenuItem>
        <Button
          variant="outlined"
          sx={{ color: "black", borderColor: "black" }}
          onClick={() => {
            if (!isLogin) {
              setLoginOpen(!loginOpen);
            }
            handleMobileMenuClose();
          }}
        >
          {isLogin ? userName : "Login/Signup"}
        </Button>
      </MenuItem>

      <MenuItem
        onClick={(e) => {
          handleProfileMenuOpen(e);
        }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 0 }}>
      <AppBar position="fixed" sx={{ background: "#000814" }}>
        <StyledAppbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              fontWeight: "bold",
              cursor: "pointer",
              textDecoration: "none",
            }}
          >
            <Link
              to={USER_Root}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              BOOKS
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 0.13 }} />
          <Search ref={setAnchorEl2} sx={{ position: "relative" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => getResult(e.target)}
              value={searchParams.get("query")}
            />
          </Search>

          <Box sx={{ flexGrow: 0.13 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              variant="outlined"
              sx={{ color: "white", borderColor: "white" }}
              onClick={() => (!isLogin ? setLoginOpen(!loginOpen) : "")}
            >
              {isLogin ? userName : "Login/Signup"}
            </Button>
          </Box>
          <Box sx={{ flexGrow: 0.13 }} />

          <Box sx={{ flexGrow: 0.13 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              ari44a-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          {renderMobileMenu}
          {renderMenu}
        </StyledAppbar>
      </AppBar>
      <Login loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
    </Box>
  );
};

export default Navbar;
