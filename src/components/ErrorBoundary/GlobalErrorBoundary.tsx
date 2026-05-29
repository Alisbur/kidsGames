import React from "react";

import { BaseErrorBoundary, TErrorBoundaryPropsType } from "@/shared/error-boundary/error-boundary";

import { GlobalErrorBoundaryFallback } from "./GlobalErrorBoundaryFallback";

export const GlobalErrorBoundary: React.FC<{
  children: React.ReactNode;
  onError?: TErrorBoundaryPropsType["onError"];
}> = ({ children, onError }) => {
  return (
    <BaseErrorBoundary fallback={GlobalErrorBoundaryFallback} onError={onError}>
      {children}
    </BaseErrorBoundary>
  );
};
