import { useState, type FormEvent } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '../lib/firebase'
import { compressImage } from '../lib/compressImage'
import { weddingInfo } from '../config/weddingInfo'

type Status = 'idle' | 'uploading' | 'done' | 'error'

export function GuestPhotoUpload() {
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setErrorMessage('')

    if (!file) {
      setErrorMessage('사진을 선택해주세요.')
      return
    }
    // 최종 검증은 Firebase 보안 규칙에서 이뤄짐 (PLAN.md 5.3) — 이건 사용자 피드백용 사전 체크
    if (code !== weddingInfo.uploadCode) {
      setErrorMessage('코드가 올바르지 않습니다.')
      return
    }

    setStatus('uploading')
    try {
      const compressed = await compressImage(file)
      const storagePath = `guest-photos/${Date.now()}-${crypto.randomUUID()}.jpg`
      const storageRef = ref(storage, storagePath)
      await uploadBytes(storageRef, compressed, {
        contentType: 'image/jpeg',
        customMetadata: { code, uploaderName: name || '익명' },
      })
      const url = await getDownloadURL(storageRef)

      await addDoc(collection(db, 'guestPhotos'), {
        url,
        uploaderName: name || '익명',
        code,
        createdAt: serverTimestamp(),
      })

      setStatus('done')
      setFile(null)
      setName('')
      setCode('')
    } catch (error) {
      console.error('사진 업로드 실패', error)
      setStatus('error')
      setErrorMessage('업로드 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="w-full rounded-lg border border-gold/40 bg-paper px-4 py-2 text-sm text-ink"
      />
      <input
        type="password"
        inputMode="numeric"
        placeholder="코드 (예식일 4자리)"
        value={code}
        onChange={(event) => setCode(event.target.value)}
        className="w-full rounded-lg border border-gold/40 bg-paper px-4 py-2 text-sm text-ink"
      />
      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(event) => setFile(event.target.files?.[0] ?? null)}
        className="w-full text-sm text-ink/70"
      />
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      <button
        type="submit"
        disabled={status === 'uploading'}
        className="w-full rounded-full bg-green py-3 text-sm text-paper disabled:opacity-50"
      >
        {status === 'uploading' ? '업로드 중...' : '사진 올리기'}
      </button>
      {status === 'done' && <p className="text-center text-sm text-green">업로드 완료! 감사합니다.</p>}
    </form>
  )
}
