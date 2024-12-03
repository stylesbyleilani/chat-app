// import { getStorage,uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
// import { storage } from "./firebase";

// const upload = async (file)=>{


// const date = new Date()
// const storageRef = ref(storage,  `images/${date + file.name}`);
// const uploadTask = uploadBytesResumable(storageRef, file);
// return new Promise((resolve, reject)=>{

// // })


// uploadTask.on('state_changed',
//   (snapshot) => {
//     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//     console.log('Upload is ' + progress + '% done');
//     switch (snapshot.state) {
//       case 'paused':
//         console.log('Upload is paused');
//         break;
//       case 'running':
//         console.log('Upload is running');
//         break;
//     }
//   }, 
//   (error)=>{
//     reject('something went wrong ' + error.code)
    
//   }, 
//   () => {
//     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//     resolve(downloadURL)
//     });
//   }
// )
// });
// }




// export default upload



import { getStorage, uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { storage } from "./firebase";

const upload = async (file) => {
  const date = new Date();
  const storageRef = ref(storage, `images/${date.getTime()}_${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        reject('Something went wrong: ' + error.code);
      },
      () => {
        // When the upload completes successfully, resolve with the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
};

export default upload;
