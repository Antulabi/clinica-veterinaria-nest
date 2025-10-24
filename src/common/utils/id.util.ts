// Generador de ID unicos
export function generarId(): string {
  // usamos el timestamp y un numero aleatorio que va de 0 a 9999
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}
// y lo exportamos para usarlo en otros lados.