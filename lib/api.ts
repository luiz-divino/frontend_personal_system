// Validação da variável de ambiente logo no carregamento do módulo
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;
if (!API_BASE_URL) {
    throw new Error(
        "❌ Missing environment variable: NEXT_PUBLIC_API_URL. " +
            "Please set it in your .env.local file.",
    );
}

export class ApiError extends Error {
    public readonly status: number;
    public readonly data?: unknown;

    constructor(status: number, message: string, data?: unknown) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
        // Mantém o stack trace limpo em ambientes modernos
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

type CacheOption = "no-cache" | "reload" | "force-cache" | "only-if-cached";

interface RequestConfig extends Omit<RequestInit, "headers"> {
    token?: string;
    cache?: CacheOption;
    next?: {
        revalidate?: false | 0 | number;
        tags?: string[];
    };
    headers?: Record<string, string>;
}

export async function apiClient<T>(
    endpoint: string,
    options: RequestConfig = {},
): Promise<T> {
    // Extrai token e o resto das opções
    const { token, headers: customHeaders, ...fetchOptions } = options;

    const headers: Record<string, string> = {
        ...(customHeaders || {}),
    };

    // Adiciona token se existir
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    // Só seta Content-Type como JSON se NÃO for FormData
    // (Se for FormData, o browser seta o boundary automaticamente)
    if (!(fetchOptions.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }

    const url = `${API_BASE_URL.replace(/\/+$/, "")}/${endpoint.replace(/^\/+/, "")}`;

    const response = await fetch(url, {
        ...fetchOptions,
        headers,
    });

    if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        let errorData: unknown = null;

        try {
            const clonedResponse = response.clone();
            const contentType = clonedResponse.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
                errorData = await clonedResponse.json();
                if (
                    errorData &&
                    typeof errorData === "object" &&
                    "message" in errorData &&
                    typeof errorData.message === "string"
                ) {
                    errorMessage = errorData.message;
                }
            } else {
                errorMessage = await clonedResponse.text();
            }
        } catch (_) {
            // Se falhar ao ler o corpo, mantém a mensagem padrão
        }

        throw new ApiError(response.status, errorMessage, errorData);
    }

    if (response.status === 204) {
        // Retorna null ou undefined. Mas como o usuário espera 'T', precisamos de um cast.
        // Isso é seguro porque se o backend diz 204, não há corpo.
        return null as T;
    }

    // Garantimos que é JSON antes de tentar parsear
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
        throw new ApiError(
            500,
            `A API respondeu com formato inesperado: ${contentType || "desconhecido"}`,
        );
    }

    return response.json();
}
