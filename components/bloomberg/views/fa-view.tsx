"use client";

import {
  fetchIndiaFundamentals,
  fetchIndiaMarketOverview,
  fetchIndiaQuote,
} from "@/components/bloomberg/api/india-market";
import { BloombergButton } from "@/components/bloomberg/core/bloomberg-button";
import { bloombergColors } from "@/components/bloomberg/lib/theme-config";
import type {
  IndiaFinancialStatementLine,
  IndiaFinancialStatements,
  IndiaQuoteSnapshot,
  IndiaSymbol,
} from "@/components/bloomberg/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, BarChart3, Building2, FileText } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type FaViewProps = {
  isDarkMode: boolean;
  onBack: () => void;
};

const SUPPORTED_SYMBOLS = ["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS"] as const;

export function FaView({ isDarkMode, onBack }: FaViewProps) {
  const colors = isDarkMode ? bloombergColors.dark : bloombergColors.light;
  const [selectedSymbol, setSelectedSymbol] =
    useState<(typeof SUPPORTED_SYMBOLS)[number]>("RELIANCE.NS");

  const overviewQuery = useQuery({
    queryKey: ["india-market", "overview"],
    queryFn: fetchIndiaMarketOverview,
    staleTime: 60_000,
  });

  const fundamentalsQuery = useQuery({
    queryKey: ["india-market", "fundamentals", selectedSymbol],
    queryFn: () => fetchIndiaFundamentals(selectedSymbol),
    staleTime: 5 * 60_000,
  });

  const quoteQuery = useQuery({
    queryKey: ["india-market", "quote", selectedSymbol],
    queryFn: () => fetchIndiaQuote(selectedSymbol),
    staleTime: 60_000,
    refetchInterval: 120_000,
  });

  const supportedUniverse = useMemo(() => {
    const universe = overviewQuery.data?.universe || [];
    return universe.filter(
      (item): item is IndiaSymbol & { symbol: (typeof SUPPORTED_SYMBOLS)[number] } =>
        item.instrumentType === "equity" &&
        SUPPORTED_SYMBOLS.includes(item.symbol as (typeof SUPPORTED_SYMBOLS)[number])
    );
  }, [overviewQuery.data]);

  useEffect(() => {
    if (!supportedUniverse.length) {
      return;
    }

    if (!supportedUniverse.some((item) => item.symbol === selectedSymbol)) {
      setSelectedSymbol(supportedUniverse[0].symbol);
    }
  }, [supportedUniverse, selectedSymbol]);

  const selectedMeta = supportedUniverse.find((item) => item.symbol === selectedSymbol);

  return (
    <div
      className="min-h-screen p-4 font-mono"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BloombergButton color="red" onClick={onBack} className="flex items-center gap-1">
            <ArrowLeft className="h-3 w-3" />
            BACK
          </BloombergButton>
          <div>
            <p className="text-xs uppercase" style={{ color: colors.textSecondary }}>
              FA &lt;GO&gt;
            </p>
            <h2 className="text-lg font-bold" style={{ color: colors.accent }}>
              Financial Analysis
            </h2>
          </div>
        </div>

        <div className="w-[280px]">
          <Select
            value={selectedSymbol}
            onValueChange={(value) =>
              setSelectedSymbol(value as (typeof SUPPORTED_SYMBOLS)[number])
            }
          >
            <SelectTrigger
              className="h-9 rounded-none border text-xs font-mono"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              }}
            >
              <SelectValue placeholder="Select symbol" />
            </SelectTrigger>
            <SelectContent
              className="rounded-none border font-mono text-xs"
              style={{
                backgroundColor: colors.surface,
                borderColor: colors.border,
                color: colors.text,
              }}
            >
              {supportedUniverse.map((item) => (
                <SelectItem key={item.symbol} value={item.symbol}>
                  {item.symbol} - {item.displayName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mb-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div
          className="rounded-sm border p-4"
          style={{ borderColor: colors.border, backgroundColor: colors.surface }}
        >
          <div className="mb-3 flex items-center gap-2">
            <Building2 className="h-4 w-4" style={{ color: colors.accent }} />
            <h3 className="text-base font-bold">{selectedMeta?.displayName || selectedSymbol}</h3>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <QuoteCard item={quoteQuery.data} colors={colors} />
            <SummaryCard label="Sector" value={selectedMeta?.sector || "N/A"} colors={colors} />
            <SummaryCard
              label="Coverage"
              value="Historical statements + key ratios"
              colors={colors}
            />
          </div>
        </div>

        <div
          className="rounded-sm border p-4"
          style={{ borderColor: colors.border, backgroundColor: colors.surface }}
        >
          <div className="mb-3 flex items-center gap-2">
            <BarChart3 className="h-4 w-4" style={{ color: colors.accent }} />
            <h3 className="text-base font-bold">Key Ratios</h3>
          </div>
          <RatioSummary fundamentals={fundamentalsQuery.data} colors={colors} />
        </div>
      </div>

      <div
        className="rounded-sm border p-4"
        style={{ borderColor: colors.border, backgroundColor: colors.surface }}
      >
        <div className="mb-3 flex items-center gap-2">
          <FileText className="h-4 w-4" style={{ color: colors.accent }} />
          <h3 className="text-base font-bold">Historical Statements</h3>
        </div>

        <Tabs defaultValue="income" className="w-full">
          <TabsList
            className="mb-4 h-8 w-full rounded-none border-b bg-transparent p-0 font-mono text-xs"
            style={{ borderColor: colors.border }}
          >
            <TabsTrigger
              value="income"
              className="flex-1 rounded-none border-r px-3 py-1 data-[state=active]:bg-[#1e1e1e] data-[state=active]:text-[#ff9900] data-[state=active]:shadow-none"
              style={{ borderColor: colors.border, color: colors.text }}
            >
              Income Statement
            </TabsTrigger>
            <TabsTrigger
              value="balance"
              className="flex-1 rounded-none border-r px-3 py-1 data-[state=active]:bg-[#1e1e1e] data-[state=active]:text-[#ff9900] data-[state=active]:shadow-none"
              style={{ borderColor: colors.border, color: colors.text }}
            >
              Balance Sheet
            </TabsTrigger>
            <TabsTrigger
              value="cashflow"
              className="flex-1 rounded-none px-3 py-1 data-[state=active]:bg-[#1e1e1e] data-[state=active]:text-[#ff9900] data-[state=active]:shadow-none"
              style={{ color: colors.text }}
            >
              Cash Flow
            </TabsTrigger>
          </TabsList>

          <TabsContent value="income">
            <FinancialTable
              lines={fundamentalsQuery.data?.incomeStatement || []}
              colors={colors}
              emptyMessage="No income statement data available."
            />
          </TabsContent>
          <TabsContent value="balance">
            <FinancialTable
              lines={fundamentalsQuery.data?.balanceSheet || []}
              colors={colors}
              emptyMessage="No balance sheet data available."
            />
          </TabsContent>
          <TabsContent value="cashflow">
            <FinancialTable
              lines={fundamentalsQuery.data?.cashFlow || []}
              colors={colors}
              emptyMessage="No cash flow data available."
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function QuoteCard({
  item,
  colors,
}: {
  item: IndiaQuoteSnapshot | undefined;
  colors: typeof bloombergColors.dark;
}) {
  return (
    <div
      className="rounded-sm border p-3"
      style={{ borderColor: colors.border, backgroundColor: colors.background }}
    >
      <div className="text-xs" style={{ color: colors.textSecondary }}>
        Last Price
      </div>
      <div className="mt-1 text-lg font-bold">{formatCurrencyInr(item?.price)}</div>
      <div
        className="text-sm"
        style={{
          color:
            item && item.change < 0
              ? colors.negative
              : item
                ? colors.positive
                : colors.textSecondary,
        }}
      >
        {item
          ? `${item.change >= 0 ? "+" : ""}${item.change.toFixed(2)} (${item.changePercent.toFixed(2)}%)`
          : "Loading..."}
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  colors,
}: {
  label: string;
  value: string;
  colors: typeof bloombergColors.dark;
}) {
  return (
    <div
      className="rounded-sm border p-3"
      style={{ borderColor: colors.border, backgroundColor: colors.background }}
    >
      <div className="text-xs" style={{ color: colors.textSecondary }}>
        {label}
      </div>
      <div className="mt-1 text-sm font-bold">{value}</div>
    </div>
  );
}

function RatioSummary({
  fundamentals,
  colors,
}: {
  fundamentals: IndiaFinancialStatements | undefined;
  colors: typeof bloombergColors.dark;
}) {
  const summary = fundamentals?.summary;
  const rows = [
    ["Market Cap", formatCompactNumber(summary?.marketCap)],
    ["Trailing P/E", formatDecimal(summary?.trailingPE)],
    ["Forward P/E", formatDecimal(summary?.forwardPE)],
    ["Price / Book", formatDecimal(summary?.priceToBook)],
    ["ROE", formatPercent(summary?.returnOnEquity)],
    ["ROA", formatPercent(summary?.returnOnAssets)],
    ["Debt / Equity", formatDecimal(summary?.debtToEquity)],
    ["Current Ratio", formatDecimal(summary?.currentRatio)],
    ["Revenue Growth", formatPercent(summary?.revenueGrowth)],
    ["Earnings Growth", formatPercent(summary?.earningsGrowth)],
    ["Operating Margin", formatPercent(summary?.operatingMargins)],
    ["Profit Margin", formatPercent(summary?.profitMargins)],
  ];

  return (
    <div className="space-y-2 text-sm">
      {rows.map(([label, value]) => (
        <div
          key={label}
          className="flex items-center justify-between rounded-sm border px-3 py-2"
          style={{ borderColor: colors.border, backgroundColor: colors.background }}
        >
          <span style={{ color: colors.textSecondary }}>{label}</span>
          <span className="font-bold">{value}</span>
        </div>
      ))}
    </div>
  );
}

function FinancialTable({
  lines,
  colors,
  emptyMessage,
}: {
  lines: IndiaFinancialStatementLine[];
  colors: typeof bloombergColors.dark;
  emptyMessage: string;
}) {
  const columns = lines[0]?.values.map((item) => item.asOfDate) || [];

  if (!lines.length) {
    return (
      <div className="rounded-sm border p-4 text-sm" style={{ borderColor: colors.border }}>
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-sm border" style={{ borderColor: colors.border }}>
      <table className="min-w-full text-xs">
        <thead style={{ backgroundColor: colors.background }}>
          <tr>
            <th className="px-3 py-2 text-left">Metric</th>
            {columns.map((column) => (
              <th key={column} className="px-3 py-2 text-right">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lines.map((line) => (
            <tr key={line.label} style={{ borderTop: `1px solid ${colors.border}` }}>
              <td className="px-3 py-2">{line.label}</td>
              {line.values.map((value) => (
                <td key={`${line.label}-${value.asOfDate}`} className="px-3 py-2 text-right">
                  {formatCompactNumber(value.value)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function formatCurrencyInr(value: number | null | undefined) {
  if (typeof value !== "number") {
    return "N/A";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatCompactNumber(value: number | null | undefined) {
  if (typeof value !== "number") {
    return "N/A";
  }

  return new Intl.NumberFormat("en-IN", {
    notation: Math.abs(value) >= 1_00_000 ? "compact" : "standard",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatDecimal(value: number | null | undefined) {
  if (typeof value !== "number") {
    return "N/A";
  }

  return value.toFixed(2);
}

function formatPercent(value: number | null | undefined) {
  if (typeof value !== "number") {
    return "N/A";
  }

  return `${(value * 100).toFixed(2)}%`;
}
