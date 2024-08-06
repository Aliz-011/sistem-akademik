import { Navbar } from '../navbar';
import { Sidebar } from './sidebar';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Navbar />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 w-full">
          {children}
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
