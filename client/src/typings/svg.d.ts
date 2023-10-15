declare module '*.svg' {
  const path: string;
  export default path;
}

declare module '*.svg?react' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module '*.png' {
  const path: string;
  export default path;
}
