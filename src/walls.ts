import karma from './photos/karma.jpg'
import familija from './photos/familija.jpg'
import bule from './photos/bule.jpg'
import utopija from './photos/utopija.jpg'
import krimpi from './photos/krimpi.jpg'
import neBor from './photos/ne-bor.jpg'

// num is the number drawn on the photo. Variants have no number.
type Problem = { num?: string, name?: string, grade?: string, note?: string }

export const walls: { name: string, photo: ImageMetadata, problems: Problem[] }[] = [
  {
    name: 'Karma', photo: karma, problems: [
      { num: '1', name: 'Cookie?', grade: '7a', note: 'Ime je najbrž Cookie, ni pa zagotovo.' },
      { num: '2', name: 'Karma korner stand', grade: '7a' },
      { num: '3', name: 'Karma korner', grade: '7b' },
      { num: '4', name: 'Sekalica v karmo', grade: '7c' },
      { name: 'Karma v sekalico', grade: '7b+', note: 'Kombinacija: štart v Karmi, izstop po Sekalici. Ne boš verjel glede na ime.' },
      { name: 'Sekalica stand »bula«', grade: '6c?', note: 'Z levo držiš krimp, desno daš peto. Kul balvan.' },
      { num: '5', name: 'Sekalica', grade: '7b' },
      { num: '6', name: 'Monkey', grade: '7c', note: 'Isti štart kot Sekalica, potem greš desno. Za desno je neka luknjica.' },
    ],
  },
  {
    name: 'Familija', photo: familija, problems: [
      { num: '7', name: 'Familija', grade: '8a+/b', note: 'Štart desno na očitni šalci, potem prečka.' },
      { num: '8', name: 'The End', grade: '8c', note: 'Isti štart kot Familija, izstop v Beginning.' },
      { num: '9', name: 'Beginning of the End', grade: '8b+', note: 'Eliminacija, štart na podprijemih.' },
      { num: '10', grade: '7c', note: 'Ime sem pozabil.' },
    ],
  },
  {
    name: 'Bule', photo: bule, problems: [
      { num: '11', name: 'Bule cvilijo', grade: '7c' },
      { num: '12', name: 'Cvile bulijo', grade: '8a' },
    ],
  },
  {
    name: 'Utopija', photo: utopija, problems: [
      { num: '13', name: 'Utopija', grade: '8a+' },
      { num: '14', name: 'Navijat čopka', grade: '8b' },
    ],
  },
  {
    name: 'Krimpi', photo: krimpi, problems: [
      { num: '15', grade: '6a/b', note: 'Ful dober balvan po krimpih. Mogoče sem linijo narisal narobe.' },
      { num: '16', grade: 'lahko', note: 'Nekaj zelo lahkega.' },
    ],
  },
  {
    name: 'Ne bor', photo: neBor, problems: [
      { num: '17', name: 'Ne bor', grade: '7a', note: 'Trd. En ful slab levi stop moraš zahodit.' },
      { num: '18', name: 'Silvo plut', grade: '7b', note: 'Trd. Eliminacija, skočiš na dva »dobra grifa« na koncu Ne bora.' },
      { num: '★', name: 'Drunken master', note: 'Prečka brez rok. Mogoče ni pravi balvan, je pa ful zabavno. Z rokami za hrbtom je ful težko.' },
      { num: '19', grade: '6a/b' },
      { num: '20', grade: '6a/b' },
      { num: '21', grade: '6a/b', note: '19, 20 in 21 so lepi ogrevalni balvani. Dva sta Pinch in Science friction.' },
      { num: '22', name: 'Circle intense', grade: '7c', note: 'Štart na polici, potem mali krimpi nad njo.' },
    ],
  },
]
