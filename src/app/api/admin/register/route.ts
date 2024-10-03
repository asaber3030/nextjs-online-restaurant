import bcrypt from 'bcrypt'
import db from "@/services/prisma";
import jwt from 'jsonwebtoken'

import { appSecret } from "@/lib/constants";
import { AdminSchema } from "@/schema";

import { NextRequest, NextResponse } from "next/server";
import { response, responseCodes } from "@/lib/response";
import { extractErrors } from "@/lib/utils";

export async function POST(req: NextRequest, res: NextResponse) {

  const body = await req.json()

  const parsedBody = AdminSchema.register.safeParse(body)
  if (!parsedBody.success) return response(responseCodes.serverError, 'Validation errors', { errors: extractErrors(parsedBody.error) })

  const findUser = await db.admin.findUnique({ where: { email: parsedBody.data.email } })
  if (findUser) return response(responseCodes.conflict, "Email already exists")

  const findUserByPhone = await db.admin.findUnique({ where: { phoneNumber: parsedBody.data.phone } })
  if (findUserByPhone) return response(responseCodes.conflict, "Phone already exists")

  const password = await bcrypt.hash(parsedBody.data.password, 10)

  const newAdmin = await db.admin.create({
    data: { 
      name: parsedBody.data.name,
      email: parsedBody.data.email,
      phoneNumber: parsedBody.data.phone,
      password,
    }
  })

  const token = jwt.sign(newAdmin, appSecret, {
    expiresIn: '30 days'
  })

  return response(responseCodes.created, 'Created successfully!', { token })
  
}