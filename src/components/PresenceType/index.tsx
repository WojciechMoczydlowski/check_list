import check from "$assets/check.svg";
import cross from "$assets/cross.svg";
import question from "$assets/question.svg";
import { Presence } from "$pages/Main";
import { CardActionArea } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import React from "react";

type UsersProps = {
    currentPresenceType: Presence;
    setCurrentPresenceType: (presenceType: Presence) => void;
};

export const PresenceType: React.FunctionComponent<UsersProps> = ({ currentPresenceType, setCurrentPresenceType }) => {
    return (
        <PresenceTypeWrapper>
            <IconWrapper
                style={{ backgroundColor: currentPresenceType === "present" ? "#99cc33" : "white" }}
                onClick={() => setCurrentPresenceType("present")}>
                <ActiveIcon src={check} alt="check" />
            </IconWrapper>
            <IconWrapper
                style={{ backgroundColor: currentPresenceType === "to_check" ? "#ffcc00" : "white" }}
                onClick={() => setCurrentPresenceType("to_check")}>
                <ActiveIcon src={question} alt="question" />
            </IconWrapper>
            <IconWrapper
                style={{ backgroundColor: currentPresenceType === "absent" ? " #cc3300" : "white" }}
                onClick={() => setCurrentPresenceType("absent")}>
                <ActiveIcon src={cross} alt="cross" />
            </IconWrapper>
        </PresenceTypeWrapper>
    );
};

const PresenceTypeWrapper = styled("div")({
    position: "fixed",
    zIndex: 10,
    top: "10vh",
    display: "flex",
    width: "100%",
    height: "10vh",
});
const IconWrapper = styled(CardActionArea)({
    width: "33.33%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});
const ActiveIcon = styled("img")({
    display: "flex",
    width: "100%",
    height: "20px",
});
