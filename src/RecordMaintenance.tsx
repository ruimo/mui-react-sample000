// -*- rjsx -*-

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SvgIcon from '@mui/material/SvgIcon';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import './RecordMaintenance.scss';

export interface RecordMaintenanceProps {
    columns: any[];
    dataSource: (searchText: string) => any[];
}

export default function RecordMaintenance(props: RecordMaintenanceProps) {
    const { columns, dataSource, ...rest } = props;
    const [rows, setRows] = useState<any[]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("q") ?? '';

    function SearchIcon(props: any) {
        return (
            <SvgIcon {...props}>
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </SvgIcon>
        );
    }

    function searchByText() {
        navigate(location.pathname + "?q=" + searchText);
    }

    function onSearchTextChanged(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchText(e.target.value);
    }

    function onSearchTextKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.keyCode === 13) {
            searchByText();
        }
    }

    // Just want to fire on component did mount to fill in the search text field with query text.
    useEffect(() => {
        setSearchText(query);
    }, [setSearchText]);

    useEffect(() => {
        setRows(dataSource(query));
    }, [query]);

    return (
        <Box>
          <div>
            <TextField label="Search text" className="searchText" value={searchText} 
                       onKeyDown={onSearchTextKeyDown} onChange={onSearchTextChanged}/>
            <Button><SearchIcon fontSize="large" onClick={searchByText}/></Button>
          </div>
          <DataGrid columns={columns} rows={rows} pageSize={5} autoHeight/>
        </Box>
    );
}
