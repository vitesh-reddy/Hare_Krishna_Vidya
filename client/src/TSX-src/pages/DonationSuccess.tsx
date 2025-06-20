import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Check, Download, Share2, Heart, Mail, Home } from 'lucide-react';

const DonationSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { kit, cartItems, amount, donorName, donationType, impact, paymentId } = location.state || {};

  useEffect(() => {
    if (!kit && !cartItems && !donationType) {
      navigate('/donate-items');
    }
  }, [kit, cartItems, donationType, navigate]);

  const handleDownloadReceipt = () => {
    console.log('Downloading receipt...');
    alert('Receipt download started! Check your downloads folder.');
  };

  const handleShare = () => {
    const shareText = donationType
      ? `I donated ₹${(amount || 0).toLocaleString()} for ${donationType} to Hare Krishna Vidya! Join me in making a difference.`
      : `I donated ₹${(amount || 0).toLocaleString()} for ${kit?.name || cartItems?.map(item => item.name).join(', ')} to Hare Krishna Vidya! Join me in making a difference.`;

    if (navigator.share) {
      navigator.share({
        title: 'I just donated to Hare Krishna Vidya!',
        text: shareText,
        url: window.location.origin,
      });
    } else {
      const text = `${shareText} ${window.location.origin}`;
      navigator.clipboard.writeText(text);
      alert('Share text copied to clipboard!');
    }
  };

  if (!kit && !cartItems && !donationType) {
    return null;
  }

  const Breadcrumb = () => (
    <div className="flex items-center space-x-[0.5rem] text-[0.875rem] text-[#4B5563] mb-[1.5rem] dark:text-[#9CA3AF]">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/')}
        className="p-0 h-auto text-[#F97316] hover:text-[#EA580C]"
      >
        <Home className="w-[1rem] h-[1rem] mr-[0.25rem]" />
        Home
      </Button>
      <span>›</span>
      <span className="text-[#1F2937] font-medium dark:text-[#F5F7FD]">Donation Success</span>
    </div>
  );  

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ECFDF5] to-[#EFF6FF] py-[2rem] dark:from-[#1A3C34] dark:to-[#1E3A8A]">
      <div className="container mx-auto px-[1.5rem] max-w-[32rem]">
        <Breadcrumb />

        <Card className="p-[2rem] text-center">
          <div className="mb-[2rem]">
            <div className="w-[4rem] h-[4rem] bg-[#16A34A] rounded-full flex items-center justify-center mx-auto mb-[1.5rem]">
              <Check className="w-[2.5rem] h-[2.5rem] text-[#FFFFFF]" />
            </div>
            <h1 className="text-[1.5rem] font-bold text-[#1F2937] mb-[0.25rem] dark:text-[#F5F7FD]">
              Thank You for Your Donation!
            </h1>
            <p className="text-[1rem] text-[#4B5563] dark:text-[#9CA3AF]">
              Your generosity will make a real difference in someone's life.
            </p>
          </div>

          <Card className="mb-[2rem] bg-[#FFF7ED] border-[#FED7AA] dark:bg-[#7C2D12] dark:border-[#EA580C]">
            <CardContent className="p-[1.5rem]">
              <h2 className="text-[1.125rem] font-semibold mb-[1rem]">Donation Details</h2>
              <div className="space-y-[0.5rem] text-left text-[0.8rem] max-w-[28rem] mx-auto">
                {donationType ? (
                  <div className="flex justify-between">
                    <span className="font-medium">Donation Type:</span>
                    <span>{donationType}</span>
                  </div>
                ) : cartItems ? (
                  cartItems.map((item, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="font-medium">{item.type === 'Kit' ? 'Kit' : 'Grocery Item'}:</span>
                      <span>{item.name} (x{item.quantity})</span>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-between">
                    <span className="font-medium">{kit?.type === 'Kit' ? 'Kit' : 'Grocery Item'}:</span>
                    <span>{kit?.name}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-medium">Amount:</span>
                  <span>₹{(amount || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Donor:</span>
                  <span>{donorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Transaction ID:</span>
                  <span className="text-[0.875rem]">{paymentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {donationType && impact && (
            <Card className="mb-[2rem] bg-[#FFF7ED] border-[#FED7AA] dark:bg-[#7C2D12] dark:border-[#EA580C]">
              <CardHeader>
                <CardTitle className="text-[1.25rem] text-[#9A3412] flex items-center justify-center dark:text-[#FDBA74]">
                  <Heart className="w-[1.5rem] h-[1.5rem] mr-[0.5rem]" />
                  Donation Impact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[1.125rem] font-semibold">
                  {impact.label}: {typeof impact.value === 'number' ? impact.value.toLocaleString() : impact.value}
                </p>
                <p className="text-[0.875rem] text-[#4B5563] mt-[0.5rem] dark:text-[#9CA3AF]">
                  Your generosity is making a real difference in the lives of those in need.
                </p>
              </CardContent>
            </Card>
          )}

          <div className="space-y-[1rem] mb-[2rem]">
            <h3 className="text-[1.125rem] font-semibold">What happens next?</h3>
            <div className="grid md:grid-cols-3 gap-[1rem] text-[0.875rem]">
              <div className="p-[1rem] bg-[#FFFFFF] rounded-[0.5rem] border border-[#DCE4F2] dark:bg-[#0F172A] dark:border-[#3F4856]">
                <Mail className="w-[2rem] h-[2rem] text-[#F97316] mx-auto mb-[0.5rem]" />
                <p className="font-semibold">Email Confirmation</p>
                <p className="text-[#4B5563] dark:text-[#9CA3AF]">You'll receive a receipt via email within 24 hours</p>
              </div>
              <div className="p-[1rem] bg-[#FFFFFF] rounded-[0.5rem] border border-[#DCE4F2] dark:bg-[#0F172A] dark:border-[#3F4856]">
                <Heart className="w-[2rem] h-[2rem] text-[#F97316] mx-auto mb-[0.5rem]" />
                <p className="font-semibold">{donationType ? 'Support Initiated' : 'Kit Assembly'}</p>
                <p className="text-[#4B5563] dark:text-[#9CA3AF]">
                  {donationType ? 'Your support will be initiated within 3-5 days' : 'Your kit will be assembled within 3-5 days'}
                </p>
              </div>
              <div className="p-[1rem] bg-[#FFFFFF] rounded-[0.5rem] border border-[#DCE4F2] dark:bg-[#0F172A] dark:border-[#3F4856]">
                <Check className="w-[2rem] h-[2rem] text-[#F97316] mx-auto mb-[0.5rem]" />
                <p className="font-semibold">Impact Updates</p>
                <p className="text-[#4B5563] dark:text-[#9CA3AF]">
                  You'll receive {donationType ? 'updates on your impact' : 'photos and updates on distribution'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-[1rem] justify-center mb-[1.5rem]">
            <Button
              onClick={handleDownloadReceipt}
              variant="outline"
              className="flex items-center border-[#DCE4F2] text-[#2A3B5B] hover:bg-[#F4F6FB] hover:text-[#2A3B5B] dark:border-[#3F4856] dark:text-[#F5F7FD] dark:hover:bg-[#3F4856] dark:hover:text-[#F5F7FD]"
            >
              <Download className="w-[1rem] h-[1rem] mr-[0.5rem]" />
              Download Receipt
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              className="flex items-center border-[#DCE4F2] text-[#2A3B5B] hover:bg-[#F4F6FB] hover:text-[#2A3B5B] dark:border-[#3F4856] dark:text-[#F5F7FD] dark:hover:bg-[#3F4856] dark:hover:text-[#F5F7FD]"
            >
              <Share2 className="w-[1rem] h-[1rem] mr-[0.5rem]" />
              Share Your Impact
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-[1rem] justify-center">
            <Button
              onClick={() => navigate(donationType ? '/donate-amount' : '/donate-items/?scrollTo=kits')}
              className="bg-[#F97316] hover:bg-[#EA580C] text-[#FFFFFF]"
            >
              Donate Again
            </Button>
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="border-[#DCE4F2] text-[#2A3B5B] hover:bg-[#F4F6FB] hover:text-[#2A3B5B] dark:border-[#3F4856] dark:text-[#F5F7FD] dark:hover:bg-[#3F4856] dark:hover:text-[#F5F7FD]"
            >
              <Home className="w-[1rem] h-[1rem] mr-[0.5rem]" />
              Back to Home
            </Button>
          </div>

          <div className="mt-[2rem] p-[1.5rem] bg-[#F9FAFB] rounded-[0.5rem] dark:bg-[#1F2937]">
            <h4 className="font-semibold mb-[0.5rem]">Tax Benefits</h4>
            <p className="text-[0.875rem] text-[#4B5563] dark:text-[#9CA3AF]">
              Your donation is eligible for tax deduction under Section 80G.
              You can claim up to 50% of your donation amount as tax deduction.
            </p>
          </div>
        </Card>

        <div className="mt-[2rem] text-center">
          <p className="text-[#4B5563] mb-[1rem] dark:text-[#9CA3AF]">
            Want to stay connected with our work?
          </p>
          <div className="flex justify-center space-x-[1rem]">
            <Button
              variant="outline"
              size="sm"
              className="border-[#DCE4F2] text-[#2A3B5B] hover:bg-[#F4F6FB] hover:text-[#2A3B5B] dark:border-[#3F4856] dark:text-[#F5F7FD] dark:hover:bg-[#3F4856] dark:hover:text-[#F5F7FD]"
            >
              Follow on Social Media
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-[#DCE4F2] text-[#2A3B5B] hover:bg-[#F4F6FB] hover:text-[#2A3B5B] dark:border-[#3F4856] dark:text-[#F5F7FD] dark:hover:bg-[#3F4856] dark:hover:text-[#F5F7FD]"
            >
              Join Our Newsletter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationSuccess;