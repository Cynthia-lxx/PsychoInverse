# HCL-32 · 轻躁狂症状清单（Hypomania Checklist-32）

> 调研文档，供后续落地为 `hcl32.data.js`。字段映射见 `_TEMPLATE.md`。

---

## 1. 基本信息

| 项 | 值 |
| --- | --- |
| 缩写 / `id` 建议 | `hcl32` |
| 中文全称 | 32 项轻躁狂症状清单（轻躁狂检测清单） |
| 英文全称 | Hypomania Checklist-32 (HCL-32) |
| 编制者 / 年份 | Angst J. 等，2005（在 HCL-20 基础上扩展） |
| 题数 | **32**（另有 2 个引导题不计分，见第 3 节） |
| 作答格式 | **二值**（是 / 否，0 / 1） |
| 评定范围 | **终生**（回忆一段「心境高涨」时期，且当时未使用药物/酒精） |
| 适用人群 | 抑郁门诊患者（用于识别双相谱系，尤其双相 II 型） |
| 施测时长 | 5–10 分钟 |
| 维度 | 两因子：Active/Elated（精力充沛/情绪高涨）、Risk-Taking/Irritable（冒险/易激惹） |

`blurb` 建议：「选择目标「是」题数，反推出一份 32 题作答；用于双相谱系筛查的资料参考。」

---

## 2. 作答格式

```js
const HCL32_FMT = makeLikert(2, ['否', '是']);   // 级别 0=否, 1=是
const HCL32_FMTS = Array(32).fill('likert');
```

- 计分：「是」记 1 分，「否」记 0 分；总分 **0–32**。
- **无反向题**（全部正向），`reverse` 不需要。

---

## 3. 引导题（不计入总分，落地时不要放进 `bind`）

官方问卷在 32 题之前有 2 个引导/背景题：

1. **您今天与平时状态相比感觉如何？** —— 比平时差很多 / 差一些 / 稍差 / 差不多 / 稍好 / 好一些 / 好很多（7 级）
2. **与他人相比，我的活动量、精力和心境：** —— 总是相当稳定平和 / 通常较高 / 通常较低 / 反复出现高低起伏（4 级）

> 这两题**不计分**，仅作背景。落地建议：不放入 `items`，或放入但不进任何 `bind`。

---

## 4. 题项原文（32 题）

英文取自官方问卷页 `hcl32.org/questionnaire`（一级/官方）；中文为通行译本（二级，与国内量表平台版本一致）。**无反向题。**

| 题号 | 中文 | 英文（官方） |
| --- | --- | --- |
| 1 | 我需要的睡眠比平时少 | I need less sleep |
| 2 | 我感觉精力更充沛、活动更多 | I feel more energetic and more active |
| 3 | 我更自信 | I am more self-confident |
| 4 | 我更享受我的工作 | I enjoy my work more |
| 5 | 我更喜欢社交（打更多电话、更常外出） | I am more sociable (make more phone calls, go out more) |
| 6 | 我想去旅行，而且/或者旅行得更多 | I want to travel and/or do travel more |
| 7 | 我开车时倾向于开得更快或冒更多风险 | I tend to drive faster or take more risks when driving |
| 8 | 我花更多钱 / 花钱太多 | I spend more money/too much money |
| 9 | 我在日常生活中冒更多风险（工作和/或其他活动） | I take more risks in my daily life (in my work and/or other activities) |
| 10 | 我的身体活动量更大（运动等） | I am physically more active (sport etc.) |
| 11 | 我计划更多的活动或项目 | I plan more activities or projects |
| 12 | 我有更多想法，更有创造力 | I have more ideas, I am more creative |
| 13 | 我不再害羞或拘束 | I am less shy or inhibited |
| 14 | 我穿更鲜艳 / 更夸张的衣服或妆容 | I wear more colourful and more extravagant clothes/make-up |
| 15 | 我想结识（并确实结识）更多人 | I want to meet or actually do meet more people |
| 16 | 我对性更感兴趣，和/或性欲增强 | I am more interested in sex, and/or have increased sexual desire |
| 17 | 我更轻浮，和/或性行为更多 | I am more flirtatious and/or am more sexually active |
| 18 | 我说话更多 | I talk more |
| 19 | 我思维更快 | I think faster |
| 20 | 我说话时开更多玩笑或说更多俏皮话 | I make more jokes or puns when I am talking |
| 21 | 我更容易分心 | I am more easily distracted |
| 22 | 我投入很多新的事物 | I engage in lots of new things |
| 23 | 我的思绪从一个话题跳到另一个话题 | My thoughts jump from topic to topic |
| 24 | 我做事情更快和/或更容易 | I do things more quickly and/or more easily |
| 25 | 我更没耐心，和/或更容易激惹 | I am more impatient and/or get irritable more easily |
| 26 | 我让别人感到疲惫或烦躁 | I can be exhausting or irritating for others |
| 27 | 我更多地与人争吵 | I get into more quarrels |
| 28 | 我的心境更高涨、更乐观 | My mood is higher, more optimistic |
| 29 | 我喝更多咖啡 | I drink more coffee |
| 30 | 我抽更多烟 | I smoke more cigarettes |
| 31 | 我喝更多酒 | I drink more alcohol |
| 32 | 我服用更多药物（镇静剂、抗焦虑药、兴奋剂） | I take more drugs (sedatives, anti-anxiety pills, stimulants) |

> 引导语（落地可放 `note` 或 `blurb`）：请回忆一段您处于「心境高涨」的时期（当时并未使用药物或酒精），在该状态下回答下列问题是否符合您当时的经验。

---

## 5. 因子 / 维度结构

两因子结构已确立：**Factor 1 = Active/Elated（精力充沛/情绪高涨）**，**Factor 2 = Risk-Taking/Irritable（冒险/易激惹）**。

⚠️ **题项归属在不同研究中略有出入**，落地前须选定一个来源并复核。已有线索（PMC3792138，中国综合医院精神科门诊样本 N=1010 的因子负荷表）：

| 题号 | Factor 1 (Active/Elated) | Factor 2 (Risk-taking/Irritable) |
| --- | --- | --- |
| 1 | 0.34 | 0.42 |
| 2 | 0.62 | 0.12 |
| 3 | 0.58 | 0.07 |
| 4 | 0.49 | −0.08 |
| 5 | 0.41 | 0.24 |

（其余题号负荷**待查原文 Table 3 复核**。）

**落地建议**：先只做**总分**（`bind: [1..32]`、`bandMetric: 'sum'`），因子分组作为第二阶段——避免引入未经复核的归属。

---

## 6. 计分算法

- 每题「是」= 1，「否」= 0；总分 **0–32**。
- 无反向、无加权、无 T 分换算。
- `scoreShift: 0`。

---

## 7. 分界值与分级（→ `bands`）

| 总分 | 判读 | 来源 |
| --- | --- | --- |
| 0–13 | 未达筛查阈值 | 由 ≥14 反推 |
| 14–32 | **提示双相谱系障碍可能**（likely bipolar spectrum disorder） | Angst 2005 原研究；多数研究采用 ≥14 |

- 原研究效度：区分双相情感障碍与重度抑郁症，**灵敏度 80%、特异度 51%**（二级来源）。
- **`bands` 目前是二分（<14 / ≥14），不是严重程度分级**——这是筛查工具，不是严重度评定量表。落地时 `severity` 建议写「未达阈值 / 达筛查阈值」。

```js
bands: [
  { min: 0,  max: 13, minInc: true, maxInc: true, severity: '未达筛查阈值' },
  { min: 14, max: 32, minInc: true, maxInc: true, severity: '达筛查阈值（提示双相谱系）' },
]
```

---

## 8. 信效度

- Cronbach's α：**0.79–0.86**（不同研究；PsychScales 汇总）；中文版研究报告 **α = 0.82**（二级）。
- 区分 BD 与 MDD：灵敏度 80%、特异度 51%（二级）。
- 与 YMRS（杨氏躁狂量表）相关系数 **0.718**（二级）。
- **局限**（资料原文）：该量表**不能有效区分躁狂与轻躁狂症状**；仅作筛查，不作诊断。

---

## 9. 中国常模 / 中文版

- **中文版由杨海晨等于 2008 年汉化**（二级来源）。
- 已有中文版在综合医院精神科门诊的适用性研究（PMC3792138，N=1010）。
- **未检索到独立的中国常模分界值**——中文版研究多沿用原版 **≥14**。
- 多语言版本：英、法、意、西、葡、俄、瑞典、韩、挪威、中文等。

---

## 10. 来源出处

- **一级**：Angst J, Adolfsson R, Benazzi F, Gamma A, Hantouche E, Meyer TD, Skeppar P, Vieta E, Scott J. *The HCL-32: Towards a self-assessment tool for hypomanic symptoms in outpatients.* J Affect Disord. 2005;88(2):217–233.
- **一级**：官方问卷页 <https://hcl32.org/questionnaire>（32 题英文原文，本表直接取自该页）
- **二级**：*Applicability of the Chinese Version of the Hypomania Symptom Checklist (HCL-32) Scale for Outpatients of Psychiatric Departments in General Hospitals*（PMC3792138，中文版适用性 + 因子负荷表）
- **二级**：中国全科医学 2022 综述（HCL-32 中文版 α、灵敏度/特异度、与 YMRS 相关）
- **三级**：PsychScales 条目页（α 区间、cutoff、两因子、免费获取说明）

---

## 11. 版权状态与免责声明

- **版权方**：Jules Angst 等原作者。官方站点明确 **freely available from Jules Angst**（PsychScales 标注 "Free"）。
- **状态**：**可自由获取用于研究**；官方工具页亦声明 "for educational purposes only"。

> **版权与免责声明**：本量表题目文本与常模受原版权方保护（版权方见上）。本文档收录仅作**学习与研究之用**，不得用于商业分发；请确认你所在司法辖区的适用规则。本工具输出的是**满足指定剖面的合成答卷**，不是心理测量结果，**不可用于临床评估、诊断或任何实际人事 / 司法决策**，也不得用于伪造测验结果。

---

## 12. 落地备注（对 PsychoInverse 的建议）

1. **建议走 `likert.js` 解析解**（`binary:false` + `makeLikert(2, ['否','是'])`），**不要**走 `inverse.js` 退火——HCL-32 是纯求和、无题目重叠/无互斥键控，解析解更快更稳且能给出精确的目标达成。
   > 注：注册表里 `binary:true` 目前只有 MMPI-2（`gui.js:239-252`），那是因为 MMPI-2 有 567 题 × 87 量表的高重叠键控。HCL-32 不属于这种情况。
2. **两个引导题不计分**，不要放进 `bind`。
3. **因子归属待复核**：先做总分，因子分组留作第二阶段。
4. **`bands` 是二分阈值**，不是五档severity 分级；`note` 里应写明「不能区分躁狂与轻躁狂」「仅筛查不诊断」。
5. 与 PHQ-9 联用是官方推荐场景（在抑郁样本中筛查双相），可在 `blurb` 中提示。
