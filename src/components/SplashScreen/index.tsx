import { CircularProgress } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import React from "react";

export const SplashScreen: React.FunctionComponent = () => {
    return (
        <Background>
            <LoaderContainer>
                <CircularProgress />
            </LoaderContainer>
        </Background>
    );
};

const Background = styled("div")({
    position: "fixed",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 1000,

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

    background: "rgba(200, 200, 200, 0.3)",
});

const LoaderContainer = styled("div")({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
});
