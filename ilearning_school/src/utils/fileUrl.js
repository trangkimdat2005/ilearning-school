// src/utils/fileUrl.js
export const getFileUrl = (path) => {
  if (!path) return '';
  const base = import.meta.env.VITE_API_BASE_URL;

  // avatar_path có thể có dấu "/" ở đầu (vd: "/LOGO/LOGO_xxx.png")
  // cần loại bỏ để tránh double slash khi ghép
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  return `${base}/file/download/${cleanPath}`;
};