// Define proper types for market data
export type MarketItem = {
  id: string;
  num?: string;
  rmi?: string;
  value: number;
  change: number;
  pctChange: number;
  avat: number;
  time: string;
  ytd: number;
  ytdCur: number;
  sparkline1?: number[];
  sparkline2?: number[];
  sparklineUpdated?: string;
  lastUpdated?: string;
  // Additional properties for filters
  historicalData10D?: number[];
  volatility?: number;
  isMover?: boolean;
};

export type MarketData = {
  americas: MarketItem[];
  emea: MarketItem[];
  asiaPacific: MarketItem[];
  lastUpdated?: string;
  lastSparklineUpdate?: string;
  isFromRedis?: boolean;
  dataSource?: string;
  [key: string]: MarketItem[] | string | boolean | undefined; // Type-safe index signature for dynamic access
};

export interface FilterState {
  showMovers: boolean;
  showVolatility: boolean;
  showRatios: boolean;
  showFutures: boolean;
  showAvat: boolean;
  show10D: boolean;
  showYTD: boolean;
  showCAD: boolean;
}

export type IndiaInstrumentType = "index" | "equity";

export type IndiaSymbol = {
  symbol: string;
  displayName: string;
  exchange: "NSE" | "BSE" | "INDEX";
  instrumentType: IndiaInstrumentType;
  sector?: string;
  benchmark?: string;
};

export type IndiaQuoteSnapshot = {
  symbol: string;
  displayName: string;
  exchange: "NSE" | "BSE" | "INDEX";
  instrumentType: IndiaInstrumentType;
  currency: string;
  price: number;
  change: number;
  changePercent: number;
  marketTime: string;
  previousClose: number;
  high?: number | null;
  low?: number | null;
  volume?: number | null;
};

export type IndiaHistoryPoint = {
  timestamp: string;
  close: number;
  open: number | null;
  high: number | null;
  low: number | null;
  volume: number | null;
};

export type IndiaMarketOverview = {
  universe: IndiaSymbol[];
  benchmarks: IndiaQuoteSnapshot[];
  leaders: IndiaQuoteSnapshot[];
  chart: {
    symbol: string;
    range: string;
    points: IndiaHistoryPoint[];
  };
  updatedAt: string;
  source: "yahoo-finance";
};

export type IndiaFinancialSummary = {
  symbol: string;
  currency: string;
  marketCap: number | null;
  trailingPE: number | null;
  forwardPE: number | null;
  priceToBook: number | null;
  returnOnEquity: number | null;
  returnOnAssets: number | null;
  debtToEquity: number | null;
  currentRatio: number | null;
  revenueGrowth: number | null;
  earningsGrowth: number | null;
  operatingMargins: number | null;
  profitMargins: number | null;
};

export type IndiaFinancialStatementLine = {
  label: string;
  values: Array<{
    asOfDate: string;
    value: number | null;
  }>;
};

export type IndiaFinancialStatements = {
  symbol: string;
  displayName: string;
  supported: boolean;
  source: "yahoo-finance";
  summary: IndiaFinancialSummary | null;
  incomeStatement: IndiaFinancialStatementLine[];
  balanceSheet: IndiaFinancialStatementLine[];
  cashFlow: IndiaFinancialStatementLine[];
  updatedAt: string;
};
