function cutter(text) {
    const regex1 = /#:\s*{{ux-lite\|en\|([^}]*)}}/g;
    const regex2 = /#:\s*{{ux\|en\|([^}]*)}}/g;
    let boldReg = /(?<=\''')(.*?)(?=\''')/;
    const matches = [];
    while (text.includes("'''")) {
        let matched = boldReg.exec(text);
        let wrap = '<b>' + matched[1] + '</b>';
        text = text.replace(`'''${matched[1]}'''`, wrap);
    }
    let match;
    while ((match = regex1.exec(text)) !== null) {
        match[1] = match[1]
            .replaceAll('{{', '')
            .replaceAll('}}', '')
            .replaceAll("[[", '')
            .replaceAll(']]', '')
            .replaceAll("|", ' ')
        matches.push(match[1]);
    }
    while ((match = regex2.exec(text)) !== null) {
        match[1] = match[1]
            .replaceAll('{{', '')
            .replaceAll('}}', '')
            .replaceAll("[[", '')
            .replaceAll(']]', '')
            .replaceAll("|", ' ')
        matches.push(match[1]);
    }

    return matches.slice(0, 15);

}

export default cutter