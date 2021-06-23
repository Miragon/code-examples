import React, {ChangeEvent} from "react";
import TableRow from "@material-ui/core/TableRow";
import {InputAdornment, TableCell, TextField} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    row: {
        width: "100%",
    },
    cell: {
        width: "100%",
        padding: "0px 16px 0px 16px",
        borderBottomColor: "#CCC",
    },
    searchBar: {
        width: "100%",
        marginTop: "10px",
        marginBottom: "10px",
        padding: "0px 0px 0px 0px",
    },
});

interface TableSearchRowProps {
    colSpan: number,
    searchString: string,
    searchLabel: string,
    handleSearchForSomething(event : ChangeEvent<HTMLInputElement>): void,
}

const TableSearchRow : React.FC<TableSearchRowProps> = (props: TableSearchRowProps) => {

    const classes = useStyles();

    return (
        <TableRow className={classes.row}>
            <TableCell className={classes.cell} colSpan={props.colSpan}>
                <TextField
                    className={classes.searchBar}
                    size="small"
                    variant="outlined"
                    label={props.searchLabel}
                    value={props.searchString}
                    onChange={props.handleSearchForSomething}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon aria-label="search for something"/>
                            </InputAdornment>
                        ),
                    }}/>
            </TableCell>
        </TableRow>
    );
}

export default TableSearchRow;