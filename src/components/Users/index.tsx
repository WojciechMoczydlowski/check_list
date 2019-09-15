import { UserTile } from "$components/UserTile";
import { Presence, User } from "$pages/Main";
import { styled } from "@material-ui/styles";
import React from "react";

type UsersProps = {
    users: User[];
    setUsers: (users: User[]) => void;
    currentPresenceType: Presence;
    searchPhraze: string;
    setSearchPhraze: (searchPhraze: string) => void;
};

export const Users: React.FunctionComponent<UsersProps> = ({
    users,
    currentPresenceType,
    setUsers,
    searchPhraze,
    setSearchPhraze,
}) => {
    const handleUserPresenceChange = (id: string, presence: Presence) => {
        const changedUsers = [...users];
        changedUsers.forEach(user => {
            if (user.id === id) user.presence = presence;
        });
        setUsers(changedUsers);
        setSearchPhraze("");
    };
    return (
        <UsersWrapper>
            {users &&
                users
                    .filter(user => {
                        return user.fullName.toLowerCase().includes(searchPhraze.toLowerCase());
                    })
                    .filter(user => {
                        return user.presence === currentPresenceType;
                    })
                    .sort((a, b) => {
                        return ("" + a.fullName).localeCompare(b.fullName);
                    })
                    .map(user => (
                        <UserTile
                            currentPresenceType={currentPresenceType}
                            user={user}
                            key={user.id}
                            handleUserPresenceChange={handleUserPresenceChange}
                        />
                    ))}
        </UsersWrapper>
    );
};

const UsersWrapper = styled("div")({
    marginTop: "20vh",
});
