import React from 'react';
import { Button } from "@/components/ui/button";
import { ClipboardList, Scan } from 'lucide-react';

interface ProcedureInputMethodSelectorProps {
  inputMethod: 'manual' | 'ocr';
  setInputMethod: (method: 'manual' | 'ocr') => void;
}

export const ProcedureInputMethodSelector: React.FC<ProcedureInputMethodSelectorProps> = ({ inputMethod, setInputMethod }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Button
      type="button"
      variant={inputMethod === 'manual' ? 'default' : 'outline'}
      onClick={() => setInputMethod('manual')}
      className="h-20 flex flex-col gap-2"
    >
      <ClipboardList className="w-6 h-6" />
      <span>Insertion Manuelle</span>
      <span className="text-xs opacity-80">Saisie via le formulaire</span>
    </Button>
    <Button
      type="button"
      variant={inputMethod === 'ocr' ? 'default' : 'outline'}
      onClick={() => {
        const event = new CustomEvent('navigate-to-section', { detail: 'ocr-extraction' });
        window.dispatchEvent(event);
      }}
      className="h-20 flex flex-col gap-2"
    >
      <Scan className="w-6 h-6" />
      <span>Insertion OCR</span>
      <span className="text-xs opacity-80">Scan de document</span>
    </Button>
  </div>
);