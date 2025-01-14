import { NextResponse } from 'next/server'

export const middleware = (request) => {
  // 배포(vercel) 환경에선 HTTPS 때문에 __Secure가 접두사로 자동으로 붙음
  const token = request.cookies.get("authjs.session-token") || request.cookies.get("__Secure-authjs.session-token");
  if (token == undefined || !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  /*
  * Match all request paths except for the ones starting with:
  * - api (API routes)
  * - _next/static (static files)
  * - _next/image (image optimization files)
  * - favicon.ico, sitemap.xml, robots.txt (metadata files)
  * - login (login page)
  * - .*\\..* (static files)
  */
 matcher: [
  '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|login|.*\\..*).*)'
 ]
}