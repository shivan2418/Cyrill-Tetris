var RU_TO_LAT_FULL = {
  "а": "a",
  "б": "b",
  "в": "v",
  "г": "g",
  "д": "d",
  "е": "e",
  "ё": "yo",
  "ж": "zh",
  "з": "z",
  "и": "i",
  "й": "j",
  "к": "k",
  "л": "l",
  "м": "m",
  "н": "n",
  "о": "o",
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

RUS_ALL_LETTERS_FULL = Array.from(Object.keys(RU_TO_LAT_FULL));
RUS_ALL_LETTERS_HARD_ONLY = Array.from(Object.keys(RU_TO_LAT_HARD_ONLY));

var SYLLABUS_DICT = {
  "RUS_ALL_LETTERS_FULL":RUS_ALL_LETTERS_FULL,
  "RUS_ALL_LETTERS_HARD_ONLY":RUS_ALL_LETTERS_HARD_ONLY
}

var SYLLABUS_NAMES = {
  "RUS_ALL_LETTERS_FULL":"Russian all letters",
  "RUS_ALL_LETTERS_HARD_ONLY":"Russian hard letters only"
}


module.exports = {SYLLABUS_NAMES, SYLLABUS_DICT, RU_TO_LAT_FULL, RU_TO_LAT_HARD_ONLY, RUS_ALL_LETTERS_FULL, RUS_ALL_LETTERS_HARD_ONLY };
