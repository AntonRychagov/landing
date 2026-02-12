export default function Loading(): JSX.Element {
  return (
    <div className="min-h-screen bg-background-primary flex items-center justify-center pt-20">
      <div
        className="w-8 h-8 border-2 border-text-primary border-t-transparent rounded-full animate-spin"
        role="status"
        aria-label="Загрузка"
      />
    </div>
  );
}
