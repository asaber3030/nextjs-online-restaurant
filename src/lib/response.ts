import { NextResponse } from "next/server"

export const responseCodes = {
  ok: 200, 
  created: 201,
  badRequest: 400, 
  unauthorized: 401,
  notFound: 404, 
  conflict: 409,
  serverError: 500,
}

export function actionResponse<T>(status: number, message: string, data?: T) {
  return {
    message,
    data,
    status
  }
}

export function response(status: number, message: string, data?: unknown) {
  return NextResponse.json({
    message,
    data,
    status
  }, { status })
}