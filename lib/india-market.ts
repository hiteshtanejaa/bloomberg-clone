type IndiaInstrumentType = "index" | "equity";

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

const NIFTY_50_EQUITIES: IndiaSymbol[] = [
  {
    symbol: "ADANIENT.NS",
    displayName: "Adani Enterprises Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Metals & Mining",
    benchmark: "^NSEI",
  },
  {
    symbol: "ADANIPORTS.NS",
    displayName: "Adani Ports and Special Economic Zone Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Services",
    benchmark: "^NSEI",
  },
  {
    symbol: "APOLLOHOSP.NS",
    displayName: "Apollo Hospitals Enterprise Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Healthcare",
    benchmark: "^NSEI",
  },
  {
    symbol: "ASIANPAINT.NS",
    displayName: "Asian Paints Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Consumer Durables",
    benchmark: "^NSEI",
  },
  {
    symbol: "AXISBANK.NS",
    displayName: "Axis Bank Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Financial Services",
    benchmark: "^NSEI",
  },
  {
    symbol: "BAJAJ-AUTO.NS",
    displayName: "Bajaj Auto Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Automobile and Auto Components",
    benchmark: "^NSEI",
  },
  {
    symbol: "BAJFINANCE.NS",
    displayName: "Bajaj Finance Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Financial Services",
    benchmark: "^NSEI",
  },
  {
    symbol: "BAJAJFINSV.NS",
    displayName: "Bajaj Finserv Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Financial Services",
    benchmark: "^NSEI",
  },
  {
    symbol: "BEL.NS",
    displayName: "Bharat Electronics Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Capital Goods",
    benchmark: "^NSEI",
  },
  {
    symbol: "BHARTIARTL.NS",
    displayName: "Bharti Airtel Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Telecommunication",
    benchmark: "^NSEI",
  },
  {
    symbol: "CIPLA.NS",
    displayName: "Cipla Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Healthcare",
    benchmark: "^NSEI",
  },
  {
    symbol: "COALINDIA.NS",
    displayName: "Coal India Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Oil Gas & Consumable Fuels",
    benchmark: "^NSEI",
  },
  {
    symbol: "DRREDDY.NS",
    displayName: "Dr. Reddy's Laboratories Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Healthcare",
    benchmark: "^NSEI",
  },
  {
    symbol: "EICHERMOT.NS",
    displayName: "Eicher Motors Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Automobile and Auto Components",
    benchmark: "^NSEI",
  },
  {
    symbol: "ETERNAL.NS",
    displayName: "Eternal Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Consumer Services",
    benchmark: "^NSEI",
  },
  {
    symbol: "GRASIM.NS",
    displayName: "Grasim Industries Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Construction Materials",
    benchmark: "^NSEI",
  },
  {
    symbol: "HCLTECH.NS",
    displayName: "HCL Technologies Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Information Technology",
    benchmark: "^NSEI",
  },
  {
    symbol: "HDFCBANK.NS",
    displayName: "HDFC Bank Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Financial Services",
    benchmark: "^NSEI",
  },
  {
    symbol: "HDFCLIFE.NS",
    displayName: "HDFC Life Insurance Company Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Financial Services",
    benchmark: "^NSEI",
  },
  {
    symbol: "HINDALCO.NS",
    displayName: "Hindalco Industries Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Metals & Mining",
    benchmark: "^NSEI",
  },
  {
    symbol: "HINDUNILVR.NS",
    displayName: "Hindustan Unilever Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Fast Moving Consumer Goods",
    benchmark: "^NSEI",
  },
  {
    symbol: "ICICIBANK.NS",
    displayName: "ICICI Bank Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Financial Services",
    benchmark: "^NSEI",
  },
  {
    symbol: "ITC.NS",
    displayName: "ITC Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Fast Moving Consumer Goods",
    benchmark: "^NSEI",
  },
  {
    symbol: "INFY.NS",
    displayName: "Infosys Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Information Technology",
    benchmark: "^NSEI",
  },
  {
    symbol: "INDIGO.NS",
    displayName: "InterGlobe Aviation Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Services",
    benchmark: "^NSEI",
  },
  {
    symbol: "JSWSTEEL.NS",
    displayName: "JSW Steel Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Metals & Mining",
    benchmark: "^NSEI",
  },
  {
    symbol: "JIOFIN.NS",
    displayName: "Jio Financial Services Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Financial Services",
    benchmark: "^NSEI",
  },
  {
    symbol: "KOTAKBANK.NS",
    displayName: "Kotak Mahindra Bank Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Financial Services",
    benchmark: "^NSEI",
  },
  {
    symbol: "LT.NS",
    displayName: "Larsen & Toubro Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Construction",
    benchmark: "^NSEI",
  },
  {
    symbol: "M&M.NS",
    displayName: "Mahindra & Mahindra Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Automobile and Auto Components",
    benchmark: "^NSEI",
  },
  {
    symbol: "MARUTI.NS",
    displayName: "Maruti Suzuki India Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Automobile and Auto Components",
    benchmark: "^NSEI",
  },
  {
    symbol: "MAXHEALTH.NS",
    displayName: "Max Healthcare Institute Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Healthcare",
    benchmark: "^NSEI",
  },
  {
    symbol: "NTPC.NS",
    displayName: "NTPC Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Power",
    benchmark: "^NSEI",
  },
  {
    symbol: "NESTLEIND.NS",
    displayName: "Nestle India Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Fast Moving Consumer Goods",
    benchmark: "^NSEI",
  },
  {
    symbol: "ONGC.NS",
    displayName: "Oil & Natural Gas Corporation Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Oil Gas & Consumable Fuels",
    benchmark: "^NSEI",
  },
  {
    symbol: "POWERGRID.NS",
    displayName: "Power Grid Corporation of India Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Power",
    benchmark: "^NSEI",
  },
  {
    symbol: "RELIANCE.NS",
    displayName: "Reliance Industries Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Oil Gas & Consumable Fuels",
    benchmark: "^NSEI",
  },
  {
    symbol: "SBILIFE.NS",
    displayName: "SBI Life Insurance Company Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Financial Services",
    benchmark: "^NSEI",
  },
  {
    symbol: "SHRIRAMFIN.NS",
    displayName: "Shriram Finance Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Financial Services",
    benchmark: "^NSEI",
  },
  {
    symbol: "SBIN.NS",
    displayName: "State Bank of India",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Financial Services",
    benchmark: "^NSEI",
  },
  {
    symbol: "SUNPHARMA.NS",
    displayName: "Sun Pharmaceutical Industries Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Healthcare",
    benchmark: "^NSEI",
  },
  {
    symbol: "TCS.NS",
    displayName: "Tata Consultancy Services Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Information Technology",
    benchmark: "^NSEI",
  },
  {
    symbol: "TATACONSUM.NS",
    displayName: "Tata Consumer Products Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Fast Moving Consumer Goods",
    benchmark: "^NSEI",
  },
  {
    symbol: "TMPV.NS",
    displayName: "Tata Motors Passenger Vehicles Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Automobile and Auto Components",
    benchmark: "^NSEI",
  },
  {
    symbol: "TATASTEEL.NS",
    displayName: "Tata Steel Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Metals & Mining",
    benchmark: "^NSEI",
  },
  {
    symbol: "TECHM.NS",
    displayName: "Tech Mahindra Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Information Technology",
    benchmark: "^NSEI",
  },
  {
    symbol: "TITAN.NS",
    displayName: "Titan Company Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Consumer Durables",
    benchmark: "^NSEI",
  },
  {
    symbol: "TRENT.NS",
    displayName: "Trent Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Consumer Services",
    benchmark: "^NSEI",
  },
  {
    symbol: "ULTRACEMCO.NS",
    displayName: "UltraTech Cement Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Construction Materials",
    benchmark: "^NSEI",
  },
  {
    symbol: "WIPRO.NS",
    displayName: "Wipro Ltd.",
    exchange: "NSE",
    instrumentType: "equity",
    sector: "Information Technology",
    benchmark: "^NSEI",
  },
];

const INDIA_UNIVERSE: IndiaSymbol[] = [
  { symbol: "^NSEI", displayName: "NIFTY 50", exchange: "INDEX", instrumentType: "index" },
  { symbol: "^BSESN", displayName: "SENSEX", exchange: "INDEX", instrumentType: "index" },
  ...NIFTY_50_EQUITIES,
];

const FINANCIALS_SUPPORTED = new Set(["RELIANCE.NS", "TCS.NS", "HDFCBANK.NS"]);

type YahooChartResponse = {
  chart?: {
    result?: Array<{
      meta?: {
        currency?: string;
        symbol?: string;
        exchangeName?: string;
        regularMarketPrice?: number;
        chartPreviousClose?: number;
        previousClose?: number;
      };
      timestamp?: number[];
      indicators?: {
        quote?: Array<{
          open?: Array<number | null>;
          high?: Array<number | null>;
          low?: Array<number | null>;
          close?: Array<number | null>;
          volume?: Array<number | null>;
        }>;
      };
    }>;
    error?: { description?: string };
  };
};

type YahooQuoteSummaryResponse = {
  quoteSummary?: {
    result?: Array<Record<string, unknown>>;
    error?: { description?: string };
  };
};

function getSymbolMeta(symbol: string) {
  return INDIA_UNIVERSE.find((item) => item.symbol === symbol);
}

async function fetchYahooChart(
  symbol: string,
  params: Record<string, string | number>
): Promise<YahooChartResponse> {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    search.set(key, String(value));
  }

  const response = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?${search.toString()}`,
    {
      cache: "no-store",
      headers: { "User-Agent": "Mozilla/5.0" },
    }
  );

  if (!response.ok) {
    throw new Error(`Yahoo Finance request failed for ${symbol}: ${response.status}`);
  }

  return response.json();
}

async function fetchYahooQuoteSummary(
  symbol: string,
  modules: string[]
): Promise<YahooQuoteSummaryResponse> {
  const search = new URLSearchParams({
    modules: modules.join(","),
  });

  const response = await fetch(
    `https://query1.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(symbol)}?${search.toString()}`,
    {
      cache: "no-store",
      headers: { "User-Agent": "Mozilla/5.0" },
    }
  );

  if (!response.ok) {
    throw new Error(`Yahoo Finance fundamentals request failed for ${symbol}: ${response.status}`);
  }

  return response.json();
}

function toHistoryPoints(payload: YahooChartResponse): IndiaHistoryPoint[] {
  const result = payload.chart?.result?.[0];
  const timestamps = result?.timestamp || [];
  const quote = result?.indicators?.quote?.[0];

  return timestamps.flatMap((timestamp, index) => {
    const close = quote?.close?.[index];
    if (typeof close !== "number") {
      return [];
    }

    return [
      {
        timestamp: new Date(timestamp * 1000).toISOString(),
        close,
        open: quote?.open?.[index] ?? null,
        high: quote?.high?.[index] ?? null,
        low: quote?.low?.[index] ?? null,
        volume: quote?.volume?.[index] ?? null,
      },
    ];
  });
}

function extractRawNumber(value: unknown): number | null {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "object" && value !== null && "raw" in value) {
    const raw = (value as { raw?: unknown }).raw;
    return typeof raw === "number" ? raw : null;
  }

  return null;
}

function extractStatement(
  rows: unknown[],
  fields: Array<{ key: string; label: string }>
): IndiaFinancialStatementLine[] {
  return fields.map(({ key, label }) => ({
    label,
    values: rows.map((row) => ({
      asOfDate:
        (typeof row === "object" &&
          row !== null &&
          "endDate" in row &&
          typeof (row as { endDate?: { fmt?: string } }).endDate?.fmt === "string" &&
          (row as { endDate: { fmt: string } }).endDate.fmt) ||
        "N/A",
      value:
        typeof row === "object" && row !== null && key in row
          ? extractRawNumber((row as Record<string, unknown>)[key])
          : null,
    })),
  }));
}

export async function fetchIndiaQuoteSnapshot(symbol: string): Promise<IndiaQuoteSnapshot> {
  const payload = await fetchYahooChart(symbol, {
    interval: "1d",
    range: "5d",
    includePrePost: "false",
    events: "div,splits",
  });

  const result = payload.chart?.result?.[0];
  if (!result) {
    throw new Error(payload.chart?.error?.description || `No Yahoo Finance data for ${symbol}`);
  }

  const meta = result.meta || {};
  const points = toHistoryPoints(payload);
  const latest = points.at(-1);
  const previous = points.length > 1 ? points.at(-2) : undefined;
  const symbolMeta = getSymbolMeta(symbol);

  if (!latest) {
    throw new Error(`No price points returned for ${symbol}`);
  }

  const previousClose =
    meta.previousClose ?? meta.chartPreviousClose ?? previous?.close ?? latest.close;
  const change = latest.close - previousClose;
  const changePercent = previousClose === 0 ? 0 : (change / previousClose) * 100;

  return {
    symbol,
    displayName: symbolMeta?.displayName || symbol,
    exchange: symbolMeta?.exchange || "INDEX",
    instrumentType: symbolMeta?.instrumentType || "equity",
    currency: meta.currency || "INR",
    price: latest.close,
    change,
    changePercent,
    marketTime: latest.timestamp,
    previousClose,
    high: latest.high ?? null,
    low: latest.low ?? null,
    volume: latest.volume ?? null,
  };
}

export async function fetchIndiaHistory(
  symbol: string,
  range = "1mo",
  interval = "1d"
): Promise<IndiaHistoryPoint[]> {
  const payload = await fetchYahooChart(symbol, {
    range,
    interval,
    includePrePost: "false",
    events: "div,splits",
  });

  return toHistoryPoints(payload);
}

export async function fetchIndiaFinancialStatements(
  symbol: string
): Promise<IndiaFinancialStatements> {
  const symbolMeta = getSymbolMeta(symbol);
  if (!FINANCIALS_SUPPORTED.has(symbol)) {
    return {
      symbol,
      displayName: symbolMeta?.displayName || symbol,
      supported: false,
      source: "yahoo-finance",
      summary: null,
      incomeStatement: [],
      balanceSheet: [],
      cashFlow: [],
      updatedAt: new Date().toISOString(),
    };
  }

  const payload = await fetchYahooQuoteSummary(symbol, [
    "price",
    "financialData",
    "defaultKeyStatistics",
    "incomeStatementHistory",
    "balanceSheetHistory",
    "cashflowStatementHistory",
  ]);

  const result = payload.quoteSummary?.result?.[0];
  if (!result) {
    throw new Error(
      payload.quoteSummary?.error?.description || `No fundamentals returned for ${symbol}`
    );
  }

  const price = (result.price || {}) as Record<string, unknown>;
  const financialData = (result.financialData || {}) as Record<string, unknown>;
  const defaultKeyStatistics = (result.defaultKeyStatistics || {}) as Record<string, unknown>;
  const incomeRows =
    (((result.incomeStatementHistory || {}) as { incomeStatementHistory?: unknown[] })
      .incomeStatementHistory as unknown[]) || [];
  const balanceRows =
    (((result.balanceSheetHistory || {}) as { balanceSheetStatements?: unknown[] })
      .balanceSheetStatements as unknown[]) || [];
  const cashRows =
    (((result.cashflowStatementHistory || {}) as { cashflowStatements?: unknown[] })
      .cashflowStatements as unknown[]) || [];

  return {
    symbol,
    displayName: symbolMeta?.displayName || symbol,
    supported: true,
    source: "yahoo-finance",
    summary: {
      symbol,
      currency:
        (typeof price.currency === "string" && price.currency) ||
        (typeof financialData.financialCurrency === "string" && financialData.financialCurrency) ||
        "INR",
      marketCap: extractRawNumber(price.marketCap),
      trailingPE: extractRawNumber(defaultKeyStatistics.trailingPE),
      forwardPE: extractRawNumber(defaultKeyStatistics.forwardPE),
      priceToBook: extractRawNumber(defaultKeyStatistics.priceToBook),
      returnOnEquity: extractRawNumber(financialData.returnOnEquity),
      returnOnAssets: extractRawNumber(financialData.returnOnAssets),
      debtToEquity: extractRawNumber(financialData.debtToEquity),
      currentRatio: extractRawNumber(financialData.currentRatio),
      revenueGrowth: extractRawNumber(financialData.revenueGrowth),
      earningsGrowth: extractRawNumber(financialData.earningsGrowth),
      operatingMargins: extractRawNumber(financialData.operatingMargins),
      profitMargins: extractRawNumber(financialData.profitMargins),
    },
    incomeStatement: extractStatement(incomeRows, [
      { key: "totalRevenue", label: "Revenue" },
      { key: "grossProfit", label: "Gross Profit" },
      { key: "operatingIncome", label: "Operating Income" },
      { key: "netIncome", label: "Net Income" },
    ]),
    balanceSheet: extractStatement(balanceRows, [
      { key: "totalAssets", label: "Total Assets" },
      { key: "totalLiab", label: "Total Liabilities" },
      { key: "cash", label: "Cash" },
      { key: "longTermDebt", label: "Long-Term Debt" },
      { key: "totalStockholderEquity", label: "Equity" },
    ]),
    cashFlow: extractStatement(cashRows, [
      { key: "totalCashFromOperatingActivities", label: "Operating Cash Flow" },
      { key: "capitalExpenditures", label: "Capital Expenditure" },
      { key: "freeCashFlow", label: "Free Cash Flow" },
      { key: "changeInCash", label: "Change in Cash" },
    ]),
    updatedAt: new Date().toISOString(),
  };
}

export async function fetchIndiaMarketOverview(): Promise<IndiaMarketOverview> {
  const benchmarkSymbols = INDIA_UNIVERSE.filter((item) => item.instrumentType === "index").map(
    (item) => item.symbol
  );

  const leaderSymbols = [
    "RELIANCE.NS",
    "HDFCBANK.NS",
    "TCS.NS",
    "INFY.NS",
    "ICICIBANK.NS",
    "BHARTIARTL.NS",
  ];

  const [benchmarks, leaders, chartPoints] = await Promise.all([
    Promise.all(benchmarkSymbols.map((symbol) => fetchIndiaQuoteSnapshot(symbol))),
    Promise.all(leaderSymbols.map((symbol) => fetchIndiaQuoteSnapshot(symbol))),
    fetchIndiaHistory("^NSEI", "1mo", "1d"),
  ]);

  return {
    universe: INDIA_UNIVERSE,
    benchmarks,
    leaders,
    chart: {
      symbol: "^NSEI",
      range: "1mo",
      points: chartPoints,
    },
    updatedAt: new Date().toISOString(),
    source: "yahoo-finance",
  };
}

export function getIndiaUniverse() {
  return INDIA_UNIVERSE;
}
