export const apiGET = async (url: string) => {
  const data = await fetch(url, {
    headers: {
      "Content-Type": "application/vnd.api+json",
      "X-Auth-Token": "98357a64-d0d6-45c5-ae66-d030016ccd58",
      "X-Organization-Id": "20541",
    },
  });
  return data.json();
};

export const apiDELETE = async (url: string) => {
  const data = await fetch(url, {
    method: "delete",
    headers: {
      "Content-Type": "application/vnd.api+json",
      "X-Auth-Token": "98357a64-d0d6-45c5-ae66-d030016ccd58",
      "X-Organization-Id": "20541",
    },
  });
  return data.json();
};
