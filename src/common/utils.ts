export const mod = (target: number, boundary: number) =>
  ((target % boundary) + boundary) % boundary;
