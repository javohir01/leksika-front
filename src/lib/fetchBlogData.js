const url = "https://back.leksika.uz";
async function getLimit(page, limit) {
  const data = await fetch(
    `${url}/articles?page=${page}&limit=${limit}`
  );
  return await data.json();
}
async function getTag(page, limit, tag) {
  const data = await fetch(
    `${url}/articles?page=${page}&limit=${limit}`
  );
  return await data.json();
}

export { getLimit, getTag };
