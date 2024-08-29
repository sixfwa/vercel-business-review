import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const optimizelyCmsUrl = process.env.OPTIMIZELY_CMS_URL ?? "";

  // Add CSP
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const cspHeader = `
        default-src 'self';
        script-src 'self' 'nonce-${nonce}' 'strict-dynamic' ${optimizelyCmsUrl};
        style-src 'self' 'nonce-${nonce}';
        img-src 'self' ${optimizelyCmsUrl} blob: data:;
        font-src 'self';
        object-src 'none';
        base-uri 'self';
        form-action 'self' ${optimizelyCmsUrl};
        frame-ancestors ${optimizelyCmsUrl || "none"};
        upgrade-insecure-requests;
    `;
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  // Make the nonce & policy available to the request
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );
  const country = request.geo?.country || "US";
  requestHeaders.set("X-User-Country", country);
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Add the policy to the response
  response.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  const re = NextResponse.next();
  re.headers.set("X-User-Country", country);
  return re;
}

export const config = {
  matcher: [
    // Skip all internal paths and paths with a '.'
    // Internal paths are:
    // - /ui => Optimizely CMS generated routes for On Page Edit
    // - /api => Services specific for the frontend
    // - /assets => Specific static files
    // - /_next => Next.JS specific files
    // - /_vercel => Vercel infrastructure routes
    // - /mobile.app => SPA for "installed usage"
    "/((?!.*\\.|ui|api|assets|_next\\/static|_next\\/image|_vercel|mobile\\.app).*)",
  ],
};
