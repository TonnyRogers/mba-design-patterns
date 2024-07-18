export default interface HttpServe {
  on(method: string, url: string, callback: Function): void;
  listen(port: number): void;
}