import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import {firebaseApp} from "./index";

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);

export function createRef(path) {
    return ref(storage, path)
}

export async function uploadBlob(path, file) {
    return uploadBytes(createRef(path), file)
}

export function downloadBlob(path) {
    return getDownloadURL(createRef(path))
        .then(url => url)
        .catch((error) => {
            // Handle any errors
        });
}
