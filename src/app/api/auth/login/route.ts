import db from "@/services/prisma";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { appSecret, cookieUserName } from "@/lib/constants";
import { UserSchema } from "@/schema";

import { NextRequest, NextResponse } from "next/server";
import { response, responseCodes } from "@/lib/response";
import { extractErrors } from "@/lib/utils";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json()

  const parsedBody = UserSchema.login.safeParse(body)
  if (!parsedBody.success) return response(responseCodes.serverError, 'Validation errors', { errors: extractErrors(parsedBody.error) })

  const findUser = await db.user.findUnique({ where: { phoneNumber: parsedBody.data.phone } })
  if (!findUser) return response(responseCodes.notFound, "User doesn't exist.")

  const comparePassword = await bcrypt.compare(parsedBody.data.password, findUser.password)
  if (!comparePassword) return response(responseCodes.notFound, "Invalid password.")

  const { password, ...user } = findUser

  const token = jwt.sign(user, appSecret, {
    expiresIn: '30 days'
  })

  return response(responseCodes.ok, 'Logged In Successfully', { token })
}