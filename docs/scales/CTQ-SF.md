# CTQ-SF · 儿童期创伤问卷简版（Childhood Trauma Questionnaire-Short Form）

> 调研文档，供后续落地为 `ctqsf.data.js`。字段映射见 `_TEMPLATE.md`。
> **⚠️ 本量表含 7 道反向题**——反向计分是落地关键。

---

## 1. 基本信息

| 项 | 值 |
| --- | --- |
| 缩写 / `id` 建议 | `ctqsf` |
| 中文全称 | 儿童期创伤问卷简版（儿童期虐待问卷） |
| 英文全称 | Childhood Trauma Questionnaire-Short Form (CTQ-SF) |
| 编制者 / 年份 | Bernstein DP, Fink L 等，1990s（基于 CTQ 70 题版简化） |
| 题数 | **28**（25 临床题 + 3 题「最小化/否认」效度题） |
| 作答格式 | 5 级 Likert（1–5：从不 → 总是） |
| 评定范围 | **回顾性**（儿童期/成长过程） |
| 适用人群 | 成人及青少年回顾性自评 |
| 施测时长 | 5–10 分钟 |
| 维度 | **5 个临床分量表** + 1 个效度分量表（MD） |

`blurb` 建议：「选择各分量表目标分，反推出一份 28 题作答（含 7 道反向题）；儿童期创伤史资料参考。」

---

## 2. 作答格式

```js
const CTQ_FMT = makeLikert(5, ['从来没有', '偶尔', '有时', '经常', '总是']);
const CTQ_FMTS = Array(28).fill('likert');
```

- 5 级计分 **1 / 2 / 3 / 4 / 5**（原版：Never true / Rarely true / Sometimes true / Often true / Very often true）。
- **注意：CTQ-SF 的级别从 1 起，不是 0 起**。当前 `formats.js` 的内部约定是「级别索引 `level ∈ [0, L-1]`」（`formats.js:12-13`），因此**需要 `scoreShift: 1`**（参照 SCL-90 的 `scoreShift: 1` 做法）把 0–4 映射回 1–5。
- 每个分量表 5 题，范围 **5–25**。

---

## 3. 题项原文与因子归属

| 题号 | 中文 | 英文 | 分量表 | 计分键 |
| --- | --- | --- | --- | --- |
| 1 | 我没有足够的食物吃 | I didn't have enough to eat. | PN 躯体忽视 | 正向 |
| 2 | 我知道有人会照顾我、保护我 | I knew there was someone to take care of me and protect me. | PN | **反向** |
| 3 | 家人用「笨」「懒」「丑」之类的话称呼我 | People in my family called me things like "stupid," "lazy," or "ugly." | EA 情感虐待 | 正向 |
| 4 | 父母因喝醉或吸毒而无法照顾家庭 | My parents were too drunk or high to take care of the family. | PN | 正向 |
| 5 | 家里有人让我觉得自己是重要的、特别的 | There was someone in my family who helped me feel important or special. | EN 情感忽视 | **反向** |
| 6 | 我不得不穿脏衣服 | I had to wear dirty clothes. | PN | 正向 |
| 7 | 我感到被人爱 | I felt loved. | EN | **反向** |
| 8 | 我觉得父母希望我从未出生 | I thought my parents wished I had never been born. | EA | 正向 |
| 9 | 我被家人打得严重到需要去看医生或住院 | I got hit so hard by someone in my family that I had to see a doctor or go to the hospital. | PA 躯体虐待 | 正向 |
| 10 | 我的家庭没有任何我想改变的地方 | There was nothing I wanted to change about my family. | **MD** 最小化/否认 | 正向（仅效度） |
| 11 | 家人把我打得很重，留下了淤青或伤痕 | People in my family hit me so hard that it left me with bruises or marks. | PA | 正向 |
| 12 | 我被用皮带、木板、绳子（或其他硬物）惩罚 | I was punished with a belt, a board, a cord (or some other hard object). | PA | 正向 |
| 13 | 家人之间互相照应 | People in my family looked out for each other. | EN | **反向** |
| 14 | 家人对我说伤害性或侮辱性的话 | People in my family said hurtful or insulting things to me. | EA | 正向 |
| 15 | 我认为自己曾遭受躯体虐待 | I believe that I was physically abused. | PA | 正向 |
| 16 | 我有一个完美的童年 | I had the perfect childhood. | **MD** | 正向（仅效度） |
| 17 | 我被殴打得很重，以致老师、邻居或医生都注意到了 | I got hit or beaten so badly that it was noticed by someone like a teacher, neighbor, or doctor. | PA | 正向 |
| 18 | 我觉得家里有人恨我 | I felt that someone in my family hated me. | EA | 正向 |
| 19 | 家人彼此亲近 | People in my family felt close to each other. | EN | **反向** |
| 20 | 有人试图以性方式触碰我，或让我触碰他 | Someone tried to touch me in a sexual way, or tried to make me touch them. | SA 性虐待 | 正向 |
| 21 | 有人威胁要伤害我或散布谣言，除非我和他发生性行为 | Someone threatened to hurt me or tell lies about me unless I did something sexual with them. | SA | 正向 |
| 22 | 我拥有世界上最好的家庭 | I had the best family in the world. | **MD** | 正向（仅效度） |
| 23 | 有人试图让我做性方面的事或观看性方面的事 | Someone tried to make me do sexual things or watch sexual things. | SA | 正向 |
| 24 | 有人对我实施过性侵犯 | Someone molested me. | SA | 正向 |
| 25 | 我认为自己曾遭受情感虐待 | I believe that I was emotionally abused. | EA | 正向 |
| 26 | 有人会在我需要时带我去看医生 | There was someone to take me to the doctor if I needed it. | PN | **反向** |
| 27 | 我认为自己曾遭受性虐待 | I believe that I was sexually abused. | SA | 正向 |
| 28 | 我的家庭是力量与支持的来源 | My family was a source of strength and support. | EN | **反向** |

### 反向题（→ `data.reverse`）

```js
reverse: [2, 5, 7, 13, 19, 26, 28]
```

> 李克特系引擎读的是 **`data.reverse`**（`likert.js:44,52,60`），**不是** `weights`。反向题在「贡献分空间」由 `contribOf = reverseSet.has(i) ? ml - lv + shift : lv + shift`（`likert.js:52`）处理。

---

## 4. 因子 / 维度结构（→ `bind`）

| 分量表 | 题号 | 范围 |
| --- | --- | --- |
| **EA** 情感虐待 | 3, 8, 14, 18, 25 | 5–25 |
| **PA** 躯体虐待 | 9, 11, 12, 15, 17 | 5–25 |
| **SA** 性虐待 | 20, 21, 23, 24, 27 | 5–25 |
| **EN** 情感忽视 | 5, 7, 13, 19, 28 | 5–25 |
| **PN** 躯体忽视 | 1, 2, 4, 6, 26 | 5–25 |
| **MD** 最小化/否认（效度） | 10, 16, 22 | 3–15 |

- **MD 分量表不参与临床判读**，只用于识别「否认/淡化」倾向（MD 得分高提示可能存在低报）。
- 五个临床分量表**互不共享题目**（无重叠），这对 `likert.js` 解析解是最理想的结构。

---

## 5. 计分算法

1. 反向题（2,5,7,13,19,26,28）先反向计分：1→5、2→4、3→3、4→2、5→1。
2. 各分量表 = 所属 5 题之和，范围 **5–25**。
3. **无总分**（CTQ-SF 传统上报告五个分量表分，不合成总分）。
4. `scoreShift: 1`（因级别从 1 起，见第 2 节）。

---

## 6. 分界值与分级（→ `bands`）

常用分界值（**中重度/中度以上**阈值）：

| 分量表 | 无/极轻 | 轻中度 | 中重度 | 重度 | 常用 cutoff（≥ 为阳性） |
| --- | --- | --- | --- | --- | --- |
| EA 情感虐待 | 5–8 | 9–12 | 13–15 | ≥16 | **13** |
| PA 躯体虐待 | 5–7 | 8–9 | 10–12 | ≥13 | **10** |
| SA 性虐待 | 5–5 | 6–7 | 8–12 | ≥13 | **8** |
| EN 情感忽视 | 5–9 | 10–14 | 15–17 | ≥18 | **15** |
| PN 躯体忽视 | 5–7 | 8–9 | 10–12 | ≥13 | **10** |

- 这套四档分级（none/minimal → low/moderate → moderate/severe → severe/extreme）是 Bernstein 等给出的标准分级。
- **落地建议**：`bands` 用四档分级（区间连续）；「阳性 cutoff」另在 `note` 或界面提示。
- ⚠️ 分级边界在不同文献中略有出入，**落地前建议以 CTQ-SF 官方手册复核**。

---

## 7. 信效度

- CTQ-SF 五个分量表内部一致性良好（Cronbach's α 多在 0.80 以上，SA 略低）；重测信度良好；因子结构在多种语言版本中得到验证。
- **具体数值待原文复核**（建议以 Bernstein & Fink 手册 / Bernstein 等 2003 因子结构文献为准）。
- **MD 分量表**用于效度监控：得分 ≥1（或更高阈值）提示可能存在创伤史的否认。

---

## 8. 中国常模

- 中文版 CTQ-SF 有多项研究（大学生、临床样本），但**本次调研未取得可引用的统一中国常模分界值**。
- **落地建议**：首期沿用原版分级，`note` 注明「暂无本土常模」。

---

## 9. 来源出处

- **一级**：Bernstein DP, Fink L. *Childhood Trauma Questionnaire: A Retrospective Self-Report — Manual.* Pearson / Psychological Assessment Resources.（CTQ-SF 官方手册：题项、反向题、分量表、分级阈值）
- **一级**：Bernstein DP, Stein JA, Newcomb MD, et al. *Development and validation of a brief screening version of the Childhood Abuse and Trauma Scale.* Child Abuse Negl. 2003;27(2):169–190.（因子结构）
- **二级**：多语言/多国验证研究（中文版信效度）
- **三级**：公开量表条目页（结构核对）

---

## 10. 版权状态与免责声明

- **版权方**：**Pearson / Psychological Assessment Resources (PAR)**，作者 Bernstein DP 与 Fink L。
- **状态**：⚠️ **受版权保护的商业测验**，题项与手册需授权购买。本文档收录题项仅作**学习与研究之用**。

> **版权与免责声明**：本量表题目文本与常模受原版权方保护（版权方：Pearson / PAR）。本文档收录仅作**学习与研究之用**，不得用于商业分发；请确认你所在司法辖区的适用规则。本工具输出的是**满足指定剖面的合成答卷**，不是心理测量结果，**不可用于临床评估、诊断或任何实际人事 / 司法决策**，也不得用于伪造测验结果。

---

## 11. 落地备注（对 PsychoInverse 的建议）

1. **可直接套 `likert.js` 解析解**（`binary:false`，5 级）。五个临床分量表**无题目重叠**，是解析解最理想的结构。
2. **⚠️ 反向题 7 道**——务必写 `data.reverse: [2,5,7,13,19,26,28]`。这是本量表唯一的计分难点。
3. **⚠️ `scoreShift: 1`**——CTQ-SF 级别是 1–5 而非 0–4，需参照 SCL-90 的 `scoreShift: 1` 处理，否则所有分量表分都会整体偏低 5 分。
4. **MD 分量表建议不参与求解**：它是效度题（识别否认倾向），不应作为反算目标。可做成不可求解的展示字段，或单独一个 `bind` 但标注「不作目标」。
5. **无总分**：不要照 HADS 那样加 `bind:[0]` 总分聚合项——CTQ-SF 传统上不合成总分。
6. `note` 应写明：MD 高分提示低报可能；CTQ-SF 为回顾性自评，存在回忆偏倚。
