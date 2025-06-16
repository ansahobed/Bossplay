// src/lib/cloudinary.ts
export async function uploadToCloudinary(file: File): Promise<{ secure_url: string; resource_type: string }> {
  const CLOUDINARY_URL = 'cloudinary://<your_api_key>:<your_api_secret>@dqk4ys8ou';
  const CLOUDINARY_UPLOAD_PRESET = 'bossplay_unsigned';

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(CLOUDINARY_URL, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) throw new Error('Cloudinary upload failed');
  return res.json();
}
