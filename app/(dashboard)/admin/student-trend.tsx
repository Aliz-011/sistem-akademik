'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { year: '2010', active: 186, graduate: 162 },
  { year: '2011', active: 305, graduate: 172 },
  { year: '2012', active: 237, graduate: 183 },
  { year: '2013', active: 373, graduate: 195 },
  { year: '2014', active: 209, graduate: 208 },
  { year: '2015', active: 214, graduate: 222 },
  { year: '2016', active: 321, graduate: 236 },
  { year: '2017', active: 328, graduate: 251 },
  { year: '2018', active: 335, graduate: 267 },
  { year: '2019', active: 343, graduate: 284 },
  { year: '2020', active: 351, graduate: 302 },
  { year: '2021', active: 359, graduate: 321 },
  { year: '2022', active: 367, graduate: 341 },
  { year: '2023', active: 376, graduate: 362 },
];

const chartConfig = {
  views: {
    label: 'Page Views',
  },
  active: {
    label: 'Mahasiswa Aktif',
    color: 'hsl(var(--chart-1))',
  },
  graduate: {
    label: 'Mahasiswa Lulus',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

type Props = {
  chartData: {
    year: string | Date;
    active: number;
    graduated: number;
  }[];
};

export function StudentTrend() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('active');
  const total = React.useMemo(
    () => ({
      active: chartData.reduce((acc, curr) => acc + curr.active, 0),
      graduate: chartData.reduce((acc, curr) => acc + curr.graduate, 0),
    }),
    []
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="text-xl">
            GRAFIK TREND MAHASISWA AKTIF & LULUS
          </CardTitle>
          <CardDescription className="text-base">
            Total mahasiswa yang aktif dan lulus dari 2010 - 2024
          </CardDescription>
        </div>
        <div className="flex">
          {['active', 'graduate'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  year: 'numeric',
                });
              }}
            />
            <Bar dataKey="active" fill="var(--color-active)" radius={4} />
            <Bar dataKey="graduate" fill="var(--color-graduate)" radius={4} />
            <ChartTooltip
              content={
                <ChartTooltipContent indicator="line" labelClassName="ml-2" />
              }
              cursor={false}
              defaultIndex={1}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
