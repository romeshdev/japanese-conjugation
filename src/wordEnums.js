export const PARTS_OF_SPEECH = Object.freeze({
	verb: "verb",
	adjective: "adjective",
});

export const VERB_TYPE = Object.freeze({
	u: "u",
	ru: "ru",
	irv: "irv",
	ichidan: this.ru,
	godan: this.u
});

export const ADJ_TYPE = Object.freeze({
	i: "i",
	na: "na",
	ira: "ira"
});

export const CONJUGATION_TYPES = Object.freeze({
	present: "Present",
	past: "Past",
	te: "て-form",
	adverb: "Adverb",
	volitional: "Volitional",
	passive: "Passive",
	causative: "Causative",
	potential: "Potential",
	imperative: "Imperative",
});

// export const TENSE = Object.freeze({
// 	present: "present",
// 	past: "past"
// });

export const INTENTION = Object.freeze({
	positive: true,
	negative: false
});

export const FORMAILTY = Object.freeze({
	polite: "polite",
	casual: "casual"
});

export const IRREGULAR_TYPES = Object.freeze({
	iku: ["いく", "行く"],
	suru: ["する"],
	kuru: ["くる", "来る"],
	aru: ["ある"],
	tou: ["とう", "問う"]
});

export const GENKI_LEVEL = Object.freeze({
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
