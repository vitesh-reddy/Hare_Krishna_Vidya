import React from 'react'
import StepIndicator from './StepIndicator'

export default function CampaignSteps({currentStep}) {
  return (
    <div className="flex items-center justify-between mb-8">
        <StepIndicator step={1} title="Campaign Type" isActive={true} />
        <StepIndicator step={2} title="Campaign Details" isActive={currentStep > 1 ? true : false} />
        <StepIndicator step={3} title="Review & Submit" isActive={currentStep > 2 ? true : false} />
      </div>
  )
}
