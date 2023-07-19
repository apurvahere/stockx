export const onLoading = async (
  loading: boolean,
  setLoading: (loading: boolean) => void,
  func: Function
) => {
  if (loading) return;

  if (setLoading) {
    setLoading(true);
  }

  const result = await func();

  if (setLoading) {
    setLoading(false);
  }

  return result;
};
