// import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import ModalProvider from "@/context/ModalContext";
import UserProvider from "@/context/UserContext";
import styles from "./layout.module.css";
import Sidebar from "@/components/sidebar/Sidebar";
import KanbanProvider from "@/context/KanbanContext";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });
// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "game-dev-tool",
  description: "게임 개발 협업",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      {/* <body className={`${geistSans.variable} ${geistMono.variable}`}> */}
      <body>
        <div className={styles.container}>
          <KanbanProvider>
            <ModalProvider>
              <UserProvider>
                <div className={styles.content}>
                  <Sidebar/>
                </div>
                <div className={styles.content}>
                  {children}
                </div>
              </UserProvider>
            </ModalProvider>
          </KanbanProvider>
        </div>
      </body>
    </html>
  );
}
