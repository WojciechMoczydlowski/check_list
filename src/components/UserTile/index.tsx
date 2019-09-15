import check from "$assets/check.svg";
import cross from "$assets/cross.svg";
import question from "$assets/question.svg";
import { Presence, User } from "$pages/Main";
import { Card, CardActionArea, styled } from "@material-ui/core";
import React from "react";

type UsersProps = {
    user: User;
    currentPresenceType: Presence;
    handleUserPresenceChange: (index: string, presence: Presence) => void;
};

export const UserTile: React.FunctionComponent<UsersProps> = ({
    user,
    currentPresenceType,
    handleUserPresenceChange,
}) => {
    return (
        <UserCard>
            <FullName>{user.fullName}</FullName>
            <ActionWrapper>
                {currentPresenceType === "present" ? null : (
                    <IconWrapper onClick={() => handleUserPresenceChange(user.id, "present")}>
                        <ActiveIcon src={check} alt="check" />
                    </IconWrapper>
                )}
                {currentPresenceType === "to_check" ? null : (
                    <IconWrapper onClick={() => handleUserPresenceChange(user.id, "to_check")}>
                        <ActiveIcon src={question} alt="question" />
                    </IconWrapper>
                )}
                {currentPresenceType === "absent" ? null : (
                    <IconWrapper onClick={() => handleUserPresenceChange(user.id, "absent")}>
                        <ActiveIcon src={cross} alt="cross" />
                    </IconWrapper>
                )}
            </ActionWrapper>
        </UserCard>
    );
};

const UserCard = styled(Card)({
    display: "flex",
    padding: "10px 20px",
});

const FullName = styled("h3")({
    width: "70%",
});

const ActionWrapper = styled("div")({
    display: "flex",
    width: "30%",
});

const IconWrapper = styled(CardActionArea)({
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
});
const ActiveIcon = styled("img")({
    display: "flex",
    width: "100%",
    height: "20px",
});
