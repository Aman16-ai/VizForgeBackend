const app = require("../../config/firebaseConfig");
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStream,
} = require("firebase/storage");
class FileStorageRepo {
  constructor() {
    this.storage = getStorage(app);
  }

  async upload(file) {
    return new Promise((resolve, reject) => {
      const storageRef = ref(
        this.storage,
        `file/${Date.now() + file.originalname}`
      );
      const metaData = {
        contentType: file.type,
      };
      const uploadTask = uploadBytesResumable(
        storageRef,
        file.buffer,
        metaData
      );

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            snapshot.bytesTransferred / snapshot.totalBytes / 100;
          console.log("progress", progress);
        },
        (error) => {
          reject(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log("url ", url);
            resolve(url);
          });
        }
      );
    });
  }

  async getFileBuffer(fileUrl) {
    return new Promise((resolve, reject) => {
      const storageRef = ref(this.storage, fileUrl);
      const reader = getStream(storageRef).getReader();
      const chunks = [];
      reader.read().then(function processText({ done, value }) {
        if (done) {
          const buffer = Buffer.concat(chunks);
          resolve(buffer)
          return;
        }
        chunks.push(value);
        reader.read().then(processText);
      }).catch((err) => {
        reject(err)
      });
    });
  }
}

module.exports = FileStorageRepo;
