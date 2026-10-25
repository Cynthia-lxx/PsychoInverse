// 儿童期创伤问卷简版（Childhood Trauma Questionnaire-Short Form, CTQ-SF；
// Bernstein & Fink）。28 题（25 临床题 + 3 题最小化 / 否认效度题），5 级评分。
//
// 引擎侧说明：5 个级别的内部索引为 0–4，靠 scoreShift: 1 把每题贡献抬到 1–5，
// 因此各分量表（5 题）的范围为 5–25，与临床一致。
//
// MD（最小化 / 否认）是效度分量表，只展示、**不作求解目标**——由 ctqsf.js 的
// ctqsfTargetScales() 把它从可设目标列表里过滤掉。
import { makeLikert } from './formats.js';

const CTQ_FMT = makeLikert(5, ['从来没有', '偶尔', '有时', '经常', '总是']);
const CTQ_FMTS = Array(28).fill('likert');

export const CTQSF_DATA = {
  id: 'ctqsf',
  name: 'CTQ-SF 儿童期创伤问卷简版',
  blurb: '选择各分量表目标分，反推出一份 28 题作答（含 7 道反向题）；儿童期创伤史资料参考。',
  targetLabel: '目标得分',
  targetTableTitle: '得分达成',
  scoreShift: 1,
  nItems: 28,
  items: {
    zh: [
      '我没有足够的食物吃',
      '我知道有人会照顾我、保护我',
      '家人用「笨」「懒」「丑」之类的话称呼我',
      '父母因喝醉或吸毒而无法照顾家庭',
      '家里有人让我觉得自己是重要的、特别的',
      '我不得不穿脏衣服',
      '我感到被人爱',
      '我觉得父母希望我从未出生',
      '我被家人打得严重到需要去看医生或住院',
      '我的家庭没有任何我想改变的地方',
      '家人把我打得很重，留下了淤青或伤痕',
      '我被用皮带、木板、绳子（或其他硬物）惩罚',
      '家人之间互相照应',
      '家人对我说伤害性或侮辱性的话',
      '我认为自己曾遭受躯体虐待',
      '我有一个完美的童年',
      '我被殴打得很重，以致老师、邻居或医生都注意到了',
      '我觉得家里有人恨我',
      '家人彼此亲近',
      '有人试图以性方式触碰我，或让我触碰他',
      '有人威胁要伤害我或散布谣言，除非我和他发生性行为',
      '我拥有世界上最好的家庭',
      '有人试图让我做性方面的事或观看性方面的事',
      '有人对我实施过性侵犯',
      '我认为自己曾遭受情感虐待',
      '有人会在我需要时带我去看医生',
      '我认为自己曾遭受性虐待',
      '我的家庭是力量与支持的来源',
    ],
    en: [
      'I didn’t have enough to eat.',
      'I knew there was someone to take care of me and protect me.',
      'People in my family called me things like "stupid," "lazy," or "ugly."',
      'My parents were too drunk or high to take care of the family.',
      'There was someone in my family who helped me feel important or special.',
      'I had to wear dirty clothes.',
      'I felt loved.',
      'I thought my parents wished I had never been born.',
      'I got hit so hard by someone in my family that I had to see a doctor or go to the hospital.',
      'There was nothing I wanted to change about my family.',
      'People in my family hit me so hard that it left me with bruises or marks.',
      'I was punished with a belt, a board, a cord (or some other hard object).',
      'People in my family looked out for each other.',
      'People in my family said hurtful or insulting things to me.',
      'I believe that I was physically abused.',
      'I had the perfect childhood.',
      'I got hit or beaten so badly that it was noticed by someone like a teacher, neighbor, or doctor.',
      'I felt that someone in my family hated me.',
      'People in my family felt close to each other.',
      'Someone tried to touch me in a sexual way, or tried to make me touch them.',
      'Someone threatened to hurt me or tell lies about me unless I did something sexual with them.',
      'I had the best family in the world.',
      'Someone tried to make me do sexual things or watch sexual things.',
      'Someone molested me.',
      'I believe that I was emotionally abused.',
      'There was someone to take me to the doctor if I needed it.',
      'I believe that I was sexually abused.',
      'My family was a source of strength and support.',
    ],
    format: CTQ_FMTS,
  },
  formats: { likert: CTQ_FMT },
  // 7 道反向题（第 2、5、7、13、19、26、28 题）
  reverse: [2, 5, 7, 13, 19, 26, 28],
  scales: [
    {
      name: '情感虐待',
      fullName: 'CTQ-SF 情感虐待（EA）',
      family: 'ea',
      bind: [3, 8, 14, 18, 25],
      bandMetric: 'sum',
      bands: [
        { min: 5, max: 8, minInc: true, maxInc: true, severity: '无/极轻微' },
        { min: 9, max: 12, minInc: true, maxInc: true, severity: '轻中度' },
        { min: 13, max: 15, minInc: true, maxInc: true, severity: '中重度' },
        { min: 16, max: 25, minInc: true, maxInc: true, severity: '重度' },
      ],
    },
    {
      name: '躯体虐待',
      fullName: 'CTQ-SF 躯体虐待（PA）',
      family: 'pa',
      bind: [9, 11, 12, 15, 17],
      bandMetric: 'sum',
      bands: [
        { min: 5, max: 7, minInc: true, maxInc: true, severity: '无/极轻微' },
        { min: 8, max: 9, minInc: true, maxInc: true, severity: '轻中度' },
        { min: 10, max: 12, minInc: true, maxInc: true, severity: '中重度' },
        { min: 13, max: 25, minInc: true, maxInc: true, severity: '重度' },
      ],
    },
    {
      name: '性虐待',
      fullName: 'CTQ-SF 性虐待（SA）',
      family: 'sa',
      bind: [20, 21, 23, 24, 27],
      bandMetric: 'sum',
      bands: [
        { min: 5, max: 5, minInc: true, maxInc: true, severity: '无/极轻微' },
        { min: 6, max: 7, minInc: true, maxInc: true, severity: '轻中度' },
        { min: 8, max: 12, minInc: true, maxInc: true, severity: '中重度' },
        { min: 13, max: 25, minInc: true, maxInc: true, severity: '重度' },
      ],
    },
    {
      name: '情感忽视',
      fullName: 'CTQ-SF 情感忽视（EN）',
      family: 'en',
      bind: [5, 7, 13, 19, 28],
      bandMetric: 'sum',
      bands: [
        { min: 5, max: 9, minInc: true, maxInc: true, severity: '无/极轻微' },
        { min: 10, max: 14, minInc: true, maxInc: true, severity: '轻中度' },
        { min: 15, max: 17, minInc: true, maxInc: true, severity: '中重度' },
        { min: 18, max: 25, minInc: true, maxInc: true, severity: '重度' },
      ],
    },
    {
      name: '躯体忽视',
      fullName: 'CTQ-SF 躯体忽视（PN）',
      family: 'pn',
      bind: [1, 2, 4, 6, 26],
      bandMetric: 'sum',
      bands: [
        { min: 5, max: 7, minInc: true, maxInc: true, severity: '无/极轻微' },
        { min: 8, max: 9, minInc: true, maxInc: true, severity: '轻中度' },
        { min: 10, max: 12, minInc: true, maxInc: true, severity: '中重度' },
        { min: 13, max: 25, minInc: true, maxInc: true, severity: '重度' },
      ],
    },
    {
      // 效度分量表：只展示、不作求解目标（见 ctqsf.js 的 ctqsfTargetScales）
      name: 'MD',
      fullName: 'CTQ-SF 最小化 / 否认（效度）',
      family: 'md',
      bind: [10, 16, 22],
      bandMetric: 'sum',
      bands: [
        { min: 3, max: 15, minInc: true, maxInc: true, severity: '效度参考' },
      ],
    },
  ],
  note: '五个临床分量表各 5 题、范围 5–25，含 7 道反向题。MD（最小化 / 否认，第 10、16、22 题）为效度分量表，只展示、不作为反算目标；MD 得分越高提示越可能淡化或否认童年期负性经历（常见做法是将每题「从来没有」记 0、其余记 1，得 0–3，≥1 时须谨慎解读其余分量表）。CTQ-SF 为回顾性自评，存在回忆偏倚；分级阈值请以官方手册复核。',
};
