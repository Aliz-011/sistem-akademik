import { Navbar } from '../navbar';
import { Sidebar } from './sidebar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen antialiased">
      <Sidebar />
      <div className="flex flex-col w-full sm:gap-4">
        <Navbar />
        <main className="flex-1 sm:px-6 text-base">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
