import type {
  IndiaFinancialStatements,
  IndiaHistoryPoint,
  IndiaMarketOverview,
  IndiaQuoteSnapshot,
} from "../types";

export async function fetchIndiaMarketOverview(): Promise<IndiaMarketOverview> {
  const response = await fetch("/api/india-market");
  if (!response.ok) {
    throw new Error(`Failed to fetch India market overview: ${response.status}`);
  }

  return response.json();
}

export async function fetchIndiaMarketHistory(
  symbol: string,
  range = "1mo",
  interval = "1d"
): Promise<IndiaHistoryPoint[]> {
  const search = new URLSearchParams({
    symbol,
    range,
    interval,
  });

  const response = await fetch(`/api/india-market?${search.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch India market history: ${response.status}`);
  }

  const payload = await response.json();
  return payload.points;
}

export async function fetchIndiaQuote(symbol: string): Promise<IndiaQuoteSnapshot> {
  const search = new URLSearchParams({
    symbol,
    range: "5d",
    interval: "1d",
    mode: "quote",
  });

  const response = await fetch(`/api/india-market?${search.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch India quote: ${response.status}`);
  }

  return response.json();
}

export async function fetchIndiaFundamentals(symbol: string): Promise<IndiaFinancialStatements> {
  const search = new URLSearchParams({ symbol });
  const response = await fetch(`/api/india-fundamentals?${search.toString()}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch India fundamentals: ${response.status}`);
  }

  return response.json();
}
