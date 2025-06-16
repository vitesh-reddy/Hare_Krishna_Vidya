import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const NavigationButtons = ({ 
  onBack, 
  onNext, 
  backLabel = "Back", 
  nextLabel = "Continue to Review",
  showBack = true,
  showNext = true,
  nextDisabled = false,
  loading = false 
}) => {
  return (
    <div className="flex justify-between items-center pt-8 border-t border-gray-200">
      {showBack ? (
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{backLabel}</span>
        </button>
      ) : (
        <div></div>
      )}
      
      {showNext && (
        <button 
          onClick={onNext}
          disabled={nextDisabled || loading}
          className="flex items-center space-x-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-orange-500"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>{nextLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default NavigationButtons;