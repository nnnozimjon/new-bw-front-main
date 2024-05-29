export const ObjectToQuery = (obj: Record<string, any>): string => {
  let newObj: Record<string, any> = {};

  if (!obj) return "";

  Object.keys(obj).forEach((key) => {
    if (Array.isArray(obj[key])) {
      newObj[key] = obj[key].join(" ");
    }
    if (obj[key] !== "" && obj[key] !== null && obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
  });

  let searchParams = new URLSearchParams(newObj);
  return "?" + searchParams.toString();
};

export const QueryToObject = () => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return Object.fromEntries(urlSearchParams.entries());
};
