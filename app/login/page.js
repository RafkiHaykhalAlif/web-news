import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import LoginForm from "@/components/LoginForm";

export const metadata = {
  title: "Login | Website News",
  description: "Login untuk mengakses berita terbaru dan informasi terkini di Website News.",
  openGraph: {
    title: "Login | Website News",
    description: "Login untuk mengakses berita terbaru dan informasi terkini di Website News.",
    url: "https://your-domain.com/login",
    type: "website",
  },
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  
  // Redirect jika sudah login
  if (session) {
    redirect('/');
  }
  
  return (
    <>
      {/* SEO: JSON-LD Microdata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Login Website News",
            "url": "https://your-domain.com/login",
            "description": "Login untuk mengakses berita terbaru dan informasi terkini di Website News.",
            "publisher": {
              "@type": "Organization",
              "name": "Website News",
              "logo": {
                "@type": "ImageObject",
                "url": "https://your-domain.com/logo.png",
                "height": 60,
                "width": 60
              }
            }
          }),
        }}
      />
      <div className="container mx-auto px-4 py-8">
        <div className="flex-grow flex items-center justify-center">
          <LoginForm />
        </div>
      </div>
    </>
  );
}