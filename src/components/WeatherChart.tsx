"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface WeatherChartProps {
  data: { time: string; temperature: number }[]; // Accept dynamic data for the chart
}

export function WeatherChart({ data }: WeatherChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Monitoring</CardTitle>
        <CardDescription>Temperature Data for Today</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data} // Use the passed data prop
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="var(--chart-line-color, #82ca9d)"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 2°C this afternoon <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing real-time temperature data for the last 12 hours.
        </div>
      </CardFooter>
    </Card>
  );
}
