import { getToken } from "next-auth/jwt"

const secret = process.env.AUTH_SECRET;

// 유저 정보를 토큰을 통해 가져오는 함수 (예시)
export const getEmailFromToken = async (req) => {
  try {
    const token = await getToken({ req, secret, secureCookie: true });
    const { email } = token;
    return email;
  } catch (error) {
    console.error(error);
    return false;
  }
}