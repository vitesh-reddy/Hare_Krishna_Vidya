import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '../../TSX-src/components/ui/button';
import { Input } from '../../TSX-src/components/ui/input';
import { Label } from '../../TSX-src/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../TSX-src/components/ui/card';
import { ArrowLeft, CreditCard, Home, User, Mail, Phone, Heart } from 'lucide-react';
import { initiateRazorpayPayment } from '../../PaymentService.jsx';
import { toast, ToastBar } from 'react-hot-toast';

const AmountDonationFlow = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const donationType = searchParams.get('type'); // e.g., 'annadan', 'sponsorchild', 'vidhyadana'
  const initialAmount = searchParams.get('amount') || '0';
  const isEditable = searchParams.get('editable') === 'true';
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState(parseFloat(initialAmount.replace(/[^0-9]/g, '')) || 0);
  const [customAmount, setCustomAmount] = useState(isEditable ? '' : amount.toString());
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem('donorData')) || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      // Removed panCard as it's not used in the UI or backend
    };
    return storedData;
  });
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [paymentError, setPaymentError] = useState(null);

  const formatDonationType = () => {
    switch (donationType) {
      case 'annadan':
        return 'Annadan Seva';
      case 'sponsorchild':
        return 'Sponsor a Child';
      case 'vidhyadana':
        return 'Vidhyadana Seva';
      default:
        return 'Donation';
    }
  };

  const mapDonationTypeToSchema = () => {
    switch (donationType) {
      case 'annadan':
        return 'Annadaan';
      case 'sponsorchild':
        return 'Sponsor a Child';
      case 'vidhyadana':
        return 'Vidyadaan';
      default:
        return null;
    }
  };

  const calculateImpact = () => {
    let impact = {};
    if (donationType === 'annadan') {
      const childrenFed = Math.ceil(amount / 27);
      impact = { label: 'Children Fed', value: childrenFed };
    } else if (donationType === 'sponsorchild') {
      const childrenSponsored = Math.ceil(amount / 12000);
      impact = { label: 'Children Sponsored', value: childrenSponsored };
    } else if (donationType === 'vidhyadana') {
      const childrenEducated = Math.ceil(amount / 500);
      impact = { label: 'Children Educated (1 Month)', value: childrenEducated };
    } else {
      impact = { label: 'Impact', value: 'Your donation will make a difference!' };
    }
    return impact;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [name]: value,
      };
      // Update localStorage with the latest state
      localStorage.setItem('donorData', JSON.stringify(updatedFormData));
      return updatedFormData;
    });
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    const numericValue = parseFloat(value) || 0;
    setAmount(numericValue);
  };

  const handleContinue = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      try {
        setIsProcessing(true);
        toast.loading("Payment Processing");
        const baseUrl = import.meta.env.VITE_BACKEND_URL;
        const response = await fetch(`${baseUrl}/api/payments/create-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amount * 100, // Convert to paise
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
            amount: amount * 100,
            donorName: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
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
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    pincode: formData.pincode,
                  },
                  donationType: 'amount',
                  donatedFor: mapDonationTypeToSchema(),
                  amount: amount,
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

            setPaymentCompleted(true);
            setIsProcessing(false);
            toast.dismiss();            
            navigate('/donation-success', {
              state: {
                amount: amount,
                donationType: formatDonationType(),
                donorName: `${formData.firstName} ${formData.lastName}`,
                impact: calculateImpact(),
                paymentId: paymentResponse.razorpay_payment_id,
              },
            });
          },
          (error) => {
            toast.dismiss();   
            setIsProcessing(false);     
            setPaymentError(error);
            toast.error(error || 'Payment failed. Please try again.');
          }
        );
      } catch (error) {
        toast.dismiss();     
        setIsProcessing(false);   
        console.error('HandleContinue Error:', error);
        setPaymentError(error.message);
        toast.error(error.message || 'An error occurred during payment.');
      }
    }
  };

  const handleBackNavigation = () => {
    if (step === 1) {
      navigate('/donate-amount');
    } else if (paymentCompleted) {
      navigate('/donate-amount');
    } else {
      setStep(step - 1);
    }
  };

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
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate('/donate-amount')}
        className="p-0 h-auto text-[#F97316] hover:text-[#EA580C]"
      >
        Donate
      </Button>
      <span>›</span>
      <span className="text-[#1F2937] font-medium dark:text-[#F5F7FD]">
        {formatDonationType()} - Step {step}
      </span>
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-[1.5rem]">
      <h2 className="text-[1.5rem] font-bold text-center">
        {formatDonationType()}
      </h2>
      <Card className="p-[1.5rem] bg-[#FFF7ED] border-[#FED7AA] dark:bg-[#7C2D12] dark:border-[#EA580C]">
        <div className="flex justify-between items-center text-[1.25rem] font-bold">
          <span>Donation Amount</span>
          <span className="text-[#F97316]">₹{amount.toLocaleString()}</span>
        </div>
        {isEditable && (
          <div className="mt-[1rem]">
            <Label htmlFor="customAmount">Enter Amount (₹)</Label>
            <Input
              id="customAmount"
              type="number"
              value={customAmount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              className="mt-[0.5rem]"
            />
          </div>
        )}
      </Card>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-[1.5rem]">
      <h2 className="text-[1.5rem] font-bold text-center">Your Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem]">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[1rem]">
        <div>
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="pincode">Pincode</Label>
          <Input
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-[1.5rem]">
      <h2 className="text-[1.5rem] font-bold text-center">Donation Overview</h2>
      <Card className="p-[1.5rem] bg-[#F9FAFB] dark:bg-[#1F2937]">
        <h3 className="font-semibold mb-[1rem]">Donation Summary</h3>
        <div className="space-y-[0.5rem]">
          <p><span className="font-medium">Donation Type:</span> {formatDonationType()}</p>
          <div className="border-t pt-[0.5rem] mt-[0.5rem]">
            <div className="flex justify-between font-bold text-[1.125rem]">
              <span>Total Amount:</span>
              <span>₹{amount.toLocaleString()}</span>
            </div>
          </div>
          <p><span className="font-medium">Donor:</span> {formData.firstName} {formData.lastName}</p>
          <p><span className="font-medium">Email:</span> {formData.email}</p>
        </div>
      </Card>
      <div className="space-y-[1rem]">
        <div className="flex items-center space-x-[0.5rem]">
          <CreditCard className="w-[1.25rem] h-[1.25rem]" />
          <Label>Payment Method: Credit/Debit Card</Label>
        </div>
        <div className="bg-[#EFF6FF] p-[1rem] rounded-[0.5rem] dark:bg-[#1E3A8A]">
          <p className="text-[0.875rem] text-[#1E40AF] dark:text-[#BFDBFE]">
            🔒 Your payment is secured with 256-bit SSL encryption.
            You'll be redirected to our secure payment gateway.
          </p>
        </div>
        <div className="text-center">
          <p className="text-[0.875rem] text-[#4B5563] mb-[1rem] dark:text-[#9CA3AF]">
            By proceeding, you agree to our Terms of Service and Privacy Policy.
            Your donation is eligible for 80G tax exemption.
          </p>
        </div>
      </div>
      {paymentError && (
        <div className="text-red-600 text-center">
          {paymentError}
        </div>
      )}
    </div>
  );

  const renderPaymentStats = () => {
    const impact = calculateImpact();
    return (
      <div className="space-y-[1.5rem] text-center">
        <h2 className="text-[1.5rem] font-bold">Thank You for Your Donation! 🎉</h2>
        <Card className="p-[1.5rem] bg-[#FFF7ED] border-[#FED7AA] dark:bg-[#7C2D12] dark:border-[#EA580C]">
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
        <Button
          onClick={() => navigate('/donate-amount')}
          className="bg-[#F97316] hover:bg-[#EA580C] px-[2rem] py-[0.75rem] text-[1.125rem]"
        >
          Back to Donate Page
        </Button>
      </div>
    );
  };

  if (!donationType) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center dark:bg-[#1F2937]">
        <Card className="p-[2rem] text-center">
          <h2 className="text-[1.5rem] font-bold mb-[1rem]">Invalid Donation Type</h2>
          <p className="text-[#4B5563] mb-[1.5rem] dark:text-[#9CA3AF]">
            Please select a valid donation type to proceed.
          </p>
          <Button onClick={() => navigate('/donate-amount')}>
            <ArrowLeft className="w-[1rem] h-[1rem] mr-[0.5rem]" />
            Back to Donate Page
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-[2rem] dark:bg-[#1F2937]">
      <div className="container mx-auto px-[1.5rem] max-w-[48rem]">
        <div className="mb-[2rem]">
          <Breadcrumb />
          <Button
            variant="ghost"
            onClick={handleBackNavigation}
            className="mb-[1rem]"
          >
            <ArrowLeft className="w-[1rem] h-[1rem] mr-[0.5rem]" />
            {paymentCompleted ? 'Back to Donate Page' : step === 1 ? 'Back to Donate Page' : 'Previous Step'}
          </Button>
          {!paymentCompleted && (
            <div className="flex items-center justify-center space-x-[1rem] mb-[2rem]">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div
                    className={`w-[2rem] h-[2rem] rounded-full flex items-center justify-center text-[0.875rem] font-semibold ${
                      stepNum <= step ? 'bg-[#F97316] text-[#FFFFFF]' : 'bg-[#E5E7EB] text-[#4B5563]'
                    }`}
                  >
                    {stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div
                      className={`w-[3rem] h-[0.125rem] ${
                        stepNum < step ? 'bg-[#F97316]' : 'bg-[#E5E7EB]'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <Card className="p-[2rem]">
          {paymentCompleted
            ? renderPaymentStats()
            : step === 1
            ? renderStep1()
            : step === 2
            ? renderStep2()
            : renderStep3()}
          {!paymentCompleted && (
            <div className="mt-[2rem] flex justify-center">
              <Button
                onClick={handleContinue}
                className="bg-[#F97316] hover:bg-[#EA580C] px-[2rem] py-[0.75rem] text-[1.125rem]"
                disabled={
                  isProcessing || 
                  (step === 1 && amount <= 0) ||
                  (step === 2 && (!formData.firstName || !formData.lastName || !formData.email || !formData.phone))
                }
              >
                {step === 3 ?( isProcessing ? 'Processing Payment...' : 'Complete Donation' ): 'Continue'}
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AmountDonationFlow;