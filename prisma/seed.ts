import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const folder = 'Javascript Testing';
const files = [
  { name: 'Introduction' },
  { name: 'Table of Content' },
  { name: "What's unit testing" },
  { name: 'Types of tests' },
];

const createAction = async () =>
  prisma.folder.create({
    data: {
      name: folder,
      files: {
        createMany: {
          data: files,
        },
      },
    },
  });

const deleteAction = async () => {
  prisma.folder.deleteMany({
    where: {
      name: folder,
    },
  });
  prisma.file.deleteMany({});
};

async function seed() {
  const action = process.argv[2];

  if (action === 'c') {
    await deleteAction();
    await createAction();
    return;
  }
  if (action === 'd') {
    await deleteAction();
    return;
  }
  process.exit(1);
}

await seed();
