export function isTokenExpired(token: string): boolean {
  const chunks = token.split('.');

  try {
    const payload = JSON.parse(window.atob(chunks[1]));

    return payload.exp < (Date.now() / 1000);
  } catch (_e) {
    throw new Error('Invalid JWT token.');
  }
}