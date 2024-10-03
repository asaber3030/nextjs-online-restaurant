"use server";

import db from "@/services/prisma";

import { actionResponse, responseCodes } from "@/lib/response";
import { revalidatePath } from "next/cache";
import { adminRoutes } from "@/lib/routes";
import { z } from "zod";

import { MenuItemSchema } from "@/schema";
import { MenuItem } from "@prisma/client";
import { createPagination } from "@/lib/utils";

import { SearchParams } from "@/types";
import { getCurrentResturant } from "./app";

import s3 from "@/services/s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuid } from 'uuid'

export async function getMenuItemsByCategoryId(categoryId: number) {
  const menuItems = await db.menuItem.findMany({ where: { categoryId } })
  return menuItems
}

export async function getMenuItems(params: SearchParams) {
  
  const { skip, take } = createPagination(params)
  
  const res = await getCurrentResturant()
  const items = await db.menuItem.findMany({
    where: { 
      category: { restaurantId: res?.id ?? 1 },
      OR: [ 
        { enName: { contains: params.search ?? '' } },
        { arName: { contains: params.search ?? '' } },
      ]
    },
    include: { category: true },
    orderBy: { [params.orderBy ?? 'id']: params.orderType ?? 'asc' },
    skip: skip || 0,
    take
  })
  return items
}

export async function getMenuItem(id: number) {
  const item = await db.menuItem.findUnique({
    where: { id },
    include: { category: true }
  })
  return item
}

export async function createMenuItem(formData: FormData, values: z.infer<typeof MenuItemSchema.create>) {
  const menuItem = await db.menuItem.create({
    data: values
  })
  try {
    const file = formData.get('file') as File
    const finalFileName = uuid() + file.name
    const { url, fields } = await createPresignedPost(s3, {
      Bucket: process.env.BUCKET_NAME || '',
      Key: finalFileName,
    })
    const menuItemImageUrl = url + finalFileName
    const formDataS3 = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      formDataS3.append(key, value);
    })
    formDataS3.append('file', formData.get('file') as string);

    const uploadResponse = await fetch(url, {
      method: 'POST',
      body: formDataS3,
    })
    
    if (uploadResponse.ok) {
      await db.menuItem.update({
        where: { id: menuItem.id },
        data: { image: menuItemImageUrl }
      })
    } else {
      console.error('Failed to upload file');
    }
  } catch (err) {
    console.error(err);
  }
  revalidatePath(adminRoutes.menuItems())
  return actionResponse<MenuItem>(responseCodes.created, "Menu Item has been created.", menuItem)
}

export async function updateMenuItem(id: number, formData: FormData, haveFile: boolean, values: z.infer<typeof MenuItemSchema.update>) {
  
  const menuItem = await db.menuItem.findUnique({ where: { id } })
  if (!menuItem) return actionResponse(responseCodes.badRequest, "No Menu Item found.")

  await db.menuItem.update({
    where: { id },
    data: values
  })

  if (haveFile) {
    try {
      const file = formData.get('file') as File
      let finalFileName = Math.floor(Math.random() * 9999999) + file.name
      const { url, fields } = await createPresignedPost(s3, {
        Bucket: process.env.BUCKET_NAME || '',
        Key: finalFileName,
      })
      const formDataS3 = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formDataS3.append(key, value);
      })
      formDataS3.append('file', formData.get('file') as string);
      const uploadResponse = await fetch(url, {
        method: 'POST',
        body: formDataS3,
      })
      if (uploadResponse.ok) {
        await db.menuItem.update({
          where: { id: menuItem.id },
          data: { image: url + finalFileName }
        })
        console.log('Uploaded~!');
      } else {
        console.error('Failed to upload file');
      }
    } catch (err) {
      console.error(err);
    }
  }

  revalidatePath(adminRoutes.menuItems())
  return actionResponse(responseCodes.ok, "Menu Item has been updated.")
}

export async function deleteMenuItem(id: number) {
  const menuItem = await db.menuItem.findUnique({ where: { id } })
  if (!menuItem) return actionResponse(responseCodes.badRequest, "No Menu Item found.")
  await db.menuItem.delete({
    where: { id },
  })
  revalidatePath(adminRoutes.menuItems())
  return actionResponse(responseCodes.ok, "Menu Item has been deleted.")
}