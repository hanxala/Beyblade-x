import { redirect } from 'next/navigation';
import { isAdmin } from '@/lib/admin-auth';
import AdminSidebar from '@/components/admin/AdminSidebar';
import './admin.css';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Check if user is admin
    const admin = await isAdmin();

    if (!admin) {
        redirect('/');
    }

    return (
        <div className="admin-layout">
            <AdminSidebar />
            <div className="admin-main">
                {children}
            </div>
        </div>
    );
}
