# PHQ-9 · 抑郁症筛查量表（Patient Health Questionnaire-9）

> **状态：已实现**（`phq9.data.js`）。本文档侧重**核对现有实现与标准版的差异 + 补全国内常模**，而非从零撰写。
> 现有实现事实均带行号引用，取自 `c:\Users\wjz-s\Downloads\MMPI-2-Solver\phq9.data.js`。

---

## 1. 基本信息

| 项 | 现有实现（实测） | 标准版 | 差异 |
| --- | --- | --- | --- |
| `id` | `phq9`（:9） | — | 一致 |
| `name` | `PHQ-9 抑郁症筛查量表`（:10） | — | 一致 |
| `blurb` | 选择目标总分，反推出一份 9 题作答；或直接导入、编辑并评分。（:11） | — | 一致 |
| `targetLabel` / `targetTableTitle` | `目标得分` / `得分达成`（:12-13） | — | 一致 |
| `scoreShift` | `0`（:14） | 0 | 一致 |
| `nItems` | `9`（:15） | 9 | 一致 |

- 编制者：Spitzer RL, Kroenke K, Williams JBW（1999，PRIME-MD 衍生）
- 作答格式：4 级（过去两周内症状出现频度）
- 施测时长：2–5 分钟
- 维度：单维（总分）

---

## 2. 作答格式

现有实现：`makeLikert(4, ['完全不会', '好几天', '一半以上的天数', '几乎每天'])`（`:5`），`items.format` 全为 `'likert'`（`:6`）。

- 对应原版选项：Not at all（0）／Several days（1）／More than half the days（2）／Nearly every day（3）。
- **差异**：无（选项文本为通行中译，与原版对应）。

---

## 3. 题项原文与差异

**无反向题**（全部正向求和），与标准版一致。`reverse` 不需要。

| 题号 | 现有中文（实测 :17-27） | 通行中文标准版 | 现有英文（实测 :28-38） | 英文原版 | 差异 |
| --- | --- | --- | --- | --- | --- |
| 1 | 做事时提不起劲或没有兴趣 | 同 | Little interest or pleasure in doing things | 同 | — |
| 2 | 感到心情低落、沮丧或绝望 | 同 | Feeling down, depressed, or hopeless | 同 | — |
| 3 | 入睡困难、睡不安稳或睡眠过多 | 同 | Trouble falling or staying asleep, or sleeping too much | 同 | — |
| 4 | 感觉疲倦或没有活力 | 同 | Feeling tired or having little energy | 同 | — |
| 5 | 食欲不振或吃太多 | 同 | Poor appetite or overeating | 同 | — |
| 6 | 对自己感到失望，或觉得自己很失败，或让自己/家人失望 | 觉得自己很糟 － 或觉得自己是个失败者，或让自己或家人失望 | Feeling bad about yourself — or that you are a failure or have let yourself or your family down | 同 | **中文措辞变体**（语义等价） |
| 7 | 注意力难以集中，例如看电视或看报纸时 | 对事物专注有困难，例如阅读报纸或看电视时 | Trouble concentrating on things, such as reading the newspaper or watching television | 同 | **中文措辞变体**（语义等价） |
| 8 | 行动或说话明显变慢，或坐立不安、比平时动得更厉害 | 动作或说话速度缓慢到别人已经觉察？或正好相反，烦躁坐立不安、动来动去的情况更胜于平常 | Moving or speaking so slowly that other people could have noticed — or being so fidgety or restless that you have been moving around a lot more than usual | …so slowly that other people could have noticed? **Or the opposite** — being so fidgety… | **英文缺 `Or the opposite`**（删节版） |
| 9 | 有不如死掉或用某种方式伤害自己的念头 | 同 | Thoughts that you would be better off dead, or of hurting yourself | …or of hurting yourself **in some way** | **英文缺 `in some way`**（删节版） |

> 结论：差异均为**措辞层面**，不影响计分与 `bind`。若要追求与授权中文版逐字一致，可替换 6、7 题中文与补回 8、9 题英文。

---

## 4. 因子 / 维度结构

现有实现（`:43-56`）：**单个因子** `name:'总分'`、`fullName:'PHQ-9 总分'`、`family:'dep'`、`bind:[1..9]`、`bandMetric:'sum'`。

- **差异**：HADS 与 SCL-90 都有 `bind:[0]` 的总分聚合项（`likertTargetScales` 会过滤聚合项，`likert.js:270-302`），PHQ-9 只有单一因子所以无聚合项——**结构可接受**，但跨量表一致性上可考虑是否补。
- PHQ-9 为单维量表，无需拆分因子。

---

## 5. 计分算法

- 每题级别 0/1/2/3 → 计 0/1/2/3 分；总分 = 9 题之和，范围 **0–27**。
- 现有 `scoreShift: 0`，与标准版一致（原始分即为总分，无需偏移）。对比 SCL-90 为 `scoreShift: 1`（1–5 级）。

---

## 6. 分界值与分级（→ `bands`）

现有实现（实测 `:49-55`）：

| 区间 | 现有 severity | 标准版分级 |
| --- | --- | --- |
| 0–4 | 无/极轻微 | 无抑郁（minimal） |
| 5–9 | 轻度 | 轻度（mild） |
| 10–14 | 中度 | 中度（moderate） |
| 15–19 | **偏重** | 中重度（moderately severe） |
| 20–27 | 重度 | 重度（severe） |

- **差异**：仅 `15–19` 的 severity 名称用了「偏重」而非通行译名「**中重度**」。区间边界与原版完全一致。
- 区间连续、无空隙与重叠 ✓。

### 国内研究补充（非原版，供 `note` 或扩展参考）

- 国内研究普遍沿用 **≥10 分作为筛查阳性**（与原版一致），并在综合医院/基层医疗人群中验证。
- 具体灵敏度 / 特异度数值**待原始文献复核**（见「来源出处」）。

---

## 7. 信效度

- 原版（一级）：PHQ-9 Cronbach's α 约 0.89；重测信度良好；与临床诊断一致性高。
- 中文版（二级）：Wang W 等 *Reliability and validity of the Chinese version of the PHQ-9 in the general population*（J Affect Disord, 2014）报告良好内部一致性与重测信度——**具体数值待原文复核**。
- 中文版在基层医疗人群的验证：*Validation of the nine-item Patient Health Questionnaire to screen for major depression in a Chinese primary care population*（Asia-Pacific Psychiatry）——**数值待原文复核**。

---

## 8. 中国常模

- **现有实现未包含任何中国常模字段**（无 `presetMeans` / `positiveCutoff` 之类，实测确认）。
- 现有 `bands` 直接沿用**原版（美国）分级**，未做本土化调整。
- 国内研究提出的分界值多为 **≥10**（与原版一致），亦有针对特定人群（心血管门诊、住院患者）的验证研究。
- **落地建议**：若要在界面体现「国内常模」，需新增字段并在 `bands` 之外单独呈现，避免覆盖原版分级。

---

## 9. 来源出处

- **一级**：Kroenke K, Spitzer RL, Williams JBW. *The PHQ-9: validity of a brief depression severity measure.* J Gen Intern Med. 2001;16(9):606–613.
- **一级**：Spitzer RL, Kroenke K, Williams JBW, Löwe B. *A brief measure for assessing generalized anxiety disorder: the GAD-7.* Arch Intern Med. 2006;166(10):1092–1097.（GAD-7）
- **二级**：Wang W, Bian Q, Zhao Y, et al. *Reliability and validity of the Chinese version of the Patient Health Questionnaire (PHQ-9) in the general population.* J Affect Disord. 2014.
- **二级**：*Validation of the nine-item Patient Health Questionnaire to screen for major depression in a Chinese primary care population.* Asia Pac Psychiatry.
- **三级**：PHQ-9 / GAD-7 官方原题（PRIME-MD / PFizer 授权页面，已撤下；现多见于文献附录与 GitHub 量表仓库）。

---

## 10. 版权状态与免责声明

- **版权方**：PHQ-9 由 Spitzer / Kroenke / Williams 编制，原由 Pfizer 分发（现多视为公共可获取），**不同版本授权状态不一**；中文译本来源多样。
- **状态**：题目文本可收集；商业分发前需复核具体版本授权。

> **版权与免责声明**：本量表题目文本与常模受原版权方保护（版权方见上）。本文档收录仅作**学习与研究之用**，不得用于商业分发；请确认你所在司法辖区的适用规则。本工具输出的是**满足指定剖面的合成答卷**，不是心理测量结果，**不可用于临床评估、诊断或任何实际人事 / 司法决策**，也不得用于伪造测验结果。

---

## 11. 落地备注（对 PsychoInverse 的建议）

1. 现有实现**可直接沿用**，无需重构；`reverse` 不需要（全正向）。
2. **可选优化项（均不影响计分）**：
   - 补回第 8、9 题英文的 `Or the opposite` / `in some way`；
   - 第 6、7 题中文改用通行译本措辞；
   - `15–19` 的 severity 由「偏重」改为通行译名「中重度」。
3. **第 9 题（自杀念头）** 已有 `note` 风险提示（`:58`）——与模板建议一致，保留。
4. 若要支持「按国内常模显示」，需为数据契约**新增常模字段**（当前契约无此字段，属跨量表通用能力，非 PHQ-9 独有）。
5. 现有结构中**无 `bind:[0]` 聚合项**；因只有单一因子，不影响使用，但如需与 HADS/SCL-90 结构统一可补。
