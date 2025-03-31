interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg"
    className?: string
  }
  
  export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
    const sizeClass = {
      sm: "h-4 w-4",
      md: "h-8 w-8",
      lg: "h-12 w-12",
    }[size]
  
    return (
      <div className={`flex items-center justify-center p-4 ${className}`}>
        <div className={`relative ${sizeClass}`}>
          <div className="absolute inset-0 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
        </div>
      </div>
    )
  }  