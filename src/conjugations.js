import { CONJUGATION_TYPES, FORMAILTY, INTENTION, VERB_TYPE } from "./wordEnums";

const FORMS = {
	masu: "masu",
	nai: "nai",
	ta: "ta",
	te: "te"
}

const uFormMap = {
	[FORMS.masu]: {
		["u"]: "i",
		["ru"]: "ri",
		["su"]: "shi"
	},
	
	[FORMS.nai]: {
		["u"]: "wa",
		["ru"]: "ra",
		["su"]: "sa"
	}
}

const CONJUGATIONS = {
	desu: "です",
	deshita: "でした",

	masu: "ます",
	mashita: "ました",
	masen: "ません",
	masendeshita: "ませんでした",

	katta: "かった",
	nai: "ない"
}

const ROMAJI = {

	a: "わ",
	ka: "か",
	ga: "が",
	sa: "さ",
	za: "ざ",
	ta: "た",
	da: "だ",
	na: "な",
	ha: "は",
	ba: "ば",
	pa: "ぱ",
	ma: "ま",
	ra: "ら",

	i: "い",
	ki: "き",
	gi: "ぎ",
	shi: "し",
	ji: "じ",
	chi: "ち",
	zhi: "ぢ",
	ni: "に",
	hi: "ひ",
	bi: "び",
	pi: "ぴ",
	mi: "み",
	ri: "り",

	u: "う",
	ku: "く",
	gu: "ぐ",
	su: "す",
	zu: "ず",
	tsu: "つ",
	tzu: "づ",
	mu: "ぬ",
	fu: "ふ",
	bu: "ぶ",
	pu: "ぷ",
	mu: "む",
	ru: "る",

	e: "え",
	ke: "け",
	ge: "げ",
	se: "せ",
	ze: "ぜ",
	te: "て",
	de: "で",
	ne: "ね",
	he: "へ",
	be: "べ",
	pe: "ぺ",
	me: "め",
	re: "れ",

	o: "お",
	ko: "こ",
	go: "ご",
	so: "そ",
	zo: "ぞ",
	to: "と",
	do: "ど",
	no: "の",
	ho: "ほ",
	bo: "ぼ",
	po: "ぽ",
	mo: "も",
	ro: "ろ",

}

class VerbConjugator {
	static Split(baseVerbText) {
		return baseVerbText;
	}
	static GetConjugation(stem, suffix) {

	}
}


class AdjConjugator {
	static GetConjugation(stem, suffix) {

	}
}

const conjugationFunctions = {
	[PARTS_OF_SPEECH.verb]: {
		[CONJUGATION_TYPES.present]: {
			[VERB_TYPE.irv]: irregularVerbConjugation(baseVerbText, affirmative, polite, CONJUGATION_TYPES.present),
			[VERB_TYPE.ru]: {
				[FORMAILTY.polite]: {
					[INTENTION.positive]: _ => CONJUGATIONS.masu,
					[INTENTION.negative]: _ => CONJUGATIONS.masen
				},
				[FORMAILTY.casual]: {
					[INTENTION.positive]: _ => ROMAJI.ru,
					[INTENTION.negative]: _ => CONJUGATIONS.nai
				}
			},
			[VERB_TYPE.u]: {
				[FORMAILTY.polite]: {
					[INTENTION.positive]: (char) => uFormMap[FORMS.masu][char] + CONJUGATIONS.masu,
					[INTENTION.negative]: (char) => [`${uFormMap[FORMS.masu][char]}${CONJUGATIONS.masen}`, `${uFormMap[FORMS.nai][char]}${CONJUGATIONS.nai}${CONJUGATIONS.desu}`]
				},
				[FORMAILTY.casual]: {
					[INTENTION.positive]: (char) => char,
					[INTENTION.negative]: (char) => uFormMap[FORMS.nai][char] + CONJUGATIONS.nai
				}
			},
		},
		[CONJUGATION_TYPES.past]: {
			[VERB_TYPE.irv]: irregularVerbConjugation(baseVerbText, affirmative, polite, CONJUGATION_TYPES.past),
			[VERB_TYPE.ru]: {
				[FORMAILTY.polite]: {
					[INTENTION.positive]: _ => CONJUGATIONS.mashita,
					[INTENTION.negative]: _ => CONJUGATIONS.masendeshita
				},
				[FORMAILTY.casual]: {
					[INTENTION.positive]: _ => ROMAJI.ta,
					[INTENTION.negative]: _ => ROMAJI.na + CONJUGATIONS.katta
				}
			},
			[VERB_TYPE.u]: {
				[FORMAILTY.polite]: {
					[INTENTION.positive]: (char) => uFormMap[FORMS.masu][char] + CONJUGATIONS.mashita,
					[INTENTION.negative]: (char) => [`${uFormMap[FORMS.masu][char]}${CONJUGATIONS.masendeshita}`, `${uFormMap[FORMS.nai][char]}${ROMAJI.na}${CONJUGATIONS.katta}${CONJUGATIONS.desu}`]
				},
				[FORMAILTY.casual]: {
					[INTENTION.positive]: (char) => char,// Ta form map
					[INTENTION.negative]: (char) => uFormMap[FORMS.nai][char] + CONJUGATIONS.nai
				}
			},
		},
		
		function (baseVerbText, type, affirmative, polite) {
			if (type == VERB_TYPE.irv)
				return irregularVerbConjugation(baseVerbText, affirmative, polite, CONJUGATION_TYPES.past);
			
			if (affirmative && polite)
				return masuStem(baseVerbText, type) + "ました";
			
			if (affirmative && !polite && type == VERB_TYPE.u)
				return (dropFinalLetter(baseVerbText) + changeToPastPlain(baseVerbText.charAt(baseVerbText.length - 1)));
			
			if (affirmative && !polite && type == VERB_TYPE.ru)
				return masuStem(baseVerbText, type) + "た";

			if (!affirmative && polite) {
				let plainNegative = plainNegativeComplete(baseVerbText, type);
				let plainNegativePast = dropFinalLetter(plainNegative) + "かった";
				return [
					masuStem(baseVerbText, type) + "ませんでした",
					plainNegativePast + "です",
				];
			}

			if (!affirmative && !polite)
				return dropFinalLetter(plainNegativeComplete(baseVerbText, type)) + "かった";
		},
		[CONJUGATION_TYPES.te]: function (baseVerbText, type) {
			if (type == VERB_TYPE.irv) {
				return irregularVerbConjugation(
					baseVerbText,
					false,
					false,
					CONJUGATION_TYPES.te
				);
			} else if (type == VERB_TYPE.u) {
				let finalChar = baseVerbText.charAt(baseVerbText.length - 1);
				if (finalChar == "う" || finalChar == "つ" || finalChar == "る") {
					return dropFinalLetter(baseVerbText) + "って";
				} else if (
					finalChar == "む" ||
					finalChar == "ぶ" ||
					finalChar == "ぬ"
				) {
					return dropFinalLetter(baseVerbText) + "んで";
				} else if (finalChar == "く") {
					return dropFinalLetter(baseVerbText) + "いて";
				} else if (finalChar == "ぐ") {
					return dropFinalLetter(baseVerbText) + "いで";
				} else if (finalChar == "す") {
					return dropFinalLetter(baseVerbText) + "して";
				}
			} else if (type == VERB_TYPE.ru) {
				return masuStem(baseVerbText, type) + "て";
			}
		},
		// Volitional does not distinguish between affirmative and negative,
		// but take it in as a param so this function's structure matches the other conjugation functions
		[CONJUGATION_TYPES.volitional]: function (baseVerbText, type, affirmative, polite) {
			if (type === VERB_TYPE.irv) {
				return irregularVerbConjugation(
					baseVerbText,
					false,
					polite,
					CONJUGATION_TYPES.volitional
				);
			} else if (polite) {
				return masuStem(baseVerbText, type) + "ましょう";
			} else if (!polite) {
				if (type === VERB_TYPE.u) {
					return (
						dropFinalLetter(baseVerbText) +
						changeUtoO(baseVerbText.charAt(baseVerbText.length - 1)) +
						"う"
					);
				} else if (type === VERB_TYPE.ru) {
					return masuStem(baseVerbText, type) + "よう";
				}
			}
		},
		[CONJUGATION_TYPES.passive]: function (baseVerbText, type, affirmative, polite) {

			let res = {
				[true]: {
					[true]: {},
					[false]: {}
				},
				[false]: {	
					[true]: {},
					[false]: {}
				}
			}

			if (type === VERB_TYPE.irv) {
				return irregularVerbConjugation(baseVerbText, affirmative, polite, CONJUGATION_TYPES.passive);
			}

			const verbEndingWithA =
				dropFinalLetter(baseVerbText) +
				changeUtoA(baseVerbText.charAt(baseVerbText.length - 1));

			// let conjugation = {
			// 	[INTENTION.positive]: {
			// 		[FORMAILTY.polite]: "れます",
			// 		[FORMAILTY.casual]: "れる"
			// 	},
			// 	[INTENTION.negative]: {	
			// 		[FORMAILTY.polite]: "れません",
			// 		[FORMAILTY.casual]: "れない"
			// 	}
			// }[affirmative, polite];
			// return verbEndingWithA + conjugation;
			if (affirmative && polite) {
				return verbEndingWithA + "れます";
			} else if (affirmative && !polite) {
				return verbEndingWithA + "れる";
			} else if (!affirmative && polite) {
				return verbEndingWithA + "れません";
			} else if (!affirmative && !polite) {
				return verbEndingWithA + "れない";
			}
		},
		[CONJUGATION_TYPES.causative]: function (baseVerbText, type, affirmative, polite) {
			if (type === VERB_TYPE.irv) {
				return irregularVerbConjugation(baseVerbText, affirmative, polite, CONJUGATION_TYPES.causative);
			}

			let verbCausativeRoot;
			if (type === VERB_TYPE.ru) {
				verbCausativeRoot = dropFinalLetter(baseVerbText) + "さ";
			} else if (type === VERB_TYPE.u) {
				verbCausativeRoot =
					dropFinalLetter(baseVerbText) +
					changeUtoA(baseVerbText.charAt(baseVerbText.length - 1));
			}

			if (affirmative && polite) {
				return verbCausativeRoot + "せます";
			} else if (affirmative && !polite) {
				return verbCausativeRoot + "せる";
			} else if (!affirmative && polite) {
				return verbCausativeRoot + "せません";
			} else if (!affirmative && !polite) {
				return verbCausativeRoot + "せない";
			}
		},
		[CONJUGATION_TYPES.potential]: function (baseVerbText, type, affirmative, polite) {
			if (type === VERB_TYPE.irv) {
				return irregularVerbConjugation(baseVerbText, affirmative, polite, CONJUGATION_TYPES.potential);
			}

			const roots = [];
			if (type === VERB_TYPE.u) {
				roots.push(
					dropFinalLetter(baseVerbText) +
						changeUtoE(baseVerbText.charAt(baseVerbText.length - 1))
				);
			} else if (type === VERB_TYPE.ru) {
				// The default spelling should be the dictionary correct "られる",
				// but also allow the common shortened version "れる".
				roots.push(dropFinalLetter(baseVerbText) + "られ");
				roots.push(dropFinalLetter(baseVerbText) + "れ");
			}

			if (affirmative && polite) {
				return roots.map((r) => r + "ます");
			} else if (affirmative && !polite) {
				return roots.map((r) => r + "る");
			} else if (!affirmative && polite) {
				return roots.map((r) => r + "ません");
			} else if (!affirmative && !polite) {
				return roots.map((r) => r + "ない");
			}
		},
		[CONJUGATION_TYPES.imperative]: function (baseVerbText, type) {
			if (type === VERB_TYPE.irv) {
				return irregularVerbConjugation(baseVerbText, null, null, CONJUGATION_TYPES.imperative);
			}

			if (type === VERB_TYPE.ru) {
				return [
					dropFinalLetter(baseVerbText) + "ろ",
					// よ seems to be used as an ending only in written Japanese, but still allow it
					dropFinalLetter(baseVerbText) + "よ",
				];
			}

			if (type === VERB_TYPE.u) {
				return (
					dropFinalLetter(baseVerbText) +
					changeUtoE(baseVerbText.charAt(baseVerbText.length - 1))
				);
			}
		},
	},

	[PARTS_OF_SPEECH.adjective]: {
		[CONJUGATION_TYPES.present]: function (baseAdjectiveText, type, affirmative, polite) {
			if (type == ADJ_TYPE.ira) {
				return irregularAdjectiveConjugation(baseAdjectiveText, affirmative, polite, CONJUGATION_TYPES.present);
			} else if (affirmative && polite) {
				return baseAdjectiveText + "です";
			} else if (affirmative && !polite && type == ADJ_TYPE.i) {
				return baseAdjectiveText;
			} else if (affirmative && !polite && type == ADJ_TYPE.na) {
				return baseAdjectiveText + "だ";
			} else if (!affirmative && polite && type == ADJ_TYPE.i) {
				return [
					dropFinalLetter(baseAdjectiveText) + "くないです",
					dropFinalLetter(baseAdjectiveText) + "くありません",
				];
			} else if (!affirmative && polite && type == ADJ_TYPE.na) {
				return [
					baseAdjectiveText + "じゃないです",
					baseAdjectiveText + "ではないです",
					baseAdjectiveText + "じゃありません",
					baseAdjectiveText + "ではありません",
				];
			} else if (!affirmative && !polite && type == ADJ_TYPE.i) {
				return dropFinalLetter(baseAdjectiveText) + "くない";
			} else if (!affirmative && !polite && type == ADJ_TYPE.na) {
				return [
					baseAdjectiveText + "じゃない",
					baseAdjectiveText + "ではない",
				];
			}
		},
		[CONJUGATION_TYPES.past]: function (baseAdjectiveText, type, affirmative, polite) {
			if (type == ADJ_TYPE.ira) {
				return irregularAdjectiveConjugation(baseAdjectiveText, affirmative, polite, CONJUGATION_TYPES.past);
			} else if (affirmative && polite && type == ADJ_TYPE.i) {
				return dropFinalLetter(baseAdjectiveText) + "かったです";
			} else if (affirmative && polite && type == ADJ_TYPE.na) {
				return baseAdjectiveText + "でした";
			} else if (affirmative && !polite && type == ADJ_TYPE.i) {
				return dropFinalLetter(baseAdjectiveText) + "かった";
			} else if (affirmative && !polite && type == ADJ_TYPE.na) {
				return baseAdjectiveText + "だった";
			} else if (!affirmative && polite && type == ADJ_TYPE.i) {
				return [
					dropFinalLetter(baseAdjectiveText) + "くなかったです",
					dropFinalLetter(baseAdjectiveText) + "くありませんでした",
				];
			} else if (!affirmative && polite && type == ADJ_TYPE.na) {
				return [
					baseAdjectiveText + "じゃなかったです",
					baseAdjectiveText + "ではなかったです",
					baseAdjectiveText + "じゃありませんでした",
					baseAdjectiveText + "ではありませんでした",
				];
			} else if (!affirmative && !polite && type == ADJ_TYPE.i) {
				return dropFinalLetter(baseAdjectiveText) + "くなかった";
			} else if (!affirmative && !polite && type == ADJ_TYPE.na) {
				return [
					baseAdjectiveText + "じゃなかった",
					baseAdjectiveText + "ではなかった",
				];
			}
		},
		[CONJUGATION_TYPES.adverb]: function (baseAdjectiveText, type) {
			if (type == ADJ_TYPE.ira) {
				return irregularAdjectiveConjugation(baseAdjectiveText, false, false, CONJUGATION_TYPES.adverb);
			} else if (type == ADJ_TYPE.i) {
				return dropFinalLetter(baseAdjectiveText) + "く";
			} else if (type == ADJ_TYPE.na) {
				return baseAdjectiveText + "に";
			}
		},
	},
};