import { Conversation, User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { prismaClient } from "../app";
import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";

interface IUser extends Omit<User, "password"> {
  relatedToCurrent: boolean;
  privateConversation: Conversation | null;
}

class UserController {
  static getCurrent = [
    passport.authenticate("jwt", { session: false }),
    expressAsyncHandler(async (req: Request, res: Response) => {
      res.status(200).json(req.user as User);
    }),
  ];

  static getMany = [
    passport.authenticate("jwt", { session: false }),
    async (req: Request, res: Response) => {
      const users = await prismaClient.user.findMany({});
      const currentUser = req.user as User;
      const filteredUsers: IUser[] = [];

      for (let user of users) {
        if (user.id === currentUser.id) continue;

        const privateConversation = await prismaClient.conversation.findFirst({
          where: {
            AND: [
              {
                users: {
                  some: {
                    id: currentUser.id,
                  },
                },
              },
              {
                users: {
                  some: {
                    id: user.id,
                  },
                },
              },
            ],
          },
        });

        const { password, ...rest } = user;
        if (privateConversation) {
          filteredUsers.push({
            ...rest,
            privateConversation,
            relatedToCurrent: true,
          });
        } else {
          filteredUsers.push({
            ...rest,
            privateConversation: null,
            relatedToCurrent: false,
          });
        }
      }
      res.status(200).json(filteredUsers);
    },
  ];

  static blockUser = [
    body("id").trim().isLength({ min: 1 }).escape(),
    expressAsyncHandler(
      async (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
          next();
        } else {
          console.log(errors.array());
          res.status(401).json({ errors: errors.array() });
        }
      },
    ),
    expressAsyncHandler(async (req: Request, res: Response) => {
      const user = req.user as User;
      const blockedId = req.params.userid as string;

      await prismaClient.user.update({
        where: { id: user.id },
        data: {
          blocked: {
            connect: [{ id: blockedId }],
          },
        },
      });

      res.status(200).json("successfully blocked user");
    }),
  ];
}

export default UserController;
