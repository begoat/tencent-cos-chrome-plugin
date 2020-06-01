// because we use base64 URIs
declare module '*.svg' {
  const content: string;
  export default content;
}

type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

declare const SUBPATH: string | undefined;
