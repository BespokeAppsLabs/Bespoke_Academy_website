import { headers } from 'next/headers';
import CoursesPage from '@/domain/courses';

export default async function Page() {
  const country = (await headers()).get('x-vercel-ip-country');
  return <CoursesPage country={country} />;
}
