// seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

const admin = process.env.ADMIN_INITIAL_EMAIL;
const password = process.env.ADMIN_INITIAL_PASSWORD;

const hashedpassword = bcrypt.hashSync(password, 10)
        
async function main() {
    await prisma.Users.upsert({
        where: { email: admin },
        update: {},
        create: {
            email: admin,
            password: hashedpassword,
            role: 'ADMIN',
        },
    });

  console.log('✅ Usuário admin criado ou já existia');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());