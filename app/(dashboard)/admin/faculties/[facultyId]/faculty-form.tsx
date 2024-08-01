'use client';

import { useTransition } from 'react';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Faculty } from '@prisma/client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createFaculty } from '@/actions/faculty.actions';

const formSchema = z.object({
  name: z.string().trim().min(1),
});

type FormValues = z.infer<typeof formSchema>;

export const FacultyForm = ({
  initialValues,
}: {
  initialValues?: Faculty | null;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name || '',
    },
  });

  const buttonTitle = initialValues ? 'Save changes' : 'Create';

  function onSubmit({ name }: FormValues) {
    startTransition(() => {
      createFaculty(name)
        .then((res) => {
          toast.success(`Fakultas ${res.name} berhasil ditambahkan.`);
          form.reset();
          router.push('/admin/faculties');
        })
        .catch((err) => {
          console.error(err);
        });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama fakultas</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Hukum, Ekonomi"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={isPending}>
          {buttonTitle}
        </Button>
      </form>
    </Form>
  );
};
