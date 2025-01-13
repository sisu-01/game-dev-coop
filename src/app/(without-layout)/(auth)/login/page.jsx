import { auth, signIn } from "@/lib/auth";

const LoginPage = async () => {

  const session = await auth();

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
        <button>구글 로그인 버튼</button>
      </form>
    </div>
  );
}

LoginPage.getLayout = function getLayout(page) {
  // 로그인 페이지에는 기본 레이아웃만 적용
  return <Layout>{page}</Layout>;
};

export default LoginPage;