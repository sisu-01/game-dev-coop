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
    <div className={styles.container}>
      <div className={styles.label}>
        프로필
      </div>
      <div className={styles.flex}>
        <div>
          <Image src={imageUrl} width={80} height={80} alt="프로필" />
        </div>
        <div>
          <div className={styles.logout}>
            <form action={handleLogout}>
              <button className={styles.logout}>Logout</button>
            </form>
          </div>
          <div>{name}</div>
          <div>{email}</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;