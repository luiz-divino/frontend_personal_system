import { RegisterForm } from "@/components/forms/register-form";

export default function Register() {
    return (
        <div className="flex min-h-screen">
            <div className="flex flex-1 items-center justify-center bg-card-register p-4">
                <RegisterForm />
            </div>

            <div className="hidden md:flex flex-1 items-center justify-center bg-amber-100 p-4">
                <h1 className="text-2xl font-bold">Conteúdo de introdução</h1>
            </div>
        </div>
    );
}
