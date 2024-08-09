'use client';

import { useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Header } from '@/components/header';

export const LecturerForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="size-6"
          onClick={() => router.back()}
        >
          <ChevronLeftIcon className="size-4" />
          <span className="sr-only">Back</span>
        </Button>

        <Header title="Form Dosen" />
      </div>
    </>
  );
};
