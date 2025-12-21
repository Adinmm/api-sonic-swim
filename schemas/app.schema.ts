import z from "zod";

export const ClassSchema = z.object({
  class_name: z.string().min(1, "Class name is required"),
  description: z.string().min(1, "Description is required"),
  schedule: z.string().min(1, "Schedule is required"),
  price: z.string().min(1, "Price is required"),
  class_items: z.array(z.string()).min(1, "Class item is required"),
});
export type ClassModel = z.infer<typeof ClassSchema>;

export const UserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password minimal 8 character"),
 
});
 export type UserModel = z.infer<typeof UserSchema>;