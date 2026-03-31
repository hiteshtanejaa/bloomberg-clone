"use client";

import type { bloombergColors } from "@/components/bloomberg/lib/theme-config";
import type { IndiaHistoryPoint } from "@/components/bloomberg/types";
import {
  CandlestickSeries,
  ColorType,
  CrosshairMode,
  type IChartApi,
  type ISeriesApi,
  LineSeries,
  type Time,
  createChart,
} from "lightweight-charts";
import { useEffect, useRef } from "react";

type IndiaTradingChartProps = {
  data: IndiaHistoryPoint[];
  mode: "line" | "candle";
  colors: typeof bloombergColors.dark;
};

export function IndiaTradingChart({ data, mode, colors }: IndiaTradingChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<"Line" | "Candlestick"> | null>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const chart = createChart(containerRef.current, {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: colors.surface },
        textColor: colors.textSecondary,
      },
      grid: {
        vertLines: { color: colors.border },
        horzLines: { color: colors.border },
      },
      crosshair: {
        mode: CrosshairMode.MagnetOHLC,
        vertLine: { color: colors.textSecondary, labelBackgroundColor: colors.accent },
        horzLine: { color: colors.textSecondary, labelBackgroundColor: colors.accent },
      },
      rightPriceScale: {
        borderColor: colors.border,
      },
      timeScale: {
        borderColor: colors.border,
        timeVisible: true,
        secondsVisible: false,
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: true,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
    });

    chartRef.current = chart;

    const resizeObserver = new ResizeObserver(() => {
      chart.timeScale().fitContent();
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      seriesRef.current = null;
      chartRef.current?.remove();
      chartRef.current = null;
    };
  }, [colors.accent, colors.border, colors.surface, colors.textSecondary]);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) {
      return;
    }

    if (seriesRef.current) {
      chart.removeSeries(seriesRef.current);
      seriesRef.current = null;
    }

    if (mode === "candle") {
      const series = chart.addSeries(CandlestickSeries, {
        upColor: colors.positive,
        downColor: colors.negative,
        wickUpColor: colors.positive,
        wickDownColor: colors.negative,
        borderVisible: false,
        priceFormat: {
          type: "price",
          precision: 2,
          minMove: 0.01,
        },
      });

      series.setData(
        data.map((point) => ({
          time: toChartTime(point.timestamp),
          open: point.open ?? point.close,
          high: point.high ?? point.close,
          low: point.low ?? point.close,
          close: point.close,
        }))
      );
      seriesRef.current = series as ISeriesApi<"Candlestick">;
    } else {
      const series = chart.addSeries(LineSeries, {
        color: colors.accent,
        lineWidth: 2,
        lastPriceAnimation: 1,
        priceLineColor: colors.accent,
      });

      series.setData(
        data.map((point) => ({
          time: toChartTime(point.timestamp),
          value: point.close,
        }))
      );
      seriesRef.current = series as ISeriesApi<"Line">;
    }

    chart.timeScale().fitContent();
  }, [data, mode, colors.accent, colors.negative, colors.positive]);

  return (
    <div
      ref={containerRef}
      className="h-full w-full rounded-sm border"
      style={{ borderColor: colors.border }}
    />
  );
}

function toChartTime(timestamp: string): Time {
  return timestamp.slice(0, 10);
}
