import { leadCaptureConfig, type LeadCaptureEntryId } from '../../data/modalConfig'
import { useLeadCaptureModal } from '../../context/ModalProvider'
import { EnrollCtaButton } from './EnrollCtaButton'

type LeadCaptureButtonProps = {
  entryId: LeadCaptureEntryId
  className?: string
}

export default function LeadCaptureButton({ entryId, className = '' }: LeadCaptureButtonProps) {
  const { openLeadCapture, thankYouEntryId } = useLeadCaptureModal()
  const config = leadCaptureConfig[entryId]
  const showThankYou = thankYouEntryId === entryId

  return (
    <div className={`lead-capture-button-wrap ${className}`.trim()}>
      {showThankYou ? (
        <p className="lead-capture-button__thank-you form-success-celebrate" role="status">
          Thank you! We&apos;ll be in touch shortly.
        </p>
      ) : (
        <EnrollCtaButton onClick={() => openLeadCapture(entryId)}>{config.buttonLabel}</EnrollCtaButton>
      )}
    </div>
  )
}
