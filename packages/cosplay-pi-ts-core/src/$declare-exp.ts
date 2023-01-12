export const $declareExp = <T>(
  $executeExp: () => T,
): T => {

  return $executeExp();
}; 
