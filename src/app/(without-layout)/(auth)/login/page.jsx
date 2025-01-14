import { auth, signIn } from "@/lib/auth";

const LoginPage = async () => {

  const session = await auth();
  let imageUrl;
  let name;
  let email;

  if (session == undefined) {
    imageUrl = "session.user.image";
    name = "session.user.name";
    email = "session.user.email";
  } else {
    imageUrl = session.user.image;
    name = session.user.name;
    email = session.user.email;
  }

  const handleGoogleLogin = async () => {
    "use server"
    await signIn("google", { redirectTo: "/about" });
    //https://authjs.dev/getting-started/session-management/login
  }
  const handleGithubLogin = async () => {
    "use server"
    await signIn("github");
  }

  return (
    <div>
      {imageUrl}<br/>{name}<br/>{email}
      <form action={handleGoogleLogin}>
        <button>구글 로그인 버튼</button>
      </form>
    </div>
  );
}

export default LoginPage;