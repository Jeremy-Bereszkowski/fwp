import React, {useContext, useEffect, createContext, useState} from "react";
import {avatarColors} from "../TabPanels/AvatarPanel/AvatarPanel";
import {downloadBlob} from "../../util/firebase/storage";

/* Local storage keys */
const USER_LIST_KEY = 'user-list'
const CURRENT_USER_KEY = 'current-user'

// Create a date string from the current Date Time
export function dateToString() {
    const date = new Date()
    const dateStringDateMonth = `${date}`.slice(4,10)
    const dateStringYear = `${date}`.slice(10,16)

    return `${dateStringDateMonth},${dateStringYear}`
}

// Function returns a avatar object with optional parameters
export function avatarMap(selected, url, color) {
    return {
        selected: selected ?? "color",
        url: url ?? "",
        color: color ?? avatarColors[1],
    }
}

// Function returns a user object with not-optional parameters
function userMap(firstName, lastName, email, password) {
    return {
        firstName,
        lastName,
        email,
        password,
        joinDate: dateToString(),
        avatar: avatarMap(),
    }
}

// Creates user initials string from name
const firstLetterUppercase = (string) => string[0].toUpperCase()

const AuthContext = createContext();

// Hook that enables any component to subscribe to auth state
export const useAuth = () => useContext(AuthContext)

// Context Provider component that wraps app and makes auth object
// available to any child component that calls the useAuth() hook.
export function AuthProvider({ children }) {
    /* Get current user from session storage and store in state */
    useEffect(() => {
        const currentUser = handleCurrentUserSessionGet()

        if (currentUser) handleCurrentUserStateSet(currentUser)

        handleLoadingUnset()
    }, [])

    /* State variables */
    const [loading, setLoading] = useState( true)
    const [currentUser, setCurrentUser] = useState( null)

    /* State handlers */
    const handleCurrentUserStateSet = user => setCurrentUser(user)
    const handleCurrentUserStateUnset = () => setCurrentUser(null)

    const handleLoadingUnset = () => setLoading(false)

    /* Session Storage handlers */
    const handleCurrentUserSessionGet = () => JSON.parse(sessionStorage.getItem(CURRENT_USER_KEY));
    const handleCurrentUserSessionSet = user => sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    const handleCurrentUserSessionUnset = () => sessionStorage.removeItem(CURRENT_USER_KEY);

    /* Local storage handlers */
    const setUserList = (userList) => localStorage.setItem(USER_LIST_KEY, JSON.stringify(userList));
    const getUserList = () => JSON.parse(localStorage.getItem(USER_LIST_KEY));

    /* User helper functions */
    const getAvatarUrlBlob = (avatar) => {
        if (avatar?.url) {
            return downloadBlob(avatar.url)
        }
    }

    const addNewUser = (user) => {
        const userList = getUserList();
        setUserList([...(userList ?? []), user]);
    }

    const signUp = (firstName, lastName, email, password) => {
        const user = userMap(firstName, lastName, email, password)

        addNewUser(user)
        handleCurrentUserSessionSet(user)
        handleCurrentUserStateSet(user)
    }

    const signIn = (email, password) => {
        const userList = getUserList();
        const matchingUser = userList?.find(ele => ele.email === email);

        if (!matchingUser) return false;
        if (matchingUser?.password !== password) return false;

        handleCurrentUserSessionSet(matchingUser)
        handleCurrentUserStateSet(matchingUser)
        return true;
    }

    const signOut = () => {
        handleCurrentUserSessionUnset();
        handleCurrentUserStateUnset();
    }

    const getUserByEmail = (email) => getUserList().find(ele => ele.email === email)

    const getCurrentUserInitials = () => `${firstLetterUppercase(currentUser.firstName)}${firstLetterUppercase(currentUser.lastName)}`
    const getInitialsOfUser = (user) => `${firstLetterUppercase(user.firstName)}${firstLetterUppercase(user.lastName)}`

    const getCurrentUserAvatar = () => currentUser?.avatar
    const setCurrentUserAvatar = (avatar) => {
        const userList = getUserList();
        const matchingUser = userList.find(ele => ele.email === currentUser.email);
        const indexOfMatchingUser = userList.indexOf(matchingUser);

        userList[indexOfMatchingUser].avatar = avatar

        setUserList(userList)
        handleCurrentUserSessionSet(matchingUser)
        handleCurrentUserStateSet(matchingUser)
    }

    const updateUser = (user) => {
        const userList = getUserList();
        const matchingUser = userList.find(ele => ele.email === user.email);
        const indexOfMatchingUser = userList.indexOf(matchingUser);

        userList[indexOfMatchingUser] = user

        setUserList(userList)
        handleCurrentUserSessionSet(user)
        handleCurrentUserStateSet(user)
    }

    const deleteUser = (user) => {
        const updatedUserList = getUserList()?.filter(ele => ele.email !== user.email);

        setUserList(updatedUserList)
        handleCurrentUserSessionUnset();
        handleCurrentUserStateUnset();
    }

    const updateUserPassword = (password) => {
        const updatedUser = currentUser
        updatedUser.password = password
        updateUser(updatedUser)
    }

    const doesEmailExist = (email) => {
        const matchingUser = getUserList()?.find(ele => ele.email === email)
        return !!matchingUser;
    }

    const auth = {
        currentUser,
        signUp,
        signIn,
        signOut,
        getUserByEmail,
        getInitialsOfUser,
        getCurrentUserInitials,
        updateUser,
        updateUserPassword,
        deleteUser,
        doesEmailExist,
        getCurrentUserAvatar,
        setCurrentUserAvatar,
        getAvatarUrlBlob,
    }

    return <AuthContext.Provider value={auth}>{!loading && children}</AuthContext.Provider>;
}
