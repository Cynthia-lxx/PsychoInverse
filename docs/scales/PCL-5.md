# PCL-5 · PTSD 检查清单（DSM-5 版）

> 调研文档，供后续落地为 `pcl5.data.js`。字段映射见 `_TEMPLATE.md`。

---

## 1. 基本信息

| 项 | 值 |
| --- | --- |
| 缩写 / `id` 建议 | `pcl5` |
| 中文全称 | 创伤后应激障碍检查清单（DSM-5 版） |
| 英文全称 | PTSD Checklist for DSM-5 (PCL-5) |
| 编制者 / 年份 | Weathers FW, Litz BT, Keane TM 等（美国国家 PTSD 中心），2013 |
| 题数 | **20** |
| 作答格式 | 5 级 Likert（0–4：完全没有 → 极度） |
| 评定时间范围 | **过去一个月** |
| 适用人群 | 成年人；用于症状变化监测、PTSD 筛查、 provisional 诊断 |
| 施测时长 | 5–10 分钟 |
| 维度 | 总分 + **DSM-5 四簇**（B 侵入 / C 回避 / D 认知与心境负性改变 / E 警觉性改变） |

`blurb` 建议：「选择目标总分（或各簇分），反推出一份 20 题作答；PTSD 症状严重程度资料参考。」

---

## 2. 作答格式

```js
const PCL5_FMT = makeLikert(5, ['完全没有', '有一点', '中度', '相当程度', '极度']);
const PCL5_FMTS = Array(20).fill('likert');
```

- 5 级计分 **0 / 1 / 2 / 3 / 4**，对应原版：Not at all / A little bit / Moderately / Quite a bit / Extremely。
- **无反向题**（全部正向），`reverse` 不需要。
- 总分 **0–80**。

---

## 3. 题项原文与簇归属

引导语：「在过去的一个月里，你在多大程度上被以下问题所困扰？」（*In the past month, how much were you bothered by:*）

| 题号 | 中文 | 英文 | 簇 |
| --- | --- | --- | --- |
| 1 | 反复出现关于压力事件的、令人不安且不想要的记忆 | Repeated, disturbing, and unwanted memories of the stressful experience | **B** 侵入 |
| 2 | 反复做与压力事件有关的、令人不安的梦 | Repeated, disturbing dreams of the stressful experience | **B** |
| 3 | 突然感觉或表现得好像压力事件又真实发生（如仿佛重回现场，或出现闪回） | Suddenly feeling or acting as if the stressful experience were actually happening again | **B** |
| 4 | 当某件事让你想起压力事件时，感到非常难过 | Feeling very upset when something reminded you of the stressful experience | **B** |
| 5 | 当某件事让你想起压力事件时，出现强烈的生理反应（如心跳加速、呼吸困难、出汗） | Strong physical reactions when something reminded you of the stressful experience | **B** |
| 6 | 回避与压力事件有关的记忆、想法或感受 | Avoiding memories, thoughts, or feelings related to the stressful experience | **C** 回避 |
| 7 | 回避与压力事件有关的外部提醒（人、地点、谈话、活动、物品或情境） | Avoiding external reminders of the stressful experience | **C** |
| 8 | 难以记住压力事件的重要部分 | Trouble remembering important parts of the stressful experience | **D** 认知/心境 |
| 9 | 对自己、他人或世界持有强烈的负性信念（如「我很坏」「没人可信」「世界完全危险」） | Having strong negative beliefs about yourself, other people, or the world | **D** |
| 10 | 因压力事件或其后果而责怪自己或他人 | Blaming yourself or someone else for the stressful experience or what happened after it | **D** |
| 11 | 有强烈的负性情绪，如害怕、恐惧、愤怒、内疚或羞耻 | Having strong negative feelings such as fear, horror, anger, guilt, or shame | **D** |
| 12 | 对过去喜欢的活动失去兴趣 | Loss of interest in activities that you used to enjoy | **D** |
| 13 | 感觉与他人疏远或隔绝 | Feeling distant or cut off from other people | **D** |
| 14 | 难以体验积极情绪（如无法感到快乐，或对亲近的人没有爱的感觉） | Trouble experiencing positive feelings | **D** |
| 15 | 易激惹、发脾气或有攻击性行为 | Irritable behavior, angry outbursts, or acting aggressively | **E** 警觉性 |
| 16 | 过度冒险或做可能伤害自己的事 | Taking too many risks or doing things that could cause you harm | **E** |
| 17 | 过度警觉或戒备 | Being superwatchful or on guard | **E** |
| 18 | 容易受惊或惊跳 | Feeling jumpy or easily startled | **E** |
| 19 | 难以集中注意力 | Having difficulty concentrating | **E** |
| 20 | 难以入睡或保持睡眠 | Trouble falling or staying asleep | **E** |

---

## 4. 因子 / 维度结构（→ `bind`）

```js
scales: [
  { name: '总分',   fullName: 'PCL-5 总分', family: 'ptsd', bind: [1..20],    bandMetric: 'sum' },
  { name: 'B 侵入', fullName: '簇 B：侵入症状', family: 'ptsd_b', bind: [1,2,3,4,5],       bandMetric: 'sum' },
  { name: 'C 回避', fullName: '簇 C：回避症状', family: 'ptsd_c', bind: [6,7],             bandMetric: 'sum' },
  { name: 'D 认知心境', fullName: '簇 D：认知与心境负性改变', family: 'ptsd_d', bind: [8..14], bandMetric: 'sum' },
  { name: 'E 警觉性', fullName: '簇 E：警觉性与反应性改变', family: 'ptsd_e', bind: [15..20], bandMetric: 'sum' },
]
```

- 簇 B 范围 0–20、簇 C 0–8、簇 D 0–28、簇 E 0–24。
- **参考**：HADS 与 SCL-90 都用 `bind:[0]` + `type:'sum'` 表示总分聚合项（`likertTargetScales` 会过滤聚合项，`likert.js:270-302`）。PCL-5 的「总分」与「簇分」在题目上**完全重叠**（20 题被四个簇瓜分），与 HADS 的「焦虑 + 抑郁 = 总分」结构一致——**若要让界面只把四簇作为目标、总分自动汇总，建议用 `bind:[0]` 聚合项模式**。

---

## 5. 计分算法

- 20 题直接求和 → **总分 0–80**。
- 另有 **DSM-5 症状簇符合判定法**：每题 ≥2（「中度」及以上）视为该症状存在；要求 B 簇 ≥1 项、C 簇 ≥1 项、D 簇 ≥2 项、E 簇 ≥2 项。
- `scoreShift: 0`，无反向、无加权。

---

## 6. 分界值与分级（→ `bands`）

| 总分 | 判读 | 来源 |
| --- | --- | --- |
| 0–30 | 未达筛查阈值 | 由 cutoff 反推 |
| **31–80** | **提示 PTSD（provisional）** | 常用 cutoff **31–33**；VA 与国家 PTSD 中心给出 31–33 的暂定区间 |

- **⚠️ cutoff 口径**：PCL-5 的暂定分界值通常写作 **31–33**（不同样本/用途略有差异，33 亦常见）。落地时须**明确选定一个值**并在界面注明。
- 一至二级来源建议以 VA National Center for PTSD 官方页面为准（见「来源出处」）。
- 官方强调：PCL-5 **不能单独作为诊断依据**，金标准是结构化临床访谈（如 CAPS-5）。

```js
// 若采用 33 为界
bands: [
  { min: 0,  max: 32, minInc: true, maxInc: true, severity: '未达筛查阈值' },
  { min: 33, max: 80, minInc: true, maxInc: true, severity: '达筛查阈值（提示 PTSD）' },
]
```

---

## 7. 信效度

- PCL-5 内部一致性良好（Cronbach's α 通常 > 0.90）；重测信度良好；与 CAPS-5 等结构化访谈相关良好。
- **具体数值待原文复核**（建议以 VA 官方页面的心理测量学说明与 Weathers 等 2013 原始文献为准）。

---

## 8. 中国常模

- 中文版 PCL-5 有多项研究，但**本次调研未取得可引用的中国常模分界值**。
- **落地建议**：首期沿用原版 31–33，并在 `note` 注明「暂无本土常模分界值」。

---

## 9. 来源出处

- **一级**：Weathers FW, Litz BT, Keane TM, Palmieri PA, Marx BP, Schnurr PP. *The PTSD Checklist for DSM-5 (PCL-5)*. 美国国家 PTSD 中心（National Center for PTSD），2013。
- **一级**：VA National Center for PTSD 官方页面 <https://www.ptsd.va.gov/professional/assessment/adult-sr/ptsd-checklist.asp>（20 题、用途、计分、provisional 诊断说明）
- **二级**：ISTSS 临床资源页（20 题、与 CAPS-5 的关系）
- **三级**：theracharts 等量表汇总页（结构核对）

---

## 10. 版权状态与免责声明

- **版权方**：美国国家 PTSD 中心（VA National Center for PTSD）/ Weathers 等作者。
- **状态**：PCL-5 由美国政府机构（VA）发布，**供临床与研究免费使用**，官方页面公开提供量表与计分说明。

> **版权与免责声明**：本量表题目文本与常模受原版权方保护（版权方见上）。本文档收录仅作**学习与研究之用**，不得用于商业分发；请确认你所在司法辖区的适用规则。本工具输出的是**满足指定剖面的合成答卷**，不是心理测量结果，**不可用于临床评估、诊断或任何实际人事 / 司法决策**，也不得用于伪造测验结果。

---

## 11. 落地备注（对 PsychoInverse 的建议）

1. **可直接套 `likert.js` 解析解**（`binary:false`，5 级 Likert），无反向题、无加权。
2. **多因子重叠**：四簇与总分共享全部 20 题（`likert.js:139-174` 的解析解在「贡献分空间」分配，涉及重叠 bind 时需要确认 `likertSetItemLevel` 的同因子守恒重平衡是否支持**跨因子**约束）。⚠️ **这是需要在落地前验证的技术点**——HADS（焦虑/抑郁/总分）已有类似的「子量表 + 总分」结构，可参考其实现。
3. **第 9 题含自伤/负性信念内容**，`note` 建议加风险提示（与 PHQ-9 第 9 题做法一致）。
4. **cutoff 需二选一**（31 或 33）并在界面注明。
5. `severity` 为二分阈值性质；若想做严重程度分级（轻度/中度/重度），**需另找来源**，原版 PCL-5 未提供五档 severity 分级。
