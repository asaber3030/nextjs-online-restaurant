import jwt from 'jsonwebtoken'
import db from "@/services/prisma";

import { NextRequest } from "next/server";
import { User } from "@prisma/client";

import { extractToken } from "@/lib/utils";
import { response, responseCodes } from "@/lib/response";
import { adminSecret } from "@/lib/constants";

export async function GET(req: NextRequest) {
  try {
    const token = extractToken(req.headers.get('Authorization')!)
    const decodedUser = jwt.verify(token, adminSecret) as User
    const user = await db.admin.findUnique({ where: { id: decodedUser.id } })
    if (!user) return response(responseCodes.unauthorized, "Unauthorized")
    const { password, ...restUser } = user
    return response(responseCodes.ok, "Admin data.", restUser)
  } catch (error) {
    return response(responseCodes.unauthorized, "Unauthorized", undefined)
  }
}