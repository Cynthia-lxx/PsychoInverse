# MDQ · 心境障碍问卷（Mood Disorder Questionnaire）

> 调研文档，供后续落地为 `mdq.data.js`。字段映射见 `_TEMPLATE.md`。
> **⚠️ 本量表含「条件性判定」，是当前数据契约表达不了的**——详见第 12 节。

---

## 1. 基本信息

| 项 | 值 |
| --- | --- |
| 缩写 / `id` 建议 | `mdq` |
| 中文全称 | 心境障碍问卷 |
| 英文全称 | Mood Disorder Questionnaire (MDQ) |
| 编制者 / 年份 | Robert M. A. Hirschfeld 等，2000 |
| 中文版 | 杨海晨 等，2009 翻译并发表（**已获 Hirschfeld 教授授权**） |
| 题数 | **13 症状题 + 2 附加题**（共三部分） |
| 作答格式 | 症状题：**二值**（是 / 否）；聚集题：二值；严重程度题：**4 级** |
| 评定范围 | **终生**（是否曾有过） |
| 适用人群 | 小学以上文化，自评；适用于双相 I 型与 II 型，**更适用于双相 I 型** |
| 施测时长 | 3–5 分钟 |

`blurb` 建议：「选择目标症状数，反推出一份 13 题作答；注意 MDQ 阳性需同时满足三项条件（见说明）。」

---

## 2. 作答格式

```js
const MDQ_YN   = makeLikert(2, ['否', '是']);          // 第 1–14 题
const MDQ_SEV  = makeChoice(['没有问题', '轻微问题', '中度问题', '严重问题']); // 第 15 题
// items.format: 前 14 项为 'yn'，第 15 项为 'sev'
```

- 第 1–13 题（症状）：「是」记 1 分，「否」记 0 分 → **症状分 0–13**。
- 第 14 题（同时发生）：是 / 否，**不计入症状分**。
- 第 15 题（功能损害程度）：没有问题 / 轻微问题 / 中度问题 / 严重问题，**不计入症状分**。

---

## 3. 题项原文

### 第 1 部分（13 题症状，正向求和，无反向题）

英文为 MDQ 原题措辞；中文为通行中文版（杨海晨等译本口径）。

| 题号 | 中文 | 英文 |
| --- | --- | --- |
| 1 | 曾有一段时间，您感到异常高兴或亢奋，别人认为您与平时不一样，或您因这种亢奋而惹上麻烦？ | …felt so good or hyper that other people thought you were not your normal self or were so hyper you got into trouble? |
| 2 | 曾有一段时间，您变得易激惹，对人高声喊叫，或与人争吵、打架？ | …so irritable that you shouted at people or started fights or arguments? |
| 3 | 曾有一段时间，您比平时自信得多？ | …much more self-confident than usual? |
| 4 | 曾有一段时间，您睡眠比平时少很多，而且并不觉得需要更多睡眠？ | …much less sleep than usual and found you didn't really miss it? |
| 5 | 曾有一段时间，您比平时话多或说话快得多？ | …much more talkative or spoke much faster than usual? |
| 6 | 曾有一段时间，思绪如潮/思绪奔逸，无法让脑子慢下来？ | …thoughts racing through your head or couldn't slow your mind down? |
| 7 | 曾有一段时间，您极易被周围事物分心，以至于难以集中精力或坚持做事？ | …so easily distracted by things around you that you had trouble concentrating or staying on track? |
| 8 | 曾有一段时间，您的精力比平时旺盛得多？ | …much more energy than usual? |
| 9 | 曾有一段时间，您比平时活跃得多或做了更多的事情？ | …much more active or did many more things than usual? |
| 10 | 曾有一段时间，您比平时更爱社交或外向（例如半夜给朋友打电话）？ | …much more social or outgoing than usual, for example, called friends in the middle of the night? |
| 11 | 曾有一段时间，您对性的兴趣比平时强烈得多？ | …much more interested in sex than usual? |
| 12 | 曾有一段时间，您做了一些对自己来说不寻常的事，或别人可能认为过分、愚蠢或冒险的事？ | …did things that were unusual for you or that other people might have thought were excessive, foolish, or risky? |
| 13 | 曾有一段时间，您花钱太多，给自己或家人带来麻烦？ | …spending money got you or your family into trouble? |

> 每题实际题干前有统一引导语「Has there ever been a period of time when you were not your usual self and…」（中文：「曾有一段时间，您不是平时的您，并且……」）。落地时建议把引导语放 `blurb`，题项只放从句部分。

### 第 2 部分（聚集题，第 14 题）

- 中文：上述这些症状中，是否有**两个或两个以上**在同一时间段内同时出现过？（是 / 否）
- 英文：Have several of these symptoms occurred during the same period of time?

### 第 3 部分（功能损害，第 15 题）

- 中文：这些症状给您造成了多大程度的问题？——**没有问题 / 轻微问题 / 中度问题 / 严重问题**
- 英文：How much of a problem did any of these symptoms cause you? — No problem / Minor problem / Moderate problem / Serious problem

---

## 4. 因子 / 维度结构

MDQ 为单维（13 症状题总和）。第 14、15 题**不是**症状维度，是判定条件。

```js
scales: [{ name: '症状数', fullName: 'MDQ 症状条目数', family: 'mania',
           bind: [1..13], bandMetric: 'sum' }]   // 只含 1–13
```

---

## 5. 计分算法

- **症状分** = 第 1–13 题答「是」的题数，范围 **0–13**。
- 第 14、15 题**不计分**，仅作为阳性的**必要条件**。
- `scoreShift: 0`，无反向题、无加权。

---

## 6. 分界值与判定（→ `bands` + 条件规则）

### 6.1 症状分分级（原版口径）

| 症状分 | 判读 |
| --- | --- |
| 0–6 | 未达症状数阈值 |
| 7–13 | 达症状数阈值（≥7） |

### 6.2 ⚠️ 阳性判定 = **三个条件同时满足**（原研究者标准）

1. 第 1 部分 13 题中存在 **≥ 7 条**答「是」；**且**
2. 第 2 部分答「**是**」（即有几个症状在同一时间段内同时存在）；**且**
3. 第 3 部分严重程度达「**中度问题**」或「**严重问题**」。

三条**全部满足**才算 MDQ 筛查阳性。仅满足第 1 条（≥7）**不足以**判阳性。

> 这是本量表与项目现有 `bind + bands` 契约冲突的核心点——见第 12 节。

---

## 7. 信效度

- 原版（一级）：MDQ 内部一致性良好（Cronbach's α 约 0.9）；对双相障碍有较好筛查性能；**对双相 II 型/轻躁狂的灵敏度偏低**（这是公认局限）。
- 中文版（二级）：**国内版本目前只有双相 I 型障碍患者的信度和效度数据**（《沈渔邨精神病学》）。
- 国内多中心研究：*Evaluation of Mood Disorder Questionnaire (MDQ) in Patients with Mood Disorders: A Multicenter Trial across China*（PLOS ONE）——**具体数值待原文复核**。

---

## 8. 中国常模 / 中文版

- 中文版由**杨海晨等于 2009 年翻译并发表，已获 Hirschfeld 教授授权**（《沈渔邨精神病学》记载）。
- 分界值沿原版 **≥7 + 同时发生 + 中度以上**。
- **国内仅有双相 I 型的信效度数据**，双相 II 型数据不足。

---

## 9. 来源出处

- **一级**：Hirschfeld RMA, Williams JBW, Spitzer RL, et al. *Development and validation of a screening instrument for bipolar spectrum disorder: the Mood Disorder Questionnaire.* Am J Psychiatry. 2000;157(11):1873–1875.
- **二级**：《沈渔邨精神病学》（人民卫生出版社）——MDQ 三部分结构、中文版授权与适用范围、判定标准
- **二级**：中华医学健康科普知识库「心境障碍问卷」条目——三部分结构与判定标准
- **二级**：*Evaluation of Mood Disorder Questionnaire (MDQ) in Patients with Mood Disorders: A Multicenter Trial across China.* PLOS ONE.
- **三级**：psychology.me 量表条目页（13 + 2 结构描述）

---

## 10. 版权状态与免责声明

- **版权方**：Robert M. A. Hirschfeld 等（2000）。MDQ 原为筛查用途公开发表，**部分发行版本受版权/授权管理**；中文版已获原作者授权。
- **状态**：题目文本可收集；**商业分发前需确认授权**（中文版已有授权，可引用该授权链条）。

> **版权与免责声明**：本量表题目文本与常模受原版权方保护（版权方见上）。本文档收录仅作**学习与研究之用**，不得用于商业分发；请确认你所在司法辖区的适用规则。本工具输出的是**满足指定剖面的合成答卷**，不是心理测量结果，**不可用于临床评估、诊断或任何实际人事 / 司法决策**，也不得用于伪造测验结果。

---

## 11. 特殊结构与风险标注

MDQ 的「第 14 / 15 题」是**判定条件而非症状**：

| 题号 | 性质 | 是否计入 `bind` |
| --- | --- | --- |
| 1–13 | 症状（求和） | ✅ `bind: [1..13]` |
| 14 | 同时发生（是/否） | ❌ 判定条件 |
| 15 | 功能损害程度（4 级） | ❌ 判定条件 |

---

## 12. 落地备注（对 PsychoInverse 的建议）——**本量表的关键风险**

1. **⚠️ 当前契约（`bind + bands`）无法表达「三个条件同时满足」这一阳性规则。**
   - `bands` 只能表达「分数落在区间 → severity」，无法表达「且第 14 题为是、且第 15 题 ≥ 中度」。
   - **可选方案**：
     - **方案 A（改动最小，推荐首期）**：只把 1–13 题做成可求解的求和因子（`bands` 用 0–6 / 7–13），第 14、15 题做成**不可求解的附加字段**（界面可勾选，影响最终「是否阳性」提示但不参与反算）。即：反算只保证症状分达标，阳性提示另算。
     - **方案 B（通用能力）**：给数据契约新增一个**条件判定表达式**（如 `positiveRule: { minScore: 7, requireAll: [{item:14, in:[1]}, {item:15, in:[2,3]}] }`），让界面统一呈现。这需要改 `likert.js` / `gui.js`，属跨量表通用能力（同样适用于未来其他带条件判定的量表）。
2. **第 15 题是 `makeChoice` 而非 Likert**——需要 `formats.js:54 makeChoice(labels)`，现有已实现量表（PHQ-9/GAD-7/HADS 等）**尚未用过 choice 格式**，落地时需验证 `likert.js` 对混合格式（`items.format` 混用 yn/sev）的处理能力。这是一个**需要提前验证的技术点**。
3. 症状题走 `likert.js` 解析解（`binary:false` + `makeLikert(2, ['否','是'])`）。
4. `note` 应写明：① 阳性需三条件同时满足；② MDQ 对**双相 II 型灵敏度偏低**；③ 国内仅有双相 I 型信效度数据。
