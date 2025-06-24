// import { Separator } from '../../../components/ui/separator';
import {  Home,  Book,  Briefcase,  Gift, User, Grid2X2, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Separator } from '../../TSX-src/components/ui/separator';
import { Button } from '../../TSX-src/components/ui/button';
import { useAdminAuth } from '../../contexts/AdminAuthContext';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { setShowLogoutDialog } = useAdminAuth();

  const handleLogout = () => {
    setShowLogoutDialog(true);
  }  

  const navigationItems = [
    { label: 'Dashboard Overview', icon: Home, path: '/', section: 'dashboard' },
    { label: 'Blogs', icon: Book, path: '/', section: 'blog' },
    { label: 'Jobs & Applications', icon: Briefcase, path: '/', section: 'jobs' },
    { label: 'Donation Kits', icon: Gift, path: '/', section: 'donations' },
    { label: 'Grocery Items', icon: Grid2X2, path: '/', section: 'grocery' },
    { label: 'Profile', icon: User, path: '/', section: 'profile' },
  ];

  const handleNavigation = (section: string) => {
    const searchParams = new URLSearchParams();
    searchParams.set('section', section);
    navigate(`/?${searchParams.toString()}`);
  };

  const getCurrentSection = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('section') || 'dashboard';
  };      

  return (
    <div className="w-[16rem] bg-gradient-to-b from-[#FFF7ED] to-[#FEF3C7] border-r border-[#FED7AA] min-h-screen dark:from-[#7C2D12] dark:to-[#B45309] dark:border-[#EA580C]">
      {/* Header */}
      <div className="p-[1.5rem] border-b border-[#FED7AA] dark:border-[#EA580C]">
        <div className="flex items-center space-x-[0.75rem]">
          <div className="w-[2.5rem] h-[2.5rem] bg-[#F97316] rounded-full flex items-center justify-center dark:bg-[#FDBA74]">
            <span className="text-[#FFFFFF] font-semibold text-[1.125rem]">हरे</span>
          </div>
          <div>
            <h2 className="font-semibold text-[#1F2937] dark:text-[#F5F7FD]">Admin Panel</h2>
            <p className="text-[0.875rem] text-[#4B5563] dark:text-[#9CA3AF]">Hare Krishna Vidya</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-[1rem]">
        <nav className="space-y-[0.5rem]">
          {navigationItems.map((item) => {
            const isActive = getCurrentSection() === item.section;
            const Icon = item.icon;
            
            return (
              <Button
                key={item.section}
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start text-left ${
                  isActive 
                    ? "bg-[#F97316] text-[#FFFFFF] hover:bg-[#EA580C] dark:bg-[#FDBA74] dark:hover:bg-[#EA580C]" 
                    : "text-[#374151] hover:bg-[#FFF7ED] dark:text-[#D1D5DB] dark:hover:bg-[#7C2D12]"
                }`}
                onClick={() => handleNavigation(item.section)}
              >
                <Icon className="w-[1rem] h-[1rem] mr-[0.75rem]" />
                {item.label}
              </Button>
            );
          })}
        </nav>

        <Separator className="my-[1.5rem] bg-[#FED7AA] dark:bg-[#EA580C]" />

        {/* // Admin Profile Section
        <div className="space-y-[0.5rem]">
          <div className="flex items-center space-x-[0.75rem] p-[0.75rem] bg-[#FFF7ED] rounded-[0.5rem] dark:bg-[#7C2D12]">
            <div className="w-[2rem] h-[2rem] bg-[#F97316] rounded-full flex items-center justify-center dark:bg-[#FDBA74]">
              <span className="text-[#FFFFFF] text-[0.875rem] font-medium">A</span>
            </div>
            <div className="flex-1">
              <p className="text-[0.875rem] font-medium text-[#1F2937] dark:text-[#F5F7FD]">Admin User</p>
              <p className="text-[0.75rem] text-[#4B5563] dark:text-[#9CA3AF]">admin@harekrishnavidya.org</p>
            </div>
          </div>
        </div> */}
        <div className='flex items-center w-full'>
          <Button onClick={handleLogout} className="w-full mx-[3rem] bg-orange-600 hover:bg-orange-700">
            <LogOut />
            Logout
          </Button>
        </div>
      </div>

      {/* Decorative Pattern */}
      <div className="absolute bottom-0 left-0 w-[16rem] h-[8rem] opacity-10 bg-gradient-to-t from-[#FDBA74] to-transparent dark:from-[#F97316]">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23f97316' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }} />
      </div>
    </div>
  );
};

export default AdminSidebar;
