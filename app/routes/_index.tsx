import {
  type MetaFunction,
  type LoaderFunctionArgs,
  json,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { prisma } from '~/db.server';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const folders = await prisma.folder.findMany({ include: { files: true } });
  return json({
    folders,
  });
};

export default function Index() {
  const { folders } = useLoaderData<typeof loader>();
  return <pre>{JSON.stringify(folders, null, 2)}</pre>;
}
