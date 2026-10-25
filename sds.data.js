// 抑郁自评量表（Self-Rating Depression Scale, SDS；Zung 1965）。
// 题项与计分依据 Zung 原始量表；4 级评分，正向题 1–4 分、反向题 4–1 分，
// 粗分 20–80，标准分 = floor(粗分 × 1.25)，范围 25–100。
//
// 引擎侧说明：4 个级别的内部索引为 0–3，靠 scoreShift: 1 把每题贡献抬到 1–4，
// 因此本模块的「粗分」就是 20–80 的标准区间（与临床一致），bands 直接落在粗分上。
import { makeLikert } from './formats.js';

const SDS_FMT = makeLikert(4, ['没有或很少时间', '少部分时间', '相当多时间', '绝大部分或全部时间']);
const SDS_FMTS = Array(20).fill('likert');

export const SDS_DATA = {
  id: 'sds',
  name: 'SDS 抑郁自评量表',
  blurb: '选择目标粗分，反推出一份 20 题作答（含 10 道反向题）；或直接导入、编辑并评分。',
  targetLabel: '目标粗分',
  targetTableTitle: '得分达成',
  scoreShift: 1,
  nItems: 20,
  items: {
    zh: [
      '我觉得闷闷不乐，情绪低沉',
      '我觉得一天中早晨最好',
      '我一阵阵哭出来或觉得想哭',
      '我晚上睡眠不好',
      '我吃得跟平常一样多',
      '我与异性密切接触时和以往一样感到愉快',
      '我发觉我的体重在下降',
      '我有便秘的苦恼',
      '我心跳比平常快',
      '我无缘无故地感到疲乏',
      '我的头脑跟平常一样清楚',
      '我觉得经常做的事情并没有困难',
      '我觉得不安而平静不下来',
      '我对将来抱有希望',
      '我比平常容易生气激动',
      '我觉得作出决定是容易的',
      '我觉得自己是个有用的人，有人需要我',
      '我的生活过得很有意思',
      '我认为如果我死了，别人会生活得好些',
      '平常感兴趣的事我仍然感兴趣',
    ],
    en: [
      'I feel down-hearted and blue.',
      'Morning is when I feel the best.',
      'I have crying spells or feel like it.',
      'I have trouble sleeping at night.',
      'I eat as much as I used to.',
      'I still enjoy sex.',
      'I notice that I am losing weight.',
      'I have trouble with constipation.',
      'My heart beats faster than usual.',
      'I get tired for no reason.',
      'My mind is as clear as it used to be.',
      'I find it easy to do the things I used to.',
      'I am restless and can’t keep still.',
      'I feel hopeful about the future.',
      'I am more irritable than usual.',
      'I find it easy to make decisions.',
      'I feel that I am useful and needed.',
      'My life is pretty full.',
      'I feel that others would be better off if I were dead.',
      'I still enjoy the things I used to do.',
    ],
    format: SDS_FMTS,
  },
  formats: { likert: SDS_FMT },
  // 10 道反向题（第 2、5、6、11、12、14、16、17、18、20 题）
  reverse: [2, 5, 6, 11, 12, 14, 16, 17, 18, 20],
  scales: [
    {
      name: '总分',
      fullName: 'SDS 粗分',
      family: 'dep',
      bind: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      bandMetric: 'sum',
      // 区间按「标准分 = floor(粗分 × 1.25)」逐点回推到粗分空间：
      // 粗分 42→52、43→53；50→62、51→63；58→72、59→73。
      bands: [
        { min: 20, max: 42, minInc: true, maxInc: true, severity: '无/极轻微' },
        { min: 43, max: 50, minInc: true, maxInc: true, severity: '轻度' },
        { min: 51, max: 58, minInc: true, maxInc: true, severity: '中度' },
        { min: 59, max: 80, minInc: true, maxInc: true, severity: '重度' },
      ],
    },
  ],
  note: '标准分 = 粗分 × 1.25 后取整数部分（25–100）。中国常模：标准分分界值 53（53–62 轻度、63–72 中度、73 分以上重度），总粗分正常上限为 41 分。第 19 题（无价值感 / 自杀念头）得分 > 1 时，临床上须评估自伤 / 自杀风险。本量表为筛查与严重程度评定工具，不能作为诊断依据。',
};
