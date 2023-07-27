import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const AuthWrapper: React.FC = ({ children }) => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      // User is not authenticated, redirect to login page
      router.push('/pages/login');
    }
  }, [loading, session, router]);

  if (loading) {
    // Render loading state if session data is still loading
    return <div>Loading...</div>;
  }

  // User is authenticated, render the protected page
  return <>{children}</>;
};

export default AuthWrapper;
