import { getUser } from "@/actions/user";
import { LoginForm } from "@/app/_components/user/auth/login-form";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const user = await getUser()
  if (user) return redirect(routes.menu())
  return (
    <div className='container mx-auto my-10'>
      <LoginForm />
    </div>
  );
}
 
export default LoginPage;