'use client';

import { useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ChevronLeftIcon } from '@radix-ui/react-icons';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { SubjectFormValues, subjectSchema } from '@/lib/validation';
import { createSubject } from '@/actions/subject.actions';
import { SubjectType } from '@prisma/client';

export const SubjectForm = ({
  majorOptions,
  curriculumOptions,
  lecturerOptions,
  initialValues,
}: {
  initialValues?: typeof subjectSchema | null;
  majorOptions: {
    value: string;
    label: string;
  }[];
  lecturerOptions: {
    value: string;
    label: string;
  }[];
  curriculumOptions: {
    label: string;
    items: {
      value: string;
      label: string;
    }[];
  }[];
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<SubjectFormValues>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      alias: '',
      credit: 1,
      curriculumId: '',
      lecturerId: '',
      majorId: '',
      name: '',
      semester: '',
    },
  });

  const onSubmit = (values: SubjectFormValues) => {
    startTransition(async () => {
      const { error } = await createSubject(values);

      if (error) {
        toast.error(error);
        return;
      }

      toast.success(`Kurikulum ditambahkan.`);
      form.reset();
      router.back();
    });
  };

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

        <Header title="Form Matakuliah" />
      </div>

      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base">
                  Nama Matakuliah
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Basis Data, Statistika"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="alias"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base">
                  Kode Matakuliah
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. SI2 4365"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-2 w-full">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-x-3">
                  <FormLabel className="font-semibold text-base">
                    Sifat Matakuliah
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            id="wajib"
                            value={SubjectType.REQUIRED}
                            className="peer sr-only"
                          />
                        </FormControl>
                        <FormLabel
                          htmlFor="wajib"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover px-4 py-3 cursor-pointer hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          [W] Wajib Program Studi
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            id="pilihan"
                            value={SubjectType.OPTIONAL}
                            className="peer sr-only"
                          />
                        </FormControl>
                        <FormLabel
                          htmlFor="pilihan"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover px-4 py-3 cursor-pointer hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          [P] Pilihan
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            id="wajib-peminatan"
                            value={SubjectType.REQUIRED_INTEREST}
                            className="peer sr-only"
                          />
                        </FormControl>
                        <FormLabel
                          htmlFor="wajib-peminatan"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover px-4 py-3 cursor-pointer hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          [W] Wajib Peminatan
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem
                            id="tugas-akhir"
                            value={SubjectType.THESIS}
                            className="peer sr-only"
                          />
                        </FormControl>
                        <FormLabel
                          htmlFor="tugas-akhir"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover px-4 py-3 cursor-pointer hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                        >
                          [W] Wajib Tugas Akhir
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="majorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-base">
                    Program studi
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="PILIH PRODI" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {majorOptions.map((item) => (
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

            <FormField
              control={form.control}
              name="curriculumId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-base">
                    Kurikulum
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="PILIH KURIKULUM" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {curriculumOptions.map((group, index) => (
                        <SelectGroup key={index}>
                          <SelectLabel>{group.label}</SelectLabel>
                          {group.items.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="credit"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base">SKS</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 2" disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="semester"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base">
                  Paket Semester
                </FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 2" disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lecturerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base">
                  Dosen Pengampu
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="PILIH DOSEN PENGAMPU" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {lecturerOptions.map((item) => (
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

          <Button type="submit" disabled={isPending}>
            {!!initialValues ? 'Update' : 'Tambah'}
          </Button>
        </form>
      </Form>
    </>
  );
};
