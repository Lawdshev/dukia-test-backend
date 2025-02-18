const PrismaClient = require("@prisma/client").PrismaClient;
const prisma = new PrismaClient();

const users = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    password: "password123",
  },
  {
    name: "Jane Smith",
    email: "janesmith@example.com",
    password: "password123",
  },
  {
    name: "Michael Johnson",
    email: "michaeljohnson@example.com",
    password: "password123",
  },
  {
    name: "Emily Davis",
    email: "emilydavis@example.com",
    password: "password123",
  },
  {
    name: "Chris Brown",
    email: "chrisbrown@example.com",
    password: "password123",
  },
  {
    name: "Sarah Lee",
    email: "sarahlee@example.com",
    password: "password123",
  },
  {
    name: "David Wilson",
    email: "davidwilson@example.com",
    password: "password123",
  },
  {
    name: "Olivia Taylor",
    email: "oliviataylor@example.com",
    password: "password123",
  },
  {
    name: "James Harris",
    email: "jamesharris@example.com",
    password: "password123",
  },
  {
    name: "Sophia Martin",
    email: "sophiamartin@example.com",
    password: "password123",
  },
];

async function main() {

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log("Users seeded successfully!");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
