import { useEffect, useState } from 'react'

interface DriveFile {
  id: string
  name: string
  createdTime: string
}

const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY
const FOLDER_IDS = (import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID ?? '')
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean)

type Status = 'loading' | 'done' | 'unconfigured' | 'error'

async function fetchFolderPhotos(folderId: string): Promise<DriveFile[]> {
  const params = new URLSearchParams({
    q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
    key: API_KEY,
    fields: 'files(id,name,createdTime)',
    orderBy: 'createdTime desc',
    pageSize: '100',
  })
  const response = await fetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`)
  if (!response.ok) throw new Error(`Drive API 응답 오류: ${response.status} (폴더 ${folderId})`)
  const data = await response.json()
  return data.files ?? []
}

export function GuestPhotoDriveGallery() {
  const [photos, setPhotos] = useState<DriveFile[]>([])
  const [status, setStatus] = useState<Status>('loading')

  useEffect(() => {
    if (!API_KEY || FOLDER_IDS.length === 0) {
      setStatus('unconfigured')
      return
    }

    const fetchPhotos = async () => {
      const results = await Promise.allSettled(FOLDER_IDS.map(fetchFolderPhotos))

      const merged: DriveFile[] = []
      let hasFailure = false
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          merged.push(...result.value)
        } else {
          hasFailure = true
          console.error(`하객 사진을 불러오지 못했습니다 (폴더 ${FOLDER_IDS[index]})`, result.reason)
        }
      })

      merged.sort((a, b) => b.createdTime.localeCompare(a.createdTime))
      setPhotos(merged)
      setStatus(merged.length === 0 && hasFailure ? 'error' : 'done')
    }

    void fetchPhotos()
  }, [])

  if (status === 'loading') {
    return <p className="text-center text-sm text-ink/40">불러오는 중...</p>
  }

  if (status === 'unconfigured') {
    return <p className="text-center text-sm text-ink/40">갤러리 연동 준비 중이에요.</p>
  }

  if (status === 'error' || photos.length === 0) {
    return <p className="text-center text-sm text-ink/40">아직 업로드된 사진이 없어요. 첫 사진을 올려보세요!</p>
  }

  return (
    <div className="grid grid-cols-3 gap-1.5">
      {photos.map((photo) => (
        <img
          key={photo.id}
          src={`https://drive.google.com/thumbnail?id=${photo.id}&sz=w500`}
          alt={photo.name}
          loading="lazy"
          className="aspect-square w-full rounded-sm object-cover"
        />
      ))}
    </div>
  )
}
