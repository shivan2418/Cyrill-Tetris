var RU_TO_LAT_FULL = {
  "а": "a",
  "б": "b",
  "в": "v",
  "г": "g",
  "д": "d",
  "е": "e",
 // "ё": "yo",
  "ж": "zh, sh, s",
  "з": "z",
  "и": "i",
  "й": "y, ij",
  "к": "k",
  "л": "l",
  "м": "m",
  "н": "n",
  "о": "o",
  "п": "p",
  "р": "r",
  "с": "s, c",
  "т": "t",
  "у": "u, oo",
  "ф": "f",
  "х": "kh, h",
  "ц": "ts",
  "ч": "ch",
  "ш": "sh, ch",
  "щ": "sz, sht",
  "ъ": "ø, u, a,oe",
  "ы": "y",
  "ь": "j, y",
//  "э": "eh",
  "ю": "ju, yu",
  "я": "ya, ja",
//tilføjer lidt
  "Б": "B, b", //jeg kan ikke finde det omvendt V som er et i, men nu er det rettet til.
//  "Ѡ": ? Jeg gætter på w, men det bliver en anden dag.
}



var RU_TO_LAT_HARD_ONLY = {
  "б": "b",
  "в": "v",
  "г": "g",
  "д": "d",
  "ё": "yo",
  "ж": "zh",
  "з": "z",
  "и": "i",
  "й": "j",
  "л": "l",
  "н": "n",
  "п": "p",
  "р": "r",
  "с": "s",
  "т": "t",
  "у": "u",
  "ф": "f",
  "х": "h",
  "ц": "c",
  "ч": "ch",
  "ш": "sh",
  "щ": "sz",
  "ъ": "#",
  "ы": "y",
  "ь": "'",
  "э": "eh",
  "ю": "ju",
  "я": "ja",
}

RUS_ALL_LETTERS_FULL = RU_TO_LAT_FULL;
RUS_ALL_LETTERS_HARD_ONLY = RU_TO_LAT_HARD_ONLY;

var SYLLABUS_DICT = {
  "RUS_ALL_LETTERS_FULL":RUS_ALL_LETTERS_FULL,
  "RUS_ALL_LETTERS_HARD_ONLY":RUS_ALL_LETTERS_HARD_ONLY
}

var SYLLABUS_NAMES = {
  "RUS_ALL_LETTERS_FULL":"Russian all letters",
  "RUS_ALL_LETTERS_HARD_ONLY":"Russian hard letters only"
}


module.exports = {SYLLABUS_NAMES, SYLLABUS_DICT, RU_TO_LAT_FULL, RU_TO_LAT_HARD_ONLY, RUS_ALL_LETTERS_FULL, RUS_ALL_LETTERS_HARD_ONLY };
