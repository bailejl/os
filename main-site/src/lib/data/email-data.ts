import { getFirestore, collection, addDoc } from "firebase/firestore";

export async function addEmail(email: string): Promise<void> {
  const db = getFirestore();
  await addDoc(collection(db, "notification-emails"), {
    email: email,
    addedOn: new Date()
  });
}
