import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../TSX-src/components/ui/card';
import { Book, Briefcase, Gift, Grid2X2 } from 'lucide-react';
import { useBlogsAdmin } from '../../contexts/BlogAdminContext';
import { useKitsAdmin } from '../../contexts/KitAdminContext';
import { useGroceryItemsAdmin } from '../../contexts/GroceryItemAdminContext';
import { useJobAdminContext } from '../../contexts/JobContextAdmin';

const DashboardOverview = () => {
  const { publishedBlogsCount } = useBlogsAdmin();
  const { kits } = useKitsAdmin();
  const { activeGroceryItemsCount } = useGroceryItemsAdmin();
  const { activeJobsCount } = useJobAdminContext();
  const {activeKitsCount} = useKitsAdmin();
  const stats = [
    {
      title: 'Published Blogs',
      value: publishedBlogsCount,
      change: '+3 this month',
      icon: Book,
      color: 'bg-[#3B82F6]'
    },
    {
      title: 'Active Jobs',
      value: activeJobsCount,
      change: '+2 new openings',
      icon: Briefcase,
      color: 'bg-[#16A34A]'
    },
    {
      title: 'Active Kits',
      value: activeKitsCount,
      change: 'Updated prices',
      icon: Gift,
      color: 'bg-[#F97316]'
    },
    {
      title: 'Active Groceries',
      value: activeGroceryItemsCount,
      change: 'Updated prices',
      icon: Grid2X2,
      color: 'bg-[#8B5CF6]'
    }
  ];

  const recentActivity = [
    { action: 'New blog post published', time: '2 hours ago', type: 'blog' },
    { action: 'Job application received', time: '4 hours ago', type: 'job' },
    { action: 'Donation kit prices updated', time: '1 day ago', type: 'donation' },
    { action: 'New grocery items added', time: '2 days ago', type: 'grocery' }
  ];

  return (
    <div className="space-y-[1.5rem]">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1.5rem]">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow dark:bg-[#0F172A]">
              <CardContent className="p-[1.5rem]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[0.875rem] font-medium text-[#4B5563] dark:text-[#9CA3AF]">{stat.title}</p>
                    <p className="text-[1.875rem] font-bold text-[#111827] dark:text-[#F5F7FD]">{stat.value}</p>
                    <p className="text-[0.875rem] text-[#6B7280] mt-[0.25rem] dark:text-[#9CA3AF]">{stat.change}</p>
                  </div>
                  <div className={`w-[3rem] h-[3rem] ${stat.color} rounded-[0.5rem] flex items-center justify-center dark:bg-opacity-80`}>
                    <Icon className="w-[1.5rem] h-[1.5rem] text-[#FFFFFF]" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1.5rem]">
        <Card className="dark:bg-[#0F172A]">
          <CardHeader>
            <CardTitle className="text-[#111827] dark:text-[#F5F7FD]">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-[1rem]">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-[0.75rem] p-[0.75rem] bg-[#F9FAFB] rounded-[0.5rem] dark:bg-[#1F2937]">
                  <div className={`w-[0.5rem] h-[0.5rem] rounded-full ${
                    activity.type === 'blog' ? 'bg-[#3B82F6]' :
                    activity.type === 'job' ? 'bg-[#16A34A]' :
                    activity.type === 'donation' ? 'bg-[#F97316]' :
                    'bg-[#8B5CF6]'
                  }`} />
                  <div className="flex-1">
                    <p className="text-[0.875rem] font-medium text-[#111827] dark:text-[#F5F7FD]">{activity.action}</p>
                    <p className="text-[0.75rem] text-[#6B7280] dark:text-[#9CA3AF]">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-[#0F172A]">
          <CardHeader>
            <CardTitle className="text-[#111827] dark:text-[#F5F7FD]">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-[0.75rem]">
              <button className="p-[1rem] bg-[#EFF6FF] hover:bg-[#DBEAFE] rounded-[0.5rem] text-left transition-colors dark:bg-[#1E3A8A] dark:hover:bg-[#1E40AF]">
                <Book className="w-[1.5rem] h-[1.5rem] text-[#3B82F6] mb-[0.5rem] dark:text-[#60A5FA]" />
                <p className="text-[0.875rem] font-medium text-[#111827] dark:text-[#F5F7FD]">New Blog Post</p>
              </button>
              <button className="p-[1rem] bg-[#F0FDF4] hover:bg-[#DCFCE7] rounded-[0.5rem] text-left transition-colors dark:bg-[#14532D] dark:hover:bg-[#166534]">
                <Briefcase className="w-[1.5rem] h-[1.5rem] text-[#16A34A] mb-[0.5rem] dark:text-[#4ADE80]" />
                <p className="text-[0.875rem] font-medium text-[#111827] dark:text-[#F5F7FD]">Post Job</p>
              </button>
              <button className="p-[1rem] bg-[#FFF7ED] hover:bg-[#FFEDD5] rounded-[0.5rem] text-left transition-colors dark:bg-[#7C2D12] dark:hover:bg-[#9A3412]">
                <Gift className="w-[1.5rem] h-[1.5rem] text-[#F97316] mb-[0.5rem] dark:text-[#FDBA74]" />
                <p className="text-[0.875rem] font-medium text-[#111827] dark:text-[#F5F7FD]">Add Kit</p>
              </button>
              <button className="p-[1rem] bg-[#F5F3FF] hover:bg-[#EDE9FE] rounded-[0.5rem] text-left transition-colors dark:bg-[#4C1D95] dark:hover:bg-[#6B21A8]">
                <Grid2X2 className="w-[1.5rem] h-[1.5rem] text-[#8B5CF6] mb-[0.5rem] dark:text-[#A78BFA]" />
                <p className="text-[0.875rem] font-medium text-[#111827] dark:text-[#F5F7FD]">Update Prices</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;