"use client"

import styles from "./links.module.css";
import Image from "next/image";
import { handleLogout } from "@/lib/action";
import Link from "next/link";

const Links = ({session}) => {
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {session?.user ? (
          <>
            <Image
              src={session.user.image}
              width={100}
              height={100}
              alt="프로필"
            />
            <form action={handleLogout}>
              <button className={styles.logout}>Logout</button>
            </form>
          </>
        ) : (
          <Link href="/login">
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default Links;