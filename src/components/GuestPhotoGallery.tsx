import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../lib/firebase'

interface GuestPhoto {
  id: string
  url: string
  uploaderName: string
}

export function GuestPhotoGallery() {
  const [photos, setPhotos] = useState<GuestPhoto[]>([])

  useEffect(() => {
    const guestPhotosQuery = query(collection(db, 'guestPhotos'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(
      guestPhotosQuery,
      (snapshot) => {
        setPhotos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            url: doc.data().url as string,
            uploaderName: doc.data().uploaderName as string,
          })),
        )
      },
      (error) => {
        console.error('하객 사진을 불러오지 못했습니다', error)
      },
    )
    return unsubscribe
  }, [])

  if (photos.length === 0) {
    return <p className="text-center text-sm text-ink/40">아직 업로드된 사진이 없어요. 첫 사진을 올려보세요!</p>
  }

  return (
    <div className="grid grid-cols-3 gap-1.5">
      {photos.map((photo) => (
        <img
          key={photo.id}
          src={photo.url}
          alt={`${photo.uploaderName}님이 올린 사진`}
          loading="lazy"
          className="aspect-square w-full rounded-sm object-cover"
        />
      ))}
    </div>
  )
}
