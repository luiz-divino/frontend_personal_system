import { RegisterForm } from "@/components/forms/register-form";

export default function Register() {
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <div className="flex-1 bg-amber-400 flex justify-center w-full">
        <RegisterForm />
      </div>
      <div className="hidden w-full mx-auto md:block flex-1 bg-amber-100 items-center justify-center ">
        <h1>form container</h1>
      </div>
    </div>
  );
}
