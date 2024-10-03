import { usernameRegEx, phoneNumberRegEx } from '@/lib/regex'
import { z } from 'zod'

export const UserSchema = {

  register: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email(),
    phone: z.string().regex(phoneNumberRegEx, { message: "Invalid Phone Number" }).min(1, { message: 'Phone Number is required' }).regex(usernameRegEx, { message: 'Invalid Egyptian Phone Number' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  }),

  login: z.object({
    phone: z.string().min(1, { message: "Phone number is required" }),
    password: z.string().min(1, { message: "Password is required!" }),
  }),

  update: z.object({
    name: z.string().min(1, { message: 'Name is required' }).optional(),
    email: z.string().email().optional(),
    phone: z.string().regex(phoneNumberRegEx, { message: "Invalid Phone Number" }).min(1, { message: 'Phone Number is required' }).regex(usernameRegEx, { message: 'Invalid Egyptian Phone Number' }).optional(),
  }),

  changePassword: z.object({
    currentPassword: z.string().min(1, { message: 'Current Password is required' }),
    newPassword: z.string().min(8, { message: "Password cannot be less than 8 characters" }),
    confirmationPassword: z.string(),
  }).refine((data) => data.newPassword === data.confirmationPassword, {
    message: "Passwords don't match",
    path: ["confirmationPassword"],
  })
}

export const AdminSchema = {

  register: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email(),
    phone: z.string().regex(phoneNumberRegEx, { message: "Invalid Phone Number" }).min(1, { message: 'Phone Number is required' }).regex(usernameRegEx, { message: 'Invalid Egyptian Phone Number' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  }),

  update: z.object({
    name: z.string().min(1, { message: 'Name is required' }).optional(),
    email: z.string().email().optional(),
    phone: z.string().regex(phoneNumberRegEx, { message: "Invalid Phone Number" }).min(1, { message: 'Phone Number is required' }).regex(usernameRegEx, { message: 'Invalid Egyptian Phone Number' }).optional(),
  }),

  login: z.object({
    email: z.string().email().min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required!" }),
  }),

}

export const ServiceAccountSchema = {
  register: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    email: z.string().email(),
    resturantId: z.number().min(1, { message: "Id cannot be 0" }).optional(),
    phone: z.string().regex(phoneNumberRegEx, { message: "Invalid Phone Number" }).min(1, { message: 'Phone Number is required' }).regex(usernameRegEx, { message: 'Invalid Egyptian Phone Number' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  }),

  update: z.object({
    name: z.string().min(1, { message: 'Name is required' }).optional(),
    email: z.string().email().optional(),
    resturantId: z.number().min(1, { message: "Id cannot be 0" }).optional(),
    phone: z.string().regex(phoneNumberRegEx, { message: "Invalid Phone Number" }).min(1, { message: 'Phone Number is required' }).regex(usernameRegEx, { message: 'Invalid Egyptian Phone Number' }).optional(),
  }),

  login: z.object({
    email: z.string().email().min(1, { message: "Email is required" }),
    password: z.string().min(1, { message: "Password is required!" }),
  }),
}

export const AddressSchema = {
  create: z.object({
    streetName: z.string().max(50, { message: "Street name cannot be more than 50 characters" }).min(1, { message: "Street name cannot be empty" }),
    homeNumber: z.string().max(50, { message: "Home Number cannot be more than 50 characters" }).min(1, { message: "Home Number cannot be empty" }),
    phoneNumber: z.string().regex(phoneNumberRegEx, { message: "Invalid Phone Number" }).min(1, { message: 'Phone Number is required' }).regex(usernameRegEx, { message: 'Invalid Egyptian Phone Number' }),
    notes: z.string().max(50, { message: "" }),
  }),

  update: z.object({
    streetName: z.string().max(50, { message: "Street name cannot be more than 50 characters" }).min(1, { message: "Street name cannot be empty" }).optional(),
    homeNumber: z.string().max(50, { message: "Home Number cannot be more than 50 characters" }).min(1, { message: "Home Number cannot be empty" }).optional(),
    phoneNumber: z.string().regex(phoneNumberRegEx, { message: "Invalid Phone Number" }).min(1, { message: 'Phone Number is required' }).regex(usernameRegEx, { message: 'Invalid Egyptian Phone Number' }).optional(),
    notes: z.string().max(50, { message: "Notes cannot be more than 50 characters" }).optional(),
  })
}

export const CategorySchema = {
  create: z.object({
    enName: z.string().min(1, { message: "English name is required" }).max(50, { message: "Cannot be more than 50 characters" }),
    arName: z.string().min(1, { message: "English name is required" }).max(50, { message: "Cannot be more than 50 characters" })
  }),
  update: z.object({
    enName: z.string().min(1, { message: "English name is required" }).max(50, { message: "Cannot be more than 50 characters" }).optional(),
    arName: z.string().min(1, { message: "English name is required" }).max(50, { message: "Cannot be more than 50 characters" }).optional()
  }),
}

export const MenuItemSchema = {
  create: z.object({
    enName: z.string().min(1, { message: "English name is required" }).max(50, { message: "Cannot be more than 50 characters" }),
    arName: z.string().min(1, { message: "English name is required" }).max(50, { message: "Cannot be more than 50 characters" }),
    price: z.number().min(1),
    offerPrice: z.number(),
    categoryId: z.number().min(1),
    ingredients: z.string().min(1, { message: "Cannot be empty" })
  }),
  update: z.object({
    enName: z.string().min(1, { message: "English name is required" }).max(50, { message: "Cannot be more than 50 characters" }).optional(),
    arName: z.string().min(1, { message: "English name is required" }).max(50, { message: "Cannot be more than 50 characters" }).optional(),
    price: z.number().min(1).optional(),
    offerPrice: z.number().optional(),
    categoryId: z.number().min(1).optional(),
    ingredients: z.string().min(1, { message: "Cannot be empty" }).optional()
  }),
}

export const OfferSchema = {
  create: z.object({
    enTitle: z.string().min(1, { message: "English name is required" }).max(50, { message: "Cannot be more than 50 characters" }),
    arTitle: z.string().min(1, { message: "English name is required" }).max(50, { message: "Cannot be more than 50 characters" }),
    arDescription: z.string().optional(),
    enDescription: z.string().optional(),
    price: z.number().min(1),
    offerPrice: z.number().min(1),
  }),
  update: z.object({
    enTitle: z.string().min(1, { message: "English name is required" }).max(50, { message: "Cannot be more than 50 characters" }).optional(),
    arTitle: z.string().min(1, { message: "English name is required" }).max(50, { message: "Cannot be more than 50 characters" }).optional(),
    arDescription: z.string().optional(),
    enDescription: z.string().optional(),
    price: z.number().min(1).optional(),
    offerPrice: z.number().min(1).optional(),
  })
}

export const OfferItemsSchema = {
  create: z.object({
    quantity: z.number().min(1),
    itemId: z.number().min(1),
  }),
  update: z.object({
    quantity: z.number().min(1).optional(),
  })
}

export const CouponSchema = {
  create: z.object({
    name: z.string().min(1, { message: "English name is required" }).max(50, { message: "Cannot be more than 50 characters" }),
    usages: z.number().min(1),
    active: z.boolean().default(true),
    discount: z.number().min(1, { message: "Cannot be less than 1" }).max(100, { message: "Cannot be more than 100" }),
  }),
  update: z.object({
    name: z.string().min(1, { message: "English name is required" }).max(50, { message: "Cannot be more than 50 characters" }).optional(),
    usages: z.number().min(1).optional(),
    active: z.boolean().default(true).optional(),
    discount: z.number().min(1, { message: "Cannot be less than 1" }).max(100, { message: "Cannot be more than 100" }).optional(),
  })
}

export const RestaurantSchema = {

  create: z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    location: z.string().min(1, { message: 'Location is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    mainPhone: z.string().regex(phoneNumberRegEx, { message: "Invalid Phone Number" }).min(1, { message: 'Phone Number is required' }).regex(usernameRegEx, { message: 'Invalid Egyptian Phone Number' }),
    phoneNumbers: z.string(),
    instagramUrl: z.string().url(),
    facebookUrl: z.string().url(),
  }),

  update: z.object({
    name: z.string().min(1, { message: 'Name is required' }).optional(),
    location: z.string().min(1, { message: 'Name is required' }).optional(),
    description: z.string().min(1, { message: 'Description is required' }).optional(),
    mainPhone: z.string().regex(phoneNumberRegEx, { message: "Invalid Phone Number" }).min(1, { message: 'Phone Number is required' }).regex(usernameRegEx, { message: 'Invalid Egyptian Phone Number' }).optional(),
    phoneNumbers: z.string().optional(),
    instagramUrl: z.string().url().optional(),
    facebookUrl: z.string().url().optional(),
  })

}