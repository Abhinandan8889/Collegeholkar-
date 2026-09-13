import { StudentPortalView } from './StudentPortalView';
import { Language } from '../../types';

interface StudentLoginPreviewProps {
  language: Language;
  onShowToast?: (message: string) => void;
}

export function StudentLoginPreview({ language, onShowToast }: StudentLoginPreviewProps) {
  return <StudentPortalView language={language} onShowToast={onShowToast} />;
}
