export function getMyUserId() {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed.userId ?? null;
  } catch {
    return null;
  }
}