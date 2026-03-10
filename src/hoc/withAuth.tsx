"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  const WithAuthComponent = (props: P) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/admin/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return WithAuthComponent;
}
