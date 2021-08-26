import React, {useRef, useContext, createContext, useEffect} from "react";
import {dateToString, useAuth} from "./AuthProvider";
import { v4 as uuidv4 } from 'uuid';

import {uploadBlob} from "../../util/firebase/storage";

/* Local storage keys */
const POST_LIST_KEY = 'post-list'

/* Local storage posts getter/setter */
const getPostsLocalStorage = () => JSON.parse(localStorage.getItem(POST_LIST_KEY));
const setPostsLocalStorage = (posts) => localStorage.setItem(POST_LIST_KEY, JSON.stringify(posts));

/* Dispatch action type keys */
const DISPATCH_POST_ADD = 'add'
const DISPATCH_POST_EDIT = 'edit'
const DISPATCH_POST_DELETE = 'delete'
const DISPATCH_POST_DELETE_ALL_FROM_USER = 'delete-from-user'
const DISPATCH_REPLY_ADD = 'reply-add'

/* post state init */
const postInit = (posts) => posts ?? []

/* post reducer */
const postReducer = (posts, action) => {
    switch(action.type) {
        case DISPATCH_POST_ADD: return [...posts, action.payload]
        case DISPATCH_POST_EDIT: return [...posts.filter(ele => ele.id !== action.payload.id), action.payload]
        case DISPATCH_POST_DELETE: return posts.filter(ele => ele.id !== action.payload)
        case DISPATCH_POST_DELETE_ALL_FROM_USER: return posts.filter(ele => ele.userId !== action.payload)
        case DISPATCH_REPLY_ADD: {
            const post = posts.find(ele => ele.id === action.payload.id)
            post.replies.push(action.payload.reply)
            return [...posts.filter(ele => ele.id !== action.payload.id), post]
        }
        default: throw new Error()
    }
}

/* Data objects */
const postObject = (userId, body, files) => {
    const id = uuidv4()
    return {
        id: id,
        userId: userId,
        body: body,
        fileNames: files ? [id] : [],
        postDate: dateToString(),
        replies: []
    }
}

const replyObject = (currentUserEmail, body) => {
    return {
        replyId: uuidv4(),
        userId: currentUserEmail,
        body,
        postDate: dateToString(),
    }
}

const PostContext = createContext(undefined);
// Hook that enables any component to subscribe to post state
export const usePost = () => useContext(PostContext)

// Context Provider component that wraps app and makes post object
// available to any child component that calls the usePost() hook.
export function PostProvider({ children }) {
    const {currentUser, getUserByEmail} = useAuth()

    /* Ref used to monitor currentUser state changes for user delete purposes */
    const ref = useRef({});
    useEffect(() => {
        ref.current = currentUser;
    });
    const prevCurrentUser = ref.current;

    /* Posts state and dispatcher */
    const [posts, dispatchPosts] = React.useReducer(postReducer, getPostsLocalStorage(), postInit);

    /* Dispatchers */
    const dispatchPostsAdd = (post) => dispatchPosts({type: DISPATCH_POST_ADD, payload: post})
    const dispatchPostsEdit = (post) => dispatchPosts({type: DISPATCH_POST_EDIT, payload: post})
    const dispatchPostsDelete = (id) => dispatchPosts({type: DISPATCH_POST_DELETE, payload: id})
    const dispatchPostsDeleteAllFromUser = (userId) => dispatchPosts({type: DISPATCH_POST_DELETE_ALL_FROM_USER, payload: userId})
    const dispatchReplyAdd = (postId, reply) => dispatchPosts({type: DISPATCH_REPLY_ADD, payload: {id: postId, reply}})

    /* Monitor currentUser for onDelete action */
    useEffect(() => {
        if (!currentUser
            && prevCurrentUser?.email
            && !getUserByEmail(prevCurrentUser?.email)
        ) dispatchPostsDeleteAllFromUser(prevCurrentUser.email)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    /* If posts state changes update local storage */
    useEffect(() => {
        setPostsLocalStorage(posts)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [posts]);

    /* Post provider public functions */
    const postCreate = (body, files) => {
        if (!(body && files))  return

        const post = postObject(currentUser.id, body, files?.length > 0)
        if (files?.length > 0)
            return uploadBlob(post.id, files[0])
                .then(() => dispatchPostsAdd(post))
        else
            dispatchPostsAdd(post);
    }

    const postUpdate = (postId, body) => {
        if (!(postId && body))  return

        const matchingPost = posts.find(ele => ele.id === postId)
        matchingPost.body = body

        dispatchPostsEdit(matchingPost)
    }

    const postDelete = (id) => {
        if (id) dispatchPostsDelete(id)
    }

    const replyCreate = (body, postId) => {
        if (postId && body) dispatchReplyAdd(postId, replyObject(currentUser.email, body))
    }

    const post = {
        posts,
        postCreate,
        postUpdate,
        postDelete,
        replyCreate,
    }

    return <PostContext.Provider value={post}>{children}</PostContext.Provider>;
}
