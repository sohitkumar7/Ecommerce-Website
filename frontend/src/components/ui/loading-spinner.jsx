import React from 'react'

function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        {/* Main Spinner */}
        <div className="relative">
          <div className="h-16 w-16 animate-ping rounded-full bg-primary/20" />
          <div className="absolute inset-0 h-16 w-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <div className="absolute inset-2 h-12 w-12 bg-background border-4 border-primary/10 rounded-full animate-pulse" />
        </div>
        
        {/* Brand-like logo/text */}
        <div className="flex flex-col items-center space-y-2 animate-pulse">
          <div className="h-6 w-32 bg-muted rounded-md animate-pulse" />
          <div className="h-4 w-24 bg-muted/80 rounded-md animate-pulse [animation-delay:200ms]" />
        </div>
        
        {/* Skeleton previews */}
        <div className="flex flex-col w-80 space-y-3 p-6 bg-card rounded-xl shadow-lg border animate-pulse">
          <div className="h-6 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted/80 rounded w-1/2 mx-auto" />
          <div className="h-12 bg-muted rounded-full w-full" />
          <div className="h-4 bg-muted/80 rounded w-2/3 mx-auto" />
        </div>
        
        <p className="text-sm text-muted-foreground animate-pulse">
          Preparing your dashboard...
        </p>
      </div>
    </div>
  )
}

export default LoadingSpinner
