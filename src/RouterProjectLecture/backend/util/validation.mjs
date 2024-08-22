export function isValidText(value) {
  return value && value.trim().length > 0;
}

export function isValidDate(value) {
  const date = new Date(value);
  return value && date !== 'Invalid Date';
}

export function isValidImageUrl(value) {
  return value && value.startsWith('http');
}

