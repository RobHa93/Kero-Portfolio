// Web Storage kann Exceptions werfen (blockierte Cookies, Privatmodus, iFrames).
// Diese Helper fangen das ab, damit die App nie deswegen abstürzt.
export const safeStorage = {
  get(storage, key) {
    try {
      return storage.getItem(key);
    } catch {
      return null;
    }
  },
  set(storage, key, value) {
    try {
      storage.setItem(key, value);
    } catch {
      // Speichern ist optional – ohne Storage läuft die Seite trotzdem.
    }
  },
};
