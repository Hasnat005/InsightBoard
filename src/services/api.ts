import axios, { AxiosError } from "axios";
import type { ApiError, ApiSuccess } from "@/types/api";

const apiClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

function mapAxiosError(error: AxiosError): ApiError {
  const status = error.response?.status ?? 500;
  const requestId =
    (error.response?.headers["x-request-id"] as string | undefined) ?? undefined;
  return {
    message: error.response?.data
      ? JSON.stringify(error.response.data)
      : error.message,
    status,
    requestId,
  };
}

export async function fetcher<T>(url: string, signal?: AbortSignal) {
  try {
    const response = await apiClient.get<ApiSuccess<T>>(url, { signal });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw mapAxiosError(error);
    }
    throw {
      message: "Unexpected error",
      status: 500,
    } satisfies ApiError;
  }
}

export { apiClient };
