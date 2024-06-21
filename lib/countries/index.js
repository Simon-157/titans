const countries = [
  {
    id: 'afghanistan',
    name: 'Afghanistan',
  },
  {
    id: 'albania',
    name: 'Albania',
  },
  {
    id: 'algeria',
    name: 'Algeria',
  },
  {
    id: 'angola',
    name: 'Angola',
  },
  {
    id: 'argentina',
    name: 'Argentina',
  },
  {
    id: 'armenia',
    name: 'Armenia',
  },
  {
    id: 'australia',
    name: 'Australia',
  },
  {
    id: 'austria',
    name: 'Austria',
  },
  {
    id: 'azerbaijan',
    name: 'Azerbaijan',
  },
  {
    id: 'bahamas',
    name: 'Bahamas',
  },
  {
    id: 'bangladesh',
    name: 'Bangladesh',
  },
  {
    id: 'belarus',
    name: 'Belarus',
  },
  {
    id: 'belgium',
    name: 'Belgium',
  },
  {
    id: 'belize',
    name: 'Belize',
  },
  {
    id: 'benin',
    name: 'Benin',
  },
  {
    id: 'bhutan',
    name: 'Bhutan',
  },
  {
    id: 'bolivia',
    name: 'Bolivia',
  },
  {
    id: 'bosnia-and-herzegovina',
    name: 'Bosnia and Herzegovina',
  },
  {
    id: 'botswana',
    name: 'Botswana',
  },
  {
    id: 'brazil',
    name: 'Brazil',
  },
  {
    id: 'brunei',
    name: 'Brunei',
  },
  {
    id: 'bulgaria',
    name: 'Bulgaria',
  },
  {
    id: 'burkina-faso',
    name: 'Burkina Faso',
  },
  {
    id: 'burundi',
    name: 'Burundi',
  },
  {
    id: 'cambodia',
    name: 'Cambodia',
  },
  {
    id: 'cameroon',
    name: 'Cameroon',
  },
  {
    id: 'canada',
    name: 'Canada',
  },
  {
    id: 'central-african-republic',
    name: 'Central African Republic',
  },
  {
    id: 'chad',
    name: 'Chad',
  },
  {
    id: 'chile',
    name: 'Chile',
  },
  {
    id: 'china',
    name: 'China',
  },
  {
    id: 'colombia',
    name: 'Colombia',
  },
  {
    id: 'congo-democratic-republic-of-the',
    name: 'Congo, Democratic Republic of the',
  },
  {
    id: 'congo-republic-of-the',
    name: 'Congo, Republic of the',
  },
  {
    id: 'costa-rica',
    name: 'Costa Rica',
  },
  {
    id: 'cote-d-ivoire',
    name: "Côte d'Ivoire",
  },
  {
    id: 'croatia',
    name: 'Croatia',
  },
  {
    id: 'cuba',
    name: 'Cuba',
  },
  {
    id: 'cyprus',
    name: 'Cyprus',
  },
  {
    id: 'czech-republic',
    name: 'Czech Republic',
  },
  {
    id: 'denmark',
    name: 'Denmark',
  },
  {
    id: 'djibouti',
    name: 'Djibouti',
  },
  {
    id: 'dominican-republic',
    name: 'Dominican Republic',
  },
  {
    id: 'east-timor',
    name: 'East Timor',
  },
  {
    id: 'ecuador',
    name: 'Ecuador',
  },
  {
    id: 'egypt',
    name: 'Egypt',
  },
  {
    id: 'el-salvador',
    name: 'El Salvador',
  },
  {
    id: 'equatorial-guinea',
    name: 'Equatorial Guinea',
  },
  {
    id: 'eritrea',
    name: 'Eritrea',
  },
  {
    id: 'estonia',
    name: 'Estonia',
  },
  {
    id: 'ethiopia',
    name: 'Ethiopia',
  },
  {
    id: 'falkland-islands',
    name: 'Falkland Islands',
  },
  {
    id: 'fiji',
    name: 'Fiji',
  },
  {
    id: 'finland',
    name: 'Finland',
  },
  {
    id: 'france',
    name: 'France',
  },
  {
    id: 'french-southern-territories',
    name: 'French Southern Territories',
  },
  {
    id: 'gabon',
    name: 'Gabon',
  },
  {
    id: 'gambia',
    name: 'Gambia',
  },
  {
    id: 'georgia',
    name: 'Georgia',
  },
  {
    id: 'germany',
    name: 'Germany',
  },
  {
    id: 'ghana',
    name: 'Ghana',
  },
  {
    id: 'greece',
    name: 'Greece',
  },
  {
    id: 'greenland',
    name: 'Greenland',
  },
  {
    id: 'guatemala',
    name: 'Guatemala',
  },
  {
    id: 'guinea',
    name: 'Guinea',
  },
  {
    id: 'guinea-bissau',
    name: 'Guinea-Bissau',
  },
  {
    id: 'guyana',
    name: 'Guyana',
  },
  {
    id: 'haiti',
    name: 'Haiti',
  },
  {
    id: 'honduras',
    name: 'Honduras',
  },
  {
    id: 'hungary',
    name: 'Hungary',
  },
  {
    id: 'iceland',
    name: 'Iceland',
  },
  {
    id: 'india',
    name: 'India',
  },
  {
    id: 'indonesia',
    name: 'Indonesia',
  },
  {
    id: 'iran',
    name: 'Iran',
  },
  {
    id: 'iraq',
    name: 'Iraq',
  },
  {
    id: 'ireland',
    name: 'Ireland',
  },
  {
    id: 'israel',
    name: 'Israel',
  },
  {
    id: 'italy',
    name: 'Italy',
  },
  {
    id: 'jamaica',
    name: 'Jamaica',
  },
  {
    id: 'japan',
    name: 'Japan',
  },
  {
    id: 'jordan',
    name: 'Jordan',
  },
  {
    id: 'kazakhstan',
    name: 'Kazakhstan',
  },
  {
    id: 'kenya',
    name: 'Kenya',
  },
  {
    id: 'korea-north',
    name: 'Korea, North',
  },
  {
    id: 'korea-south',
    name: 'Korea, South',
  },
  {
    id: 'kuwait',
    name: 'Kuwait',
  },
  {
    id: 'kyrgyzstan',
    name: 'Kyrgyzstan',
  },
  {
    id: 'laos',
    name: 'Laos',
  },
  {
    id: 'latvia',
    name: 'Latvia',
  },
  {
    id: 'lebanon',
    name: 'Lebanon',
  },
  {
    id: 'lesotho',
    name: 'Lesotho',
  },
  {
    id: 'liberia',
    name: 'Liberia',
  },
  {
    id: 'libya',
    name: 'Libya',
  },
  {
    id: 'lithuania',
    name: 'Lithuania',
  },
  {
    id: 'luxembourg',
    name: 'Luxembourg',
  },
  {
    id: 'macedonia-republic-of',
    name: 'Macedonia, Republic of',
  },
  {
    id: 'madagascar',
    name: 'Madagascar',
  },
  {
    id: 'malawi',
    name: 'Malawi',
  },
  {
    id: 'malaysia',
    name: 'Malaysia',
  },
  {
    id: 'mali',
    name: 'Mali',
  },
  {
    id: 'mauritania',
    name: 'Mauritania',
  },
  {
    id: 'mexico',
    name: 'Mexico',
  },
  {
    id: 'moldova',
    name: 'Moldova',
  },
  {
    id: 'mongolia',
    name: 'Mongolia',
  },
  {
    id: 'montenegro',
    name: 'Montenegro',
  },
  {
    id: 'morocco',
    name: 'Morocco',
  },
  {
    id: 'mozambique',
    name: 'Mozambique',
  },
  {
    id: 'myanmar',
    name: 'Myanmar',
  },
  {
    id: 'namibia',
    name: 'Namibia',
  },
  {
    id: 'nepal',
    name: 'Nepal',
  },
  {
    id: 'netherlands',
    name: 'Netherlands',
  },
  {
    id: 'new-caledonia',
    name: 'New Caledonia',
  },
  {
    id: 'new-zealand',
    name: 'New Zealand',
  },
  {
    id: 'nicaragua',
    name: 'Nicaragua',
  },
  {
    id: 'niger',
    name: 'Niger',
  },
  {
    id: 'nigeria',
    name: 'Nigeria',
  },
  {
    id: 'norway',
    name: 'Norway',
  },
  {
    id: 'oman',
    name: 'Oman',
  },
  {
    id: 'pakistan',
    name: 'Pakistan',
  },
  {
    id: 'palestine',
    name: 'Palestine',
  },
  {
    id: 'panama',
    name: 'Panama',
  },
  {
    id: 'papua-new-guinea',
    name: 'Papua New Guinea',
  },
  {
    id: 'paraguay',
    name: 'Paraguay',
  },
  {
    id: 'peru',
    name: 'Peru',
  },
  {
    id: 'philippines',
    name: 'Philippines',
  },
  {
    id: 'poland',
    name: 'Poland',
  },
  {
    id: 'portugal',
    name: 'Portugal',
  },
  {
    id: 'puerto-rico',
    name: 'Puerto Rico',
  },
  {
    id: 'qatar',
    name: 'Qatar',
  },
  {
    id: 'romania',
    name: 'Romania',
  },
  {
    id: 'russia',
    name: 'Russia',
  },
  {
    id: 'rwanda',
    name: 'Rwanda',
  },
  {
    id: 'saudi-arabia',
    name: 'Saudi Arabia',
  },
  {
    id: 'senegal',
    name: 'Senegal',
  },
  {
    id: 'serbia',
    name: 'Serbia',
  },
  {
    id: 'sierra-leone',
    name: 'Sierra Leone',
  },
  {
    id: 'singapore',
    name: 'Singapore',
  },
  {
    id: 'slovakia',
    name: 'Slovakia',
  },
  {
    id: 'slovenia',
    name: 'Slovenia',
  },
  {
    id: 'solomon-islands',
    name: 'Solomon Islands',
  },
  {
    id: 'somalia',
    name: 'Somalia',
  },
  {
    id: 'south-africa',
    name: 'South Africa',
  },
  {
    id: 'south-sudan',
    name: 'South Sudan',
  },
  {
    id: 'spain',
    name: 'Spain',
  },
  {
    id: 'sri-lanka',
    name: 'Sri Lanka',
  },
  {
    id: 'sudan',
    name: 'Sudan',
  },
  {
    id: 'suriname',
    name: 'Suriname',
  },
  {
    id: 'swaziland',
    name: 'Swaziland',
  },
  {
    id: 'sweden',
    name: 'Sweden',
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
  },
  {
    id: 'syria',
    name: 'Syria',
  },
  {
    id: 'taiwan',
    name: 'Taiwan',
  },
  {
    id: 'tajikistan',
    name: 'Tajikistan',
  },
  {
    id: 'tanzania',
    name: 'Tanzania',
  },
  {
    id: 'thailand',
    name: 'Thailand',
  },
  {
    id: 'togo',
    name: 'Togo',
  },
  {
    id: 'trinidad-and-tobago',
    name: 'Trinidad and Tobago',
  },
  {
    id: 'tunisia',
    name: 'Tunisia',
  },
  {
    id: 'turkey',
    name: 'Turkey',
  },
  {
    id: 'turkmenistan',
    name: 'Turkmenistan',
  },
  {
    id: 'uganda',
    name: 'Uganda',
  },
  {
    id: 'ukraine',
    name: 'Ukraine',
  },
  {
    id: 'united-arab-emirates',
    name: 'United Arab Emirates',
  },
  {
    id: 'united-kingdom',
    name: 'United Kingdom',
  },
  {
    id: 'united-states',
    name: 'United States',
  },
  {
    id: 'uruguay',
    name: 'Uruguay',
  },
  {
    id: 'uzbekistan',
    name: 'Uzbekistan',
  },
  {
    id: 'vanuatu',
    name: 'Vanuatu',
  },
  {
    id: 'venezuela',
    name: 'Venezuela',
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
  },
  {
    id: 'western-sahara',
    name: 'Western Sahara',
  },
  {
    id: 'yemen',
    name: 'Yemen',
  },
  {
    id: 'zambia',
    name: 'Zambia',
  },
  {
    id: 'zimbabwe',
    name: 'Zimbabwe',
  },
];

export const latamCountries = [
  'argentina',
  'brazil',
  'chile',
  'colombia',
  'mexico',
];

export default countries;
