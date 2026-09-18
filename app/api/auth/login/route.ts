import { NextResponse } from "next/server";
import {
  ACCESS_TOKEN_COOKIE,
  accessTokenCookieOptions,
} from "@/lib/auth/cookies";

type LoginRequestBody = {
  email?: string;
  password?: string;
};

function getApiBaseUrl(): string {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  return baseUrl.replace(/\/$/, "");
}

export async function POST(request: Request) {
  let body: LoginRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { detail: "Invalid request body" },
      { status: 400 },
    );
  }

  const backendResponse = await fetch(`${getApiBaseUrl()}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: body.email,
      password: body.password,
    }),
  });

  const payload = await backendResponse.json();

  if (!backendResponse.ok) {
    return NextResponse.json(payload, { status: backendResponse.status });
  }

  const response = NextResponse.json({
    success: true,
    token_type: payload.token_type ?? "bearer",
  });

  response.cookies.set(
    ACCESS_TOKEN_COOKIE,
    payload.access_token,
    accessTokenCookieOptions,
  );

  return response;
}
