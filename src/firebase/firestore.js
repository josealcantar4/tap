import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import app from "./firebase-config";

const db = getFirestore(app);

// Agregar un documento
export const addData = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Documento agregado con ID:", docRef.id);
  } catch (error) {
    console.error("Error al agregar documento:", error.message);
  }
};

// Leer documentos
export const getData = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (error) {
    console.error("Error al leer documentos:", error.message);
  }
};

// Actualizar documento
export const updateData = async (collectionName, docId, newData) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, newData);
    console.log("Documento actualizado");
  } catch (error) {
    console.error("Error al actualizar documento:", error.message);
  }
};

// Eliminar documento
export const deleteData = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    console.log("Documento eliminado");
  } catch (error) {
    console.error("Error al eliminar documento:", error.message);
  }
};
