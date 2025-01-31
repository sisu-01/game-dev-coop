import Image from "next/image";
import styles from "./profile.module.css";
import { handleLogout } from "@/lib/action";
import { auth } from "@/lib/auth"; // 임시

const Profile = async () => {

  const session = await auth();
  const imageUrl = session.user.image;
  const name = session.user.name;
  const email = session.user.email;

  return (
    <div className="item-wrapper">
      <div className={`item-label ${styles.label}`}>
        프로필
        <div className={styles.logoutWrapper}>
          <form action={handleLogout}>
            <button className={styles.logoutButton}>로그아웃</button>
          </form>
        </div>
      </div>
      <div className="item-container">
        <div className={styles.container}>
          <div className={styles.imageWrapper}>
            <Image src={imageUrl} width={63} height={63} alt={name} />
          </div>
          <div className={styles.infoWrapper}>
            <div className={styles.name}>{name}</div>
            <div className={styles.email}>{email}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;