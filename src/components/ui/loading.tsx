export default function Loading({ message }: { message?: string }) {
  return (
    <div className="flex flex-col justify-center items-center min-h-160">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
      <p className="text-blue-500 font-bold">{message}</p>
    </div>
  );
}
