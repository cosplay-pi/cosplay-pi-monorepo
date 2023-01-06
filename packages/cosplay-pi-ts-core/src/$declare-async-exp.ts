export const $declareAsyncExp = async <T>(
  $executeAsyncExp: () => Promise<T>,
): Promise<T> => {
  
  return await $executeAsyncExp();
}; 
