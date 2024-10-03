import { RegisterForm } from "@/app/_components/user/auth/register-form";

import { getUser } from "@/actions/user";
import { routes } from "@/lib/routes";
import { redirect } from "next/navigation";

const RegisterPage = async () => {

  const user = await getUser()
  if (user) return redirect(routes.menu())

  return (
    <div className='container mx-auto my-10'>
      <RegisterForm />
    </div>
  );
}
 
export default RegisterPage;