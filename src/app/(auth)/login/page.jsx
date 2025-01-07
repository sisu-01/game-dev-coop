import { auth, signIn } from "@/lib/auth";

const LoginPage = async () => {

  const session = await auth();
  console.log(session);

  const handleGoogleLogin = async () => {
    "use server"
    await signIn("google");
  }
  const handleGithubLogin = async () => {
    "use server"
    await signIn("github");
  }

  return (
    <div>
      <form action={handleGoogleLogin}>
        <button>Login with Google</button>
      </form>
      <form action={handleGithubLogin}>
        <button>Login with Github</button>
      </form>
    </div>
  );
}

export default LoginPage;