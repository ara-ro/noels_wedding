/** 긴 변 기준으로 리사이즈하고 JPEG로 재인코딩해 업로드 용량을 줄인다 (PLAN.md 5.2, 9.3). */
export async function compressImage(file: File, maxDimension = 1920, quality = 0.8): Promise<Blob> {
  const bitmap = await createImageBitmap(file)
  const scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height))
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    throw new Error('Canvas context를 생성할 수 없습니다.')
  }
  ctx.drawImage(bitmap, 0, 0, width, height)

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('이미지 압축에 실패했습니다.'))),
      'image/jpeg',
      quality,
    )
  })
}
