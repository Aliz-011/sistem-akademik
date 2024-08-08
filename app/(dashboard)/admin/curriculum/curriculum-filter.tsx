'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import qs from 'query-string';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

type Props = {
  options: {
    label: string;
    value: string;
  }[];
};

export const CurriculumFilter = ({ options }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const [majorId, setMajorId] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (majorId === undefined) {
      return;
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          majorId,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <div className="border p-6 rounded-lg shadow-sm bg-card">
      <form
        onSubmit={handleSubmit}
        method="GET"
        action="/admin/curriculum"
        className="w-fit flex items-center gap-4"
      >
        <div className="grid gap-2">
          <Select onValueChange={setMajorId} defaultValue={majorId}>
            <SelectTrigger className="w-full md:w-[500px]">
              <SelectValue placeholder="PILIH PROGRAM STUDI" />
            </SelectTrigger>
            <SelectContent>
              {options.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button size="sm">Tampilkan</Button>
      </form>
    </div>
  );
};
