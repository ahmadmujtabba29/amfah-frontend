export const ACCESS_TOKEN_COOKIE = "amfah_access_token";

export const accessTokenCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60,
};
