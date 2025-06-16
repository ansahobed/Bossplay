// lib/cloudinary.ts
export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'bossplay_unsigned'); // ← Make sure it's correct
  formData.append('folder', 'bossplay-images'); // optional

  const res = await fetch('https://api.cloudinary.com/v1_1/dqk4ys8ou/image/upload', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Cloudinary upload failed');
  }

  return res.json(); // includes secure_url
};
