import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import type { EngineProfile, EngineProfileField } from '../types/engineProfile'
import { hasRequiredFields } from '../schemas/engineProfile'

/**
 * Returns an onClose handler for EngineWizardDialog.
 * When the dialog is dismissed by the user (backdrop click or Escape key) while
 * required fields are still missing, redirects to the homepage.
 */
export function useWizardGuard(
  setWizardOpen: (open: boolean) => void,
  activeEngine: EngineProfile | null,
  requiredFields: EngineProfileField[],
) {
  const navigate = useNavigate()
  return useCallback((_?: object, reason?: string) => {
    setWizardOpen(false)
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      if (!hasRequiredFields(activeEngine, requiredFields)) navigate('/')
    }
  }, [setWizardOpen, activeEngine, requiredFields, navigate])
}
