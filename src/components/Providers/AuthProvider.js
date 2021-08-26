import React, {
    useContext,
    useEffect,
    createContext,
} from "react";
import {v4 as uuidv4} from "uuid";

import {avatarColors} from "../TabPanels/AvatarPanel/AvatarPanel";
import {downloadBlob} from "../../util/firebase/storage";

/* Local storage keys */
const USERS_KEY = 'users'
const CURRENT_USER_KEY = 'current-user'

/* Session Storage current user getter & setter */
const getCurrentUserSessionStorage = () => JSON.parse(sessionStorage.getItem(CURRENT_USER_KEY));
const setCurrentUserSessionStorage = (user) => sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

/* Local storage users getter & setter */
const getUsersLocalStorage = () => JSON.parse(localStorage.getItem(USERS_KEY));
const setUsersLocalStorage = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

// Create a date string from the current Date Time
export function dateToString() {
    const date = new Date()
    const dateStringDateMonth = `${date}`.slice(4,10)
    const dateStringYear = `${date}`.slice(10,15)

    return `${dateStringDateMonth},${dateStringYear}`
}

// Creates user initials string from name
const firstLetterUppercase = (string) => string.charAt(0).toUpperCase()

// Function returns a avatar object with optional parameters
export function avatarObject(selected, url, color) {
    return {
        selected: selected ?? "color",
        url: url ?? "",
        color: color ?? avatarColors[1],
    }
}

// Function returns a user object with not-optional parameters
function userObject(firstName, lastName, email, password) {
    return {
        id: uuidv4(),
        firstName,
        lastName,
        email,
        password,
        joinDate: dateToString(),
        avatar: avatarObject(),
    }
}

/* Dispatch action type keys */
const DISPATCH_CURRENT_USER_SET = 'set';
const DISPATCH_CURRENT_USER_UNSET = 'unset';

/* current user state init */
const currentUserInit = (user) => {
    return user
}

/* current user reducer */
const currentUserReducer = (posts, action) => {
    switch(action.type) {
        case DISPATCH_CURRENT_USER_SET: return action.payload;
        case DISPATCH_CURRENT_USER_UNSET: return null;
        default: throw new Error()
    }
}

const AuthContext = createContext();
// Hook that enables any component to subscribe to auth state
export const useAuth = () => useContext(AuthContext)

// Context Provider component that wraps app and makes auth object
// available to any child component that calls the useAuth() hook.
export function AuthProvider({ children }) {

    /* current user state and dispatcher */
    const [currentUser, currentUserDispatch] = React.useReducer(currentUserReducer, getCurrentUserSessionStorage(), currentUserInit);

    /* Dispatchers */
    const dispatchCurrentUserSet = (user) => currentUserDispatch({type: DISPATCH_CURRENT_USER_SET, payload: user});
    const dispatchCurrentUserUnset = () => currentUserDispatch({type: DISPATCH_CURRENT_USER_UNSET});

    /* If current user changes update session storage */
    /* If not in users list -> update local storage */
    /* If current user is updated -> update local storage */
    useEffect(() => {
        setCurrentUserSessionStorage(currentUser)
        if (!currentUser) return

        const users = getUsersLocalStorage() ?? []
        const match = users?.find(ele => ele?.id === currentUser?.id)
        if (!match) {
            /* Add new user to local storage */
            users.push(currentUser)
            setUsersLocalStorage(users)
        } else if (
            match.firstName !== currentUser.firstName ||
            match.lastName !== currentUser.lastName ||
            match.password !== currentUser.password ||
            match.avatar.url !== currentUser.avatar.url ||
            match.avatar.selected !== currentUser.avatar.selected ||
            match.avatar.color.label !== currentUser.avatar.color.label
        ) {
            /* Update user in local storage */
            setUsersLocalStorage([
                ...users.filter(ele => ele?.id !== currentUser?.id),
                currentUser
            ])
        }
    }, [currentUser])

    /* Auth provider public function */
    const signUp = (firstName, lastName, email, password) => {
        dispatchCurrentUserSet(userObject(
            firstName,
            lastName,
            email,
            password
        ))
    }

    const signIn = (email, password) => {
        const users = getUsersLocalStorage();
        const matchingUser = users.find(ele => ele.email === email);

        if (!matchingUser) return false;
        if (matchingUser?.password !== password) return false;

        dispatchCurrentUserSet(matchingUser)
        return true
    }

    const signOut = () => {
        dispatchCurrentUserUnset();
    }

    /* User public functions */
    const getUserById = (id) => getUsersLocalStorage()?.find((ele) => ele.id === id);
    const getUserByEmail = (email) => getUsersLocalStorage()?.find(ele => ele.email === email);
    const getUserFullName = (user) => `${user?.firstName} ${user?.lastName}`;
    const getUserInitials = (user) => `${firstLetterUppercase(user.firstName)}${firstLetterUppercase(user.lastName)}`;
    const getUserAvatarUrlBlob = (avatar) => {
        if (avatar.url) {
            return downloadBlob(avatar.url);
        }
    }

    const getCurrentUserInitials = () => getUserInitials(currentUser);
    const getCurrentUserFullName = () => getUserFullName(currentUser);
    const getCurrentUserAvatarUrlBlob = () => getUserAvatarUrlBlob(currentUser.avatar);

    const updateCurrentUser = (user) => dispatchCurrentUserSet(user);
    const updateCurrentUserAvatar = (avatar) => updateCurrentUser({...currentUser, avatar});
    const updateCurrentUserNames = (firstName, lastName) => updateCurrentUser({...currentUser, firstName, lastName});
    const updateCurrentUserPassword = (password) => updateCurrentUser({...currentUser, password});

    const deleteCurrentUser = () => {
        const updatedUsers = getUsersLocalStorage()?.filter(ele => ele.id !== currentUser.id);

        setUsersLocalStorage(updatedUsers);
        updateCurrentUser(null);
    }

    const auth = {
        currentUser,
        signUp,
        signIn,
        signOut,
        getUserById,
        getUserByEmail,
        getUserAvatarUrlBlob,
        getUserFullName,
        getUserInitials,
        getCurrentUserAvatarUrlBlob,
        getCurrentUserFullName,
        getCurrentUserInitials,
        updateCurrentUser,
        updateCurrentUserAvatar,
        updateCurrentUserNames,
        updateCurrentUserPassword,
        deleteCurrentUser,
    }

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
