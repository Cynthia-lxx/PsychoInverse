// 焦虑自评量表（Self-Rating Anxiety Scale, SAS；Zung 1971）。
// 题项与计分依据 Zung 原始量表；4 级评分，正向题 1–4 分、反向题 4–1 分，
// 粗分 20–80，标准分 = floor(粗分 × 1.25)，范围 25–100。
//
// 引擎侧说明：4 个级别的内部索引为 0–3，靠 scoreShift: 1 把每题贡献抬到 1–4，
// 因此本模块的「粗分」就是 20–80 的标准区间（与临床一致），bands 直接落在粗分上。
import { makeLikert } from './formats.js';

const SAS_FMT = makeLikert(4, ['没有或很少时间', '少部分时间', '相当多时间', '绝大部分或全部时间']);
const SAS_FMTS = Array(20).fill('likert');

export const SAS_DATA = {
  id: 'sas',
  name: 'SAS 焦虑自评量表',
  blurb: '选择目标粗分，反推出一份 20 题作答（含 5 道反向题）；或直接导入、编辑并评分。',
  targetLabel: '目标粗分',
  targetTableTitle: '得分达成',
  scoreShift: 1,
  nItems: 20,
  items: {
    zh: [
      '我觉得比平时容易紧张和着急',
      '我无缘无故地感到害怕',
      '我容易心里烦乱或觉得惊恐',
      '我觉得我可能将要发疯',
      '我觉得一切都很好，也不会发生什么不幸',
      '我手脚发抖打颤',
      '我因为头痛、颈痛和背痛而苦恼',
      '我感觉容易衰弱和疲乏',
      '我觉得心平气和，并且容易安静坐着',
      '我觉得心跳得很快',
      '我因为一阵阵头晕而苦恼',
      '我有晕倒发作，或觉得要晕倒似的',
      '我呼气吸气都感到很容易',
      '我手脚麻木和刺痛',
      '我因为胃痛和消化不良而苦恼',
      '我常常要小便',
      '我的手常常是干燥温暖的',
      '我脸红发热',
      '我容易入睡并且一夜睡得很好',
      '我做恶梦',
    ],
    en: [
      'I feel more nervous and anxious than usual.',
      'I feel afraid for no reason at all.',
      'I get upset easily or feel panicky.',
      'I feel like I’m falling apart and going to pieces.',
      'I feel that everything is all right and nothing bad will happen.',
      'My arms and legs shake and tremble.',
      'I am bothered by headaches, neck, and back pains.',
      'I feel weak and get tired easily.',
      'I feel calm and can sit still easily.',
      'I can feel my heart beating fast.',
      'I am bothered by dizzy spells.',
      'I have fainting spells or feel like it.',
      'I can breathe in and out easily.',
      'I get feelings of numbness and tingling in my fingers and toes.',
      'I am bothered by stomach aches or indigestion.',
      'I have to empty my bladder often.',
      'My hands are usually dry and warm.',
      'My face gets hot and blushes.',
      'I fall asleep easily and get a good night’s rest.',
      'I have nightmares.',
    ],
    format: SAS_FMTS,
  },
  formats: { likert: SAS_FMT },
  // 5 道反向题（第 5、9、13、17、19 题）
  reverse: [5, 9, 13, 17, 19],
  scales: [
    {
      name: '总分',
      fullName: 'SAS 粗分',
      family: 'anx',
      bind: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      bandMetric: 'sum',
      // 区间按「标准分 = floor(粗分 × 1.25)」逐点回推到粗分空间：
      // 粗分 39→48、40→50；47→58、48→60；55→68、56→70。
      bands: [
        { min: 20, max: 39, minInc: true, maxInc: true, severity: '无/极轻微' },
        { min: 40, max: 47, minInc: true, maxInc: true, severity: '轻度' },
        { min: 48, max: 55, minInc: true, maxInc: true, severity: '中度' },
        { min: 56, max: 80, minInc: true, maxInc: true, severity: '重度' },
      ],
    },
  ],
  note: '标准分 = 粗分 × 1.25 后取整数部分（25–100）。中国常模：标准分分界值 50（50–59 轻度、60–69 中度、70 分及以上重度；部分资料写 69 分以上，本模块采用 ≥70）。常模参考值 42.25 ± 7.38。局限：焦虑是神经症的共同症状，SAS 在各类神经症鉴别中作用不大；临床分级除参考量表分值外，主要还应依据临床症状（特别是要害症状）的程度来划分。',
};
