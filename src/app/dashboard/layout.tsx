import { AppSidebar } from '@/components/shared/app-sidebar';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
   
      <div className="flex flex-col w-full md:overflow-hidden min-h-screen">
        <div className="row flex items-center justify-between px-4 py-2">
        <AppSidebar />
          <SidebarTrigger />
          <Navbar />
        </div>

        <main className="flex-1 px-4 py-6 ">{children}</main>
        <Footer />
      </div>
    </SidebarProvider>
  );
}
