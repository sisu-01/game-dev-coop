import { getToken } from "next-auth/jwt"

const secret = process.env.AUTH_SECRET;

// 유저 정보를 토큰을 통해 가져오는 함수 (예시)
export const getEmailFromToken = async (req) => {
  const token = await getToken({ req, secret });
  console.log(token);
  const { email } = token;
  return email;
}