import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import {firebaseApp} from "./index";

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp);

// Create a storage reference
function createRef(path) {
    return ref(storage, path)
}

// Upload a blob to storage
export async function uploadBlob(path, file) {
    return uploadBytes(createRef(path), file)
}

// Upload a blob url from storage
export function downloadBlob(path) {
    return getDownloadURL(createRef(path))
        .then(url => url)
        .catch((error) => {
            // Handle any errors
        });
}
