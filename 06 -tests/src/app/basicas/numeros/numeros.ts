export function incrementar(valor: number): number {
  if (valor > 100) {
    return 100;
  } else {
    return valor + 1;
  }
}
