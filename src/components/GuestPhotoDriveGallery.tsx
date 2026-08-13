import { useEffect, useState } from 'react'

interface DriveFile {
  id: string
  name: string
}

const API_KEY = import.meta.env.VITE_GOOGLE_DRIVE_API_KEY
const FOLDER_IDS = (import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID ?? '')
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean)

type Status = 'loading' | 'done' | 'unconfigured' | 'error'

const MAX_PHOTOS = 30

async function fetchFolderPhotos(folderId: string, limit: number): Promise<DriveFile[]> {
  const params = new URLSearchParams({
    q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
    key: API_KEY,
    fields: 'files(id,name)',
    orderBy: 'createdTime desc',
    pageSize: String(limit),
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
      const collected: DriveFile[] = []
      let hasFailure = false

      for (const folderId of FOLDER_IDS) {
        if (collected.length >= MAX_PHOTOS) break
        try {
          const files = await fetchFolderPhotos(folderId, MAX_PHOTOS - collected.length)
          collected.push(...files)
        } catch (error) {
          hasFailure = true
          console.error(`하객 사진을 불러오지 못했습니다 (폴더 ${folderId})`, error)
        }
      }

      setPhotos(collected)
      setStatus(collected.length === 0 && hasFailure ? 'error' : 'done')
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
    <>
      <div className="overflow-hidden">
        <div className="flex w-max animate-photo-marquee gap-1.5">
          {[...photos, ...photos].map((photo, index) => (
            <img
              key={`${photo.id}-${index}`}
              src={`https://drive.google.com/thumbnail?id=${photo.id}&sz=w500`}
              alt={photo.name}
              loading="lazy"
              className="h-28 w-28 shrink-0 rounded-sm object-cover"
            />
          ))}
        </div>
      </div>
      <p className="text-center text-sm text-ink/40">공유해주셔서 감사합니다!</p>
    </>
  )
}
