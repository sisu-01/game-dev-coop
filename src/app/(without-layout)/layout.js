import "../globals.css";

export const metadata = {
  title: "game-dev-tool",
  description: "게임 개발 협업",
};

export default function LoginLayout({ children }) {
  // 루트 레이아웃 없이 로그인 페이지에 대한 레이아웃만 적용
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}