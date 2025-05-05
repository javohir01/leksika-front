const url = "https://back.leksika.uz";

// GET

async function questions() {
  const data = await fetch(`${url}/question/get/`);
  return data;
}
async function questionById(id) {
  const data = await (
    await fetch(`${url}/question/${id}`)
  ).json();
  return await data;
}

export { questions, questionById };
