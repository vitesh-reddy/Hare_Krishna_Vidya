import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../TSX-src/components/ui/card';
import { Book, Briefcase, Eye, Gift, Grid2X2 } from 'lucide-react';
import { useBlogsAdmin } from '../../contexts/BlogAdminContext';
import { useKitsAdmin } from '../../contexts/KitAdminContext';
import { useGroceryItemsAdmin } from '../../contexts/GroceryItemAdminContext';
import { useJobAdminContext } from '../../contexts/JobContextAdmin';
import { useAdminUpdates } from '../../contexts/UpdatesAdminContext';
import { Button } from '../../TSX-src/components/ui/button';
import dayjs from 'dayjs';

const DashboardOverview = () => {
  const { publishedBlogsCount } = useBlogsAdmin();
  const { activeGroceryItemsCount } = useGroceryItemsAdmin();
  const { activeJobsCount } = useJobAdminContext();
  const {activeKitsCount} = useKitsAdmin();
  const { recentActivity, loadMore, isLoading, hasMore, recentDonations, loadMoreDonations, isDonationLoading, hasMoreDonations } = useAdminUpdates();
  const [selectedDonation, setSelectedDonation] = useState(null);

  const handleViewDonation = (donation) => setSelectedDonation(donation)
  const closeDialog = () => setSelectedDonation(null) 

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

  return (
    <div className="space-y-[1.5rem]">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1.5rem]">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="bg-[#FFFBEB] dark:bg-[#0F172A] border border-[#E5E7EB] dark:border-[#1F2937] rounded-[1rem] shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-[1.5rem]">
                <div className="flex items-center justify-between">
                  {/* Stat Info */}
                  <div>
                    <p className="text-[0.875rem] font-medium text-[#4B5563] dark:text-[#9CA3AF]">
                      {stat.title}
                    </p>
                    <p className="text-[1.875rem] font-bold text-[#111827] dark:text-[#F5F7FD]">
                      {stat.value}
                    </p>
                  </div>

                  {/* Icon Badge */}
                  <div
                    className={`w-[3rem] h-[3rem] ${stat.color} rounded-[0.75rem] flex items-center justify-center`}
                  >
                    <Icon className="w-[1.5rem] h-[1.5rem] text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[1.5rem]">
        {/* Recent Activity */}
        <Card className="bg-[#FFFBEB] dark:bg-[#0F172A] shadow-md rounded-[1rem]">
          <CardHeader>
            <CardTitle className="text-[#1E293B] dark:text-[#F5F7FD] text-[1.125rem] font-semibold">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-[0.75rem] overflow-y-auto max-h-[calc(100vh-410px)] pr-[0.25rem]">  
              {recentActivity.map((activity, index) => (
                <div
                  key={`${activity._id}-${index}`}
                  className="flex items-center space-x-[0.75rem] p-[0.75rem] bg-[#FFF] dark:bg-[#1F2937] rounded-[0.75rem] border border-[#F3F4F6] dark:border-[#374151] shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 ease-in-out"
                >
                  <div
                    className={`w-[0.5rem] h-[0.5rem] rounded-full ${
                      activity.type === 'blog' ? 'bg-[#3B82F6]' :
                      activity.type === 'job' ? 'bg-[#16A34A]' :
                      activity.type === 'kit' ? 'bg-[#F97316]' :
                      'bg-[#8B5CF6]'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-[0.875rem] font-medium text-[#1E293B] dark:text-[#F5F7FD] line-clamp-1">
                      {activity.action}
                    </p>
                    <p className="text-[0.75rem] text-[#6B7280] dark:text-[#9CA3AF]">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
              {hasMore && (
                <div className="pt-[0.5rem]">
                  <button
                    className="w-full flex justify-center"
                    onClick={loadMore}
                    disabled={isLoading}
                  >
                    <p
                      className={`px-5 py-3 rounded-full text-white text-sm font-medium shadow-md transition-colors ${
                        isLoading
                          ? 'bg-[#FF7849]/50 cursor-not-allowed'
                          : 'bg-[#FF7849] hover:bg-[#FB6A3A]'
                      }`}
                    >
                      {isLoading ? 'Loading...' : 'Load More'}
                    </p>
                  </button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Received Donations */}
        <Card className="bg-[#FFFBEB] dark:bg-[#0F172A] shadow-md rounded-[1rem]">
          <CardHeader>
            <CardTitle className="text-[#1E293B] dark:text-[#F5F7FD] text-[1.125rem] font-semibold">
              Received Donations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-[0.75rem] overflow-y-auto max-h-[calc(100vh-410px)] pr-[0.25rem]">
              {recentDonations.map((donation, index) => (
                <div
                  key={`${donation._id}-${index}`}
                  className="flex items-center space-x-[0.75rem] p-[0.75rem] bg-[#FFF] dark:bg-[#1F2937] rounded-[0.75rem] border border-[#F3F4F6] dark:border-[#374151] shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 ease-in-out"
                >
                  <div
                    className={`w-[0.5rem] h-[0.5rem] rounded-full ${
                      donation.donationType === 'amount' ? 'bg-[#8B5CF6]' : 'bg-[#F97316]'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-[0.875rem] font-medium text-[#1E293B] dark:text-[#F5F7FD] line-clamp-1">
                      {donation.donorInfo.firstName } {donation.action}
                    </p>
                    <p className="text-[0.75rem] text-[#6B7280] dark:text-[#9CA3AF]">
                      ₹{donation.amount} • {donation.time}
                    </p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleViewDonation(donation)}>
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {hasMoreDonations && (
                <div className="pt-[0.5rem]">
                  <button
                    className="w-full flex justify-center"
                    onClick={loadMoreDonations}
                    disabled={isDonationLoading}
                  >
                    <p
                      className={`px-5 py-3 rounded-full text-white text-sm font-medium shadow-md transition-colors ${
                        isDonationLoading
                          ? 'bg-[#FF7849]/50 cursor-not-allowed'
                          : 'bg-[#FF7849] hover:bg-[#FB6A3A]'
                      }`}
                    >
                      {isDonationLoading ? 'Loading...' : 'Load More'}
                    </p>
                  </button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Donation Details Dialog */}
{selectedDonation && (
  <div
    className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 transition-all"
    onClick={closeDialog}
    role="dialog"
    aria-modal="true"
    tabIndex={-1}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-10 bg-gradient-to-br from-[#ffffffcc] to-[#f9fafbcc] dark:from-[#1e293bcc] dark:to-[#0f172acc] backdrop-blur-xl rounded-3xl shadow-2xl border border-[#e5e7eb66] dark:border-[#33415566] animate-fade-in"
    >
      {/* Close Button */}
      <button
        onClick={closeDialog}
        className="absolute top-5 right-5 text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
        aria-label="Close dialog"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Title */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <h2 className="text-3xl font-extrabold text-[#111827] dark:text-[#F5F7FD] flex items-center gap-2">
          🎗️ Donation Summary
        </h2>
      </div>

      <div className="space-y-8 text-[0.95rem] leading-relaxed text-gray-700 dark:text-gray-100">
        {/* Donor Info */}
        <section>
          <h3 className="text-lg font-bold mb-4 text-[#0F172A] dark:text-yellow-400 flex items-center gap-2">👤 Donor Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><strong>Name:</strong> {selectedDonation.donorInfo.firstName} {selectedDonation.donorInfo.lastName}</div>
            <div><strong>Email:</strong> {selectedDonation.donorInfo.email}</div>
            <div><strong>Phone:</strong> {selectedDonation.donorInfo.phone}</div>
            {selectedDonation.donorInfo.address && (
              <div className="sm:col-span-2">
                <strong>Address:</strong> {selectedDonation.donorInfo.address}, {selectedDonation.donorInfo.city}, {selectedDonation.donorInfo.state} - {selectedDonation.donorInfo.pincode}
              </div>
            )}
          </div>
        </section>

        {/* Donation Details */}
        <section>
          <h3 className="text-lg font-bold mb-4 text-[#0F172A] dark:text-yellow-400 flex items-center gap-2">🎁 Donation Details</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">Type:</span>
              <span className={`px-3 py-1 text-xs rounded-full font-semibold shadow-sm
                ${selectedDonation.donationType === 'amount' 
                  ? 'bg-green-200 text-green-800 dark:bg-green-700 dark:text-white' 
                  : 'bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-white'}`}>
                {selectedDonation.donationType.toUpperCase()}
              </span>
            </div>

            {selectedDonation.donationType === 'amount' && (
              <div><strong>Purpose:</strong> {selectedDonation.donatedFor}</div>
            )}

            {selectedDonation.donationType === 'items' && (
              <div>
                <p className="font-semibold mb-1">Items Donated:</p>
                <div className="bg-[#f9fafb] dark:bg-[#1f2937] p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {selectedDonation.items.map((item, idx) => (
                      <li key={idx}>
                        <span className="font-medium">{item.itemName}</span> — Qty: {item.quantity}, Price: ₹{item.price}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div><strong>Total Amount:</strong> ₹{selectedDonation.amount}</div>
            <div><strong>Donated At:</strong> {dayjs(selectedDonation.donatedAt).format('MMMM D, YYYY h:mm A')}</div>
          </div>
        </section>

        {/* Payment Details */}
        <section>
          <h3 className="text-lg font-bold mb-4 text-[#0F172A] dark:text-yellow-400 flex items-center gap-2">💳 Payment Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><strong>Order ID:</strong> {selectedDonation.paymentDetails.orderId}</div>
            <div><strong>Payment ID:</strong> {selectedDonation.paymentDetails.paymentId}</div>
          </div>
        </section>
      </div>
    </div>
  </div>
)}





        {/* <Card className="dark:bg-[#0F172A]">
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
        </Card> */}
      </div>
    </div>
  );
};

export default DashboardOverview;