export type LeadCaptureEntryId = 'hero_brochure' | 'courses_placement' | 'placements_placement'

export type LeadCaptureConfig = {
  buttonLabel: string
  modalTitle: string
  modalDescription: string
}

export const leadCaptureConfig: Record<LeadCaptureEntryId, LeadCaptureConfig> = {
  hero_brochure: {
    buttonLabel: 'Download Course Brochure',
    modalTitle: 'Download Course Brochure',
    modalDescription:
      'Enter your details and our team will share the full Aerostar course brochure with you.',
  },
  courses_placement: {
    buttonLabel: 'Placement Performance 2025–26',
    modalTitle: 'Placement Performance 2025–26',
    modalDescription:
      'Enter your details to request our latest placement performance report for the 2025–26 academic year.',
  },
  placements_placement: {
    buttonLabel: 'Placement Performance 2025–26',
    modalTitle: 'Placement Performance 2025–26',
    modalDescription:
      'Enter your details to request our latest placement performance report for the 2025–26 academic year.',
  },
}
