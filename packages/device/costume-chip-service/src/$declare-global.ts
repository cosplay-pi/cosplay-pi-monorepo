export const $declareGlobal = <T>(
  $globalInitialValue: T,
): [() => T, ($globalNewValue: T) => void] => {

  let $globalValue: T = $globalInitialValue;

  return [
    (): T => {

      return $globalValue;
    },
    (globalNewValue: T): void => {

      $globalValue = globalNewValue;
    },
  ];
};
