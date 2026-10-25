// PTSD 检查清单（DSM-5 版）（PTSD Checklist for DSM-5, PCL-5；Weathers 等 2013，
// 美国国家 PTSD 中心）。20 题，5 级评分 0–4，总分 0–80。
//
// 结构：四个 DSM-5 症状簇（B/C/D/E）可各自设目标，总分为聚合项
// （type:'sum' + bind:[0]），由 likert.js 自动汇总——聚合项会被 likertSolve 跳过，
// 因此不会被当成需要独立满足的目标（参照 HADS 总分的写法）。
import { makeLikert } from './formats.js';

const PCL5_FMT = makeLikert(5, ['完全没有', '有一点', '中度', '相当程度', '极度']);
const PCL5_FMTS = Array(20).fill('likert');

export const PCL5_DATA = {
  id: 'pcl5',
  name: 'PCL-5 创伤后应激障碍检查清单',
  blurb: '选择目标总分或各簇得分，反推出一份 20 题作答；PTSD 症状严重程度资料参考。',
  targetLabel: '目标得分',
  targetTableTitle: '得分达成',
  scoreShift: 0,
  nItems: 20,
  items: {
    zh: [
      '反复出现关于压力事件的、令人不安且不想要的记忆',
      '反复做与压力事件有关的、令人不安的梦',
      '突然感觉或表现得好像压力事件又真实发生（如仿佛重回现场，或出现闪回）',
      '当某件事让你想起压力事件时，感到非常难过',
      '当某件事让你想起压力事件时，出现强烈的生理反应（如心跳加速、呼吸困难、出汗）',
      '回避与压力事件有关的记忆、想法或感受',
      '回避与压力事件有关的外部提醒（人、地点、谈话、活动、物品或情境）',
      '难以记住压力事件的重要部分',
      '对自己、他人或世界持有强烈的负性信念（如「我很坏」「没人可信」「世界完全危险」）',
      '因压力事件或其后果而责怪自己或他人',
      '有强烈的负性情绪，如害怕、恐惧、愤怒、内疚或羞耻',
      '对过去喜欢的活动失去兴趣',
      '感觉与他人疏远或隔绝',
      '难以体验积极情绪（如无法感到快乐，或对亲近的人没有爱的感觉）',
      '易激惹、发脾气或有攻击性行为',
      '过度冒险或做可能伤害自己的事',
      '过度警觉或戒备',
      '容易受惊或惊跳',
      '难以集中注意力',
      '难以入睡或保持睡眠',
    ],
    en: [
      'Repeated, disturbing, and unwanted memories of the stressful experience',
      'Repeated, disturbing dreams of the stressful experience',
      'Suddenly feeling or acting as if the stressful experience were actually happening again',
      'Feeling very upset when something reminded you of the stressful experience',
      'Strong physical reactions when something reminded you of the stressful experience',
      'Avoiding memories, thoughts, or feelings related to the stressful experience',
      'Avoiding external reminders of the stressful experience',
      'Trouble remembering important parts of the stressful experience',
      'Having strong negative beliefs about yourself, other people, or the world',
      'Blaming yourself or someone else for the stressful experience or what happened after it',
      'Having strong negative feelings such as fear, horror, anger, guilt, or shame',
      'Loss of interest in activities that you used to enjoy',
      'Feeling distant or cut off from other people',
      'Trouble experiencing positive feelings',
      'Irritable behavior, angry outbursts, or acting aggressively',
      'Taking too many risks or doing things that could cause you harm',
      'Being superwatchful or on guard',
      'Feeling jumpy or easily startled',
      'Having difficulty concentrating',
      'Trouble falling or staying asleep',
    ],
    format: PCL5_FMTS,
  },
  formats: { likert: PCL5_FMT },
  scales: [
    {
      name: 'B 侵入',
      fullName: '簇 B：侵入症状',
      family: 'ptsd_b',
      bind: [1, 2, 3, 4, 5],
      bandMetric: 'sum',
      bands: [],
    },
    {
      name: 'C 回避',
      fullName: '簇 C：回避症状',
      family: 'ptsd_c',
      bind: [6, 7],
      bandMetric: 'sum',
      bands: [],
    },
    {
      name: 'D 认知心境',
      fullName: '簇 D：认知与心境的负性改变',
      family: 'ptsd_d',
      bind: [8, 9, 10, 11, 12, 13, 14],
      bandMetric: 'sum',
      bands: [],
    },
    {
      name: 'E 警觉性',
      fullName: '簇 E：警觉性与反应性的改变',
      family: 'ptsd_e',
      bind: [15, 16, 17, 18, 19, 20],
      bandMetric: 'sum',
      bands: [],
    },
    {
      // 聚合项：由引擎自动汇总 20 题，不可直接设目标（likertTargetScales 会过滤）
      name: '总分',
      fullName: 'PCL-5 总分',
      family: 'total',
      type: 'sum',
      bind: [0],
      bandMetric: 'sum',
      bands: [
        { min: 0, max: 32, minInc: true, maxInc: true, severity: '未达筛查阈值' },
        { min: 33, max: 80, minInc: true, maxInc: true, severity: '达筛查阈值（提示 PTSD）' },
      ],
    },
  ],
  note: '总分 0–80，本模块采用 33 作为暂定分界值（文献常用区间为 31–33，须在使用时注明所选口径）。四个症状簇（B 1–5、C 6–7、D 8–14、E 15–20）可分别设目标，总分自动汇总。DSM-5 症状符合判定另有一套规则（每题 ≥2 视为存在，且 B≥1、C≥1、D≥2、E≥2）。诊断金标准是结构化临床访谈（如 CAPS-5），PCL-5 不能单独作为诊断依据。第 9 题涉及强烈负性信念，临床上须关注自伤风险。',
};
