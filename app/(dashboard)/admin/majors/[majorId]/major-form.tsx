'use client';

import { useTransition } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Major } from '@prisma/client';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { MajorFormValues, majorSchema } from '@/lib/validation';
import { createMajor, updateMajor } from '@/actions/major.actions';

export const MajorForm = ({
  initialValues,
  options,
}: {
  initialValues?: Major | null;
  options: {
    value: string;
    label: string;
  }[];
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<MajorFormValues>({
    resolver: zodResolver(majorSchema),
    defaultValues: {
      name: initialValues?.name || '',
      facultyId: initialValues?.facultyId || '',
    },
  });

  const buttonTitle = initialValues ? 'Save changes' : 'Create';

  function onSubmit(values: MajorFormValues) {
    if (initialValues) {
      startTransition(async () => {
        const { error, data } = await updateMajor(initialValues.id, values);
        if (error) {
          toast.error(error);
          return;
        }

        toast.success(`Program studi ${data?.name} berhasil diubah.`);
        form.reset();
        router.push('/admin/majors');
      });
    } else {
      startTransition(async () => {
        const { error, data } = await createMajor(values);
        if (error) {
          toast.error(error);
          return;
        }

        toast.success(`Program studi ${data?.name} berhasil ditambahkan.`);
        form.reset();
        router.push('/admin/majors');
      });
    }
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
                <FormLabel>Nama program studi</FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Farmasi, Akuntan"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-2">
          <FormField
            control={form.control}
            name="facultyId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fakultas</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Fakultas dari program studi" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {options.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
