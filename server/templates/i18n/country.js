import { EN, ES, PT } from 'defaults';

export function getLangByCountry(country) {
  switch (country) {
    case 'argentina':
    case 'bolivia':
    case 'chile':
    case 'colombia':
    case 'costa-rica':
    case 'cuba':
    case 'dominican-republic':
    case 'ecuador':
    case 'el-salvador':
    case 'equatorial-guinea':
    case 'guatemala':
    case 'honduras':
    case 'mexico':
    case 'nicaragua':
    case 'panama':
    case 'paraguay':
    case 'peru':
    case 'puerto-rico':
    case 'spain':
    case 'uruguay':
    case 'venezuela':
    case 'western-sahara':
      return ES;
    case 'angola':
    case 'brazil':
    case 'east-timor':
    case 'guinea-bissau':
    case 'mozambique':
    case 'portugal':
      return PT;
    default:
      return EN;
  }
}
