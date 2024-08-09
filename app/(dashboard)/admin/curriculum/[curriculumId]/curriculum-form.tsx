'use client';

import { useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { ChevronLeftIcon } from '@radix-ui/react-icons';

import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
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
import { Textarea } from '@/components/ui/textarea';

import { cn } from '@/lib/utils';
import { CurriculumFormValues, curriculumSchema } from '@/lib/validation';
import { createCurriculum } from '@/actions/curriculum.actions';

export const CurriculumForm = ({
  options,
}: {
  options: {
    value: string;
    label: string;
  }[];
}) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<CurriculumFormValues>({
    resolver: zodResolver(curriculumSchema),
    defaultValues: {
      name: '',
      approvedAt: new Date(),
      consentBy: '',
      decisionDate: new Date(),
      idealStudyPeriod: '',
      majorId: '',
      maxStudyPeriod: '',
      notes: '',
      year: '',
    },
  });

  const onSubmit = (values: CurriculumFormValues) => {
    startTransition(async () => {
      const { error } = await createCurriculum(values);

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

        <Header title="Form kurikulum" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-2">
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

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base">
                  Nama Kurikulum
                </FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base">
                  Tahun Kurikulum
                </FormLabel>
                <FormControl>
                  <Input placeholder="2020" disabled={isPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-base">Keputusan Rektor</h4>

            <div className="ml-2">
              <FormField
                control={form.control}
                name="decisionDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tanggal</FormLabel>
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
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-base">Waktu Disetujui</h4>

            <div className="ml-2 flex flex-col gap-6">
              <FormField
                control={form.control}
                name="consentBy"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="font-semibold w-full md:w-2/3">
                      Pihak yang menyetujui
                    </FormLabel>
                    <FormControl>
                      <Textarea {...field} className="resize-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="approvedAt"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel className="font-semibold">
                      Tanggal disetujui
                    </FormLabel>
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
          </div>

          <FormField
            control={form.control}
            name="idealStudyPeriod"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base">
                  Masa Studi Ideal
                </FormLabel>
                <FormControl>
                  <Input placeholder="8" disabled={isPending} {...field} />
                </FormControl>
                <FormDescription>
                  [Diisi dengan angka[0-9], dengan nilai: 1 s/d 10]
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxStudyPeriod"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base">
                  Masa Studi Maksimum
                </FormLabel>
                <FormControl>
                  <Input placeholder="14" disabled={isPending} {...field} />
                </FormControl>
                <FormDescription>
                  [Diisi dengan angka [0-9], dengan nilai: 2 s/d 20]
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-base">
                  Keterangan
                </FormLabel>
                <FormControl>
                  <Textarea {...field} className="resize-none" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending}>
            Tambah
          </Button>
        </form>
      </Form>
    </>
  );
};
