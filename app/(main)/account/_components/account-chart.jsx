"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, eachMonthOfInterval } from "date-fns";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";

const CHART_PERIODS = {
  "1M": 1,
  "3M": 3,
  "6M": 6,
  "1Y": 12
};

export function AccountChart({ transactions }) {
  const [period, setPeriod] = useState("3M");
  const [view, setView] = useState("balance");

  // Process data for different chart types
  const processData = () => {
    const endDate = new Date();
    const startDate = subMonths(endDate, CHART_PERIODS[period]);
    
    const filteredTransactions = transactions.filter(t => {
      const date = new Date(t.date);
      return date >= startDate && date <= endDate;
    });

    if (view === "balance") {
      // Daily balance data
      const days = eachDayOfInterval({ start: startDate, end: endDate });
      let runningBalance = 0;
      
      return days.map(day => {
        const dayTransactions = filteredTransactions.filter(t => 
          format(new Date(t.date), "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
        );
        
        dayTransactions.forEach(t => {
          runningBalance += t.type === "INCOME" ? t.amount : -t.amount;
        });

        return {
          date: format(day, "MMM d"),
          balance: runningBalance
        };
      });
    } else {
      // Monthly income/expense data
      const months = eachMonthOfInterval({ start: startDate, end: endDate });
      
      return months.map(month => {
        const monthTransactions = filteredTransactions.filter(t => {
          const date = new Date(t.date);
          return date >= startOfMonth(month) && date <= endOfMonth(month);
        });

        const income = monthTransactions
          .filter(t => t.type === "INCOME")
          .reduce((sum, t) => sum + t.amount, 0);

        const expenses = monthTransactions
          .filter(t => t.type === "EXPENSE")
          .reduce((sum, t) => sum + t.amount, 0);

        return {
          date: format(month, "MMM yyyy"),
          income,
          expenses,
          net: income - expenses
        };
      });
    }
  };

  const data = processData();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Account Activity</CardTitle>
          <div className="flex items-center gap-4">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1M">Last Month</SelectItem>
                <SelectItem value="3M">Last 3 Months</SelectItem>
                <SelectItem value="6M">Last 6 Months</SelectItem>
                <SelectItem value="1Y">Last Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={view} onValueChange={setView} className="space-y-4">
          <TabsList>
            <TabsTrigger value="balance">Balance</TabsTrigger>
            <TabsTrigger value="flow">Income & Expenses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="balance" className="space-y-4">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="date" 
                    className="text-xs"
                    tick={{ fill: "currentColor" }}
                  />
                  <YAxis 
                    className="text-xs"
                    tick={{ fill: "currentColor" }}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Date
                                </span>
                                <span className="font-bold text-muted-foreground">
                                  {payload[0].payload.date}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Balance
                                </span>
                                <span className="font-bold">
                                  ${payload[0].value.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="balance"
                    stroke="#32AE4C"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="flow" className="space-y-4">
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="date" 
                    className="text-xs"
                    tick={{ fill: "currentColor" }}
                  />
                  <YAxis 
                    className="text-xs"
                    tick={{ fill: "currentColor" }}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Date
                                </span>
                                <span className="font-bold text-muted-foreground">
                                  {payload[0].payload.date}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Income
                                </span>
                                <span className="font-bold text-green-500">
                                  ${payload[0].value.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Expenses
                                </span>
                                <span className="font-bold text-red-500">
                                  ${payload[1].value.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Net
                                </span>
                                <span className={cn(
                                  "font-bold",
                                  payload[2].value >= 0 ? "text-green-500" : "text-red-500"
                                )}>
                                  ${payload[2].value.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="income" name="Income" fill="#32AE4C" />
                  <Bar dataKey="expenses" name="Expenses" fill="#ef4444" />
                  <Bar dataKey="net" name="Net" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
