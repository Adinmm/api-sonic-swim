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
  password: z.string().optional(),
});
export type UserModel = z.infer<typeof UserSchema>;

export const ContactInformationSchema = z.object({
  address: z.string().min(1, "Address is required").optional(),
  phone: z.string().min(1, "Phone is required").optional(),
  email: z.string().min(1, "Email is required").optional(),
  operational_time: z
    .array(z.string())
    .min(1, "Operational time is required")
    .optional(),
});

export type ContactInformationModel = z.infer<typeof ContactInformationSchema>;
export type Contact = {
  address: string;
  phone: string;
  email: string;
  operational_time: string[];
};

export const LoginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(8, "Password minimal 8 character"),
});

export type LoginModel = z.infer<typeof LoginSchema>;

export const ImageSchema = z.object({
  url: z.string().min(1, "Url is required"),
  image_public_id: z.string().min(1, "Image public id is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
});

export type ImageModel = z.infer<typeof ImageSchema>;

export const CoachSchema = z.object({
  name: z.string().min(1, "Nama pelatih harus diisi"),
  url: z.string().min(1, "Url is required"),
  image_public_id: z.string().min(1, "Image public id is required"),
  experience: z.string().min(1, "Pengalaman harus diisi"),
  specialization: z.string().min(1, "Spesialisasi harus diisi"),
});

export type CoachModel = z.infer<typeof CoachSchema>;

export const FaqQuestionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  categoryId: z.string().min(1, "Category id is required"),
});

export type FaqQuestionModel = z.infer<typeof FaqQuestionSchema>;
