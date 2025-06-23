import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

import { X, Heart, CreditCard, Smartphone, Building, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { initiateRazorpayPayment } from '../../../PaymentService';

export const DonationModal = ({ isOpen, onClose, campaign }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [step, setStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  const predefinedAmounts = [100, 250, 500, 1000, 2500, 5000];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const getCurrentAmount = () => {
    return selectedAmount || parseInt(customAmount) || 0;
  };

  const handleNext = () => {
    if (step === 1 && getCurrentAmount() < 10) {
      toast.info("Minimum Amount", "Minimum donation amount is ₹10");
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    }
  };
  const handleContinue = async () => {
    
    try {
      setIsSaving(true);
      const baseUrl = import.meta.env.VITE_BACKEND_URL;
      const response = await fetch(`${baseUrl}/api/payments/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: (selectedAmount || customAmount) * 100, // Convert to paise
          currency: 'INR',
          donationType: 'amount',
        }),
      });

      // Debug: Log the response status and headers
      console.log('Create Order Response Status:', response.status);
      console.log('Create Order Response Headers:', response.headers);

      // Debug: Log the raw response body
      const responseText = await response.text();
      console.log('Create Order Response Body:', responseText);

      // Parse the response body as JSON
      let orderData;
      try {
        orderData = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON Parse Error:', parseError);
        throw new Error('Failed to parse create-order response: ' + parseError.message);
      }

      if (!response.ok) {
        throw new Error(orderData.error || 'Failed to create payment order');
      }

      initiateRazorpayPayment(
        {
          orderId: orderData.orderId,
          amount: (selectedAmount || customAmount) * 100,
          donorName: donorInfo.name,
          email: donorInfo.email,
          phone: donorInfo.phone,
        },
        async (paymentResponse) => {
          const verifyResponse = await fetch(`${baseUrl}/api/payments/verify-payment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              orderId: orderData.orderId,
              paymentId: paymentResponse.razorpay_payment_id,
              signature: paymentResponse.razorpay_signature,
              donationData: {
                donorInfo: {
                  firstName: donorInfo.name,
                  lastName: "",
                  email: donorInfo.email,
                  phone: donorInfo.phone,
                  address: "",
                  city: "",
                  state: "",
                  pincode: "",
                },
                donationType: 'amount',
                donatedFor: null,
                campaignId: campaign._id,
                amount: selectedAmount || customAmount,
                paymentDetails: {
                  orderId: orderData.orderId,
                  paymentId: paymentResponse.razorpay_payment_id,
                  signature: paymentResponse.razorpay_signature,
                },
              },
            }),
          });

          // Debug: Log the verify response
          console.log('Verify Payment Response Status:', verifyResponse.status);
          const verifyResponseText = await verifyResponse.text();
          console.log('Verify Payment Response Body:', verifyResponseText);

          let verifyResult;
          try {
            verifyResult = JSON.parse(verifyResponseText);
          } catch (parseError) {
            console.error('JSON Parse Error (Verify):', parseError);
            throw new Error('Failed to parse verify-payment response: ' + parseError.message);
          }

          if (!verifyResponse.ok) {
            throw new Error(verifyResult.error || 'Payment verification failed');
          }



        },
        (error) => {

          toast.error(error || 'Payment failed. Please try again.');
        }
      );
    } catch (error) {
      console.error('HandleContinue Error:', error);

      toast.error(error.message || 'An error occurred during payment.');
    } finally {
      setIsSaving(false);
      onClose();
    }

  };

  const handleDonate = () => {
    toast.success("Donation Successful! 🙏", `Thank you for donating ₹${getCurrentAmount()} to ${campaign?.name || 'the campaign'}`);
    setStep(1);
    setSelectedAmount(null);
    setCustomAmount('');
    setDonorInfo({ name: '', email: '', phone: '', message: '' });
    onClose();
  };

  if (!campaign) return null;

  const progressPercentage = (campaign?.raisedAmount && campaign?.goalAmount)
    ? (campaign.raisedAmount / campaign.goalAmount) * 100
    : 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl border-0 overflow-hidden">
        <DialogHeader className="relative p-0">
          <div className="relative h-32 bg-gradient-to-br from-orange-400 via-amber-400 to-yellow-300">
            <img
              src={campaign?.
                uploadedImage || "/placeholder.jpg"}
              alt={campaign?.campaignName || "Campaign"}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <DialogTitle className="text-lg font-bold mb-1">{campaign?.campaignName || "Campaign"}</DialogTitle>
              {/* <p className="text-sm opacity-90">by {campaign?.organizer || "Unknown"}</p> */}
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>₹{campaign?.raisedAmount?.toLocaleString() || 0} raised</span>
              <span>₹{campaign?.goalAmount?.toLocaleString() || 0} goal</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{Math.round(progressPercentage)}% completed</p>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Choose Donation Amount
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleAmountSelect(amount)}
                    className={`p-3 rounded-lg border-2 text-sm font-medium transition-all ${selectedAmount === amount
                      ? 'border-orange-500 bg-orange-50 text-orange-600'
                      : 'border-gray-200 hover:border-orange-300 text-gray-700'
                      }`}
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Or enter custom amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className="pl-8 border-gray-300 focus:border-orange-500"
                    min="10"
                  />
                </div>
              </div>
              <Button
                onClick={handleNext}
                disabled={getCurrentAmount() < 10}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-3 rounded-lg font-semibold transition-all"
              >
                Continue with ₹{getCurrentAmount()}
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Donor Information</h3>
                <button onClick={() => setStep(1)} className="text-sm text-orange-600 hover:text-orange-700">
                  ← Back
                </button>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-sm text-orange-800">
                  <strong>Donation Amount:</strong> ₹{getCurrentAmount()}
                </p>
              </div>
              <div className="space-y-3">
                <Input placeholder="Full Name *" value={donorInfo.name} onChange={(e) => setDonorInfo({ ...donorInfo, name: e.target.value })} className="border-gray-300 focus:border-orange-500" required />
                <Input type="email" placeholder="Email Address *" value={donorInfo.email} onChange={(e) => setDonorInfo({ ...donorInfo, email: e.target.value })} className="border-gray-300 focus:border-orange-500" required />
                <Input type="tel" placeholder="Phone Number" value={donorInfo.phone} onChange={(e) => setDonorInfo({ ...donorInfo, phone: e.target.value })} className="border-gray-300 focus:border-orange-500" />
                <textarea placeholder="Message (Optional)" value={donorInfo.message} onChange={(e) => setDonorInfo({ ...donorInfo, message: e.target.value })} className="w-full p-3 border border-gray-300 rounded-lg resize-none h-20 focus:border-orange-500 focus:outline-none" />
              </div>
              <Button onClick={handleNext} disabled={!donorInfo.name || !donorInfo.email} className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-3 rounded-lg font-semibold">
                Proceed to Payment
              </Button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Payment Method</h3>
                <button onClick={() => setStep(2)} className="text-sm text-orange-600 hover:text-orange-700">
                  ← Back
                </button>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-800">₹{getCurrentAmount()}</p>
                  <p className="text-sm text-gray-600">for {campaign?.name || "the campaign"}</p>
                  <p className="text-xs text-gray-500 mt-1">Donor: {donorInfo.name}</p>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Select Payment Method</label>
                <div className="space-y-2">
                  {[{ id: 'card', label: 'Credit/Debit Card', icon: CreditCard }, { id: 'upi', label: 'UPI Payment', icon: Smartphone }, { id: 'netbanking', label: 'Net Banking', icon: Building }].map((method) => {
                    const Icon = method.icon;
                    return (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`w-full p-3 rounded-lg border-2 text-left flex items-center gap-3 transition-all ${paymentMethod === method.id ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'
                          }`}
                      >
                        <Icon className="w-5 h-5 text-gray-600" />
                        <span className="font-medium">{method.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <p className="text-xs text-yellow-800">
                  🔒 Your payment is secure and encrypted. You will receive a receipt via email.
                </p>
              </div>
              
              <Button
                onClick={handleContinue}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center"
                disabled={isSaving} // Optional: disable button while saving
              >
                {isSaving ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Processing...
                  </>
                ) : (
                  <>Complete Donation ₹{getCurrentAmount()}</>
                )}
              </Button>

            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
