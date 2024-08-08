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

export const StudentFilter = ({ options }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const [nim, setNim] = useState('');
  const [majorId, setMajorId] = useState('');
  const [nama, setNama] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nama === undefined && nim === undefined && majorId === undefined) {
      return;
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          majorId,
          angk_awal: '',
          angk_akhir: '',
          nim,
          fullName: nama,
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
        action="/admin/students"
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
          <p>Angkatan</p>
          <div className="flex items-center gap-2">
            <Select>
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="2020" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">2020</SelectItem>
                <SelectItem value="dark">2021</SelectItem>
                <SelectItem value="system">2022</SelectItem>
              </SelectContent>
            </Select>
            <span>s/d</span>
            <Select>
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="2022" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">2020</SelectItem>
                <SelectItem value="dark">2021</SelectItem>
                <SelectItem value="system">2022</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <p>NIM</p>
          <div className="w-1/2">
            <Input
              name="nim"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <p>Nama</p>
          <div className="w-1/2">
            <Input
              name="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
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
              setNama('');
              setNim('');
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
