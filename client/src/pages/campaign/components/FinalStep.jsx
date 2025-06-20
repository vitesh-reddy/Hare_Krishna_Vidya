import { ArrowLeft, Heart } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FinalStep = ({ formData, handleBack, onCampaignSubmit, isSaving }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const getDisplayImage = () => {
        if (formData.uploadedImage.length > 0) {
            return formData.uploadedImage
        }
        return "https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
    };


    const handleSubmit = async () => {
        if (!isChecked) {
            setError("⚠️ You must agree to the terms before submitting.");
            return;
        }

        setError('');

        try {
            await onCampaignSubmit(); // ✅ Properly await the function
            setSuccess(true); // ✅ This should now trigger the re-render correctly
            console.log("✅ Success message triggered");

            setTimeout(() => {
                navigate('/advertforcampaign');
            }, 2000);
        } catch (err) {
            console.error("❌ Submission failed:", err);
            setError("❌ Submission failed. Please try again.");
        }
    };


    return (
        <div className="max-w-2xl">
            <h2 className="text-2xl font-bold mb-2">Review Your Campaign</h2>
            <p className="text-gray-600 mb-8">Please review your campaign details before submitting for approval.</p>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
                <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 relative">
                    <img
                        src={getDisplayImage()}
                        alt="Campaign"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
                        }}
                    />
                    <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {formData.campaignType.label}
                    </div>
                </div>

                <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">{formData.campaignName}</h3>

                    <div className="grid grid-cols-2 gap-6 mb-4">
                        <div>
                            <div className="text-sm text-gray-600">Goal Amount</div>
                            <div className="font-semibold">₹{formData.goalAmount}</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">Duration</div>
                            <div className="font-semibold">
                                {moment(formData.startDate).format('MMMM D, YYYY')} - {moment(formData.endDate).format('MMMM D, YYYY')}
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="text-sm text-gray-600 mb-2">Description</div>
                        <p className="text-gray-800">{formData.description}</p>
                    </div>
                </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                    <div className="bg-blue-100 rounded-full p-1 mr-3 mt-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <div className="text-sm text-blue-800">
                        <strong>Approval Process:</strong> All campaigns are reviewed by our admin Seva team for alignment with our spiritual values and guidelines.
                        You'll be notified once your campaign is approved.
                    </div>
                </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-2">
                <label className="flex items-start">
                    <input
                        type="checkbox"
                        className="mt-1 mr-3 text-orange-500 focus:ring-orange-500"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    <span className="text-sm text-gray-700">
                        By submitting this campaign, you confirm that all information provided is accurate and that the funds will be used for the stated
                        purpose in service of the spiritual mission.
                    </span>
                </label>
            </div>

            {error && (
                <div className="text-red-600 text-sm mb-4">{error}</div>
            )}

            <div className="flex gap-4">
                <button
                    onClick={handleBack}
                    className="flex items-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Edit Details
                </button>

                {success ? (
                    <div className="flex-1 flex flex-col items-center text-green-600 border border-green-300 p-4 rounded-lg bg-green-50">
                        <Heart className="w-6 h-6 mb-1 animate-pulse" />
                        <p className="font-medium">Campaign submitted successfully!</p>
                        <p className="text-sm text-gray-500">Redirecting...</p>
                    </div>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={isSaving}
                        className={`flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center 
    ${isSaving ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'}`}
                    >
                        {isSaving ? (
                            <>
                                <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                </svg>
                                Submitting...
                            </>
                        ) : (
                            <>
                                <Heart className="w-4 h-4 mr-2" />
                                Jai! Submit Campaign for Review
                            </>
                        )}
                    </button>

                )}
            </div>

            <div className="text-center mt-8">
                <p className="text-sm text-gray-600">"Support a Cause. Start a Change. 🌱 Every seva begins with one step."</p>
            </div>
        </div>
    );
};

export default FinalStep;
