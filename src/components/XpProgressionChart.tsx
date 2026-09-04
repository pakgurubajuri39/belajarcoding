import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  BarChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from 'recharts';
import {
  TrendingUp,
  Zap,
  Flame,
  Award,
  Target,
  Calendar,
  Sparkles,
  ArrowUpRight,
  BarChart3,
  Activity,
  CheckCircle2
} from 'lucide-react';
import { StudentProgress, UserSession } from '../types';
import { getEffectiveXpHistory, getRankFromXp } from '../utils/storage';

interface XpProgressionChartProps {
  progress: StudentProgress;
  session: UserSession;
  onSelectLevel?: (levelId: number) => void;
}

type TimeframeFilter = '7d' | '14d' | 'all';
type ViewMode = 'composed' | 'area' | 'bar';

export const XpProgressionChart: React.FC<XpProgressionChartProps> = ({
  progress,
  session,
  onSelectLevel
}) => {
  const [timeframe, setTimeframe] = useState<TimeframeFilter>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('composed');

  // Load raw and normalized chronological XP history
  const rawHistory = useMemo(() => {
    return getEffectiveXpHistory(progress);
  }, [progress]);

  // Filter based on selected timeframe
  const filteredData = useMemo(() => {
    if (timeframe === '7d') {
      return rawHistory.slice(-7);
    }
    if (timeframe === '14d') {
      return rawHistory.slice(-14);
    }
    return rawHistory;
  }, [rawHistory, timeframe]);

  // Rank information
  const rankInfo = useMemo(() => {
    return getRankFromXp(progress.xp);
  }, [progress.xp]);

  // Key stats calculated from data
  const stats = useMemo(() => {
    const totalCurrentXp = progress.xp;
    const peakGain = rawHistory.reduce((max, item) => Math.max(max, item.xpGain), 0);
    const nonZeroItems = rawHistory.filter(item => item.xpGain > 0);
    const avgGain = nonZeroItems.length > 0
      ? Math.round(nonZeroItems.reduce((sum, item) => sum + item.xpGain, 0) / nonZeroItems.length)
      : (totalCurrentXp > 0 ? Math.round(totalCurrentXp / Math.max(1, progress.completedLevelIds.length)) : 150);
    
    const xpNeededForNextRank = Math.max(0, rankInfo.nextLevelXp - totalCurrentXp);

    return {
      totalCurrentXp,
      peakGain,
      avgGain,
      xpNeededForNextRank
    };
  }, [progress.xp, progress.completedLevelIds.length, rawHistory, rankInfo.nextLevelXp]);

  // Custom Recharts Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-slate-950/95 backdrop-blur-md border border-slate-700/80 p-3.5 rounded-2xl shadow-xl text-xs space-y-1.5 min-w-[200px] z-50">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span className="font-bold text-slate-200 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              {dataPoint.label}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {new Date(dataPoint.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
            </span>
          </div>

          <div className="space-y-1 pt-0.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                Total Akumulasi XP:
              </span>
              <span className="font-black text-amber-400 font-mono text-sm">
                {dataPoint.cumulativeXp?.toLocaleString()} XP
              </span>
            </div>

            {typeof dataPoint.xpGain === 'number' && (
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-indigo-400" />
                  Tambahan Sesi Ini:
                </span>
                <span className="font-bold text-emerald-400 font-mono">
                  +{dataPoint.xpGain?.toLocaleString()} XP
                </span>
              </div>
            )}
          </div>

          {dataPoint.activityTitle && (
            <div className="pt-1.5 border-t border-slate-800/80 text-[11px] text-slate-300 italic flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400 flex-shrink-0" />
              <span className="truncate">{dataPoint.activityTitle}</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6" id="section-xp-trend-chart">
      
      {/* Header Banner with Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Tren Perolehan XP Siswa
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-amber-400/10 border border-amber-400/20 text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Akselerasi Belajar
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Visualisasi dinamika perolehan skor XP dari waktu ke waktu dan pencapaian target pangkat
              </p>
            </div>
          </div>
        </div>

        {/* View Mode and Timeframe Selectors */}
        <div className="flex flex-wrap items-center gap-2.5 self-stretch sm:self-auto justify-between sm:justify-end">
          
          {/* Chart View Mode Switcher */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setViewMode('composed')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'composed'
                  ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Grafik Gabungan: Kurva Akumulasi & Batang Harian"
            >
              Gabungan
            </button>
            <button
              onClick={() => setViewMode('area')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'area'
                  ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Grafik Area Akumulasi XP"
            >
              Kurva Total
            </button>
            <button
              onClick={() => setViewMode('bar')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'bar'
                  ? 'bg-white dark:bg-slate-900 text-slate-950 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
              title="Grafik Batang Tambahan per Sesi"
            >
              Per Sesi
            </button>
          </div>

          {/* Timeframe Filter Buttons */}
          <div className="flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setTimeframe('7d')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timeframe === '7d'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              7 Hari
            </button>
            <button
              onClick={() => setTimeframe('14d')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timeframe === '14d'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              14 Hari
            </button>
            <button
              onClick={() => setTimeframe('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                timeframe === 'all'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Semua
            </button>
          </div>

        </div>
      </div>

      {/* Motivational KPI Highlight Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        
        {/* Total XP & Rank */}
        <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-lg flex-shrink-0 shadow-sm">
            {rankInfo.icon}
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold text-amber-600 dark:text-amber-400 truncate">Total XP Saat Ini</div>
            <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              {stats.totalCurrentXp.toLocaleString()} <span className="text-xs font-bold text-amber-500">XP</span>
            </div>
          </div>
        </div>

        {/* Next Rank Distance */}
        <div className="p-4 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/30 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Target className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 truncate">Target Pangkat Baru</div>
            <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white truncate">
              {stats.xpNeededForNextRank > 0 ? `${stats.xpNeededForNextRank} XP Lagi` : 'Pangkat Maksimal!'}
            </div>
          </div>
        </div>

        {/* Peak Session Gain */}
        <div className="p-4 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/30 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Flame className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 truncate">Hari Terproduktif</div>
            <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              +{stats.peakGain.toLocaleString()} <span className="text-xs font-bold text-emerald-500">XP</span>
            </div>
          </div>
        </div>

        {/* Average Gain per Session */}
        <div className="p-4 rounded-2xl bg-cyan-500/10 dark:bg-cyan-500/15 border border-cyan-500/30 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
            <Activity className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 truncate">Rata-Rata per Sesi</div>
            <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
              +{stats.avgGain.toLocaleString()} <span className="text-xs font-bold text-cyan-500">XP</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Recharts Progression Canvas */}
      <div className="relative pt-2">
        
        {/* Legend & Target Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs mb-3 px-1">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-amber-400 border-2 border-white dark:border-slate-900 shadow-sm" />
              <span className="font-bold text-slate-700 dark:text-slate-300">Total Akumulasi XP</span>
            </div>
            {(viewMode === 'composed' || viewMode === 'bar') && (
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-indigo-500 shadow-sm" />
                <span className="font-bold text-slate-700 dark:text-slate-300">Tambahan XP per Hari/Sesi</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Target Level {rankInfo.level + 1} ({rankInfo.nextLevelXp} XP)</span>
          </div>
        </div>

        {/* Chart Container */}
        <div className="h-72 sm:h-80 w-full rounded-2xl bg-slate-50/70 dark:bg-slate-800/30 p-2 sm:p-4 border border-slate-100 dark:border-slate-800/60">
          <ResponsiveContainer width="100%" height="100%">
            {viewMode === 'composed' ? (
              <ComposedChart data={filteredData} margin={{ top: 15, right: 20, left: 0, bottom: 10 }}>
                <defs>
                  <linearGradient id="xpAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="xpBarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity={0.4} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.15} vertical={false} />
                <XAxis
                  dataKey="label"
                  stroke="#94a3b8"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: '#cbd5e1', opacity: 0.3 }}
                />
                <YAxis
                  stroke="#94a3b8"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(val) => `${val}`}
                />
                <Tooltip content={<CustomTooltip />} />

                {/* Target Next Rank Line */}
                {rankInfo.nextLevelXp > 0 && (
                  <ReferenceLine
                    y={rankInfo.nextLevelXp}
                    stroke="#10b981"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    label={{
                      value: `Target: ${rankInfo.nextLevelXp} XP`,
                      fill: '#10b981',
                      fontSize: 10,
                      position: 'top',
                      fontWeight: 700
                    }}
                  />
                )}

                {/* Bar for Session Gains */}
                <Bar
                  dataKey="xpGain"
                  fill="url(#xpBarGradient)"
                  radius={[6, 6, 0, 0]}
                  barSize={18}
                  name="Tambahan Sesi"
                />

                {/* Area for Cumulative XP */}
                <Area
                  type="monotone"
                  dataKey="cumulativeXp"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  fill="url(#xpAreaGradient)"
                  name="Total XP"
                  dot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 6, fill: '#f59e0b', strokeWidth: 3, stroke: '#fff' }}
                />
              </ComposedChart>
            ) : viewMode === 'area' ? (
              <AreaChart data={filteredData} margin={{ top: 15, right: 20, left: 0, bottom: 10 }}>
                <defs>
                  <linearGradient id="pureAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.15} vertical={false} />
                <XAxis
                  dataKey="label"
                  stroke="#94a3b8"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: '#cbd5e1', opacity: 0.3 }}
                />
                <YAxis
                  stroke="#94a3b8"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />

                {rankInfo.nextLevelXp > 0 && (
                  <ReferenceLine
                    y={rankInfo.nextLevelXp}
                    stroke="#10b981"
                    strokeDasharray="4 4"
                    strokeWidth={1.5}
                    label={{
                      value: `Target: ${rankInfo.nextLevelXp} XP`,
                      fill: '#10b981',
                      fontSize: 10,
                      position: 'top',
                      fontWeight: 700
                    }}
                  />
                )}

                <Area
                  type="monotone"
                  dataKey="cumulativeXp"
                  stroke="#f59e0b"
                  strokeWidth={3.5}
                  fill="url(#pureAreaGradient)"
                  dot={{ r: 4, fill: '#f59e0b', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 7, fill: '#f59e0b', strokeWidth: 3, stroke: '#fff' }}
                />
              </AreaChart>
            ) : (
              <BarChart data={filteredData} margin={{ top: 15, right: 20, left: 0, bottom: 10 }}>
                <defs>
                  <linearGradient id="pureBarGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={1} />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.15} vertical={false} />
                <XAxis
                  dataKey="label"
                  stroke="#94a3b8"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={{ stroke: '#cbd5e1', opacity: 0.3 }}
                />
                <YAxis
                  stroke="#94a3b8"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="xpGain"
                  fill="url(#pureBarGradient)"
                  radius={[8, 8, 0, 0]}
                  barSize={24}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

      </div>

      {/* Motivational Footer Callout & Next Action */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-400/10 via-indigo-500/10 to-amber-400/5 border border-amber-400/30 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black flex-shrink-0 shadow-sm">
            🚀
          </div>
          <div className="text-xs">
            <div className="font-bold text-slate-900 dark:text-white">
              Momentum Belajar: Sedang Membara! 🔥
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              {stats.xpNeededForNextRank > 0 ? (
                <>
                  Dapatkan <strong className="text-amber-500">+{stats.xpNeededForNextRank} XP</strong> lagi untuk naik pangkat menjadi <strong>"{rankInfo.title}"</strong>.
                </>
              ) : (
                'Selamat! Kamu telah mencapai pangkat kehormatan tertinggi Sobat Koding Grandmaster!'
              )}
            </p>
          </div>
        </div>

        {onSelectLevel && (
          <button
            onClick={() => onSelectLevel(1)}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer whitespace-nowrap"
            id="btn-chart-continue-learning"
          >
            <span>Lanjut Kumpulkan XP</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

    </div>
  );
};
