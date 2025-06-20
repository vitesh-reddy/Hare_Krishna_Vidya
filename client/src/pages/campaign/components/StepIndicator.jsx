const StepIndicator = ({ step, title, isActive, isCompleted }) => (
    <div className="flex items-center mb-4">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium mr-3 ${
        isActive ? 'bg-orange-500 text-white' : 
        isCompleted ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-600'
      }`}>
        {step}
      </div>
      <span className={`text-sm ${
        isActive ? 'text-orange-500 font-medium' : 
        isCompleted ? 'text-orange-500' : 'text-gray-500'
      }`}>
        {title}
      </span>
    </div>
  );
  export default StepIndicator;