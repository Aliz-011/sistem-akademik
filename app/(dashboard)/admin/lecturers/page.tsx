import { Header } from '@/components/header';
import React from 'react';

const LecturersPage = () => {
  return (
    <div className="mx-auto grid max-w-screen-xl flex-1 p-4 auto-rows-max gap-4 w-full">
      <Header title="Dosen" subtitle="List seluruh dosen" />
    </div>
  );
};

export default LecturersPage;
