export const fetcher = async (endpoint: string) => {
  const response = await fetch(endpoint);
  if (!response.ok) {
    switch (response.status) {
      case 404:
        throw new Error("Not found");
    }
  }

  return await response.json();
};
