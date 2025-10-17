import { CONJUGATION_TYPES, FORMAILTY, INTENTION, VERB_TYPE } from "./wordEnums";

const FORMS = {
	masu: "masu",
	nai: "nai",
	ta: "ta",
	te: "te"
}

const IRV = {
	iku: "いく",
	suru: "する",
	kuru: "くる",
	aru: "ある",
	tou: "とう"
}

class Verb
{
	irregularStems = ["いく", "行く", "する", "くる", "来る", "ある", "とう", "問う"];
	constuctor(rawVerb, type) {
		this.rawVerb = rawVerb
		this.type = type
		if (type === VERB_TYPE.irv) {
			for (let irrStem of this.irregularStems) {
				if(rawVerb.endsWith(irrStem)) {
					this.base = this.rawVerb.substring(0, this.rawVerb.length - irrStem.length);
					this.stem = irrStem;
					break;
				}
			}
		} else if(type === VERB_TYPE.ru){
			this.base = this.rawVerb.substring(0, this.rawVerb.length - 1)
			this.stem = '';
		} else {
			this.base = this.rawVerb.substring(0, this.rawVerb.length - 1)
			this.stem = this.rawVerb.charAt(this.rawVerb.length - 1);
		}
	}
}

class VerbConjugator {
	/**
	* @param {Verb} verb the verb to conjugate
	*/
	static Conjugate(verb, conjugation, tense, formality) {
		let conjugator = conjugationFunctions[PARTS_OF_SPEECH.verb][conjugation][verb.type];
		let conjugation = conjugator[tense][formality](verb.stem)
		return verb.base + conjugation;
	}
}

function changeToPastPlain(c) {
	switch(c){
		case "す":
			return "した";
		case "く":
			return "いた";
		case "ぐ":
			return "いだ";
		case "す":
			return "した";
		case "む":
		case "ぶ":
		case "ぬ":
			return "んだ";
		case "る":
		case "う":
		case "つ":
			return "った";
	}
}

export const TA_FORMS = Object.freeze({
	ta: KANA.ta,
	tta: "った",
    nda: "んだ",

    ita: "いた",
	ida: "いだ",
    shita: "した",
    kita: "きた",
});

export const TA_FORM = Object.freeze({
	[KANA.u]: TA_FORMS.tta,
    [KANA.tsu]: TA_FORMS.tta,
    [KANA.ru]: TA_FORMS.tta,

    [KANA.mu]: TA_FORMS.nda,
    [KANA.bu]: TA_FORMS.nda,
    [KANA.nu]: TA_FORMS.nda,

    [KANA.ku]: TA_FORMS.ita,
    [KANA.gu]: TA_FORMS.ida,

	
    [IRV.iku]: TA_FORMS.ita,
    [IRV.suru]: TA_FORMS.shita,
    [IRV.kuru]: TA_FORMS.kita,
});

export const STEM_CONVERT = Object.freeze({
    [KANA.u]: {
        [STEM.a]: KANA.wa,
        [STEM.i]: KANA.i,
        [STEM.e]: KANA.e,
        [STEM.o]: KANA.o
    },
    [KANA.ku]: {
        [STEM.a]: KANA.ka,
        [STEM.i]: KANA.ki,
        [STEM.e]: KANA.ke,
        [STEM.o]: KANA.ko
    },
    [KANA.gu]: {
        [STEM.a]: KANA.ga,
        [STEM.i]: KANA.gi,
        [STEM.e]: KANA.ge,
        [STEM.o]: KANA.go
    },
    [KANA.su]: {
        [STEM.a]: KANA.sa,
        [STEM.i]: KANA.shi,
        [STEM.e]: KANA.se,
        [STEM.o]: KANA.so
    },
    [KANA.zu]: {
        [STEM.a]: KANA.za,
        [STEM.i]: KANA.ji,
        [STEM.e]: KANA.ze,
        [STEM.o]: KANA.zo
    },
    [KANA.tsu]: {
        [STEM.a]: KANA.ta,
        [STEM.i]: KANA.chi,
        [STEM.e]: KANA.te,
        [STEM.o]: KANA.to
    },
    [KANA.tzu]: {
        [STEM.a]: KANA.da,
        [STEM.i]: KANA.zhi,
        [STEM.e]: KANA.ze,
        [STEM.o]: KANA.zo
    },
    [KANA.mu]: {
        [STEM.a]: KANA.ma,
        [STEM.i]: KANA.mi,
        [STEM.e]: KANA.me,
        [STEM.o]: KANA.mo
    },
    [KANA.nu]: {
        [STEM.a]: KANA.na,
        [STEM.i]: KANA.ni,
        [STEM.e]: KANA.ne,
        [STEM.o]: KANA.no
    },
    [KANA.fu]: {
        [STEM.a]: KANA.ha,
        [STEM.i]: KANA.hi,
        [STEM.e]: KANA.he,
        [STEM.o]: KANA.ho
    },
    [KANA.bu]: {
        [STEM.a]: KANA.ba,
        [STEM.i]: KANA.bi,
        [STEM.e]: KANA.be,
        [STEM.o]: KANA.bo
    },
    [KANA.pu]: {
        [STEM.a]: KANA.pa,
        [STEM.i]: KANA.pi,
        [STEM.e]: KANA.pe,
        [STEM.o]: KANA.po
    },
    [KANA.ru]: {
        [STEM.a]: KANA.ra,
        [STEM.i]: KANA.ri,
        [STEM.e]: KANA.re,
        [STEM.o]: KANA.ro
    }
});

export const SUFFIX = Object.freeze({
	desu: "です",
	deshita: "でした",

	masu: "ます",
	mashita: "ました",
	masen: "ません",
	masendeshita: `${this.masen}${this.deshita}`,

	katta: "かった",
	kunakatta: `くな${this.katta}`,

	nai: "ない",
	kunai: `く${this.nai}`
});

export const STEM = Object.freeze({
	a: KANA.a,
	i: KANA.i,
	e: KANA.e,
	o: KANA.o,
	u: KANA.u
});

export const KANA = Object.freeze({

	wa: "わ",


	a: "あ",
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
	dzu: "づ",
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

});

const conjugationFunctions = {
	[PARTS_OF_SPEECH.verb]: {
		[CONJUGATION_TYPES.present]: {
			[VERB_TYPE.irv]: irregularVerbConjugation(baseVerbText, affirmative, polite, CONJUGATION_TYPES.present),
			[VERB_TYPE.ru]: {
				[FORMAILTY.polite]: {
					[INTENTION.positive]: _ => [SUFFIX.masu],
					[INTENTION.negative]: _ => [SUFFIX.masen]
				},
				[FORMAILTY.casual]: {
					[INTENTION.positive]: _ => [KANA.ru],
					[INTENTION.negative]: _ => [SUFFIX.nai]
				}
			},
			[VERB_TYPE.u]: {
				[FORMAILTY.polite]: {
					[INTENTION.positive]: (stem) => [`${STEM_CONVERT[stem][KANA.i]}${SUFFIX.masu}`],
					[INTENTION.negative]: (stem) => [
						`${STEM_CONVERT[stem][KANA.i]}${SUFFIX.masen}`, 
						`${STEM_CONVERT[stem][KANA.a]}${SUFFIX.nai}${SUFFIX.desu}`
					]
				},
				[FORMAILTY.casual]: {
					[INTENTION.positive]: (stem) => [stem],
					[INTENTION.negative]: (stem) => [`${STEM_CONVERT[stem][KANA.a]}${SUFFIX.nai}`]
				}
			},
		},
		[CONJUGATION_TYPES.past]: {
			[VERB_TYPE.irv]: irregularVerbConjugation(baseVerbText, affirmative, polite, CONJUGATION_TYPES.past),
			[VERB_TYPE.ru]: {
				[FORMAILTY.polite]: {
					[INTENTION.positive]: _ => [SUFFIX.mashita],
					[INTENTION.negative]: _ => [SUFFIX.masendeshita]
				},
				[FORMAILTY.casual]: {
					[INTENTION.positive]: _ => [KANA.ta],
					[INTENTION.negative]: _ => [KANA.na + SUFFIX.katta]
				}
			},
			[VERB_TYPE.u]: {
				[FORMAILTY.polite]: {
					[INTENTION.positive]: (stem) => [`${STEM_CONVERT[stem][KANA.i]}${SUFFIX.mashita}`],
					[INTENTION.negative]: (stem) => [
						`${STEM_CONVERT[stem][KANA.i]}${SUFFIX.masen}${SUFFIX.deshita}`, 
						`${STEM_CONVERT[stem][KANA.a]}${KANA.na}${SUFFIX.katta}${SUFFIX.desu}`
					]
				},
				[FORMAILTY.casual]: {
					[INTENTION.positive]: (stem) => TA_FORMS[stem],
					[INTENTION.negative]: (stem) => `${STEM_CONVERT[stem][KANA.a]}${KANA.na}${SUFFIX.katta}`
				}
			},
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