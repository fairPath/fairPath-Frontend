'use client';

import { useFormStatus } from 'react-dom';
import LoadingFormBtn from './loading-form-button';

export default function SubmitButton({ message, label }: { message?: string; label?: string }) {
  const { pending } = useFormStatus();

  return <LoadingFormBtn message={message} label={label} pending={pending} />;
}
