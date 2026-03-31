"use client";

import {
  fetchIndiaFundamentals,
  fetchIndiaMarketHistory,
  fetchIndiaMarketOverview,
  fetchIndiaQuote,
} from "@/components/bloomberg/api/india-market";
import { BloombergButton } from "@/components/bloomberg/core/bloomberg-button";
import { bloombergColors } from "@/components/bloomberg/lib/theme-config";
import type { IndiaFinancialStatementLine, IndiaQuoteSnapshot } from "@/components/bloomberg/types";
import { IndiaTradingChart } from "@/components/bloomberg/ui/india-trading-chart";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { Activity, BarChart3, Building2, FileSpreadsheet, Landmark, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type IndiaMarketOverviewProps = {
  isDarkMode: boolean;
};

const RANGE_OPTIONS = [
  { label: "1M", value: "1mo" },
  { label: "3M", value: "3mo" },
  { label: "6M", value: "6mo" },
  { label: "1Y", value: "1y" },
  { label: "5Y", value: "5y" },
] as const;

export function IndiaMarketOverview({ isDarkMode }: IndiaMarketOverviewProps) {
  const colors = isDarkMode ? bloombergColors.dark : bloombergColors.light;
  const [selectedSymbol, setSelectedSymbol] = useState("RELIANCE.NS");
  const [selectedRange, setSelectedRange] =
    useState<(typeof RANGE_OPTIONS)[number]["value"]>("1mo");
  const [chartMode, setChartMode] = useState<"line" | "candle">("line");
  const [searchTerm, setSearchTerm] = useState("");

  const overviewQuery = useQuery({
    queryKey: ["india-market", "overview"],
    queryFn: fetchIndiaMarketOverview,
    staleTime: 60_000,
    refetchInterval: 120_000,
  });

  useEffect(() => {
    if (!overviewQuery.data) {
      return;
    }

    const hasSelection = overviewQuery.data.universe.some((item) => item.symbol === selectedSymbol);
    if (!hasSelection) {
      const firstEquity = overviewQuery.data.universe.find(
        (item) => item.instrumentType === "equity"
      );
      if (firstEquity) {
        setSelectedSymbol(firstEquity.symbol);
      }
    }
  }, [overviewQuery.data, selectedSymbol]);

  const quoteQuery = useQuery({
    queryKey: ["india-market", "quote", selectedSymbol],
    queryFn: () => fetchIndiaQuote(selectedSymbol),
    enabled: Boolean(selectedSymbol),
    staleTime: 60_000,
    refetchInterval: 120_000,
  });

  const historyQuery = useQuery({
    queryKey: ["india-market", "history", selectedSymbol, selectedRange],
    queryFn: () => fetchIndiaMarketHistory(selectedSymbol, selectedRange, "1d"),
    enabled: Boolean(selectedSymbol),
    staleTime: 60_000,
    refetchInterval: 120_000,
  });

  const fundamentalsQuery = useQuery({
    queryKey: ["india-market", "fundamentals", selectedSymbol],
    queryFn: () => fetchIndiaFundamentals(selectedSymbol),
    enabled: Boolean(selectedSymbol) && !selectedSymbol.startsWith("^"),
    staleTime: 5 * 60_000,
  });

  const filteredUniverse = useMemo(() => {
    const universe = overviewQuery.data?.universe || [];
    const equities = universe.filter((item) => item.instrumentType === "equity");
    if (!searchTerm.trim()) {
      return equities;
    }

    const normalized = searchTerm.trim().toLowerCase();
    return equities.filter(
      (item) =>
        item.displayName.toLowerCase().includes(normalized) ||
        item.symbol.toLowerCase().includes(normalized) ||
        item.sector?.toLowerCase().includes(normalized)
    );
  }, [overviewQuery.data, searchTerm]);

  if (overviewQuery.isPending) {
    return (
      <div
        className="mx-4 mb-6 rounded-sm border p-4 font-mono text-sm"
        style={{ borderColor: colors.border, backgroundColor: colors.surface, color: colors.text }}
      >
        Loading India market workspace...
      </div>
    );
  }

  if (overviewQuery.isError || !overviewQuery.data) {
    return (
      <div
        className="mx-4 mb-6 rounded-sm border p-4 font-mono text-sm"
        style={{
          borderColor: colors.border,
          backgroundColor: colors.surface,
          color: colors.negative,
        }}
      >
        Failed to load India market workspace.
      </div>
    );
  }

  const selectedMeta = overviewQuery.data.universe.find((item) => item.symbol === selectedSymbol);
  const selectedQuote = quoteQuery.data;

  return (
    <section className="mx-4 mb-6 space-y-4 font-mono">
      <div
        className="rounded-sm border p-4"
        style={{ borderColor: colors.border, backgroundColor: colors.surface, color: colors.text }}
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide" style={{ color: colors.textSecondary }}>
              Phase 1 India Data Layer
            </p>
            <h3 className="text-lg font-bold" style={{ color: colors.accent }}>
              India Benchmarks And Symbol Workstation
            </h3>
          </div>
          <p className="text-xs" style={{ color: colors.textSecondary }}>
            Universe: Official Nifty 50 + NIFTY 50 / SENSEX benchmarks
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {overviewQuery.data.benchmarks.map((item) => (
            <BenchmarkCard
              key={item.symbol}
              item={item}
              isSelected={item.symbol === selectedSymbol}
              onSelect={() => setSelectedSymbol(item.symbol)}
              colors={colors}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[340px_minmax(0,1fr)]">
        <div
          className="rounded-sm border p-4"
          style={{
            borderColor: colors.border,
            backgroundColor: colors.surface,
            color: colors.text,
          }}
        >
          <div className="mb-3 flex items-center gap-2">
            <Building2 className="h-4 w-4" style={{ color: colors.accent }} />
            <h3 className="text-base font-bold">Nifty 50 Watchlist</h3>
          </div>

          <div className="relative mb-3">
            <Search
              className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: colors.textSecondary }}
            />
            <Input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search symbol, company, sector"
              className="pl-8 text-xs"
              style={{ borderColor: colors.border, backgroundColor: colors.background }}
            />
          </div>

          <div className="mb-3 grid grid-cols-2 gap-2 text-xs">
            <div
              className="rounded-sm border p-2"
              style={{ borderColor: colors.border, backgroundColor: colors.background }}
            >
              <div style={{ color: colors.textSecondary }}>Tracked Equities</div>
              <div className="mt-1 text-lg font-bold">{filteredUniverse.length}</div>
            </div>
            <div
              className="rounded-sm border p-2"
              style={{ borderColor: colors.border, backgroundColor: colors.background }}
            >
              <div style={{ color: colors.textSecondary }}>Starter Financials</div>
              <div className="mt-1 text-lg font-bold">3 Names</div>
            </div>
          </div>

          <div className="max-h-[780px] space-y-2 overflow-y-auto pr-1">
            {filteredUniverse.map((item) => (
              <button
                key={item.symbol}
                type="button"
                onClick={() => setSelectedSymbol(item.symbol)}
                className="w-full rounded-sm border p-3 text-left"
                style={{
                  borderColor: item.symbol === selectedSymbol ? colors.accent : colors.border,
                  backgroundColor:
                    item.symbol === selectedSymbol ? `${colors.accent}15` : colors.background,
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold" style={{ color: colors.accent }}>
                      {item.displayName}
                    </div>
                    <div className="text-xs" style={{ color: colors.textSecondary }}>
                      {item.symbol}
                    </div>
                  </div>
                  <div
                    className="rounded-sm px-2 py-1 text-[10px]"
                    style={{ backgroundColor: colors.surface, color: colors.textSecondary }}
                  >
                    {item.sector || "N/A"}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div
            className="rounded-sm border p-4"
            style={{
              borderColor: colors.border,
              backgroundColor: colors.surface,
              color: colors.text,
            }}
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase" style={{ color: colors.textSecondary }}>
                  Selected Symbol
                </p>
                <h3 className="text-xl font-bold" style={{ color: colors.accent }}>
                  {selectedMeta?.displayName || selectedSymbol}
                </h3>
                <p className="text-xs" style={{ color: colors.textSecondary }}>
                  {selectedSymbol}
                  {selectedMeta?.sector ? ` • ${selectedMeta.sector}` : ""}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <BloombergButton
                  color={chartMode === "line" ? "accent" : "default"}
                  onClick={() => setChartMode("line")}
                >
                  LINE
                </BloombergButton>
                <BloombergButton
                  color={chartMode === "candle" ? "accent" : "default"}
                  onClick={() => setChartMode("candle")}
                >
                  CANDLE
                </BloombergButton>
                {RANGE_OPTIONS.map((option) => (
                  <BloombergButton
                    key={option.value}
                    color={selectedRange === option.value ? "accent" : "default"}
                    onClick={() => setSelectedRange(option.value)}
                  >
                    {option.label}
                  </BloombergButton>
                ))}
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-4">
              <StatCard
                label="Last Price"
                value={
                  selectedQuote
                    ? `${selectedQuote.price.toFixed(2)} ${selectedQuote.currency}`
                    : "..."
                }
                colors={colors}
              />
              <StatCard
                label="Daily Change"
                value={
                  selectedQuote
                    ? `${selectedQuote.change >= 0 ? "+" : ""}${selectedQuote.change.toFixed(2)} (${selectedQuote.changePercent.toFixed(2)}%)`
                    : "..."
                }
                colors={colors}
                tone={
                  selectedQuote ? (selectedQuote.change >= 0 ? "positive" : "negative") : "neutral"
                }
              />
              <StatCard
                label="Day Range"
                value={
                  selectedQuote
                    ? `${formatCompactNumber(selectedQuote.low)} - ${formatCompactNumber(selectedQuote.high)}`
                    : "..."
                }
                colors={colors}
              />
              <StatCard
                label="Volume"
                value={selectedQuote ? formatCompactNumber(selectedQuote.volume) : "..."}
                colors={colors}
              />
            </div>

            <div className="mt-4 h-[360px]">
              <IndiaTradingChart data={historyQuery.data || []} mode={chartMode} colors={colors} />
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
            <div
              className="rounded-sm border p-4"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.surface,
                color: colors.text,
              }}
            >
              <div className="mb-3 flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4" style={{ color: colors.accent }} />
                <h3 className="text-base font-bold">Financial Statements</h3>
              </div>

              {!selectedSymbol.startsWith("^") && fundamentalsQuery.data?.supported === false && (
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  Financial statement support is enabled in this phase for `RELIANCE.NS`, `TCS.NS`,
                  and `HDFCBANK.NS`.
                </p>
              )}

              {fundamentalsQuery.data?.supported && (
                <div className="space-y-4">
                  <StatementTable
                    title="Income Statement"
                    lines={fundamentalsQuery.data.incomeStatement}
                    colors={colors}
                  />
                  <StatementTable
                    title="Balance Sheet"
                    lines={fundamentalsQuery.data.balanceSheet}
                    colors={colors}
                  />
                  <StatementTable
                    title="Cash Flow"
                    lines={fundamentalsQuery.data.cashFlow}
                    colors={colors}
                  />
                </div>
              )}

              {fundamentalsQuery.isPending && (
                <p className="text-sm" style={{ color: colors.textSecondary }}>
                  Loading fundamentals...
                </p>
              )}
            </div>

            <div
              className="rounded-sm border p-4"
              style={{
                borderColor: colors.border,
                backgroundColor: colors.surface,
                color: colors.text,
              }}
            >
              <div className="mb-3 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" style={{ color: colors.accent }} />
                <h3 className="text-base font-bold">Quote And Ratio Snapshot</h3>
              </div>

              {fundamentalsQuery.data?.supported && fundamentalsQuery.data.summary ? (
                <div className="space-y-2 text-sm">
                  <MetricRow
                    label="Market Cap"
                    value={formatCompactNumber(fundamentalsQuery.data.summary.marketCap)}
                    colors={colors}
                  />
                  <MetricRow
                    label="Trailing P/E"
                    value={formatDecimal(fundamentalsQuery.data.summary.trailingPE)}
                    colors={colors}
                  />
                  <MetricRow
                    label="Forward P/E"
                    value={formatDecimal(fundamentalsQuery.data.summary.forwardPE)}
                    colors={colors}
                  />
                  <MetricRow
                    label="Price / Book"
                    value={formatDecimal(fundamentalsQuery.data.summary.priceToBook)}
                    colors={colors}
                  />
                  <MetricRow
                    label="ROE"
                    value={formatPercent(fundamentalsQuery.data.summary.returnOnEquity)}
                    colors={colors}
                  />
                  <MetricRow
                    label="ROA"
                    value={formatPercent(fundamentalsQuery.data.summary.returnOnAssets)}
                    colors={colors}
                  />
                  <MetricRow
                    label="Debt / Equity"
                    value={formatDecimal(fundamentalsQuery.data.summary.debtToEquity)}
                    colors={colors}
                  />
                  <MetricRow
                    label="Current Ratio"
                    value={formatDecimal(fundamentalsQuery.data.summary.currentRatio)}
                    colors={colors}
                  />
                  <MetricRow
                    label="Revenue Growth"
                    value={formatPercent(fundamentalsQuery.data.summary.revenueGrowth)}
                    colors={colors}
                  />
                  <MetricRow
                    label="Earnings Growth"
                    value={formatPercent(fundamentalsQuery.data.summary.earningsGrowth)}
                    colors={colors}
                  />
                  <MetricRow
                    label="Operating Margin"
                    value={formatPercent(fundamentalsQuery.data.summary.operatingMargins)}
                    colors={colors}
                  />
                  <MetricRow
                    label="Profit Margin"
                    value={formatPercent(fundamentalsQuery.data.summary.profitMargins)}
                    colors={colors}
                  />
                </div>
              ) : (
                <div className="space-y-3 text-sm" style={{ color: colors.textSecondary }}>
                  <div className="rounded-sm border p-3" style={{ borderColor: colors.border }}>
                    Quote stats are available for all Nifty 50 names.
                  </div>
                  <div className="rounded-sm border p-3" style={{ borderColor: colors.border }}>
                    Financial ratios in this phase are available for `RELIANCE.NS`, `TCS.NS`, and
                    `HDFCBANK.NS`.
                  </div>
                  {selectedQuote && (
                    <div className="rounded-sm border p-3" style={{ borderColor: colors.border }}>
                      <div className="mb-1 text-xs uppercase">Market Time</div>
                      <div>{new Date(selectedQuote.marketTime).toLocaleString("en-IN")}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div
            className="rounded-sm border p-4"
            style={{
              borderColor: colors.border,
              backgroundColor: colors.surface,
              color: colors.text,
            }}
          >
            <div className="mb-3 flex items-center gap-2">
              <Activity className="h-4 w-4" style={{ color: colors.accent }} />
              <h3 className="text-base font-bold">India Leadership Snapshot</h3>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {overviewQuery.data.leaders.map((item) => (
                <button
                  key={item.symbol}
                  type="button"
                  onClick={() => setSelectedSymbol(item.symbol)}
                  className="rounded-sm border p-3 text-left"
                  style={{ borderColor: colors.border, backgroundColor: colors.background }}
                >
                  <div className="mb-1 text-sm font-bold" style={{ color: colors.accent }}>
                    {item.displayName}
                  </div>
                  <div className="text-xs" style={{ color: colors.textSecondary }}>
                    {item.symbol}
                  </div>
                  <div className="mt-2 text-lg font-bold">{formatCurrencyInr(item.price)}</div>
                  <div
                    className="text-sm"
                    style={{ color: item.change >= 0 ? colors.positive : colors.negative }}
                  >
                    {item.change >= 0 ? "+" : ""}
                    {item.change.toFixed(2)} ({item.changePercent.toFixed(2)}%)
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenchmarkCard({
  item,
  isSelected,
  onSelect,
  colors,
}: {
  item: IndiaQuoteSnapshot;
  isSelected: boolean;
  onSelect: () => void;
  colors: typeof bloombergColors.dark;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="rounded-sm border p-3 text-left transition-colors"
      style={{
        borderColor: isSelected ? colors.accent : colors.border,
        backgroundColor: isSelected ? `${colors.accent}15` : colors.background,
      }}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Landmark className="h-4 w-4" style={{ color: colors.accent }} />
          <span className="text-sm font-bold">{item.displayName}</span>
        </div>
        <span className="text-xs" style={{ color: colors.textSecondary }}>
          {item.exchange}
        </span>
      </div>
      <p className="text-xl font-bold">{formatCurrencyInr(item.price)}</p>
      <p
        className="text-sm"
        style={{ color: item.change >= 0 ? colors.positive : colors.negative }}
      >
        {item.change >= 0 ? "+" : ""}
        {item.change.toFixed(2)} ({item.changePercent.toFixed(2)}%)
      </p>
      <p className="mt-2 text-xs" style={{ color: colors.textSecondary }}>
        Updated {new Date(item.marketTime).toLocaleString("en-IN")}
      </p>
    </button>
  );
}

function StatCard({
  label,
  value,
  colors,
  tone = "neutral",
}: {
  label: string;
  value: string;
  colors: typeof bloombergColors.dark;
  tone?: "neutral" | "positive" | "negative";
}) {
  const color =
    tone === "positive" ? colors.positive : tone === "negative" ? colors.negative : colors.text;
  return (
    <div
      className="rounded-sm border p-3"
      style={{ borderColor: colors.border, backgroundColor: colors.background }}
    >
      <div className="text-xs" style={{ color: colors.textSecondary }}>
        {label}
      </div>
      <div className="mt-1 text-sm font-bold" style={{ color }}>
        {value}
      </div>
    </div>
  );
}

function MetricRow({
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
      className="flex items-center justify-between rounded-sm border px-3 py-2"
      style={{ borderColor: colors.border, backgroundColor: colors.background }}
    >
      <span style={{ color: colors.textSecondary }}>{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

function StatementTable({
  title,
  lines,
  colors,
}: {
  title: string;
  lines: IndiaFinancialStatementLine[];
  colors: typeof bloombergColors.dark;
}) {
  const columns = lines[0]?.values.map((item) => item.asOfDate) || [];

  return (
    <div>
      <h4 className="mb-2 text-sm font-bold" style={{ color: colors.accent }}>
        {title}
      </h4>
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
    </div>
  );
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
