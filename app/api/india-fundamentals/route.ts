import { fetchIndiaFinancialStatements } from "@/lib/india-market";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get("symbol");

  if (!symbol) {
    return NextResponse.json({ error: "symbol is required" }, { status: 400 });
  }

  try {
    const fundamentals = await fetchIndiaFinancialStatements(symbol);
    return NextResponse.json(fundamentals);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Failed to fetch India fundamentals",
        details: String(error),
      },
      { status: 500 }
    );
  }
}
