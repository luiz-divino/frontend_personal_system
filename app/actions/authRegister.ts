"use server";
export async function registerFormAction(
    prevState: {sucess: boolean, message: string} | null,
    formData: FormData
){
    console.log("registerFormAction", prevState, formData);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log("name", name);
    console.log("email", email);
    console.log("password", password);

    return {
        sucess: true,
        message: "Cadastro realizado com sucesso!"
    }
}