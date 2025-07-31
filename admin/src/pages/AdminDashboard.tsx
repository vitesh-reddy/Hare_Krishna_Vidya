
import { useLocation, useNavigate } from 'react-router-dom';
import AdminSidebar from './components/AdminSidebar';
import DashboardOverview from './components/DashboardOverview';
import BlogManagement from './components/BlogManagement';
import JobManagement from './components/JobManagement';
import DonationSettings from './components/DonationSettings';
import KitManagement from './components/KitManagement';
import GroceryManagement from './components/GroceryManagement';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { Button } from '../TSX-src/components/ui/button';


const AdminDashboard = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentSection = searchParams.get('section') || 'dashboard';
  const { adminInfo, showLogoutDialog } = useAdminAuth();

  const renderContent = () => {
    switch (currentSection) {
      case 'blog':
        return <BlogManagement />;
      case 'jobs':
        return <JobManagement />;
      case 'donations':
        return <KitManagement />;
      case 'grocery':
        return <GroceryManagement />;
      case 'profile':
        return <DonationSettings />;
      default:
        return <DashboardOverview />;
    }
  };

  const getSectionTitle = () => {
    switch (currentSection) {
      case 'blog':
        return 'Blog Management';
      case 'jobs':
        return 'Jobs & Applications';
      case 'donations':
        return 'Donation Kits';
      case 'grocery':
        return 'Grocery Items';
      case 'profile':
        return 'Profile Management';
      default:
        return 'Dashboard Overview';
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-[#FFF7ED] via-[#FEF3C7] to-[#FEF9C3] dark:from-[#7C2D12] dark:via-[#B45309] dark:to-[#CA8A04]">
    <div className="flex w-full">
      <AdminSidebar />
      
      <div className="flex-1 overflow-hidden">
        <div className="bg-[#FFFFFF]/80 backdrop-blur-sm border-b border-[#FED7AA] px-[1.5rem] py-[1rem] dark:border-[#EA580C]">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[1.5rem] font-bold text-[#1F2937] dark:text-[#F5F7FD]">{getSectionTitle()}</h1>
              <p className="text-[#4B5563] text-[0.875rem] mt-[0.25rem] dark:text-[#9CA3AF]">
                {currentSection === 'dashboard' && 'Welcome to your admin dashboard'}
                {currentSection === 'blog' && 'Manage blog posts and content'}
                {currentSection === 'jobs' && 'Post jobs and manage applications'}
                {currentSection === 'donations' && 'Create and manage donation kits'}
                {currentSection === 'grocery' && 'Manage grocery items and pricing'}
                {currentSection === 'profile' && 'Configure Profile Settings'}
              </p>
            </div>
            
            <div className="flex items-center space-x-[1rem]">
              <div className="text-right">
                <p className="text-[0.875rem] font-medium text-[#374151] dark:text-[#D1D5DB]">{adminInfo.name}</p>
                <p className="text-[0.75rem] text-[#6B7280] dark:text-[#9CA3AF]">{adminInfo.email}</p>
              </div>
              <div className="w-[2.5rem] h-[2.5rem] bg-[#F97316] rounded-full flex items-center justify-center dark:bg-[#FDBA74]">
                <span className="text-[#FFFFFF] font-semibold">A</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-[1.5rem] overflow-y-auto h-[calc(100vh-5rem)]">
          {showLogoutDialog && <LogoutDialog />} 
          {renderContent()}
        </div>
      </div>
    </div>
  </div>
)
};

export default AdminDashboard;


 const LogoutDialog = () => {
  const { logout, setShowLogoutDialog } = useAdminAuth();
  const navigate = useNavigate();
  
  const confirmLogout = () => {
    logout();
    navigate('/login');
    setShowLogoutDialog(false);
  }
  
  const cancelLogout = () => {
    setShowLogoutDialog(false);
  }    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
          <h3 className="text-[1.25rem] font-semibold text-red-500 dark:text-white mb-2">
            Confirm Logout
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Are you sure you want to Logout ?
          </p>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={cancelLogout}
              className="text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              No
            </Button>
            <Button
              variant="destructive"
              onClick={confirmLogout}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Yes
            </Button>
          </div>
        </div>
      </div>        
    )
}