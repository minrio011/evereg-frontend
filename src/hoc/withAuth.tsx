"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  const WithAuthComponent = (props: P) => {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
      let cancelled = false;

      const validate = async () => {
        const token = localStorage.getItem('token');
        if (!API_URL) {
          console.error('API_URL not configured');
          router.replace('/admin/login');
          return;
        }

        if (!token) {
          router.replace('/admin/login');
          return;
        }

        try {
          const response = await fetch(`${API_URL}/campaign/summary`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Unauthorized');
          }

          if (!cancelled) setAuthorized(true);
        } catch {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          if (!cancelled) router.replace('/admin/login');
        }
      };

      validate();

      return () => {
        cancelled = true;
      };
    }, [router]);

    if (!authorized) return null;
    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
}
