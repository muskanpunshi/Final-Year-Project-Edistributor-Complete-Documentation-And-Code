import * as React from "react";
import { styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";

import ListItem from "@mui/material/ListItem";

import { LogOut } from "../../Redux/Actions/Action";
import { useDispatch } from "react-redux";

import { colors } from "../../colors";

// Icons
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";


import { MdShoppingCart, MdSpaceDashboard,MdLogout,MdDirectionsBike,MdPedalBike } from "react-icons/md";
//import { TbUsers } from "react-icons/tb";

import { ImCross,ImUsers } from "react-icons/im";
import { AiOutlineDropbox } from "react-icons/ai";
import { BsFillBagPlusFill, BsFillBagFill } from "react-icons/bs";

import { useNavigate } from "react-router-dom";

const { themeColorBlue, lightBackground } = colors;

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const itemList = [
    {
      text: "Dashboard",
      icon: <MdSpaceDashboard size={25} color={themeColorBlue} />,
      onClick: () => {
        navigate("/dashboard");
      },
    },
    {
      text: "Add Products",
      icon: <BsFillBagPlusFill size={25} color={themeColorBlue} />,
      onClick: () => {
        navigate("/addproduct");
      },
    },
    {
      text: "All Products",
      icon: <BsFillBagFill size={25} color={themeColorBlue} />,
      onClick: () => {
        navigate("/listproduct");
      },
    },
    {
      text: "Create Rider",
      icon:<MdPedalBike size={25} color={themeColorBlue} />,
      onClick: () => {
        navigate("/createrider");
      },
    },
    {
      text: "Users List",
      icon:<ImUsers size={23} color={themeColorBlue} />,
      onClick: () => {
        navigate("/userlist")
      },
    },
    // {
    //   text: "Riders List",
    //   icon:<MdDirectionsBike size={25} color={themeColorBlue} />,
    //   onClick: () => {
    //     navigate("/riderlist")
    //   },
    // },
    {
      text: "Orders",
      icon: <AiOutlineDropbox size={25} color={themeColorBlue} />,
      onClick: () => {
        navigate("/orderlist")
      },
    },
      
    {
      text: "Logout",
      icon:<MdLogout size={25} color={themeColorBlue} />,
      onClick: () => {
        return dispatch(LogOut()), navigate("/");
      },
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        style={{ backgroundColor: lightBackground }}
        elevation={1}
        position="fixed"
        open={open}
      >
        <Toolbar style={{ display: "flex", backgroundColor: lightBackground }}>
     
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon
                style={{ color: themeColorBlue, border: "2px solid" }}
              />
            </IconButton>
        
          <Typography
            variant="h6"
            sx={{ color: themeColorBlue }}
          >
            E-Distributor
          </Typography>
       
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} >
        <DrawerHeader style={{ backgroundColor: lightBackground }}>
          <IconButton onClick={handleDrawerClose}>
            <ImCross size={15} />
          </IconButton>
        </DrawerHeader>
       
        <List style={{ backgroundColor: lightBackground, height: "660px" }}>
          {itemList.map((item, index) => {
            const { text, icon, onClick } = item;
            return (
              <ListItem button onClick={onClick} key={index}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText
                  style={{ color: themeColorBlue, fontSize: "40px" }}
                >
                  {text}
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
}
