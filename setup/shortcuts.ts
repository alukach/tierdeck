import type { NavOperations, ShortcutOptions } from '@slidev/types'

// Custom shortcuts:
//   T          jump to the tier list
//   End        jump to the last slide
// (Plain function instead of defineShortcutsSetup, which is an identity helper;
// this keeps @slidev/types a type-only import.)
export default (nav: NavOperations, base: ShortcutOptions[]): ShortcutOptions[] => [
  ...base,
  { name: 'go_tiers', key: 't', fn: () => nav.go('tiers' as any), autoRepeat: false },
  { name: 'go_last_end', key: 'end', fn: () => nav.goLast(), autoRepeat: false },
]
