"use client";

import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import CreateProjectButton from "@/components/sidebar/project/createButton/CreateButton";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const lastVisited = localStorage.getItem("lastVisitedPage");
    if (lastVisited && confirm("이전에 작업하던 프로젝트로 이동할까요?")) {
      router.replace(lastVisited);
    } else {
      localStorage.removeItem("lastVisitedPage");
    }
  }, []);

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.logo}>GAME DEV COOP</h1>
        <ol>
          <li>
            `+` 버튼을 눌러 프로젝트를 생성하세요.
          </li>
          <li>프로젝트에 사용자를 초대하여 손쉽게 일정을 공유해보세요.</li>
        </ol>

        <div className={styles.ctas}>
          <div className={styles.createButton}>
            <CreateProjectButton text={"프로젝트 생성"}/>
          </div>
          <a
            href="https://github.com/sisu-01/game-dev-coop"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Github Page
          </a>
        </div>
      </main>
    </div>
  );
}
