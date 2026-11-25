const {PrismaClient} = require("@prisma/client");
const {PrismaPg} = require("@prisma/adapter-pg");

const adapter = new PrismaPG({connectionString: process.env.DATABASE_URL});
const prisma = new PrismaClient({adapter});

module.exports = prisma;