// app/loading.tsx
export default function Loading() {
  // Skeleton para una card de Pokémon
  const SkeletonCard = () => (
    <div className="border rounded-lg p-4 bg-gray-100 animate-pulse">
      <div className="h-32 bg-gray-300 rounded-md"></div>
      <div className="h-6 bg-gray-300 rounded-md mt-4 w-3/4 mx-auto"></div>
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {/* Repetimos el skeleton varias veces para simular la lista */}
      {Array.from({ length: 10 }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}