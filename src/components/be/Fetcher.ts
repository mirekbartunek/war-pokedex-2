export const fetcher = async (endpoint: string) => {
  const response = await fetch(endpoint);
  const json = await response.json();
  return json;
};
