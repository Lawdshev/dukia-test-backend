import express, { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client"; // Import Prisma types
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

interface QueryParams {
  search?: string;
  page?: string;
  limit?: string;
}

app.get(
  "/api/users",
  async (req: Request<{}, {}, {}, QueryParams>, res: Response) => {
    try {
      const { search, page = "1", limit = "10" } = req.query;

      const pageNumber = parseInt(page, 10) || 1;
      const pageSize = parseInt(limit, 10) || 10;
      const skip = (pageNumber - 1) * pageSize;

      const filter: Prisma.UserWhereInput = search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive" as Prisma.QueryMode,
                },
              },
              {
                email: {
                  contains: search,
                  mode: "insensitive" as Prisma.QueryMode,
                },
              },
            ],
          }
        : {};

      const users = await prisma.user.findMany({
        where: filter,
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" },
      });

      const totalUsers = await prisma.user.count({ where: filter });

      res.json({
        page: pageNumber,
        limit: pageSize,
        total: totalUsers,
        totalPages: Math.ceil(totalUsers / pageSize),
        data: users,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
