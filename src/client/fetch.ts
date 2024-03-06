export async function fetchJSON(...fetchArgs: Parameters<typeof fetch>) {
  const response = await fetch(...fetchArgs);

  if (response.status >= 400) {
    throw new Error(`[ERROR] fetchJSON bad response: ${response.statusText}`);
  }
  return response.json();
}
