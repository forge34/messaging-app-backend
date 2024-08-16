import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import passport from "passport";

interface IUser extends Omit<User, "password"> {
  relatedToCurrent: boolean;
}

const prisma = new PrismaClient();

class UserController {
  static getMany = [
    passport.authenticate("jwt", { session: false }),
    async (req: Request, res: Response) => {
      const users = await prisma.user.findMany({});
      const currentUser = req.user as User;
      const filteredUsers: IUser[] = [];

      for (let user of users) {
        if (user.id === currentUser.id) continue;

        const privateConversation = await prisma.conversation.findFirst({
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
          filteredUsers.push({ ...rest, relatedToCurrent: true });
        } else {
          filteredUsers.push({ ...rest, relatedToCurrent: false });
        }
      }
      res.status(200).json(filteredUsers);
    },
  ];
}

export default UserController;
