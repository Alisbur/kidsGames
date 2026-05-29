import React from "react";

import { DefaultFallback } from "./default-fallback";

export type TErrorBoundaryPropsType = {
  children: React.ReactNode;
  fallback?: ({ error, reset }: { error: Error; reset: () => void }) => React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  onReset?: () => void;
};

type TErrorBoundaryStateType = {
  hasError: boolean;
  error: Error | null;
};

export class BaseErrorBoundary extends React.Component<
  TErrorBoundaryPropsType,
  TErrorBoundaryStateType
> {
  constructor(props: TErrorBoundaryPropsType) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): TErrorBoundaryStateType {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  resetError = () => {
    this.props.onReset?.();
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback({ error: this.state.error, reset: this.resetError });
      }
      return <DefaultFallback error={this.state.error} reset={this.resetError} />;
    }
    return this.props.children;
  }
}
