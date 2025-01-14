import { NextResponse } from 'next/server'

export const middleware = (request) => {
  const token = request.cookies.get("authjs.session-token");
  console.log(request.cookies);
  if (token == undefined || !token) {
    console.log("리다이렉트다.")
    return NextResponse.redirect(new URL("/login", request.url));
  }
  console.log("네 할 일 해라.")
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