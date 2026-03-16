export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn('ReactSight: Failed to save to localStorage', e);
  }
}

export function loadFromStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (e) {
    console.warn('ReactSight: Failed to load from localStorage', e);
    return null;
  }
}

export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    console.warn('ReactSight: Failed to remove from localStorage', e);
  }
}

export function exportToJSON(data, filename = 'reactsight-log.json') {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
