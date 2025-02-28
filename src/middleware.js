"use server";

import { NextResponse } from 'next/server';
import { getEmailFromToken } from './utils/auth';
import { checkUserProjectAccess } from './utils/projects';

export const middleware = async (request) => {
  // 배포(vercel) 환경에선 HTTPS 때문에 __Secure가 접두사로 자동으로 붙음
  const session = request.cookies.get("authjs.session-token") || request.cookies.get("__Secure-authjs.session-token");
  const encodedInviteUrl = encodeURIComponent(request.nextUrl.pathname + request.nextUrl.search);
  if (!session) {
    return NextResponse.redirect(new URL(`/login?r=${encodedInviteUrl}`, request.url));
  }
  const projectId = request.nextUrl.pathname.split('/')[1]; // URL에서 프로젝트 ID 추출
  if (projectId === "" || projectId === "error" || !projectId) {
    return NextResponse.next();
  }
  const email = await getEmailFromToken(request); // 토큰을 통해 사용자 정보 가져오기
  if (!email) {
    return NextResponse.redirect(new URL('/error', request.url));
  }
  const hasAccess = await checkUserProjectAccess(email);
  if (!hasAccess) {
    return NextResponse.redirect(new URL('/error', request.url));
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