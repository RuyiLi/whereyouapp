declare module 'lightcookie' {
  export function parse(cookie: string): Record<string, string>;
  export function serialize(cookieObject: Record<string, string>): string;
}
