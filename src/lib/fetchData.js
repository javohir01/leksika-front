const url = "https://back.leksika.uz";

//Read
async function readEngUzb(word) {
  const data = await fetch(`${url}/words/en-uz/autocomplete`);
  return data;
}
async function readUzbEng(word) {
  const data = await fetch(`${url}/words/uz-en/autocomplete`);
  return data;
}

//Find
async function findEngUzb(word) {
  const data = await fetch(`${url}/words/en-uz?s=${word}`);
  return await data;
}
async function findUzbEng(word) {
  const data = await fetch(`${url}/words/uz-en?s=${word}`);
  return await data;
}
async function findFile(id) {
  const data = await (
    await fetch(`${url}/grammars/${id}`)
  ).json();
  return await data;
}
export { readEngUzb, readUzbEng, findEngUzb, findUzbEng, findFile };
