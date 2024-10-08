import {  User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import passport from "passport";
import { prisma } from "../config/prisma-client";

class MessagesController {
  static createMessage = [
    body("content").trim().isLength({ min: 1 }).escape(),
    passport.authenticate("jwt", { session: false }),
    expressAsyncHandler(
      async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
          next();
        } else {
          res.status(401).json({ errors: errors.array() });
        }
      },
    ),
    expressAsyncHandler(async (req: Request, res: Response) => {
      const messageBody: string = req.body.content;
      const conversationId: string = req.params.conversationid;
      const currentUser = req.user as User;

      await prisma.message.create({
        data: {
          body: messageBody,
          conversationId: conversationId,
          authorId: currentUser.id,
        },
      });

      res.status(200).json("message created");
    }),
  ];

  static deleteMessage = [
    passport.authenticate("jwt", { session: false }),
    expressAsyncHandler(async (req: Request, res: Response) => {
      const messageId = req.params.messageid;

      await prisma.message.delete({
        where: {
          id: messageId,
        },
      });

      res.status(200).json("message deleted");
    }),
  ];
}

export default MessagesController;
