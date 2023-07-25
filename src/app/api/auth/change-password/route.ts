import { api } from "@/lib/api";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { token, password } = await req.json();

  try {
    const result = await api.post(`/auth/validate-token`, {
      token,
      password,
    });

    return new Response(JSON.stringify(result.data), {
      status: result.status,
    });
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      return new Response(JSON.stringify(err.response?.data), {
        status: (err as AxiosError).response?.status ?? 500,
      });
    }
  }
}