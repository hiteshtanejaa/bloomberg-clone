import {
  fetchIndiaHistory,
  fetchIndiaMarketOverview,
  fetchIndiaQuoteSnapshot,
} from "@/lib/india-market";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get("symbol");
  const range = request.nextUrl.searchParams.get("range") || "1mo";
  const interval = request.nextUrl.searchParams.get("interval") || "1d";
  const mode = request.nextUrl.searchParams.get("mode");

  try {
    if (symbol) {
      if (mode === "quote") {
        const quote = await fetchIndiaQuoteSnapshot(symbol);
        return NextResponse.json(quote);
      }

      const points = await fetchIndiaHistory(symbol, range, interval);
      return NextResponse.json({
        symbol,
        range,
        interval,
        points,
        source: "yahoo-finance",
        updatedAt: new Date().toISOString(),
      });
    }

    const overview = await fetchIndiaMarketOverview();
    return NextResponse.json(overview);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch India market data",
        details: String(error),
      },
      { status: 500 }
    );
  }
}
