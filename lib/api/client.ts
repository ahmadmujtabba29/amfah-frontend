export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  /** Use same-origin Next.js routes (e.g. /api/...) instead of the backend base URL. */
  sameOrigin?: boolean;
};

function getApiBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  return baseUrl.replace(/\/$/, "");
}

function resolveUrl(path: string, sameOrigin: boolean): string {
  if (sameOrigin || path.startsWith("/api/")) {
    return path;
  }

  return `${getApiBaseUrl()}${path}`;
}

function getErrorMessage(payload: unknown, fallback: string): string {
  if (!payload || typeof payload !== "object") {
    return fallback;
  }

  const detail = (payload as { detail?: unknown }).detail;

  if (typeof detail === "string") {
    return detail;
  }

  if (Array.isArray(detail) && detail.length > 0) {
    const first = detail[0] as { msg?: string };
    if (typeof first?.msg === "string") {
      return first.msg;
    }
  }

  return fallback;
}

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { body, sameOrigin = false, headers, ...rest } = options;
  const requestHeaders = new Headers(headers);

  if (body !== undefined && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  const response = await fetch(resolveUrl(path, sameOrigin), {
    ...rest,
    headers: requestHeaders,
    credentials: "same-origin",
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    throw new ApiError(
      getErrorMessage(payload, `Request failed with status ${response.status}`),
      response.status,
      payload,
    );
  }

  return payload as T;
}
