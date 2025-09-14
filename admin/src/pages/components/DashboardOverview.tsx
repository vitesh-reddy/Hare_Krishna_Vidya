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
import { ThreeDot } from 'react-loading-indicators';
import toast from 'react-hot-toast';
import axiosInstance from '../../api/axiosInstance';

const DashboardOverview = () => {
  const { publishedBlogsCount } = useBlogsAdmin();
  const { activeGroceryItemsCount } = useGroceryItemsAdmin();
  const { activeJobsCount } = useJobAdminContext();
  const {activeKitsCount} = useKitsAdmin();
  const { recentActivity, loadMore, isLoading, hasMore, recentDonations, loadMoreDonations, isDonationLoading, hasMoreDonations, updateDonationInList } = useAdminUpdates();
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [isRefunding, setIsRefunding] = useState(false);
  const [showRefundDialog, setShowRefundDialog] = useState(false);

  const handleViewDonation = (donation) => setSelectedDonation(donation);
  const closeDialog = () => setSelectedDonation(null);

  const openRefundDialog = () => {
    setShowRefundDialog(true);
  };

  const cancelRefund = () => {
    if (isRefunding) return;
    setShowRefundDialog(false);
  };

  const confirmRefund = async () => {
    if (!selectedDonation) return;
    try {
      setIsRefunding(true);
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
      const response = await axiosInstance.post(
        `${backendUrl}/api/payments/stripe/refund/${selectedDonation._id}`
      );

      toast.success('Donation refunded successfully');

      const newRefundEntry = {
        refundId: response.data.refundId,
        refundedAt: new Date().toISOString(),
        refundedBy: 'You',
      };

      setSelectedDonation((prev) => {
        if (!prev) return prev;
        const updated = {
          ...prev,
          status: 'refunded',
          refundHistory: [...(prev.refundHistory || []), newRefundEntry],
        };
        updateDonationInList({
          _id: updated._id,
          status: updated.status,
          refundHistory: updated.refundHistory,
        });
        return updated;
      });
    } catch (error) {
      console.error('Failed to refund donation:', error);
      toast.error(error?.response?.data?.error || 'Failed to refund donation');
    } finally {
      setIsRefunding(false);
      setShowRefundDialog(false);
    }
  };

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
      {/* Refund Confirmation Dialog */}
      {showRefundDialog && selectedDonation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Confirm Refund
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to refund this donation? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={cancelRefund}
                disabled={isRefunding}
                className="text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                No
              </Button>
              <Button
                variant="destructive"
                onClick={confirmRefund}
                disabled={isRefunding}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {isRefunding ? 'Processing...' : 'Yes, Refund'}
              </Button>
            </div>
          </div>
        </div>
      )}
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
                      {stat.value != -1 ? stat.value : <div> <ThreeDot color="#fa7000" size="small" text="" textColor="" />  </div>}
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
                      donation.status === 'refunded'
                        ? 'bg-[#A855F7]'
                        : donation.status === 'succeeded'
                        ? 'bg-[#22C55E]'
                        : donation.status === 'failed'
                        ? 'bg-[#EF4444]'
                        : 'bg-[#F97316]'
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-[0.875rem] font-medium text-[#1E293B] dark:text-[#F5F7FD] line-clamp-1">
                      {(donation.donorInfo && donation.donorInfo.firstName) || 'Donor'} {donation.action}
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-40 transition-all"
            onClick={closeDialog}
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 bg-gradient-to-br from-[#f8fafc] to-[#f1f5f9] dark:from-[#1e293b] dark:to-[#0f172a] rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 animate-fade-in"
            >
              {/* Close Button */}
              <button
                onClick={closeDialog}
                className="absolute top-4 right-4 p-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Close dialog"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Donation Details
                  </h2>
                </div>
                <div className="h-1 w-20 bg-yellow-400 rounded-full"></div>
              </div>

              <div className="space-y-6">
                {/* Donor Info */}
                <section className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Donor Information</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[0.8rem] leading-">
                    <div className="space-y-1">
                      <p className="text-gray-500 dark:text-gray-400 font-medium">Name</p>
                      <p className="text-gray-800 dark:text-gray-100">{selectedDonation.donorInfo.firstName} {selectedDonation.donorInfo.lastName}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-500 dark:text-gray-400 font-medium">Email</p>
                      <p className="text-gray-800 dark:text-gray-100">{selectedDonation.donorInfo.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-500 dark:text-gray-400 font-medium">Phone</p>
                      <p className="text-gray-800 dark:text-gray-100">{selectedDonation.donorInfo.phone}</p>
                    </div>
                    {selectedDonation.donorInfo.address && (
                      <div className="md:col-span-2 space-y-1">
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Address</p>
                        <p className="text-gray-800 dark:text-gray-100">
                          {selectedDonation.donorInfo.address}, {selectedDonation.donorInfo.city}, {selectedDonation.donorInfo.state} - {selectedDonation.donorInfo.pincode}
                        </p>
                      </div>
                    )}
                  </div>
                </section>

                {/* Donation Details */}
                <section className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-md bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m-8-8v8m16-8v8M7 11h10a2 2 0 012 2v4a2 2 0 01-2 2H7a2 2 0 01-2-2v-4a2 2 0 012-2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Donation Details</h3>
                  </div>
                  
                  <div className="space-y-4 text-[0.8rem] leading-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">Status</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          selectedDonation.status === 'succeeded'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                            : selectedDonation.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                            : selectedDonation.status === 'failed'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                            : 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300'
                        }`}
                      >
                        {selectedDonation.status
                          ? selectedDonation.status.charAt(0).toUpperCase() + selectedDonation.status.slice(1)
                          : 'Unknown'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">Type</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedDonation.donationType === 'amount' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' 
                          : 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300'
                      }`}>
                        {selectedDonation.donationType.charAt(0).toUpperCase() + selectedDonation.donationType.slice(1)}
                      </span>
                    </div>
                    
                    {selectedDonation.donationType === 'amount' && (
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400 font-medium">Purpose</span>
                        <span className="text-gray-800 dark:text-gray-100">{selectedDonation.donatedFor}</span>
                      </div>
                    )}
                    
                    {selectedDonation.donationType === 'items' && (
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium mb-2">Items Donated</p>
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg border border-gray-100 dark:border-gray-700">
                          <ul className="space-y-2">
                            {selectedDonation.items.map((item, idx) => (
                              <li key={idx} className="flex justify-between">
                                <span className="text-gray-800 dark:text-gray-200">{item.itemName}</span>
                                <span className="text-gray-600 dark:text-gray-300">{item.quantity} × ₹{item.price}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">Total Amount</span>
                      <span className="text-gray-800 dark:text-gray-100 font-semibold">₹{selectedDonation.amount}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">Donation Date</span>
                      <span className="text-gray-800 dark:text-gray-100">{dayjs(selectedDonation.donatedAt).format('MMMM D, YYYY h:mm A')}</span>
                    </div>
                  </div>
                </section>

                {/* Payment Details & Refunds */}
                <section className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-md bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Payment Details</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[0.75rem]">
                    <div className="space-y-1">
                      <p className="text-gray-500 dark:text-gray-400 font-medium">Provider</p>
                      <p className="text-gray-800 dark:text-gray-100">{selectedDonation.paymentProvider || 'stripe'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-500 dark:text-gray-400 font-medium">Session ID</p>
                      <p className="text-gray-800 dark:text-gray-100 break-all">{selectedDonation.stripeCheckoutSessionId || 'N/A'}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-500 dark:text-gray-400 font-medium">Payment Intent ID</p>
                      <p className="text-gray-800 dark:text-gray-100 break-all">{selectedDonation.stripePaymentIntentId || 'N/A'}</p>
                    </div>
                  </div>

                  {selectedDonation.refundHistory && selectedDonation.refundHistory.length > 0 && (
                    <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4 text-[0.75rem]">
                      <p className="text-gray-500 dark:text-gray-400 font-medium mb-2">Refunds</p>
                      {selectedDonation.refundHistory.map((refund, idx) => (
                        <div key={idx} className="flex justify-between mb-1">
                          <span className="text-gray-800 dark:text-gray-100 break-all">{refund.refundId}</span>
                          <span className="text-gray-600 dark:text-gray-300">
                            {dayjs(refund.refundedAt).format('MMM D, YYYY h:mm A')} • {refund.refundedBy}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedDonation.status === 'succeeded' &&
                    (!selectedDonation.refundHistory || selectedDonation.refundHistory.length === 0) && (
                      <div className="mt-6 flex justify-end">
                        <Button
                          variant="destructive"
                          disabled={isRefunding}
                          onClick={openRefundDialog}
                        >
                          Refund Donation
                        </Button>
                      </div>
                    )}
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