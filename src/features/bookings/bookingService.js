import { firebaseApp } from '../../firebase.init'

async function requireFirestore() {
  if (!firebaseApp) {
    throw new Error('Firebase is not configured. Copy .env.example to .env and restart the development server.')
  }
  const firestoreSdk = await import('firebase/firestore')
  return {
    firestore: firestoreSdk.getFirestore(firebaseApp),
    firestoreSdk,
  }
}

export async function createBooking(uid, booking) {
  const { firestore, firestoreSdk } = await requireFirestore()
  const { addDoc, collection, serverTimestamp } = firestoreSdk
  const bookingRef = await addDoc(collection(firestore, 'bookings'), {
    ...booking,
    uid,
    createdAt: serverTimestamp(),
  })

  return { ...booking, id: bookingRef.id, uid }
}

export async function getBookings(uid) {
  const { firestore, firestoreSdk } = await requireFirestore()
  const { collection, getDocs, query, where } = firestoreSdk
  const bookingsQuery = query(collection(firestore, 'bookings'), where('uid', '==', uid))
  const snapshot = await getDocs(bookingsQuery)

  return snapshot.docs
    .map((bookingDoc) => {
      const booking = bookingDoc.data()
      return {
        ...booking,
        id: bookingDoc.id,
        createdAt: booking.createdAt?.toDate().toISOString() ?? '',
      }
    })
    .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt))
}

export async function cancelBooking(bookingId) {
  const { firestore, firestoreSdk } = await requireFirestore()
  const { doc, serverTimestamp, updateDoc } = firestoreSdk
  await updateDoc(doc(firestore, 'bookings', bookingId), {
    status: 'Cancelled',
    updatedAt: serverTimestamp(),
  })
}
