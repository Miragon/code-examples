import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { ReactNode } from "react";

const useStyles = makeStyles({
    wrapper: {
        display: "flex",
        flexDirection: "column"
    },
    row: {
        display: "flex",
        width: "100%"
    },
    key: (props: Props) => ({
        width: props.keyWidth || "calc(50% - 4px)",
        textAlign: props.left ? undefined : "right",
        marginRight: "4px"
    }),
    value: {
        flexGrow: 1,
        fontWeight: "bold",
        paddingLeft: "4px"
    }
});

interface Props {
    left?: boolean;
    keyWidth?: string;
    entries: [ReactNode, ReactNode][];
}

const KeyValueGrid: React.FC<Props> = props => {
    const classes = useStyles(props);

    const { entries } = props;

    return (
        <div className={classes.wrapper}>
            {entries.map(([key, value], index) => (
                <div
                    key={index}
                    className={classes.row}>
                    <Typography
                        variant="body1"
                        className={classes.key}>
                        {key}:
                    </Typography>
                    <Typography
                        variant="body1"
                        className={classes.value}>
                        {value}
                    </Typography>
                </div>
            ))}
        </div>
    );
}

export default KeyValueGrid;
