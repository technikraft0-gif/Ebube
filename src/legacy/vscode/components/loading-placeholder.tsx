export function LoadingPlaceholder({ height = "400px" }: { height?: string }) {
  return (
    <div className="w-full bg-[#15191E] border border-[#232B33] rounded-xl flex items-center justify-center font-mono" style={{ height }}>
      <div className="text-amber-500 text-xs font-semibold animate-pulse flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
        <span>Loading component...</span>
      </div>
    </div>
  )
}
