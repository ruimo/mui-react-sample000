// -*- rjsx -*-

import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import SvgIcon from '@mui/material/SvgIcon';
import Link from '@mui/material/Link';
import RecordMaintenance from './RecordMaintenance';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './App.scss';

const drawerWidth = 240;

const userColumns = [
    { field: 'id', headerName: 'ID', width: 30 },
    { field: 'name', headerName: 'Name', width: 200, },
    { field: 'age', headerName: 'Age', width: 50 }
];

const userSearchApi: (searchText: string) => any[] = (searchText: string) => {
    const rows = [
        {id: '0', name: 'name000', age: 0},
        {id: '1', name: 'name001', age: 1},
        {id: '2', name: 'name002', age: 2},
        {id: '3', name: 'name003', age: 3},
        {id: '4', name: 'name004', age: 4}
    ];

    if (searchText === "") {
        return rows;
    } else {
        return rows.filter(e => e.name.includes(searchText));
    }
};

const url = (s) => process.env.PUBLIC_URL + s;

export default function App() {
    function HomeIcon(props: any) {
        return (
            <SvgIcon {...props}>
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </SvgIcon>
        );
    }

    let setModel = (model: string) => {
        console.log("clicked "+ model);
    };

    const location = useLocation();

    return (
        <Box sx={{ display: 'flex'}}>
          <CssBaseline/>
          <AppBar position="fixed"
                  sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}
          />
          <Toolbar></Toolbar>
          <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box'
                }
            }}
            variant="permanent"
            anchor="left"
          >
            <Toolbar><HomeIcon/></Toolbar>
            <Divider/>
            <List>
              <Link href={url("/user")} underline="none">
                <ListItem button key='User' selected={location.pathname === url('/user')}>
                  <ListItemText primary='User'/>
                </ListItem>
              </Link>
              <Link href={process.env.PUBLIC_URL + "/department"} underline="none">
                <ListItem button key='Department' selected={location.pathname === url('/department')}>
                  <ListItemText primary='Department'/>
                </ListItem>
              </Link>
            </List>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Toolbar/>
            <Routes>
              <Route path={url("/user")} element={<RecordMaintenance columns={userColumns} dataSource={userSearchApi}/>}/>
            </Routes>
          </Box>
        </Box>
    );
}
