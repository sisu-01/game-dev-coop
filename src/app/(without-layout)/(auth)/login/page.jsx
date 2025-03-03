import { signIn } from "@/lib/auth";
import styles from "./login.module.css";

const LoginPage = async ({ searchParams }) => {
  const { r } = await searchParams;
  const handleGoogleLogin = async () => {
    "use server"
    await signIn("google", { redirectTo: `${r}` });
    //https://authjs.dev/getting-started/session-management/login
  }
  const handleGithubLogin = async () => {
    "use server"
    await signIn("github");
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>로그인</h1>
      <form action={handleGoogleLogin}>
        <button className={styles.button}>
          구글 로그인
        </button>
      </form>
    </div>
  );
}

export default LoginPage;