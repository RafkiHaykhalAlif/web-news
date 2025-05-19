import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import LoginForm from '@/components/LoginForm';

export const metadata = {
  title: 'Login - Portal Berita',
  description: 'Login ke Portal Berita',
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  
  // Redirect jika sudah login
  if (session) {
    redirect('/');
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex-grow flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}