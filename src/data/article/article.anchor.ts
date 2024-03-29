export interface Anchor {
    title: string;
    href: string;
    level: number; // 标题级别，例如 h1, h2, h3 等
    children: Anchor[]
  }