import { initializeApp } from "firebase/app";
import {
    getAuth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signOut
} from "firebase/auth";
import {
    getFirestore, doc, setDoc, getDoc, collection, query, getDocs,
    getDatabase, ref, child, get
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD6UsWt0aESvshZVQreBug0qRCj47EYVBA",
    authDomain: "exms15-food-panda-clone.firebaseapp.com",
    projectId: "exms15-food-panda-clone",
    storageBucket: "exms15-food-panda-clone.appspot.com",
    messagingSenderId: "114938058019",
    appId: "1:114938058019:web:116bc81684ca44f9bde896"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)
const user = auth
// console.log(user)

function signupUser(data) {
    const { name, phoneNumber, email, password } = data
    // console.log("firebase signup", data)

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const { uid } = user
            setDoc(doc(db, "users", uid), {
                name,
                phoneNumber,
                email,
                uid
            })
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error.message)
        });
}

function loginUser(data) {
    const { email, password } = data
    // console.log("firebase login", data)

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error.message)
        });
}

function logoutUser() {
    const auth = getAuth();
    signOut(auth).then(() => {
        // Sign-out successful.
        // alert("logged out")
    }).catch((error) => {
        console.log(error.message)
        // An error happened.
    });
}

async function getCurrentUserData(uid) {
    if (!uid) {
        return
    }

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        return docSnap.data()
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}

async function updateCurrentUserData(data) {
    const { name, phoneNumber, email, uid } = data
    if (!uid) {
        return
    }

}

async function fetchAllResturants() {
    const q = query(collection(db, "rest"))
    let copyData = []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        const combinedData = { ...doc.data(), id: doc.id }
        copyData.push(combinedData)
    });
    return copyData
}

async function fetchResturantById(id) {

    const docRef = doc(db, "rest", id)
    const docSnap = await getDoc(docRef);
    return docSnap.data()


    // const q = query(collection(db, "rest"))
    // let copyData = []
    // const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //     const combinedData = { ...doc.data(), id: doc.id }
    //     copyData.push(combinedData)
    // });
    // return copyData

}

function createOrder(deliveryInfo, cartItems, uid) {
    console.log(uid)
    setDoc(doc(db, "orders", uid), {
        deliveryInfo,
        cartItems,
        uid
    })
}

export {
    auth,
    signupUser,
    loginUser,
    logoutUser,
    getCurrentUserData,
    updateCurrentUserData,
    fetchAllResturants,
    fetchResturantById,
    createOrder
}