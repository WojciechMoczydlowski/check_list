import { InputBase, Theme } from "@material-ui/core";
import { fade } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { createStyles, makeStyles, styled } from "@material-ui/styles";
import React from "react";

type SearchProps = {
    searchPhraze: string;
    setSearchPhraze: (searchPhraze: string) => void;
};

export const Search: React.FunctionComponent<SearchProps> = ({ searchPhraze, setSearchPhraze }) => {
    const classes = useStyles();
    console.error(searchPhraze);
    return (
        <UsersWrapper>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    value={searchPhraze}
                    onChange={e => setSearchPhraze(e.target.value)}
                />
            </div>
        </UsersWrapper>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grow: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            display: "none",
            [theme.breakpoints.up("sm")]: {
                display: "block",
            },
        },
        search: {
            position: "relative",
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            "&:hover": {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: "100%",
            [theme.breakpoints.up("sm")]: {
                marginLeft: theme.spacing(3),
                width: "auto",
            },
        },
        searchIcon: {
            width: theme.spacing(7),
            height: "100%",
            position: "absolute",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        inputRoot: {
            color: "inherit",
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("md")]: {
                width: 200,
            },
        },
    }),
);

const UsersWrapper = styled("div")({
    position: "fixed",
    display: "flex",
    alignItems: "center",
    width: "100%",
    zIndex: 10,
    top: "0",
    height: "10vh",
    backgroundColor: "white",
});
