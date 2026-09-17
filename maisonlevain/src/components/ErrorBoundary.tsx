import React, { Component, ReactNode, ErrorInfo } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(_error: Error, _errorInfo: ErrorInfo) {
    // Gracefully handle render errors in production
  }

  private handleReload = () => {
    try {
      // Clear potentially corrupt local state
      localStorage.removeItem('maison_levain_cart');
      localStorage.removeItem('maison_levain_boxes');
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF7F2] text-[#341C02] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-[#E5DACD] text-center">
            <div className="w-12 h-12 rounded-xl bg-[#F4EBE1] text-[#8D4B26] flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-[#341C02] mb-2">
              Maison Levain
            </h1>
            <p className="text-sm text-[#786C5E] mb-6">
              A temporary display glitch occurred while loading the bakery view. You can reload to restore the hearth session.
            </p>
            <button
              onClick={this.handleReload}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#341C02] hover:bg-[#4A2E0A] text-[#FAF7F2] font-semibold text-sm rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer w-full"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload Bakery Experience</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
