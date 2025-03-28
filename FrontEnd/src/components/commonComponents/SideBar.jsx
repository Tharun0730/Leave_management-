import {
    Dashboard as DashboardIcon,
    ShoppingCart as ShoppingCartIcon,
    People as PeopleIcon,
    Settings as SettingsIcon,
    ExitToApp as LogoutIcon,
    // Add more default icons as needed
  } from "@mui/icons-material";
  import { 
    Box, 
    Button, 
    Drawer, 
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Collapse
  } from "@mui/material";
  import React, { useState } from "react";
  import { Link, useLocation } from "react-router-dom";
  
  const defaultNavItems = {
    Dashboard: {
      path: "/",
      icon: <DashboardIcon />
    },
    Products: {
      path: "/products",
      icon: <ShoppingCartIcon />,
      subItems: {
        "All Products": "/products",
        "Categories": "/categories"
      }
    },
    Users: {
      path: "/users",
      icon: <PeopleIcon />
    },
    Settings: {
      path: "/settings",
      icon: <SettingsIcon />,
      subItems: {
        "General": "/settings/general",
        "Preferences": "/settings/preferences"
      }
    }
  };
  
  const SideBar = ({ 
    children, 
    navItems = defaultNavItems,
    logoText = "My App",
    onLogout,
    isOpen = true,
    onClose,
    width = 240
  }) => {
    const location = useLocation();
    const [expandedMenu, setExpandedMenu] = useState(null);
  
    const toggleMenu = (menuKey) => {
      setExpandedMenu(expandedMenu === menuKey ? null : menuKey);
    };
  
    const renderMenuItems = () => {
      return Object.entries(navItems).map(([key, item]) => (
        <Box key={key}>
          <ListItem 
            button
            onClick={() => {
              if (item.subItems) {
                toggleMenu(key);
              } else if (key === "Logout" && onLogout) {
                onLogout();
              }
            }}
            sx={{
              borderRadius: 1,
              mb: 0.5,
              bgcolor: expandedMenu === key ? 'primary.light' : 'transparent',
              color: expandedMenu === key ? 'primary.contrastText' : 'text.primary',
              '&:hover': {
                bgcolor: 'primary.light',
                color: 'primary.contrastText'
              }
            }}
          >
            <ListItemIcon sx={{ color: 'inherit' }}>
              {item.icon || <DashboardIcon />}
            </ListItemIcon>
            <ListItemText primary={key} />
          </ListItem>
  
          {item.subItems && (
            <Collapse in={expandedMenu === key} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {Object.entries(item.subItems).map(([subKey, path]) => (
                  <ListItem 
                    key={subKey} 
                    button 
                    component={Link} 
                    to={path}
                    sx={{
                      pl: 4,
                      borderRadius: 1,
                      bgcolor: location.pathname === path ? 'primary.main' : 'transparent',
                      color: location.pathname === path ? 'primary.contrastText' : 'text.primary',
                      '&:hover': {
                        bgcolor: 'primary.light',
                        color: 'primary.contrastText'
                      }
                    }}
                  >
                    <ListItemText primary={subKey} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
        </Box>
      ));
    };
  
    return (
      <Box sx={{ display: 'flex' }}>
        <Drawer
          variant="persistent"
          anchor="left"
          open={isOpen}
          onClose={onClose}
          sx={{
          
            flexShrink: 0,
            
          }}
        >
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6" component="div">
              {logoText}
            </Typography>
          </Box>
  
          <List sx={{ px: 1 }}>
            {renderMenuItems()}
            
            {onLogout && (
              <ListItem 
                button
                onClick={onLogout}
                sx={{
                  borderRadius: 1,
                  mt: 1,
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: 'error.light',
                    color: 'error.contrastText'
                  }
                }}
              >
                <ListItemIcon sx={{ color: 'inherit' }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            )}
          </List>
        </Drawer>
  
        <Box component="main" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
      </Box>
    );
  };
  
  export default SideBar;