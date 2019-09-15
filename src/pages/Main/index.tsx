import { PresenceType } from "$components/PresenceType";
import { Search } from "$components/Search";
import { Users } from "$components/Users";
import { firestore } from "$configuration/firebase";
import styled from "@material-ui/styles/styled";
import React, { useEffect, useState } from "react";
import uniqid from "uniqid";
export type Presence = "present" | "absent" | "to_check";
export type User = {
    fullName: string;
    presence: Presence;
    id: string;
};

const MainPage: React.FunctionComponent = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPresenceType, setCurrentPresenceType] = useState<Presence>("to_check");
    const [searchPhraze, setSearchPhraze] = useState<string>("");

    useEffect(() => {
        const users = firestore.collection("Tatry 2019").doc("RSy3zJJjIAoaycYCIxbE");
        users.get().then(doc => {
            const data = doc.data();
            if (data) {
                const usersToCheck = data.Users.map(
                    (fullName: string): User => ({ fullName, presence: "to_check", id: uniqid() }),
                );
                setUsers(usersToCheck);
            }
        });
    }, []);
    return (
        <>
            <Search searchPhraze={searchPhraze} setSearchPhraze={setSearchPhraze} />
            <PresenceType currentPresenceType={currentPresenceType} setCurrentPresenceType={setCurrentPresenceType} />
            <Users
                users={users}
                currentPresenceType={currentPresenceType}
                setUsers={setUsers}
                searchPhraze={searchPhraze}
                setSearchPhraze={setSearchPhraze}
            />
        </>
    );
};

const Logout = styled("h3")({
    cursor: "pointer",
});

export default MainPage;
