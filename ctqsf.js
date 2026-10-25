// CTQ-SF 的薄封装（仿 scl90.js）。
//
// 唯一的作用：把「最小化 / 否认（MD）」效度分量表从**可设目标**列表里过滤掉——
// likert.js:270-302 的 likertTargetScales 只过滤聚合项（bind:[0]），而 MD 是
// bind:[10,16,22] 的普通分量表，若不过滤会出现在左侧目标面板里被当成求解目标。
// 通用引擎里没有 noTarget / displayOnly 之类的标志（全库检索无命中），故在此过滤。
import { CTQSF_DATA } from './ctqsf.data.js';
import { likertTargetScales } from './likert.js';

export { CTQSF_DATA };

/** CTQ-SF 可设目标的分量表：五个临床分量表，不含 MD 效度分量表。 */
export function ctqsfTargetScales() {
  return likertTargetScales(CTQSF_DATA).filter((s) => s.family !== 'md');
}
