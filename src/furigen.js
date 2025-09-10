var words = require('./genkiwords');
const { fit } = require('furigana');
const fs = require("fs");
console.debug(`Running the thing for ${words.wordData.length} words`);

function toRubyHtml(input) {
  const escape = s => s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return input.replace(/([^\s\[\]]+?)\[(.+?)\]/g,
    (m, base, rt) => `<ruby>${escape(base)}<rt>${escape(rt)}</rt></ruby>`
  );
}

// example
// const input = "茶[ちゃ] 色[いろ]い";
// console.log(toRubyHtml(input));
let results = [];

let i = 2;
for(let vocab of words.wordData){
    i++
    if(vocab.category !== "verb" && vocab.category !== "adjective")
        continue;

    if (vocab.writing.includes("（") && vocab.reading.includes("（")){
        
        const writingMatch = vocab.writing.match(/^(.+?)（(.+?)）$/);
        const readingMatch = vocab.reading.match(/^(.+?)（(.+?)）$/);

        if (writingMatch && readingMatch) {
            const writingMain = writingMatch[1];   
            const writingInner = writingMatch[2];  
            const readingMain = readingMatch[1];   
            const readingInner = readingMatch[2];  
            let kanjiHtml = toRubyHtml(fit(readingMain, writingMain) + "(" + fit(readingInner, writingInner) + ")");
            vocab["kanji"] = kanjiHtml;
            results.push(vocab);
            console.log(i + ": " + toRubyHtml(fit(readingMain, writingMain) + "(" + fit(readingInner, writingInner) + ")"));
        } else {
            console.log("No match");
        }
        continue;
    }

    if (vocab.reading.includes("/")){
        let readings = vocab.reading.split("/")
        let kanjiHtml = toRubyHtml(fit(readings[0], vocab.writing));
        vocab["kanji"] = kanjiHtml;
        results.push(vocab);
        console.debug(i + ": " + toRubyHtml(fit(readings[0], vocab.writing)));
    } else if (vocab.writing.includes("/")){
        let writings = vocab.writing.split("/")
        let kanjiHtml = toRubyHtml(fit(vocab.reading, writings[0]));
        vocab["kanji"] = kanjiHtml;
        results.push(vocab);
        console.debug(i + ": " + toRubyHtml(fit(vocab.reading, writings[0])));
    } else {
        let kanjiHtml = toRubyHtml(fit(vocab.reading, vocab.writing));
        vocab["kanji"] = kanjiHtml;
        results.push(vocab);
        console.debug(i + ": " + toRubyHtml(fit(vocab.reading, vocab.writing)));
    }
}


const jsonl = results.map(obj => JSON.stringify(obj)).join("\n");

// Write to file
// fs.writeFileSync("output.json", jsonl, "utf8");


// fs.writeFileSync("output.json", JSON.stringify(results, null, 2), "utf8");

let GENKI_LEVEL = Object.freeze({
	L1: "L1",
	L2: "L2",
	L3: "L3",
	L4: "L4",
	L5: "L5",
	L6: "L6",
	L7: "L7",
	L8: "L8",
	L9: "L9",
	L10: "L10",
	L11: "L11",
	L12: "L12",
	L13: "L13",
	L14: "L14",
	L15: "L15",
	L16: "L16",
	L17: "L17",
	L18: "L18",
	L19: "L19",
	L20: "L20",
	L21: "L21",
	L22: "L22",
	L23: "L23",
})


console.log(GENKI_LEVEL["L1"])