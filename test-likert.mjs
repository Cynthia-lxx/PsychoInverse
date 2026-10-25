import {
  likertScore, likertSolve, likertFeasibleBounds, likertSetItemLevel, likertTargetScales, likertParseAnswers, likertExportCsv,
} from './likert.js';
import { PHQ9_DATA } from './phq9.data.js';
import { GAD7_DATA } from './gad7.data.js';
import { HADS_DATA } from './hads.data.js';
import { WHO5_DATA } from './who5.data.js';
import { SDS_DATA } from './sds.data.js';
import { SAS_DATA } from './sas.data.js';
import { HCL32_DATA } from './hcl32.data.js';
import { HCL33_DATA } from './hcl33.data.js';
import { CTQSF_DATA, ctqsfTargetScales } from './ctqsf.js';
import { PCL5_DATA } from './pcl5.data.js';

let pass = 0, fail = 0;
function ok(cond, msg, extra = '') {
  if (cond) { pass += 1; }
  else { fail += 1; console.log(`FAIL  ${msg}  ${extra}`); }
}
const approx = (a, b, e = 1e-6) => Math.abs(a - b) <= e;

for (const [name, data] of [['PHQ-9', PHQ9_DATA], ['GAD-7', GAD7_DATA], ['HADS', HADS_DATA], ['WHO-5', WHO5_DATA]]) {
  // 求解一个典型目标，再正向计分应还原
  const ts = {};
  for (const s of likertTargetScales(data)) ts[s.name] = s.presets[1].value; // 取中段预设
  const r = likertSolve(data, ts);
  ok(r.answers.length === data.nItems, `${name} 求解长度正确`);
  const sc = likertScore(data, r.answers);
  for (const s of likertTargetScales(data)) {
    const got = sc.factors[s.name] ? (s.metric === 'sum' ? sc.factors[s.name].raw : sc.factors[s.name].mean)
      : (s.name === '总分' && s.bandMetric === 'sum' ? sc.total : sc.totalMean);
    const want = ts[s.name];
    ok(approx(got, want, 0.05), `${name} ${s.name} 达成≈目标`, `got=${got} want=${want}`);
  }
  // 全最低档 -> 正向题贡献 0；反向题（如 HADS 偶数抑郁题）贡献最大
  const zero = new Array(data.nItems).fill(0);
  const sz = likertScore(data, zero);
  const revCount = (data.reverse || []).length;
  const expectZero = revCount === 0 ? 0 : revCount * (data.formats.likert.levels.length - 1);
  ok(sz.total === expectZero, `${name} 全最低档总分正确`, `got=${sz.total} expect=${expectZero}`);
}

// HADS 反向计分：把第 2 题（反向）设到最高级别，抑郁子分应下降
{
  const r = likertSolve(HADS_DATA, { 抑郁: 10 });
  const before = likertScore(HADS_DATA, r.answers).factors['抑郁'].raw;
  // 第 2 题现在处于某级别，把它推到最高级（label 最大），贡献分应最小
  const lvl = 3;
  const next = likertSetItemLevel(HADS_DATA, r.answers, { 抑郁: 10 }, 2, lvl);
  const after = likertScore(HADS_DATA, next).factors['抑郁'].raw;
  ok(after <= before, 'HADS 反向题设最高级 -> 抑郁子分不升反降', `before=${before} after=${after}`);
}

// 可行区间 + 同因子守恒：PHQ-9 抑郁(总分)目标 20
{
  const r = likertSolve(PHQ9_DATA, { 总分: 20 });
  const b = likertFeasibleBounds(PHQ9_DATA, { 总分: 20 });
  ok(b.every((x) => x.lo >= 0 && x.hi <= 3), 'PHQ-9 目标 20 每题可行区间在 0..3');
  const next = likertSetItemLevel(PHQ9_DATA, r.answers, { 总分: 20 }, 1, 0);
  ok(likertScore(PHQ9_DATA, next).total === 20, '改一题后 PHQ-9 总分守恒', `${likertScore(PHQ9_DATA, next).total}`);
}

// 反向题的可行区间不得出现 lo > hi（否则 GUI 白框会画到反方向、答案落在框外）
{
  for (const [name, data, targets] of [
    ['HADS', HADS_DATA, { 焦虑: 20, 抑郁: 4 }],
    ['HADS', HADS_DATA, { 焦虑: 13, 抑郁: 13 }],
    ['HADS', HADS_DATA, { 焦虑: 21, 抑郁: 0 }],
  ]) {
    const r = likertSolve(data, targets);
    const b = likertFeasibleBounds(data, targets);
    let bad = 0;
    let out = 0;
    for (let i = 1; i <= data.nItems; i += 1) {
      if (b[i].lo > b[i].hi) bad += 1;
      const a = r.answers[i - 1];
      if (a < b[i].lo || a > b[i].hi) out += 1;
    }
    ok(bad === 0, `${name} 反向题区间 lo<=hi`, `bad=${bad}`);
    ok(out === 0, `${name} 自动答案落在可行区间内`, `out=${out}`);
  }
}

// 解析 / 导出
{
  const csv = likertExportCsv(PHQ9_DATA, new Array(9).fill(2));
  ok(csv.startsWith('题号,得分,程度'), 'PHQ-9 导出有表头');
  const parsed = likertParseAnswers(PHQ9_DATA, '111111111');
  ok(parsed.found === 9, 'PHQ-9 紧凑串解析 9 题');
}

/* ===== 第一档新增量表：SDS / SAS / HCL-32 / HCL-33 =====
   这 4 个是「单因子 + 总分」结构，可直接用通用循环之外的显式目标验证。 */
for (const [name, data, target] of [
  ['SDS', SDS_DATA, 50],
  ['SAS', SAS_DATA, 45],
  ['HCL-32', HCL32_DATA, 14],
  ['HCL-33', HCL33_DATA, 20],
]) {
  const r = likertSolve(data, { 总分: target });
  ok(r.answers.length === data.nItems, `${name} 求解长度正确`);
  const got = likertScore(data, r.answers).total;
  ok(approx(got, target, 0.05), `${name} 总分达成≈目标`, `got=${got} want=${target}`);

  // 全最低档：正向题贡献 = shift，反向题贡献 = maxLevel + shift
  const zero = new Array(data.nItems).fill(0);
  const sz = likertScore(data, zero);
  const revCount = (data.reverse || []).length;
  const maxL = data.formats.likert.levels.length - 1;
  const shift = data.scoreShift || 0;
  const expect = (data.nItems - revCount) * shift + revCount * (maxL + shift);
  ok(sz.total === expect, `${name} 全最低档总分正确`, `got=${sz.total} expect=${expect}`);

  // 可行区间不得出现 lo > hi，且答案落在区间内
  const b = likertFeasibleBounds(data, { 总分: target });
  let bad = 0; let out = 0;
  for (let i = 1; i <= data.nItems; i += 1) {
    if (b[i].lo > b[i].hi) bad += 1;
    const a = r.answers[i - 1];
    if (a < b[i].lo || a > b[i].hi) out += 1;
  }
  ok(bad === 0, `${name} 区间 lo<=hi`, `bad=${bad}`);
  ok(out === 0, `${name} 答案落在可行区间内`, `out=${out}`);
}

// SDS / SAS 的粗分全量程（20–80）可达 —— scoreShift:1 把每题贡献抬到 1–4 的结果
for (const [name, data] of [['SDS', SDS_DATA], ['SAS', SAS_DATA]]) {
  for (const t of [20, 50, 80]) {
    const r = likertSolve(data, { 总分: t });
    const got = likertScore(data, r.answers).total;
    ok(approx(got, t, 0.05), `${name} 粗分 ${t} 可达`, `got=${got}`);
  }
  ok(data.scoreShift === 1, `${name} scoreShift 为 1（每题 1–4 分）`);
}

// HCL-32 / HCL-33 为二值、单因子，cutoff 与题数一致
ok(HCL32_DATA.nItems === 32 && HCL32_DATA.scales.length === 1, 'HCL-32 32 题单因子');
ok(HCL33_DATA.nItems === 33 && HCL33_DATA.scales.length === 1, 'HCL-33 33 题单因子');
ok(HCL32_DATA.scales[0].bands[1].min === 14, 'HCL-32 cutoff 14');
ok(HCL33_DATA.scales[0].bands[1].min === 20, 'HCL-33 cutoff 20（成人）');

/* ===== CTQ-SF：scoreShift:1 + 7 道反向题 + MD 不作目标 ===== */
{
  const targets = {};
  for (const s of ctqsfTargetScales()) targets[s.name] = 13;
  const r = likertSolve(CTQSF_DATA, targets);
  const sc = likertScore(CTQSF_DATA, r.answers);
  for (const s of ctqsfTargetScales()) {
    ok(approx(sc.factors[s.name].raw, 13, 0.05), `CTQ-SF ${s.name} 达成`, `got=${sc.factors[s.name].raw}`);
  }
  ok(ctqsfTargetScales().length === 5, 'CTQ-SF 可设目标为 5 个临床分量表', `${ctqsfTargetScales().length}`);
  ok(ctqsfTargetScales().every((s) => s.family !== 'md'), 'CTQ-SF MD 不作为可设目标');
  ok(likertTargetScales(CTQSF_DATA).some((s) => s.family === 'md'), 'CTQ-SF MD 仍在 scales 内（可被计分展示）');

  // scoreShift:1 —— 全最低档时无反向题的分量表 = 题数 × 1
  const zero = new Array(CTQSF_DATA.nItems).fill(0);
  const sz = likertScore(CTQSF_DATA, zero);
  ok(sz.factors['情感虐待'].raw === 5, 'CTQ-SF 情感虐待全最低档 = 5', `${sz.factors['情感虐待'].raw}`);
  ok(sz.factors['情感忽视'].raw === 25, 'CTQ-SF 情感忽视（全反向题）全最低档 = 25', `${sz.factors['情感忽视'].raw}`);
  ok((CTQSF_DATA.reverse || []).length === 7, 'CTQ-SF 反向题 7 道');
}

/* ===== PCL-5：四簇可设目标 + 总分 bind:[0] 聚合 ===== */
{
  const targets = { 'B 侵入': 8, 'C 回避': 3, 'D 认知心境': 10, 'E 警觉性': 9 };
  const r = likertSolve(PCL5_DATA, targets);
  const sc = likertScore(PCL5_DATA, r.answers);
  for (const [k, v] of Object.entries(targets)) {
    ok(approx(sc.factors[k].raw, v, 0.05), `PCL-5 ${k} 达成`, `got=${sc.factors[k].raw}`);
  }
  ok(approx(sc.total, 30, 0.05), 'PCL-5 总分 = 四簇之和（30）', `got=${sc.total}`);
  ok(!likertTargetScales(PCL5_DATA).some((s) => s.name === '总分'), 'PCL-5 总分聚合项不出现在可设目标');
  ok(likertTargetScales(PCL5_DATA).length === 4, 'PCL-5 可设目标为 4 个簇', `${likertTargetScales(PCL5_DATA).length}`);
  ok(PCL5_DATA.scales.some((s) => s.bind.length === 1 && s.bind[0] === 0 && s.type === 'sum'),
    'PCL-5 总分是 bind:[0] + type:sum 聚合项');
}

console.log(fail === 0 ? `ALL OK (${pass} checks)` : `${fail} FAILURES, ${pass} passed`);
process.exit(fail === 0 ? 0 : 1);
