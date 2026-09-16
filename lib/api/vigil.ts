import { ApiError } from "@/lib/api/client";

function getApiBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  return baseUrl.replace(/\/$/, "");
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

export type HashFileResponse = {
  filename: string;
  content_type: string | null;
  size_bytes: number;
  sha256: string;
};

export async function hashFile(file: File): Promise<HashFileResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${getApiBaseUrl()}/vigil/hash`, {
    method: "POST",
    body: formData,
  });

  const contentType = response.headers.get("content-type") ?? "";
  const isJson = contentType.includes("application/json");
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    throw new ApiError(
      getErrorMessage(payload, `Hash request failed with status ${response.status}`),
      response.status,
      payload,
    );
  }

  return payload as HashFileResponse;
}

export async function downloadForensicReport(): Promise<void> {
  const response = await fetch(`${getApiBaseUrl()}/vigil/report`, {
    method: "GET",
  });

  if (!response.ok) {
    let payload: unknown = null;

    const contentType = response.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      payload = await response.json();
    }

    throw new ApiError(
      getErrorMessage(
        payload,
        `Report download failed with status ${response.status}`,
      ),
      response.status,
      payload,
    );
  }

  const blob = await response.blob();
  const objectUrl = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = "forensic_validation_report.pdf";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.URL.revokeObjectURL(objectUrl);
}
