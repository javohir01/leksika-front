function cutter(text) {
text = text.replace("izhoh|", "")
    var reg = /(?<=\|ru)(.*?)(br\s*\/?>)/
    const ruIndex = text.search(reg)
    if (ruIndex !== -1) {
        console.log(text)
      const ruIndex1 = text.search(reg)
        const ruLastIndex = text.lastIndexOf(text.match(reg).pop())
        text = text.substring(ruIndex1, ruLastIndex).replace("= ", "").replace(/\/$/, "")
        text = text.substring(0, text.length - +(text.lastIndexOf('<')==text.length-1))
    } else {
        const tarjima = text.indexOf("=== Maʼnosi ===");
        const sinonim = text.indexOf("=== Sinonimlari ===");
        text = text.substring(tarjima, sinonim).split("=== Maʼnosi ===").join("")
    }
    let regex = /(?<=\''')(.*?)(?=\''')/;
let bold = /(?<=\{{tarjmisoli)(.*?)(?=\})/;
// console.log(bold.exec(text));
while (text.includes("'''")) {
  let matched = regex.exec(text);
  let wrap = '<b>' + matched[1] + '</b>';
  text = text.replace(`'''${matched[1]}'''`, wrap);
}
while (text.includes('{{tarjmisoli|')) {
  let matched = bold.exec(text).join('').split('|');
  let wrap = "<b style='color: green'>" + matched[1] + '</b>';
  text = text.replace(`{{tarjmisoli|${matched[1]}`, wrap);
//   console.log(matched[1]);
}
text = text
  .replaceAll('{{', '<i>')
  .replaceAll('}}', '</i>')
  .replaceAll('[[', '')
  .replaceAll(']]', '')
  .replaceAll("izoh|", "")
  .replaceAll("; <b", "; <br/> <b")
  .replaceAll(";<b", "; <br/> <b")
  .replace("(<b>1", "<br/>(<b>1")
    // console.log(text.split(" ")[text.split(" ").length - 1].replace("}}","=== Sinonimlari ==="))
    return text
}

export default cutter