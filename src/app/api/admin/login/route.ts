import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import db from "@/services/prisma"

import { adminSecret } from "@/lib/constants"
import { response, responseCodes } from "@/lib/response"
import { extractErrors } from "@/lib/utils"

import { AdminSchema } from "@/schema"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json()

  const parsedBody = AdminSchema.login.safeParse(body)
  if (!parsedBody.success) return response(responseCodes.serverError, "Validation errors", { errors: extractErrors(parsedBody.error) })

  const findUser = await db.admin.findUnique({ where: { email: parsedBody.data.email } })
  if (!findUser) return response(responseCodes.notFound, "Admin doesn't exist.")

  const comparePassword = await bcrypt.compare(parsedBody.data.password, findUser.password)
  if (!comparePassword) return response(responseCodes.notFound, "Invalid password.")

  const { password, ...user } = findUser

  const token = jwt.sign(user, adminSecret, {
    expiresIn: "30d",
  })

  return response(responseCodes.ok, "Logged In Successfully", { token })
}
