export const VOWEL = Object.freeze({
	a: "a",
	i: "i",
	e: "e",
	o: "o",
	u: "u"
});

const thing = {
    [KANA.u]: {
        [VOWEL.a]: KANA.a,
        [VOWEL.i]: KANA.i,
        [VOWEL.e]: KANA.e,
        [VOWEL.o]: KANA.o
    },
    [KANA.ku]: {
        [VOWEL.a]: KANA.ka,
        [VOWEL.i]: KANA.ki,
        [VOWEL.e]: KANA.ke,
        [VOWEL.o]: KANA.ko
    },
    [KANA.gu]: {
        [VOWEL.a]: KANA.ga,
        [VOWEL.i]: KANA.gi,
        [VOWEL.e]: KANA.ge,
        [VOWEL.o]: KANA.go
    },
    [KANA.su]: {
        [VOWEL.a]: KANA.sa,
        [VOWEL.i]: KANA.shi,
        [VOWEL.e]: KANA.se,
        [VOWEL.o]: KANA.so
    },
    [KANA.zu]: {
        [VOWEL.a]: KANA.a,
        [VOWEL.i]: KANA.shi,
        [VOWEL.e]: KANA.se,
        [VOWEL.o]: KANA.so
    },
    [KANA.tsu]: {},
    [KANA.tzu]: {},
    [KANA.mu]: {},
    [KANA.fu]: {},
    [KANA.bu]: {},
    [KANA.pu]: {},
    [KANA.mu]: {},
    [KANA.ru]: {},
    
}

class Vowel {
    static Convert(vowel, target) {
        switch(target){
            case VOWEL.a:
            case VOWEL.i:
            case VOWEL.e:
            case VOWEL.o:
            case VOWEL.u:
        }
    }
}

function changeUtoI(c) {
	if (c === "う") {
		return "い";
	} else if (c === "く") {
		return "き";
	} else if (c === "ぐ") {
		return "ぎ";
	} else if (c === "す") {
		return "し";
	} else if (c === "ず") {
		return "じ";
	} else if (c === "つ") {
		return "ち";
	} else if (c === "づ") {
		return "ぢ";
	} else if (c === "ぬ") {
		return "に";
	} else if (c === "ふ") {
		return "ひ";
	} else if (c === "ぶ") {
		return "び";
	} else if (c === "ぷ") {
		return "ぴ";
	} else if (c === "む") {
		return "み";
	} else if (c === "る") {
		return "り";
	} else {
		console.debug("Input was not う in changeUtoI, was " + c);
	}
}

function changeUtoA(c) {
	if (c === "う") {
		return "わ";
	} else if (c === "く") {
		return "か";
	} else if (c === "ぐ") {
		return "が";
	} else if (c === "す") {
		return "さ";
	} else if (c === "ず") {
		return "ざ";
	} else if (c === "つ") {
		return "た";
	} else if (c === "づ") {
		return "だ";
	} else if (c === "ぬ") {
		return "な";
	} else if (c === "ふ") {
		return "は";
	} else if (c === "ぶ") {
		return "ば";
	} else if (c === "ぷ") {
		return "ぱ";
	} else if (c === "む") {
		return "ま";
	} else if (c === "る") {
		return "ら";
	} else {
		console.debug("Input was not う in changeUtoA, was " + c);
	}
}

function changeUtoO(c) {
	if (c === "う") {
		return "お";
	} else if (c === "く") {
		return "こ";
	} else if (c === "ぐ") {
		return "ご";
	} else if (c === "す") {
		return "そ";
	} else if (c === "ず") {
		return "ぞ";
	} else if (c === "つ") {
		return "と";
	} else if (c === "づ") {
		return "ど";
	} else if (c === "ぬ") {
		return "の";
	} else if (c === "ふ") {
		return "ほ";
	} else if (c === "ぶ") {
		return "ぼ";
	} else if (c === "ぷ") {
		return "ぽ";
	} else if (c === "む") {
		return "も";
	} else if (c === "る") {
		return "ろ";
	} else {
		console.debug("Input was not う in changeUtoO, was " + c);
	}
}

function changeUtoE(c) {
	if (c === "う") {
		return "え";
	} else if (c === "く") {
		return "け";
	} else if (c === "ぐ") {
		return "げ";
	} else if (c === "す") {
		return "せ";
	} else if (c === "ず") {
		return "ぜ";
	} else if (c === "つ") {
		return "て";
	} else if (c === "づ") {
		return "で";
	} else if (c === "ぬ") {
		return "ね";
	} else if (c === "ふ") {
		return "へ";
	} else if (c === "ぶ") {
		return "べ";
	} else if (c === "ぷ") {
		return "ぺ";
	} else if (c === "む") {
		return "め";
	} else if (c === "る") {
		return "れ";
	} else {
		console.debug("Input was not う in changeUtoE, was " + c);
	}
}