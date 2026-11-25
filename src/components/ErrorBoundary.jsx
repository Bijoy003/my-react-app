import { Component } from "react";

// React still has no hook version of this. A class with
// getDerivedStateFromError renders the fallback; componentDidCatch is where a
// real app would log to a service. Async work and event handlers are not
// caught here — only errors thrown while rendering, in effects or in a child's
// lifecycle.
export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("A boundary caught an error:", error, info.componentStack);
  }

  handleReset = () => {
    // Let the owner clear whatever caused the throw before the children mount
    // again; without this, a deterministic error would fire straight away.
    this.props.onReset?.();
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;

    if (error) {
      return (
        <div
          role="alert"
          className="space-y-3 rounded-xl border border-accent/40 bg-accent/5 p-5 text-sm"
        >
          <h3 className="font-semibold text-ink">
            This part stopped rendering.
          </h3>
          <p className="leading-relaxed text-ink-muted">
            React caught the error at the nearest boundary, so the rest of the
            page still works. The message was: {error.message}
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="rounded-lg border border-accent/40 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/10"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
