import React from 'react';

interface ErrorMessageProps {
  children?: React.ReactNode;
  className?: string;
}

export function ErrorMessage({
  children,
  className = '',
}: Readonly<ErrorMessageProps>) {
  if (!children) return null;
  return <p className={`mt-1 text-sm text-red-500 ${className}`}>{children}</p>;
}

export default ErrorMessage;
