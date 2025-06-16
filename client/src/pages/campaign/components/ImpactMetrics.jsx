import React from 'react';

const ImpactMetrics = ({ metrics }) => {
  const defaultMetrics = [
    { value: 40, label: "Meals Served", color: "red" },
    { value: 100, label: "School Days", color: "yellow" },
    { value: 15, label: "Villages Reached", color: "green" },
    { value: 1, label: "Life Transformed", color: "blue" }
  ];

  const metricsToShow = metrics || defaultMetrics;

  const getColorClasses = (color) => {
    const colorMap = {
      red: {
        bg: "bg-red-50",
        border: "border-red-200",
        text: "text-red-600"
      },
      yellow: {
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        text: "text-yellow-600"
      },
      green: {
        bg: "bg-green-50",
        border: "border-green-200",
        text: "text-green-600"
      },
      blue: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-600"
      },
      orange: {
        bg: "bg-orange-50",
        border: "border-orange-200",
        text: "text-orange-600"
      },
      purple: {
        bg: "bg-purple-50",
        border: "border-purple-200",
        text: "text-purple-600"
      }
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Estimated Campaign Impact
      </h3>
      <div className={`grid gap-4 ${
        metricsToShow.length <= 2 ? 'grid-cols-2' :
        metricsToShow.length <= 4 ? 'grid-cols-4' :
        'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      }`}>
        {metricsToShow.map((metric, index) => {
          const colors = getColorClasses(metric.color);
          return (
            <div 
              key={index}
              className={`${colors.bg} border ${colors.border} rounded-lg p-4 text-center transition-transform hover:scale-105`}
            >
              <div className={`text-2xl font-bold ${colors.text} mb-1`}>
                {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
              </div>
              <div className={`text-sm ${colors.text}`}>
                {metric.label}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Add Custom Metric Button */}
      <div className="mt-4">
        <button className="text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors">
          + Add Custom Impact Metric
        </button>
      </div>
    </div>
  );
};

export default ImpactMetrics;