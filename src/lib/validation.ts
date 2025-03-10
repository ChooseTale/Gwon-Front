export const validateFileSize = (
  e: React.ChangeEvent<HTMLInputElement>,
  maxSize: number = 1024 * 1024 * 5
) => {
  const file = e.target.files?.[0];

  return file && file.size > maxSize;
};
