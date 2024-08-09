'use client';

import { usePathname, useRouter } from 'next/navigation';
import qs from 'query-string';
import { useState } from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type Props = {
  options: {
    label: string;
    value: string;
  }[];
};

export const SubjectFilter = ({ options }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const [subjectName, setSubjectName] = useState('');
  const [subjectAlias, setSubjectAlias] = useState('');
  const [majorId, setMajorId] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      subjectAlias === undefined &&
      subjectName === undefined &&
      majorId === undefined
    ) {
      return;
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          name: subjectName,
          alias: subjectAlias,
          majorId,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <div className="border p-6 rounded-lg shadow-sm bg-card">
      <h3 className="text-lg font-semibold">Pencarian mahasiswa</h3>

      <form
        onSubmit={handleSubmit}
        method="GET"
        action="/admin/curriculum/subjects"
        className="mt-2 w-full sm:w-2/3 space-y-4"
      >
        <div className="flex items-center justify-between gap-2">
          <p>Program studi</p>
          <Select onValueChange={setMajorId} defaultValue={majorId}>
            <SelectTrigger className="w-auto md:w-[500px]">
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

        <div className="flex items-center justify-between gap-2">
          <p>Kode Matakuliah</p>
          <div className="w-1/2">
            <Input
              name="alias"
              value={subjectAlias}
              onChange={(e) => setSubjectAlias(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <p>Nama Matakuliah</p>
          <div className="w-1/2">
            <Input
              name="subject"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 justify-end">
          <Button
            size="sm"
            variant="secondary"
            type="button"
            onClick={() => {
              setMajorId('');
              setSubjectAlias('');
              setSubjectName('');
            }}
          >
            Reset
          </Button>
          <Button size="sm">Tampilkan</Button>
        </div>
      </form>
    </div>
  );
};
