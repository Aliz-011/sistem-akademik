'use client';

import { useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Sexes, Student } from '@prisma/client';
import { CalendarIcon, ChevronLeftIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { cn } from '@/lib/utils';
import { StudentFormValues, studentSchema } from '@/lib/validation';
import { createStudent } from '@/actions/student.actions';
import { Header } from '@/components/header';

export const StudentForm = ({
  initialValues,
  options,
}: {
  initialValues?: Student | null;
  options: {
    value: string;
    label: string;
  }[];
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      fullName: initialValues?.fullName || '',
      nim: initialValues?.nim || '',
      phoneNumber: initialValues?.phoneNumber || '',
      birthDate: initialValues
        ? new Date(initialValues?.birthDate)
        : new Date(),
      majorId: initialValues?.majorId || '',
      email: '',
    },
  });

  const buttonTitle = initialValues ? 'Save changes' : 'Create';

  function onSubmit(values: StudentFormValues) {
    startTransition(async () => {
      const { error } = await createStudent(values);
      if (error) {
        toast.error(error);
        return;
      }

      toast.success(`Mahasiswa berhasil ditambahkan.`);
      form.reset();
      router.push('/admin/students');
    });
  }

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

        <Header title="Form Mahasiswa" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama lengkap</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="grid gap-2 w-full">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="shadcn@gmail.com"
                        className="w-full"
                        disabled={isPending || !!initialValues}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-2 w-full">
              <FormField
                control={form.control}
                name="nim"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIM</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. 20240510xxxx"
                        className="w-full"
                        disabled={isPending || !!initialValues}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tanggal lahir</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="grid gap-2 w-full">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor telp.</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="08xxxxxxxx"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-2 w-full">
              <FormField
                control={form.control}
                name="sex"
                render={({ field }) => (
                  <FormItem className="space-x-3">
                    <FormLabel>Jenis kelamin</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              id="male"
                              value={Sexes.MALE}
                              className="peer sr-only"
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor="male"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover px-4 py-3 cursor-pointer hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            Laki-laki
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem
                              id="female"
                              value={Sexes.FEMALE}
                              className="peer sr-only"
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor="female"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover px-4 py-3 cursor-pointer hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            Perempuan
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="majorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prodi</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Program studi" />
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
    </>
  );
};
