import { useStoreon } from "storeon/react";
import { onChange, onClick, deleteFilters } from '../api'
import { useEffect, useState } from 'react'
import Toolbar from '@material-ui/core/Toolbar';
import { Table, Button, FormControl, InputLabel, TableSortLabel, TableBody, TextField, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from '@material-ui/core';
const Thead = () => {
    const { dispatch, table } = useStoreon('table');
    const [selection, setSelection] = useState({
        brand: '',
        model: '',
        year: '',
        fuel: '',
        bodyType: '',
        price: '',
    });

    const filterData = (arr, name) => {
        const o = {};
        arr.forEach(v => o[v[name]] = true)
        return Object.keys(o)
    }
    const handleSelect = (dispatch, value, hname) => {
        setSelection({ ...selection, [hname]: value });
        onChange(dispatch, hname, value);
    }
    const filtersDelete = (dispatch) => {
        setSelection({
            brand: '',
            model: '',
            year: '',
            fuel: '',
            bodyType: '',
            price: '',
        });
        deleteFilters(dispatch)
    }
    return (
        <TableHead>
            <TableRow>
                <TableCell>
                    <Toolbar>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            onClick={() => filtersDelete(dispatch)}
                        >
                            Удалить фильтры
                        </Button>
                    </Toolbar>
                </TableCell>
            </TableRow>
            <TableRow>
                {table.headers.map((h, i) => {
                    return (
                        <TableCell key={i} >
                            { h.name !== 'brand' && h.name !== 'model'
                                ? <>
                                    <TableSortLabel
                                        direction={table.sort_direction}
                                        onClick={() => onClick(dispatch, h.name)}
                                    >
                                        {h.head}
                                    </TableSortLabel>
                                    <FormControl>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={selection[h.name]}
                                            onChange={e => handleSelect(dispatch, e.target.value, h.name)}
                                        >
                                            {filterData(table.data, h.name).map((v, i) =>
                                                <MenuItem
                                                    key={i}
                                                    value={v}
                                                >
                                                    {v}
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </>
                                :
                                <>
                                    <TextField
                                        variant='outlined'
                                        label={h.head}
                                        onChange={e => onChange(dispatch, h.name, e.target.value)}
                                    />
                                    <TableSortLabel
                                        direction={table.sort_direction}
                                        onClick={() => onClick(dispatch, h.name)}
                                    />
                                    <FormControl>
                                        <InputLabel id="demo-simple-select-label"></InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={selection[h.name]}
                                            onChange={e => handleSelect(dispatch, e.target.value, h.name)}
                                        >
                                            {filterData(table.data, h.name).map((v, i) =>
                                                <MenuItem
                                                    key={i}
                                                    value={v}
                                                >
                                                    {v}
                                                </MenuItem>
                                            )
                                            }
                                        </Select>
                                    </FormControl>
                                </>
                            }
                        </TableCell>
                    )
                })}
            </TableRow>
        </TableHead>
    )
}
const Tbody = () => {
    const { table } = useStoreon('table');
    return (
        <TableBody>
            {!table.sortedData ?
                table.data.map((b, i) =>
                    <TableRow key={i}>
                        <TableCell>{b.brand}</TableCell>
                        <TableCell>{b.model}</TableCell>
                        <TableCell>{b.year}</TableCell>
                        <TableCell>{b.fuel}</TableCell>
                        <TableCell>{b.bodyType}</TableCell>
                        <TableCell>{b.price}</TableCell>
                    </TableRow>
                ) :
                table.sortedData.map((b, i) =>
                    <TableRow key={i}>
                        <TableCell>{b.brand}</TableCell>
                        <TableCell>{b.model}</TableCell>
                        <TableCell>{b.year}</TableCell>
                        <TableCell>{b.fuel}</TableCell>
                        <TableCell>{b.bodyType}</TableCell>
                        <TableCell>{b.price}</TableCell>
                    </TableRow>
                )}
        </TableBody>
    )
}
function MyTable() {
    const { dispatch, table } = useStoreon('table');
    useEffect(() => {
        dispatch('filter')
    }, [dispatch, table.filter, table.sort_direction])
    return (
        <>
            <TableContainer component={Paper} >
                <Table aria-label="customized table">
                    <Thead />
                    <Tbody />
                </Table>
            </TableContainer>
        </>
    )
}

export default MyTable