const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const fs = require('fs');

async function main() {
  const settings = await prisma.settings.findMany();
  const categories = await prisma.consultationCategory.findMany();
  const services = await prisma.service.findMany();
  const tarotCards = await prisma.tarotCard.findMany();
  const blogPosts = await prisma.blogPost.findMany();
  
  fs.writeFileSync('dump.json', JSON.stringify({ settings, categories, services, tarotCards, blogPosts }, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
