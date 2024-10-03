"use server";

import { UserSchema } from "@/schema";
import { apiURL, cookieUserName } from "@/lib/constants";
import { z } from "zod";

import { APIResponse } from "@/types";
import { cookies } from "next/headers";

type LoginResponseData = { token: string } 

export async function loginAction(values: z.infer<typeof UserSchema.login>): Promise<APIResponse<LoginResponseData>> {
  const loginRequest = await fetch(`${apiURL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(values)
  }) 
  const data = await loginRequest.json()
  cookies().set(cookieUserName, data?.data?.token, {
    expires: Date.now() + 24 * 60 * 60 * 1000 * 30
  })
  return data
}

export async function registerAction(values: z.infer<typeof UserSchema.register>): Promise<APIResponse<undefined>> {
  const registerRequest = await fetch(`${apiURL}/auth/register`, {
    method: 'POST',
    body: JSON.stringify(values)
  })
  const data = await registerRequest.json()
  return data
}