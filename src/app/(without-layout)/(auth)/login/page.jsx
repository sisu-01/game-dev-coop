import { signIn } from "@/lib/auth";

const LoginPage = async () => {

  const handleGoogleLogin = async () => {
    "use server"
    await signIn("google", { redirectTo: "/" });
    //https://authjs.dev/getting-started/session-management/login
  }
  const handleGithubLogin = async () => {
    "use server"
    await signIn("github");
  }

  return (
    <div>
      <form action={handleGoogleLogin}>
        <button>구글 로그인 버튼</button>
      </form>
    </div>
  );
}

export default LoginPage;