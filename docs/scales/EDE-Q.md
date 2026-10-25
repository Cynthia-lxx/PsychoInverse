# EDE-Q · 进食障碍检查问卷（自评版）

> 调研文档，供后续落地为 `edeq.data.js`。字段映射见 `_TEMPLATE.md`。
> **⚠️ 本量表含 6 道开放式频次题（非 Likert）**，且**第 8 题同时计入两个分量表**——详见第 11 节。
> **⛔ 题项原文待补**（28 题，受版权保护）——见第 3 节。

---

## 1. 基本信息

| 项 | 值 |
| --- | --- |
| 缩写 / `id` 建议 | `edeq` |
| 中文全称 | 进食障碍检查问卷（自评版） |
| 英文全称 | Eating Disorder Examination Questionnaire (EDE-Q) |
| 编制者 | Christopher G. Fairburn 与 Sarah Beglin（由访谈版 EDE 改编为自评问卷） |
| 常用版本 | **EDE-Q 6.0**（28 题） |
| 题数 | **28**（22 道 0–6 评等题 + 6 道开放式频次题） |
| 作答格式 | 主体为 **7 级**（0–6）；另有 6 题为**开放式频次/计数** |
| 评定时间范围 | 主体为**过去 28 天**；部分题涉及 3 个月 |
| 适用人群 | 青少年及成人；进食障碍症状评估与筛查 |
| 施测时长 | 10–15 分钟 |
| 维度 | **4 个分量表** + **总体分（Global）** |

`blurb` 建议：「选择各分量表目标分，反推 22 道评等题的作答；6 道频次题为开放式，不参与反算。」

---

## 2. 作答格式

```js
const EDEQ_FMT = makeLikert(7, ['0 天', '1–5 天', '6–12 天', '13–15 天', '16–22 天', '23–27 天', '每天']);
// 22 道评等题：0–6 分（部分题为严重度评等，选项标签不同）
// 6 道开放式频次题（13–18）：填写次数/天数，不参与分量表计分
```

- 22 道评等题按 **0–6** 计分（7 级）。
- **无反向题**。
- 频次题（第 13–18 题）为**开放式数字填写**，不计入四个分量表，但用于**判定发作频次**（如暴食次数）。

---

## 3. 题项原文（28 题）✅ 已补全

英文取自公开发布的 **EDE-Q 6.0** 题本（Smart Paediatrics 收录的完整问卷，与 CORC / InsideOut Institute 的 EDE-Q 6.0 PDF 一致）；中文为**自译待校对**（未取得权威中文版授权译本）。

**四个计分区块**：
- **1–12 题**：过去 28 天内的**天数频次**（0–6：No Days / 1–5 Days / 6–12 Days / 13–15 Days / 16–22 Days / 23–27 Days / Every Day）
- **13–18 题**：**开放式计数**（填次数/天数）
- **19–21 题**：附加行为（0–6 评等，19 为天数、20 为比例、21 为程度）
- **22–28 题**：重要性与严重度（0–6：Not At All → Completely）

| 题号 | 中文（自译待校对） | 英文（EDE-Q 6.0） | 分量表 |
| --- | --- | --- | --- |
| 1 | 你是否刻意限制进食量以影响体型或体重（无论是否成功）？ | Have you been deliberately trying to limit the amount of food you eat to influence your shape or weight (whether or not you have succeeded)? | Restraint |
| 2 | 你是否长时间（8 个清醒小时以上）不吃任何东西以影响体型或体重？ | Have you gone for long periods of time (8 waking hours or more) without eating anything at all in order to influence your shape or weight? | Restraint |
| 3 | 你是否试图把喜欢的食物从饮食中剔除，以影响体型或体重（无论是否成功）？ | Have you tried to exclude from your diet any foods that you like in order to influence your shape or weight (whether or not you have succeeded)? | Restraint |
| 4 | 你是否试图遵守明确的饮食规则（如热量限制）以影响体型或体重（无论是否成功）？ | Have you tried to follow definite rules regarding your eating (for example, a calorie limit) in order to influence your shape or weight (whether or not you have succeeded)? | Restraint |
| 5 | 你是否有明确的想让胃部空空的欲望，以影响体型或体重？ | Have you had a definite desire to have an empty stomach with the aim of influencing your shape or weight? | Restraint |
| 6 | 你是否有明确想让腹部完全平坦的欲望？ | Have you had a definite desire to have a totally flat stomach? | **Shape** |
| 7 | 对食物、进食或热量的思考是否让你难以专注于感兴趣的事（如工作、交谈、阅读）？ | Has thinking about food, eating or calories made it very difficult to concentrate on things you are interested in (for example, working, following a conversation, or reading)? | Eating Concern |
| 8 | 对体型或体重的思考是否让你难以专注于感兴趣的事？ | Has thinking about shape or weight made it very difficult to concentrate on things you are interested in (for example, working, following a conversation, or reading)? | **Shape + Weight（共享）** |
| 9 | 你是否有明确的害怕对进食失去控制？ | Have you had a definite fear of losing control over eating? | Eating Concern |
| 10 | 你是否有明确的害怕体重增加？ | Have you had a definite fear that you might gain weight? | **Shape** |
| 11 | 你是否觉得自己胖？ | Have you felt fat? | **Shape** |
| 12 | 你是否有强烈的减肥欲望？ | Have you had a strong desire to lose weight? | **Weight** |
| 13 | 过去 28 天里，你有多少次吃下他人会认为异常大量的食物（考虑当时的情境）？ | Over the past 28 days, how many times have you eaten what other people would regard as an unusually large amount of food (given the circumstances)? | 开放式（次数） |
| 14 | 在这些次数中，有多少次你在进食时感到对进食失去控制？ | On how many of these times did you have a sense of having lost control over your eating (at the time you were eating)? | 开放式（次数） |
| 15 | 过去 28 天里，这类过度进食（大量进食且当时失控）发生在多少**天**？ | Over the past 28 days, on how many DAYS have such episodes of overeating occurred (i.e. you have eaten an unusually large amount of food and have had a sense of loss of control at the time)? | 开放式（天数） |
| 16 | 过去 28 天里，你有多少次为控制体型或体重而**催吐**？ | Over the past 28 days, how many times have you made yourself sick (vomit) as a means of controlling your shape or weight? | 开放式（次数） |
| 17 | 过去 28 天里，你有多少次为控制体型或体重而服用**泻药**？ | Over the past 28 days, how many times have you taken laxatives as a means of controlling your shape or weight? | 开放式（次数） |
| 18 | 过去 28 天里，你有多少次以「被驱使」或「强迫」的方式**运动**来控制体重、体型或脂肪量，或消耗热量？ | Over the past 28 days, how many times have you exercised in a "driven" or "compulsive" way as a means of controlling your weight, shape or amount of fat, or to burn off calories? | 开放式（次数） |
| 19 | 过去 28 天里，有多少天你**偷偷进食**（furtively）？（不计暴食发作） | Over the past 28 days, on how many days have you eaten in secret (i.e., furtively)? Do not count episodes of binge eating. | Eating Concern |
| 20 | 在你进食的次数中，有多大比例因进食对体型或体重的影响而感到**内疚**？（不计暴食） | On what proportion of the times that you have eaten have you felt guilty (felt that you've done wrong) because of its effect on your shape or weight? Do not count episodes of binge eating. | Eating Concern |
| 21 | 过去 28 天里，你对**别人看到你进食**有多在意？（不计暴食） | Over the past 28 days, how concerned have you been about other people seeing you eat? Do not count episodes of binge eating. | Eating Concern |
| 22 | 你的**体重**是否影响你对自己这个人的评价？ | Has your weight influenced how you think about (judge) yourself as a person? | **Weight** |
| 23 | 你的**体型**是否影响你对自己这个人的评价？ | Has your shape influenced how you think about (judge) yourself as a person? | **Shape** |
| 24 | 如果接下来四周被要求每周称一次体重（不多不少），你会有多难过？ | How much would it have upset you if you had been asked to weigh yourself once a week (no more, or less, often) for the next four weeks? | **Weight** |
| 25 | 你对自己的**体重**有多不满意？ | How dissatisfied have you been with your weight? | **Weight** |
| 26 | 你对自己的**体型**有多不满意？ | How dissatisfied have you been with your shape? | **Shape** |
| 27 | 看到自己的身体（如镜中、橱窗倒影、脱衣或洗澡时）你有多不舒服？ | How uncomfortable have you felt seeing your body (for example, seeing your shape in the mirror, in a shop window reflection, while undressing or taking a bath or shower)? | **Shape** |
| 28 | 别人看到你的体型/身形（如公共更衣室、游泳、穿紧身衣）你有多不舒服？ | How uncomfortable have you felt about others seeing your shape or figure (for example, in communal changing rooms, when swimming, or wearing tight clothes)? | **Shape** |

> **附加信息（非计分）**：当前体重、身高；女性近 3–4 个月是否停经及次数；是否服用避孕药。

### 分量表归属汇总（→ `bind`）

| 分量表 | 题号 | 说明 |
| --- | --- | --- |
| **Restraint** 进食克制 | 1, 2, 3, 4, 5 | 5 题 |
| **Eating Concern** 进食关注 | 7, 9, 19, 20, 21 | 5 题 |
| **Shape Concern** 体型关注 | 6, **8**, 10, 11, 23, 26, 27, 28 | 8 题 |
| **Weight Concern** 体重关注 | **8**, 12, 22, 24, 25 | 5 题 |
| 开放式频次题 | 13, 14, 15, 16, 17, 18 | **不计入任何分量表** |

> ⚠️ **第 8 题同时属于 Shape Concern 与 Weight Concern**（两个 `bind` 都要包含 8）。这是 EDE-Q 的已知特征。

---

## 4. 因子 / 维度结构（→ `bind`）

**四个分量表**（EDE-Q 6.0 标准题号归属）：

| 分量表 | 中文 | 题号 | 范围 |
| --- | --- | --- | --- |
| **Restraint** | 进食克制（限制） | 1, 2, 3, 4, 5 | 0–6（各题均值） |
| **Eating Concern** | 进食关注 | 7, 9, 19, 20, 21 | 0–6 |
| **Shape Concern** | 体型关注 | 6, 8, 10, 11, 23, 26, 27, 28 | 0–6 |
| **Weight Concern** | 体重关注 | 8, 12, 22, 24, 25 | 0–6 |

- **⚠️ 第 8 题同时属于 Shape Concern 与 Weight Concern**——这是 EDE-Q 的已知特征，落地时必须在两个 `bind` 中都包含第 8 题。
- **开放式频次题：第 13–18 题**，不属于任何分量表。
- **总体分 Global = 四个分量表得分的平均值**，范围 **0–6**。
- 分量表得分为**所属题目均分**（不是求和）——对应 `bandMetric: 'mean'`。

---

## 5. 计分算法

1. 22 道评等题按 0–6 计分。
2. 各分量表 = 所属题目的**平均值**（`bandMetric: 'mean'`）。
3. **Global score = 四个分量表的平均值**。
4. 频次题（13–18）单独统计（如过去 28 天内的客观暴食发作次数、导泻次数等）。
5. `scoreShift: 0`，无反向、无加权。

---

## 6. 分界值与分级（→ `bands`）

- **Global score 常用临界值**：文献中常用 **≥ 2.3**（亦有 2.8、4.0 等，视人群与目的而定）作为提示进食障碍的参考。
- 频次判定（DSM-5 相关）：如客观暴食发作 **≥ 4 次/28 天**等。
- ⚠️ **具体临界值口径差异较大，落地前须选定来源并注明**。**本次调研未取得可引用的统一中国常模分界值。**

**落地建议**：首期 `bands` 可先不做二分区间，改为**连续刻度展示**（0–6），把临界值放 `note`。

---

## 7. 信效度

- EDE-Q 四个分量表内部一致性多为良好至优秀（α 常 > 0.80）；与访谈版 EDE 有中等至良好相关。
- **具体数值待原文复核**（建议以 EDE-Q 6.0 官方说明与验证文献为准）。
- **局限**：自评版对「客观暴食」「导泻」等行为的判定精度**低于**访谈版 EDE。

---

## 8. 中国常模

- 中文版 EDE-Q 有多项研究（大学生、临床样本）；**本次调研未取得统一中国常模分界值**。
- **落地建议**：首期沿用原版，并在 `note` 注明「暂无本土常模」。

---

## 9. 来源出处

- **一级**：Fairburn CG, Beglin SJ. *Eating Disorder Examination Questionnaire (EDE-Q 6.0).* 见：Fairburn CG. *Cognitive Behavior Therapy and Eating Disorders.* Guilford Press; 2008.（EDE-Q 与手册）
- **一级**：CREDO（Oxford）官方 EDE-Q 页面与题本
- **二级**：EDE-Q 各语言版本验证研究（含中文版）
- **三级**：公开量表条目页（结构核对）

---

## 10. 版权状态与免责声明

- **版权方**：**Christopher G. Fairburn**（EDE-Q）；访谈版 EDE 与自评版 EDE-Q 均受版权保护（Guilford Press / Oxford）。
- **状态**：⚠️ **受版权保护**。EDE-Q 虽在研究中广泛使用，但**正式使用常需作者授权/注册**。

> **版权与免责声明**：本量表题目文本与常模受原版权方保护（版权方：Fairburn / Guilford Press）。本文档收录仅作**学习与研究之用**，不得用于商业分发；请确认你所在司法辖区的适用规则。本工具输出的是**满足指定剖面的合成答卷**，不是心理测量结果，**不可用于临床评估、诊断或任何实际人事 / 司法决策**，也不得用于伪造测验结果。

---

## 11. 落地备注（对 PsychoInverse 的建议）

1. **⛔ 题项缺失 + 受版权保护** —— 建议排在较后，取得题本后再落地。
2. **⚠️ 两个技术难点**：
   - **① 第 8 题跨两个分量表**（Shape + Weight）——需要 `bind` 支持**题目被多个因子共享**。HADS 的「焦虑 + 抑郁 = 总分」是**下级聚合到上级**，而 EDE-Q 是**同级两因子共享一题**，需验证 `likert.js` 的 `likertSetItemLevel` 同因子守恒重平衡能否处理。
   - **② 6 道开放式频次题（13–18）不是 Likert**——当前 `items.format` 模型需要为每题指定一个格式；开放式数值题需要**新的输入类型**（或做成不可求解的附属字段）。
3. **分量表用 `mean` 而非 `sum`** —— 对应 `bandMetric: 'mean'`（PHQ-9/GAD-7 用的是 `'sum'`），需确认 `likertTargetScales` 的 `allValues` 枚举在 `mean` 模式下的步长（`step = 1/n`，`likert.js:270-302`）对 0–6 均分是否合适。
4. **Global = 四分量表均值**，属**跨层级聚合**（比 HADS 的 `bind:[0]` 更高一层），需评估聚合表达方式。
5. **优先级建议**：低于 SDS / SAS / PCL-5 / CTQ-SF / HCL-32；与 PDQ-4+、MMSE/MoCA 同属「需额外工作」的一档。
