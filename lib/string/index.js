import { emptyStr } from 'defaults';

const invalidCharsRegExp = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/gi;

export const badWordsPattern = '(anilingus|asno|asshole|arsehole|bastard|bdsm|bicha|bitch|blowjob|blyad|blyat|boob|bukkake|bunghole|butthole|chernozhopiy|clit|cocaina|coito|coitus|concha|creampie|cumming|cumshot|cunnilingus|cunt|deepthroat|dermo|dickhead|dildo|doggiestyle|doggystyle|dolboeb|droch|dumbass|ebal|ebaniy|ebat|ebis|eblo|ejaculation|erotic|erotism|escort|esperma|faggot|fecal|fisting|footjob|follador|follar|fuck|gandon|gangbang|genitals|gomik|govno|govnuk|handjob|hentai|heroina|hijaputa|hitler|homoerotic|hooker|horny|hueviy|huyeviy|hueyu|huyeyu|idiot|imbecil|incest|intercourse|jackass|jizz|lenin|masturbat|milf|moron|mudack|mudak|neonazi|negro|nigga|nigger|nipple|orgasm|padlo|pedobear|penis|pedik|pidar|piss|pizd|poeben|porn|proeb|prostitut|pussy|putin|raping|rapist|rectum|retard|russia|scumbag|semen|sexcam|sexo|sexy|sexual|shalava|shemale|shit|skumbag|sideboob|slut|sosi|sperm|sral|srat|stalin|strapon|sucker|svoloch|threesome|throating|tits|titty|topless|trah|tushy|ueban|undressing|upskirt|urethra|vagina|vibrator|vulva|wank|whore|zaebis|zalupa|zasran|zhop|бляд|блят|ебать|ебал|ебаный|ёбаный|ебло|гандон|гитлер|говно|говнюк|дерьмо|дроч|жопа|ленин|пизда|пиздец|путин|россия|сталин|уебан|хуй|хуевый|хуёвый|хуею|🖕)';

export const wholeBadWordsPattern = '^(anal|anus|ass|cock|cocks|cum|fag|gay|huy|manda|nazi|rape|pis|puta|sex|suck|sucks|suka|twat|манда)$';

// get clean characters without utf-8
export function cleanString(str = emptyStr) {
  let result = '';

  const inputLength = str.length;
  for (let i = 0; i < inputLength; i++) {
    const charCode = str.charCodeAt(i);

    if (charCode < 128) {
      result += str.charAt(i);
    }
  }

  return result;
}

export function sanitizeString(str = emptyStr) {
  return unescape(str).toLocaleLowerCase().trim().replace(/\s\s+/g, ' ');
}

export function escapeRegExp(str = emptyStr) {
  return str.replace(/[-[\]/{}()<>*+?!=.:\\^$|]/g, '\\$&');
}

export function capitalize(str = emptyStr) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function removeInvalidChars(str = '') {
  return str.replace(invalidCharsRegExp, '');
}

export function removeBadWords(str = '') {
  if (!str) {
    return null;
  }

  const wholeBadWordsRegExp = new RegExp(wholeBadWordsPattern, 'i');

  // eslint-disable-next-line no-param-reassign
  str = str.replace(wholeBadWordsRegExp, '*');

  const badWordsRegExp = new RegExp(badWordsPattern, 'gi');

  return str.replace(badWordsRegExp, '*');
}

export const addNumberEnding = (number) => {
  if (number >= 11 && number <= 13) {
    return `${number}th`;
  }
  const lastDigit = number % 10;
  switch (lastDigit) {
    case 1:
      return `${number}st`;
    case 2:
      return `${number}nd`;
    case 3:
      return `${number}rd`;
    default:
      return `${number}th`;
  }
};
