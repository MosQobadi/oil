export async function apiRequest<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(input, {
    ...init,
    headers:
      init?.body instanceof FormData
        ? init.headers
        : {
            "Content-Type": "application/json",
            ...init?.headers,
          },
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      typeof payload.error === "string" ? payload.error : "Request failed.",
    );
  }

  return payload.data as T;
}
