import { FastifyInstance } from "fastify";
import * as AppMiddleware from "../middlewares/validation.middleware";
import * as AppController from "../controllers/app.controller";
import {
  ClassSchema,
  CoachSchema,
  ContactInformationSchema,
  FaqQuestionSchema,
  UserSchema,
} from "../schemas/app.schema";

export const appRoute = async (route: FastifyInstance) => {
  route.post("/class", {
    preHandler: AppMiddleware.validation(ClassSchema),
    handler: AppController.createClass,
  });

  route.post("/user", {
    preHandler: AppMiddleware.validation(UserSchema),
    handler: AppController.createUser,
  });

  route.post("/contact_information", {
    preHandler: AppMiddleware.validation(ContactInformationSchema),
    handler: AppController.createContactInformation,
  });

  route.post("/coach", {
    preHandler: AppMiddleware.validation(CoachSchema),
    handler: AppController.createCoach,
  });

  route.post("/image", AppController.uploadImage);
  route.post("/image_url", AppController.createImageUrl);

  route.post("/faq_question", {
    preHandler: AppMiddleware.validation(FaqQuestionSchema),
    handler: AppController.createFaqQuestion,
  });
  route.post("/faq_category", AppController.createFaqCategory);

  route.get("/user/:id", AppController.getUserById);
  route.get("/classes", AppController.getClass);
  route.get("/contact_informations", AppController.getContactInformation);

  route.get("/images", AppController.getImages);
  route.get("/coaches", AppController.getCoaches);

  route.get("/faq_categories", AppController.getFaqCategories);

  route.patch("/contact_information/:id", {
    preHandler: AppMiddleware.validation(ContactInformationSchema),
    handler: AppController.updateContactInformation,
  });

  route.patch("/user/:id", {
    preHandler: AppMiddleware.validation(UserSchema),
    handler: AppController.updateUser,
  });

  route.patch("/class/:id", {
    preHandler: AppMiddleware.validation(ClassSchema),
    handler: AppController.updateClass,
  });

  route.delete("/class/:id", AppController.deleteClass);

  route.delete("/image/:id", AppController.deleteImage);

  route.delete("/coach/:id", AppController.deleteCoach);

  route.delete("/faq_question/:id", AppController.deleteFaq);

  route.delete("/faq_category/:id", AppController.deleteFaqCategory);
};

export const appRuning = async (route: FastifyInstance) => {
  route.get("/", AppController.apiRuning);
};
