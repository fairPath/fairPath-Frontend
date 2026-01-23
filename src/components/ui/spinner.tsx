// // components/GlobalSpinner.tsx
// 'use client';

// import { useLoading } from './../shared/LoadingContext';
// // Assuming you have installed Radix Themes for easy styling
// // npm install @radix-ui/themes
// import { Spinner } from '@radix-ui/themes'; 

// const GlobalSpinner = () => {
//   const { isProgressLoading } = useLoading();

//   if (!isProgressLoading) return null;

//   console.log('spinner');
//   return (
//     <div className="fixed inset-0 bg-red bg-opacity-50 flex items-center justify-center z-50">
//       <Spinner size="3" />
//       Loading
//     </div>
//   );
// };

//export default GlobalSpinner;

'use client';

import { useLoading } from '@/components/shared/LoadingContext';

export default function GlobalSpinner() {
  const { activeRequests } = useLoading();

  if (activeRequests == 0) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent">
      <div className="h-full w-full animate-progress bg-blue-500" />
    </div>
  );
}
