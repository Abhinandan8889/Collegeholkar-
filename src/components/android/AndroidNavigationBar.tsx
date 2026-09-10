interface AndroidNavigationBarProps {
  isDarkMode?: boolean;
}

export function AndroidNavigationBar({ isDarkMode = false }: AndroidNavigationBarProps) {
  return (
    <div
      id="android-gesture-bar"
      className={`h-4 w-full flex items-center justify-center select-none ${
        isDarkMode ? 'bg-slate-900' : 'bg-slate-50'
      }`}
    >
      <div
        className={`w-32 h-1 rounded-full ${
          isDarkMode ? 'bg-slate-600' : 'bg-slate-400'
        }`}
      />
    </div>
  );
}
