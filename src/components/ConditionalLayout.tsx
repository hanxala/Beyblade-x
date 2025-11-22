'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

export default function ConditionalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Check if we're on an admin route
    const isAdminRoute = pathname?.startsWith('/admin');

    // For admin routes, don't show header/footer
    if (isAdminRoute) {
        return <>{children}</>;
    }

    // For regular routes, show header and footer
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}
