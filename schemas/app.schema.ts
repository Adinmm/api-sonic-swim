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

export const ContactInformationSchema = z.object({
  address: z.string().min(1, "Address is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().min(1, "Email is required"),
  operational_time: z.array(z.string()).min(1, "Operational time is required"),
});

export type ContactInformationModel = z.infer<typeof ContactInformationSchema>;
