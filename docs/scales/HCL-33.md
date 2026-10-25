# HCL-33 · 33 项轻躁狂症状清单（33-item Hypomania Checklist）

> 调研文档，供后续落地为 `hcl33.data.js`。字段映射见 `_TEMPLATE.md`。
> **题项原文 ✅ 已补全**（33 题英文全文取自 PMC8684563 Table 3；中文为北京安定医院中文版口径）。

---

## 1. 基本信息

| 项 | 值 |
| --- | --- |
| 缩写 / `id` 建议 | `hcl33` |
| 中文全称 | 33 项轻躁狂症状清单（轻躁狂症状自评量表） |
| 英文全称 | 33-item Hypomania Checklist (HCL-33) |
| 编制者 / 年份 | **Feng Y, Xiang YT, Huang W, Wang G, … , Angst J.** 2015（北京安定医院团队 + HCL-32 原作者 Angst） |
| 题数 | **33** |
| 作答格式 | **二值**（是 / 否，0 / 1） |
| 评定范围 | **终生**（回忆「心境高涨」时期，不按当下状态） |
| 适用人群 | 抑郁患者中筛查双相障碍（BD）；亦有青少年版验证 |
| 施测时长 | 5–10 分钟 |
| 维度 | 沿用 HCL-32 两因子思路（**题项归属待复核**） |
| 外部评估版 | **HCL-33-EA**（由照料者/他人评定），**不属于自评**，本项目不纳入 |

`blurb` 建议：「选择目标「是」题数，反推出一份 33 题作答；中文版双相障碍筛查资料参考。」

---

## 2. 作答格式

```js
const HCL33_FMT = makeLikert(2, ['否', '是']);   // 级别 0=否, 1=是
const HCL33_FMTS = Array(33).fill('likert');
```

- 每题「是」记 1 分，「否」记 0 分；**总分 = 答「是」的题数**，范围 **0–33**。
- **无反向题**、无加权。
- `scoreShift: 0`。

---

## 3. 与 HCL-32 的关系（已厘清）

对比 HCL-32（`HCL-32.md` 第 4 节）与 HCL-33 的题项可确认：

| 差异 | 说明 |
| --- | --- |
| **合并** | HCL-32 的第 16 题（性兴趣增强）与第 17 题（更轻浮/性行为更多）在 HCL-33 中**合并为第 16 题**（"I am more interested in sex and/or I am more sexually active"） |
| **新增 2 题** | HCL-33 末尾新增 **第 32 题「游戏或赌博增多」** 与 **第 33 题「进食/暴食增多」** |
| **其余 1–31** | 与 HCL-32 的 1–32 逐一对应（因合并一题，HCL-33 的 17–31 对应 HCL-32 的 18–32） |

净效果：32 − 1（合并）+ 2（新增）= **33**。✅ 与题数吻合。

> **落地意义**：题项文本可直接复用 `HCL-32.md`，只需把 16/17 合并、并补两道新题。

---

## 4. 题项原文（33 题）✅

英文取自 PMC8684563（*Int J Bipolar Disord* 2021;9:41）**Table 3** 的 HCL-33 自评版条目（一级/开放获取 CC BY 4.0）；中文为北京安定医院中文版口径（二级，与国内量表平台版本一致）。**无反向题。**

| 题号 | 中文 | 英文 | 与 HCL-32 对应 |
| --- | --- | --- | --- |
| 1 | 我需要的睡眠时间比平时少 | I need less sleep | =32 的 1 |
| 2 | 我感觉比平时更有精力并且更加活跃 | I feel more energetic and more active | =32 的 2 |
| 3 | 我比平时更自信 | I am more self-confident | =3 |
| 4 | 我更加享受工作 | I enjoy my work more | =4 |
| 5 | 我社交活动增多（打电话比平时多、外出比平时多） | I am more sociable (make more phone calls, go out more) | =5 |
| 6 | 我更想去旅行，和/或旅行的确比平时多 | I want to travel and/or do travel more | =6 |
| 7 | 我开车比平时快，或开车不顾危险 | I tend to drive faster or take more risks when driving | =7 |
| 8 | 我花钱比平时多，或花了太多钱 | I spend more money/too much money | =8 |
| 9 | 在日常生活中我比平时更冒险（在工作或在其它活动上） | I take more risks in my daily life (in my work and/or other activities) | =9 |
| 10 | 我活动量增多（如体育运动等） | I am physically more active (sport etc.) | =10 |
| 11 | 我有更多的打算，或计划更多的活动 | I plan more activities or projects | =11 |
| 12 | 我有更多的点子，或更具有创造力 | I have more ideas, I am more creative | =12 |
| 13 | 我很少害羞或者感到约束 | I am less shy or inhibited | =13 |
| 14 | 我会穿更加鲜艳、更加奢侈的衣服／用更鲜艳、更奢侈的化妆品 | I wear more colourful and more extravagant clothes/make-up | =14 |
| 15 | 我想和更多的人接触，或者的确接触了更多的人 | I want to meet or actually do meet more people | =15 |
| 16 | 我对「性」更感兴趣，和/或性行为更活跃 | I am more interested in sex and/or I am more sexually active | **= 32 的 16 + 17（合并）** |
| 17 | 我讲话更多 | I talk more | =32 的 18 |
| 18 | 我思维更快 | I think faster | =19 |
| 19 | 我讲话时会开更多的玩笑或者说更多双关语 | I make more jokes or puns when I am talking | =20 |
| 20 | 我比平时容易分心 | I am more easily distracted | =21 |
| 21 | 我尝试许多新鲜事物 | I engage in lots of new things | =22 |
| 22 | 我的思维从一个话题跳到另一个话题 | My thoughts jump from topic to topic | =23 |
| 23 | 我做事情更快和/或更容易 | I do things more quickly and/or more easily | =24 |
| 24 | 我更容易不耐烦，和/或更容易激惹 | I am more impatient and/or get irritable more easily | =25 |
| 25 | 我让别人感到疲惫或烦躁 | I can be exhausting or irritating for others | =26 |
| 26 | 我更多地与人争吵 | I get into more quarrels | =27 |
| 27 | 我的心境更高涨、更乐观 | My mood is higher, more optimistic | =28 |
| 28 | 我喝更多咖啡 | I drink more coffee | =29 |
| 29 | 我抽更多烟 | I smoke more cigarettes | =30 |
| 30 | 我喝更多酒 | I drink more alcohol | =31 |
| 31 | 我服用更多药物（镇静剂、抗焦虑药、兴奋剂等） | I take more drugs (sedatives, anxiolytics, stimulants…) | =32 |
| **32** | **我更多地玩游戏或赌博** | **I game or gamble more** | **新增** |
| **33** | **我吃得更多，或暴食更多** | **I eat more or I binge more** | **新增** |

### 引导题（不计分，不进 `bind`）

中文版题本在 33 题前有引导部分（与 HCL-32 同类）：
1. 首先，和平常的状态比起来，您今天感觉怎么样？（7 级：比平常差多了 → 比平常好很多）
2. 与其他人相比，我的活动、精力、情绪怎么样？（4 级：总是相当稳定 / 通常比较高涨一些 / 通常比较低落一些 / 反复地出现高涨与低落）
3. 「高涨」状态通常的持续时间（1 天 / 2–3 天 / 4–6 天 / 1–3 周 / 1 个月或以上 / 不能判断）

---

## 5. 因子 / 维度结构

**待原文复核**（HCL-32 的两因子在 HCL-33 中未检索到公开的逐题归属表）。

落地首期建议只做**总分**：

```js
scales: [{ name: '总分', fullName: 'HCL-33 总分', family: 'mania',
           bind: [1..33], bandMetric: 'sum' }]
```

---

## 6. 分界值与分级（→ `bands`）⚠️ 口径分歧较大

| 研究 / 人群 | 最优 cutoff（Youden 指数） | 来源 |
| --- | --- | --- |
| **中国成人抑郁患者（原始研究，350 例）** | 见下 | Feng 等 2015 |
| 成人（原始验证文献） | **20** | PMID 34239453（"Using Youden's index, the optimal cut-off value of the HCL-33 is 20"） |
| **青少年抑郁样本** | **14**（灵敏度 0.58 / 特异度 0.61 / AUC 0.57） | PMC8684563（2021） |
| 中国青少年（Zhang 等 2021） | **18** | 转引自 PMC8684563 |
| 俄罗斯成人（Mosolov 等 2021） | **16** | 转引自 PMC8684563 |

> ⚠️ **cutoff 在 14–20 之间随人群浮动**，成人原始文献为 **20**，青少年为 **14–18**。
> **落地建议**：成人版采用 **20**，并在 `note` 注明人群差异；若要支持青少年，需另设一套。

```js
// 成人版（cutoff 20）
bands: [
  { min: 0,  max: 19, minInc: true, maxInc: true, severity: '未达筛查阈值' },
  { min: 20, max: 33, minInc: true, maxInc: true, severity: '达筛查阈值（提示双相障碍）' },
]
```

---

## 7. 信效度

- 原始研究（Feng 等 2015，N=350 中国抑郁患者）验证了中文版 HCL-33 的心理测量学特性与识别 BD 的准确性——**具体 α、灵敏度、特异度、AUC 数值待原文复核**。
- 青少年研究（PMC8684563，2021）：HCL-33 与 HCL-33-EA 比较，cutoff 14 时灵敏度 0.58、特异度 0.61、PPV 0.66、NPV 0.53、AUC 0.57（**青少年样本中表现一般**）。
- 二级来源称：HCL-33 区分 **BD-II** 的灵敏度优于 HCL-32 与 MDQ。

---

## 8. 中国常模

- HCL-33 **本身即在中国临床样本开发/验证**（350 例抑郁患者；亦有多中心青少年验证）。
- 成人推荐 cutoff **20**（原始文献）；青少年 **14–18**。

---

## 9. 来源出处

- **一级**：Feng Y, Xiang YT, Huang W, Wang G, Feng L, Tian TF, Geng Y, Ungvari GS, Chiu HFK, Tse AWY, Angst J, et al. *The 33-item Hypomania Checklist (HCL-33): A new self-completed screening instrument for bipolar disorder.* J Affect Disord. 2015;190:214–220. DOI 10.1016/j.jad.2015.09.057; PMID 26519642.
- **一级**：Chen X, Bai W, Zhao N, Sha S, Cheung T, Ungvari GS, Feng Y, Xiang YT, Angst J. *A comparison of the 33-item Hypomania Checklist with the 33-item Hypomania Checklist-external assessment for the detection of bipolar disorder in adolescents.* Int J Bipolar Disord. 2021;9:41. DOI 10.1186/s40345-021-00246-0; PMID 34923610; PMC8684563.（**本题项表 3 即取自此文**，开放获取 CC BY 4.0）
- **一级**：*Comparing Screening Abilities of the HCL-33 and HCL-33-EA…* PMID 34239453.（cutoff = 20）
- **二级**：北京安定医院中文版题本（33 项轻躁狂症状清单）——中文题项与引导部分

---

## 10. 版权状态与免责声明

- **版权方**：Feng Y 等（2015）；含 HCL-32 原作者 Jules Angst。题项表取自 **PMC8684563（CC BY 4.0 开放获取）**，可自由引用并注明出处。
- **状态**：题项文本可收集（开放获取来源）；原始 J Affect Disord 文献本身受 Elsevier 版权保护。

> **版权与免责声明**：本量表题目文本与常模受原版权方保护（版权方见上）。本文档收录仅作**学习与研究之用**，不得用于商业分发；请确认你所在司法辖区的适用规则。本工具输出的是**满足指定剖面的合成答卷**，不是心理测量结果，**不可用于临床评估、诊断或任何实际人事 / 司法决策**，也不得用于伪造测验结果。

---

## 11. 落地备注（对 PsychoInverse 的建议）

1. **题项已可录入**：可直接复用 `HCL-32.md` 的中文/英文题项，按第 3 节的「合并 + 新增」规则调整为 33 题。
2. **建议走 `likert.js` 解析解**（`binary:false` + `makeLikert(2, ['否','是'])`），不走 `inverse.js` 退火（纯求和、无键控重叠）。
3. **cutoff 须按人群选定**（成人 20 / 青少年 14–18），并在界面注明。
4. **引导题不计分**，不要放 `bind`。
5. **HCL-33-EA（外部评估版）不纳入**——它是他人评定，非自评。
6. 优先级：题项已齐，但**因子归属与 α/灵敏度具体数值仍待原文复核**；建议排在 HCL-32 之后。
