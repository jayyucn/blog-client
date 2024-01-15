declare module 'vue' {
  export interface GlobalComponents {
    Icon: (typeof import('../src/components/Icon/index'))['Icon']
    BaseButton: (typeof import('../src/components/Button/index'))['BaseButton']
  }
}

export {}
