import React from "react";

import { BaseErrorBoundary, TErrorBoundaryPropsType } from "@/shared/error-boundary/error-boundary";

import { PageErrorBoundaryFallback } from "./PageErrorBoundaryFallback";

export const PageErrorBoundary: React.FC<{
  children: React.ReactNode;
  onReset?: () => void;
  onError?: TErrorBoundaryPropsType["onError"];
}> = ({ children, onReset, onError }) => {
  return (
    <BaseErrorBoundary fallback={PageErrorBoundaryFallback} onReset={onReset} onError={onError}>
      {children}
    </BaseErrorBoundary>
  );
};
