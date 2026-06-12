import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import LeadCaptureModal from '../components/ui/LeadCaptureModal'
import { leadCaptureConfig, type LeadCaptureEntryId } from '../data/modalConfig'

type LeadCaptureFormData = {
  name: string
  phone: string
  email: string
}

type ModalContextValue = {
  openLeadCapture: (entryId: LeadCaptureEntryId) => void
  closeLeadCapture: () => void
  submitLeadCapture: (data: LeadCaptureFormData) => void
  activeEntryId: LeadCaptureEntryId | null
  thankYouEntryId: LeadCaptureEntryId | null
}

const ModalContext = createContext<ModalContextValue | null>(null)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeEntryId, setActiveEntryId] = useState<LeadCaptureEntryId | null>(null)
  const [thankYouEntryId, setThankYouEntryId] = useState<LeadCaptureEntryId | null>(null)

  const openLeadCapture = useCallback((entryId: LeadCaptureEntryId) => {
    setThankYouEntryId(null)
    setActiveEntryId(entryId)
  }, [])

  const closeLeadCapture = useCallback(() => {
    setActiveEntryId(null)
  }, [])

  const submitLeadCapture = useCallback(
    (_data: LeadCaptureFormData) => {
      if (!activeEntryId) return
      const submittedEntry = activeEntryId
      setActiveEntryId(null)
      setThankYouEntryId(submittedEntry)
    },
    [activeEntryId],
  )

  const value = useMemo(
    () => ({
      openLeadCapture,
      closeLeadCapture,
      submitLeadCapture,
      activeEntryId,
      thankYouEntryId,
    }),
    [openLeadCapture, closeLeadCapture, submitLeadCapture, activeEntryId, thankYouEntryId],
  )

  const activeConfig = activeEntryId ? leadCaptureConfig[activeEntryId] : null

  return (
    <ModalContext.Provider value={value}>
      {children}
      {activeConfig && activeEntryId ? (
        <LeadCaptureModal
          title={activeConfig.modalTitle}
          description={activeConfig.modalDescription}
          onClose={closeLeadCapture}
          onSubmit={submitLeadCapture}
        />
      ) : null}
    </ModalContext.Provider>
  )
}

export function useLeadCaptureModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useLeadCaptureModal must be used within ModalProvider')
  }
  return context
}
