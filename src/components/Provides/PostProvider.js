import React, {useRef, useContext, createContext, useState, useEffect} from "react";
import {dateToString, useAuth} from "./AuthProvider";
import { v4 as uuidv4 } from 'uuid';
import {uploadBlob} from "../../util/firebase/storage";

const POST_LIST_KEY = 'post-list'

const PostContext = createContext(undefined);

// Hook that enables any component to subscribe to auth state
export const usePost = () => useContext(PostContext)

// Context Provider component that wraps your app and makes auth object
// available to any child component that calls the useAuth() hook.
export function PostProvider({ children }) {
    const {currentUser, getUserByEmail} = useAuth()

    const ref = useRef({});
    useEffect(() => {
        ref.current = currentUser;
    });
    const prevCurrentUser = ref.current;

    const [loading, setLoading] = useState( true)
    const [posts, setPosts] = useState( [])

    useEffect(() => {
        const posts = getPostListLocalStorage() ?? []

        handlePostListSet(posts)
        handleLoadingUnset()
    }, [])

    useEffect(() => {
        if (
            !currentUser &&
            prevCurrentUser?.email &&
            !getUserByEmail(prevCurrentUser?.email)
        ) deleteAllPostsByUser(prevCurrentUser?.email)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);


    const handlePostListSet = posts => setPosts(posts)

    const handleLoadingUnset = () => setLoading(false)

    const setPostListLocalStorage = (userList) => localStorage.setItem(POST_LIST_KEY, JSON.stringify(userList));
    const getPostListLocalStorage = () => JSON.parse(localStorage.getItem(POST_LIST_KEY));

    const postAddNew = (post) => {
        const postList = getPostListLocalStorage();
        setPostListLocalStorage([...(postList ?? []), post]);
        handlePostListSet([...(postList ?? []), post]);
    }

    const addReplyToPost = (reply, postId) => {
        const postList = getPostListLocalStorage();
        const matchingPost = postList.find(ele => ele.postId === postId)
        const indexOfMatchingPost = postList.indexOf(matchingPost)

        postList[indexOfMatchingPost].replies = [...postList[indexOfMatchingPost].replies, reply]

        handlePostListSet(postList)
        setPostListLocalStorage(postList)
    }

    const postCreate = (body, files) => {
        const id = uuidv4()

        const fileNames = files.map((ele, key) => (
            `${id}_${key}`
        ))

        return uploadBlob(fileNames[0], files[0])
            .then(() => {
                const newPost = {
                    postId: id,
                    userId: currentUser.email,
                    body,
                    fileNames,
                    postDate: dateToString(),
                    replies: []
                };

                postAddNew(newPost);
            })
    }

    const replyCreate = (body, postId) => {
        const reply = {
            replyId: uuidv4(),
            userId: currentUser.email,
            body,
            postDate: dateToString(),
        }

        addReplyToPost(reply, postId)
    }

    const postUpdate = (postId, body) => {
        const postList = getPostListLocalStorage();
        const matchingPost = postList.find(ele => ele.postId === postId)
        const indexOfMatchingPost = postList.indexOf(matchingPost)

        postList[indexOfMatchingPost].body = body

        handlePostListSet(postList)
        setPostListLocalStorage(postList)
    }

    const postDelete = (id) => {
        const postList = getPostListLocalStorage();
        const updatedList = postList?.filter(ele => ele.postId !== id)

        setPostListLocalStorage(updatedList);
        handlePostListSet(updatedList);
    }

    const deleteAllPostsByUser = (userEmail) => {
        const postList = getPostListLocalStorage();
        const updatedList = postList?.filter(ele => ele.userId !== userEmail);

        const list = updatedList ?? []

        setPostListLocalStorage(list);
        handlePostListSet(list);
    }

    const post = {
        posts,
        getPostListLocalStorage,
        postCreate,
        postUpdate,
        postDelete,
        deleteAllPostsByUser,
        replyCreate,
    }

    return <PostContext.Provider value={post}>{!loading && children}</PostContext.Provider>;
}
