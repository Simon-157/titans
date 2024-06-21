/* eslint-disable camelcase */
import armsExtra from './armsExtra';
import waist from './belt-waist';
import bracelets from './bracelets';
import legs from './clothDown-legs';
import torso from './clothUp-torso';
import ears from './ears';
import back from './extra-back';
import eyeBrows from './eyeBrows';
import eyes from './eyes';
import head from './hair-head';
import horns from './horns';
import mouth from './mouth';
import rightHand from './rightHand';
import scarsArms from './scarsArms';
import scarsFace from './scarsFace';
import feet from './shoes-feet';
import skinArms from './skinArms';
import skinBody from './skinBody';
import skinHead from './skinHead';
// import solidBG from './solidBG';
import leftHand from './weapon-leftHand';

export function translateDna(_rna, indexTitan) {
  const arms = '<path d="M303.84,770.47s-22.79-38.05-14.12-59.6c14.27-35.48,58.06-70.39,89.11-85.56S464.62,604,464.62,604L451.91,706.68c-56,7.14-70.37,11.78-79.86,21.24s-13,36.24-13,36.24" fill="changeArmsColor" stroke="#000" stroke-miterlimit="10" stroke-width="8.71"/><path d="M307.54,768.56s-22.74-34.73-14.07-56.28c14.27-35.48,57.31-68.8,88.36-84,0,0-73.92,44.31-84.12,85.6C291.47,739.16,307.54,768.56,307.54,768.56Z" fill="#f2f2f2"/><path d="M356.08,760.16s3.48-26.78,13-36.24,23.84-14.1,79.86-21.24l2.68-20.55s-77.9,9.87-88.86,31.24S356.08,760.16,356.08,760.16Z" opacity="0.3" style="mix-blend-mode:multiply"/><path d="M351.43,748s9.16-5.64,18.16,3.68a30.28,30.28,0,0,1,3.82,5c3.26,5.22,7,17.72,5.06,22.27-2.91,6.73-6.55,7.58-6.55,7.58l9.48,18.82s2.52,5.44-7.11,10.88c-7.26,4.11-13,2.94-13,2.94l-4.54-6.52-30.86,12.9.32.45s2.14,4.37-6.38,7c-5.86,1.81-9.3-.79-9.3-.79s-18.22-19.61-22.7-39.41,10.52-40.12,10.52-40.12" fill="changeArmsColor" stroke="#000" stroke-miterlimit="10" stroke-width="8.71"/><path d="M398.25,622.68c21.95-7.11,76.8-18.66,76.8-18.66l-13,102.4-51.8-8.94S398.06,664.41,398.25,622.68Z" opacity="0.3" style="mix-blend-mode:multiply"/><path d="M777.29,770.47s22.79-38.05,14.12-59.6c-14.27-35.48-58.06-70.39-89.11-85.56S616.51,604,616.51,604l12.71,102.66c56,7.14,70.37,11.78,79.86,21.24s13,36.24,13,36.24" fill="changeArmsColor" stroke="#000" stroke-miterlimit="10" stroke-width="8.71"/><path d="M773.59,768.56s22.73-34.73,14.07-56.28c-14.27-35.48-57.31-68.8-88.36-84,0,0,73.92,44.31,84.12,85.6C789.66,739.16,773.59,768.56,773.59,768.56Z" fill="#f2f2f2"/><path d="M722.05,764.16s-3.48-26.78-13-36.24-23.84-14.1-79.86-21.24l-2.68-20.55s77.9,9.87,88.86,31.24S722.05,764.16,722.05,764.16Z" opacity="0.3" style="mix-blend-mode:multiply"/><path d="M662.51,612.25A437.45,437.45,0,0,0,616.08,604l21.58,83.8A231.05,231.05,0,0,0,662.51,612.25Z" opacity="0.3" style="mix-blend-mode:multiply"/><path d="M727.89,751.27s-9-5.53-17.79,3.61a29.49,29.49,0,0,0-3.74,4.87c-3.2,5.11-6.89,17.37-5,21.82,2.86,6.6,6.42,7.43,6.42,7.43l-9.3,18.44s-2.46,5.33,7,10.67c7.11,4,12.72,2.87,12.72,2.87l4.44-6.38,30.24,12.63-.31.45s-2.1,4.28,6.26,6.86c5.74,1.77,9.11-.77,9.11-.77s17.85-19.22,22.24-38.63-10.31-39.31-10.31-39.31" fill="changeArmsColor" stroke="#000" stroke-miterlimit="10" stroke-width="8.71"/>';
  const body = '<path d="M633.45,733l-.92-121.49-206.91-2.43s-6.87,23.73-10.35,58.85c-3.44,34.62,5,65.48,5,65.48S401.9,816.22,402.76,838s45.08,86.75,45.08,86.75h52.44l-7.9-86.79,22.91-43.44h26.45L647.3,917.25h57.17Z" fill="changeBodyColor" stroke="#000" stroke-miterlimit="10" stroke-width="8.71"/><polygon points="511.26 793.6 473.59 830 495.07 919.65 487.43 836.52 511.26 793.6" opacity="0.3" style="mix-blend-mode:multiply"/><path d="M407.8,825.1s6.51,19.52,20.83,47.46a458,458,0,0,0,28.09,47.93l-6.87-.09s-15.93-23.89-24.72-39.61c-13.6-24.31-18.64-40.38-18.64-40.38Z" fill="#f2f2f2"/><polygon points="568.39 818.51 658.21 912.58 649.41 913 568.39 818.51" fill="#f2f2f2"/>';
  const head0 = '<ellipse cx="525.82" cy="618.73" rx="104.88" ry="40.51" opacity="0.3" style="mix-blend-mode:multiply"/><path d="M673.22,605.61,567.86,631.29c-44.12,9.88-95.69,5.23-137.63-6.58l-63.44-21.4c-49.05-21-73.44-61.56-68.9-108.28l11-170c9-55,52.57-97.5,107.28-104.6,0,0,63.59-12.25,118.47-12.25s134.88,16.62,134.88,16.62a100.29,100.29,0,0,1,85.7,79.61l15,187.26C774.63,531.2,724.71,591.27,673.22,605.61Z" fill="changeHeadColor" stroke="#000" stroke-miterlimit="10" stroke-width="9.29"/><path d="M670.72,600.9c51.49-14.11,98-69,95.3-110.6l-15-184.21a99.62,99.62,0,0,0-85.69-78.31s53.71,31.48,61.47,96.57,21.38,155,8.62,187.57C717.36,558.17,670.72,600.9,670.72,600.9Z" opacity="0.3" style="mix-blend-mode:multiply"/><path d="M387.18,605c-47.81-13.43-86.93-45.81-84.85-104.37l9.18-173.28c8.74-53.49,51.28-94.86,104.65-101.78,0,0-76.28,36.34-90.11,95.55s-11.88,142-10.64,175.36C317.54,553.43,387.18,605,387.18,605Z" fill="#f2f2f2"/>';

  // let var_r_solidBG = '';
  let var_r_extra = '';
  let var_r_armsExtra = '';
  let var_r_ears = '';
  let var_r_skinArms = '';
  let var_r_scarsArms = '';
  let var_r_skinBody = '';
  let var_r_bracelets = '';
  let var_r_clothUp = '';
  let var_r_shoes = '';
  let var_r_clothDown = '';
  let var_r_belt = '';
  let var_r_scarsFace = '';
  let var_r_skinHead = '';
  let var_r_horns = '';
  let var_r_eyes = '';
  let var_r_mouth = '';
  let var_r_hair = '';
  let var_r_eyeBrows = '';
  let var_r_weapon = '';
  let var_r_rightHand = '';

  let var_o_extra = '';
  let var_o_armsExtra = '';
  let var_o_ears = '';
  let var_o_skinArms = '';
  let var_o_scarsArms = '';
  let var_o_skinBody = '';
  let var_o_bracelets = '';
  let var_o_clothUp = '';
  let var_o_shoes = '';
  let var_o_clothDown = '';
  let var_o_belt = '';
  let var_o_scarsFace = '';
  let var_o_skinHead = '';
  let var_o_horns = '';
  let var_o_eyes = '';
  let var_o_mouth = '';
  let var_o_hair = '';
  let var_o_eyeBrows = '';
  let var_o_weapon = '';
  let var_o_rightHand = '';

  const rna = _rna;
  // console.log(_rna)
  let prot = '';

  function _extra(s, e) {
    let r = {};
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      if (prot === 'UUC') {
        r = { r: back.extra1, o: 'Spiked Tail' };
      } else if (prot === 'UUU') {
        r = { r: back.extra2, o: 'Insect Wings' };
      } else if (prot === 'UUA') {
        r = { r: back.extra3, o: 'Feather Wings' };
      } else if (prot === 'UUG') {
        r = { r: back.extra4, o: 'Monsolian' };
      } else if (prot === 'CUU') {
        r = { r: back.extra5, o: 'Pail of Dirt' };
      } else if (prot === 'CUC') {
        r = { r: back.extra6, o: 'Aktanos Wings' };
      } else if (prot === 'CUA') {
        r = { r: back.extra7, o: 'Fly Trap' };
      } else if (prot === 'CUG') {
        r = { r: back.extra8, o: 'Drock' };
      } else if (prot === 'AUU') {
        r = { r: back.extra9, o: 'Grabbers' };
      } else if (prot === 'AUC') {
        r = { r: back.extra10, o: 'Shattered Gaze' };
      } else if (prot === 'AUA') {
        r = { r: back.extra11, o: 'None' };
      }
    }
    return r;
  }

  function _armsExtra(s, e) {
    let r = {};
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      if (prot === 'UUC') {
        r = { r: armsExtra.armsExtra1, o: 'Forest Spikes' };
      } else if (prot === 'UUU') {
        r = { r: armsExtra.armsExtra2, o: 'None' };
      } else if (prot === 'UUA') {
        r = { r: armsExtra.armsExtra3, o: 'Fiery Elbows' };
      } else if (prot === 'UUG') {
        r = { r: armsExtra.armsExtra4, o: 'None' };
      } else if (prot === 'CUU') {
        r = { r: armsExtra.armsExtra5, o: 'None' };
      } else if (prot === 'CUC') {
        r = { r: armsExtra.armsExtra6, o: 'Poisonous Spikes' };
      } else if (prot === 'CUA') {
        r = { r: armsExtra.armsExtra7, o: 'Elbow Wings' };
      } else if (prot === 'CUG') {
        r = { r: armsExtra.armsExtra8, o: 'Webbed Elbows' };
      }
    }

    return r;
  }

  function _ears(s, e) {
    let r = {};
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      if (prot === 'UUC') {
        r = { r: ears.ears1, o: 'Toruks Ears' };
      } else if (prot === 'UUU') {
        r = { r: ears.ears2, o: 'Baligs Ears' };
      } else if (prot === 'UUA') {
        r = { r: ears.ears3, o: 'Malis Ears' };
      } else if (prot === 'UUG') {
        r = { r: ears.ears4, o: 'Malis Ears' };
      } else if (prot === 'CUU') {
        r = { r: ears.ears5, o: 'Koraks Ears' };
      } else if (prot === 'CUC') {
        r = { r: ears.ears6, o: 'Vespirs Ears' };
      } else if (prot === 'CUA') {
        r = { r: ears.ears7, o: 'Pegors Ears' };
      } else if (prot === 'CUG') {
        r = { r: ears.ears8, o: 'Blubos Ears' };
      } else if (prot === 'AUU') {
        r = { r: ears.ears9, o: 'None' };
      }
    }
    return r;
  }

  function _skinArms(s, e) {
    let r = {};
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      if (prot === 'UUC') {
        r = { r: skinArms.skinArms1, o: 'None' };
      } else if (prot === 'UUU') {
        r = { r: skinArms.skinArms2, o: 'None' };
      } else if (prot === 'UUA') {
        r = { r: skinArms.skinArms3, o: 'Vulcors Skin Arms' };
      } else if (prot === 'UUG') {
        r = { r: skinArms.skinArms4, o: 'None' };
      } else if (prot === 'CUU') {
        r = { r: skinArms.skinArms5, o: 'None' };
      } else if (prot === 'CUC') {
        r = { r: skinArms.skinArms6, o: 'None' };
      } else if (prot === 'CUA') {
        r = { r: skinArms.skinArms7, o: 'None' };
      } else if (prot === 'CUG') {
        r = { r: skinArms.skinArms8, o: 'None' };
      }
    }
    return r;
  }

  function _scarsArms(s, e) {
    let r = {};
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      if (prot === 'UUC') {
        r = { r: scarsArms.scarsArms1, o: 'Toruks Scar Arms' };
      } else if (prot === 'UUU') {
        r = { r: scarsArms.scarsArms2, o: 'Baligs Scar Arms' };
      } else if (prot === 'UUA') {
        r = { r: scarsArms.scarsArms3, o: 'Vulcors Scar Arms' };
      } else if (prot === 'UUG') {
        r = { r: scarsArms.scarsArms4, o: 'Malis Scar Arms' };
      } else if (prot === 'CUU') {
        r = { r: scarsArms.scarsArms5, o: 'Koraks Scar Arms' };
      } else if (prot === 'CUC') {
        r = { r: scarsArms.scarsArms6, o: 'Vespirs Scar Arms' };
      } else if (prot === 'CUA') {
        r = { r: scarsArms.scarsArms7, o: 'Pegors Scar Arms' };
      } else if (prot === 'CUG') {
        r = { r: scarsArms.scarsArms8, o: 'Blubos Scar Arms' };
      } else if (prot === 'AUU') {
        r = { r: scarsArms.scarsArms9, o: 'None' };
      }
    }
    return r;
  }

  function _skinBody(s, e) {
    let r = {};
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      if (prot === 'UUC') {
        r = { r: skinBody.skinBody1, o: 'None' };
      } else if (prot === 'UUU') {
        r = { r: skinBody.skinBody2, o: 'None' };
      } else if (prot === 'UUA') {
        r = { r: skinBody.skinBody3, o: 'Vulcors Skin Body' };
      } else if (prot === 'UUG') {
        r = { r: skinBody.skinBody4, o: 'None' };
      } else if (prot === 'CUU') {
        r = { r: skinBody.skinBody5, o: 'None' };
      } else if (prot === 'CUC') {
        r = { r: skinBody.skinBody6, o: 'None' };
      } else if (prot === 'CUA') {
        r = { r: skinBody.skinBody7, o: 'None' };
      } else if (prot === 'CUG') {
        r = { r: skinBody.skinBody8, o: 'None' };
      }
    }
    return r;
  }

  function _bracelets(s, e) {
    let r = {};
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      if (prot === 'UUC') {
        r = { r: bracelets.bracelets1, o: 'Toruks Bracelets' };
      } else if (prot === 'UUU') {
        r = { r: bracelets.bracelets2, o: 'Baligs Bracelets' };
      } else if (prot === 'UUA') {
        r = { r: bracelets.bracelets3, o: 'None' };
      } else if (prot === 'UUG') {
        r = { r: bracelets.bracelets4, o: 'None' };
      } else if (prot === 'CUU') {
        r = { r: bracelets.bracelets5, o: 'Koraks Bracelets' };
      } else if (prot === 'CUC') {
        r = { r: bracelets.bracelets6, o: 'None' };
      } else if (prot === 'CUA') {
        r = { r: bracelets.bracelets7, o: 'Pegors Bracelets' };
      } else if (prot === 'CUG') {
        r = { r: bracelets.bracelets8, o: 'Blubos Bracelets' };
      }
    }
    return r;
  }

  function _clothUp(s, e) {
    let r = {};
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      if (prot === 'UUC') {
        r = { r: torso.clothUp1, o: 'Training' };
      } else if (prot === 'UUU') {
        r = { r: torso.clothUp2, o: 'Cloth' };
      } else if (prot === 'UUA') {
        r = { r: torso.clothUp3, o: 'Obisidian' };
      } else if (prot === 'UUG') {
        r = { r: torso.clothUp4, o: 'Golden' };
      } else if (prot === 'CUU') {
        r = { r: torso.clothUp5, o: 'Leather Chest' };
      } else if (prot === 'CUC') {
        r = { r: torso.clothUp6, o: 'Silk' };
      } else if (prot === 'CUA') {
        r = { r: torso.clothUp7, o: 'Gills' };
      } else if (prot === 'CUG') {
        r = { r: torso.clothUp8, o: 'Royal' };
      } else if (prot === 'AUU') {
        r = { r: torso.clothUp9, o: 'Cloth' };
      } else if (prot === 'AUC') {
        r = { r: torso.clothUp10, o: 'Teeth Necklace' };
      } else if (prot === 'AUA') {
        r = { r: torso.clothUp11, o: 'Chaotic Vest' };
      } else if (prot === 'AUG') {
        r = { r: torso.clothUp12, o: 'Orderly Armor' };
      }
    }
    return r;
  }

  function _shoes(s, e) {
    let r = {};
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      if (prot === 'UUC') {
        r = { r: feet.shoes1, o: 'Burly' };
      } else if (prot === 'UUU') {
        r = { r: feet.shoes2, o: 'Vexing' };
      } else if (prot === 'UUA') {
        r = { r: feet.shoes3, o: 'Fiery' };
      } else if (prot === 'UUG') {
        r = { r: feet.shoes4, o: 'Balanced' };
      } else if (prot === 'CUU') {
        r = { r: feet.shoes5, o: 'Wild' };
      } else if (prot === 'CUC') {
        r = { r: feet.shoes6, o: 'Nimble' };
      } else if (prot === 'CUA') {
        r = { r: feet.shoes7, o: 'Regal' };
      } else if (prot === 'CUG') {
        r = { r: feet.shoes8, o: 'Webbed' };
      } else if (prot === 'AUU') {
        r = { r: feet.shoes9, o: 'Hover Boots' };
      } else if (prot === 'AUC') {
        r = { r: feet.shoes10, o: 'Chaos' };
      } else if (prot === 'AUA') {
        r = { r: feet.shoes11, o: 'Order Boots' };
      }
    }
    return r;
  }

  function _clothDown(s, e) {
    let r = {};
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      if (prot === 'UUC') {
        r = { r: legs.clothDown1, o: 'Cotton' };
      } else if (prot === 'UUU') {
        r = { r: legs.clothDown2, o: 'Hide' };
      } else if (prot === 'UUA') {
        r = { r: legs.clothDown3, o: 'Stone' };
      } else if (prot === 'UUG') {
        r = { r: legs.clothDown4, o: 'Braided' };
      } else if (prot === 'CUU') {
        r = { r: legs.clothDown5, o: 'Fur' };
      } else if (prot === 'CUC') {
        r = { r: legs.clothDown6, o: 'Torn' };
      } else if (prot === 'CUA') {
        r = { r: legs.clothDown7, o: 'Regal' };
      } else if (prot === 'CUG') {
        r = { r: legs.clothDown8, o: 'Algae' };
      } else if (prot === 'AUU') {
        r = { r: legs.clothDown9, o: 'Chaotic Pants' };
      } else if (prot === 'AUC') {
        r = { r: legs.clothDown10, o: 'Pants of the Forest' };
      }
    }
    return r;
  }

  function _belt(s, e) {
    let r = {};
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      if (prot === 'UUC') {
        r = { r: waist.belt1, o: 'Armored' };
      } else if (prot === 'UUU') {
        r = { r: waist.belt2, o: 'Iron' };
      } else if (prot === 'UUA') {
        r = { r: waist.belt3, o: 'Rock' };
      } else if (prot === 'UUG') {
        r = { r: waist.belt4, o: 'Ornate' };
      } else if (prot === 'CUU') {
        r = { r: waist.belt5, o: 'Heavy' };
      } else if (prot === 'CUC') {
        r = { r: waist.belt6, o: 'Buckle' };
      } else if (prot === 'CUA') {
        r = { r: waist.belt7, o: 'Stoic' };
      } else if (prot === 'CUG') {
        r = { r: waist.belt8, o: 'Treasured' };
      } else if (prot === 'AUU') {
        r = { r: waist.belt9, o: 'Poisonous' };
      } else if (prot === 'AUC') {
        r = { r: waist.belt10, o: 'Sash' };
      } else if (prot === 'AUA') {
        r = { r: waist.belt11, o: 'Green Belt' };
      }
    }
    return r;
  }

  function _scarsFace(s, e) {
    let r = {};
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      if (prot === 'UUC') {
        r = { r: scarsFace.scarsFace1, o: 'Toruks Scar Face' };
      } else if (prot === 'UUU') {
        r = { r: scarsFace.scarsFace2, o: 'Baligs Scar Face' };
      } else if (prot === 'UUA') {
        r = { r: scarsFace.scarsFace3, o: 'Vulcors Scar Face' };
      } else if (prot === 'UUG') {
        r = { r: scarsFace.scarsFace4, o: 'Malis Scar Face' };
      } else if (prot === 'CUU') {
        r = { r: scarsFace.scarsFace5, o: 'Koraks Scar Face' };
      } else if (prot === 'CUC') {
        r = { r: scarsFace.scarsFace6, o: 'Vespirs Scar Face' };
      } else if (prot === 'CUA') {
        r = { r: scarsFace.scarsFace7, o: 'Pegors Scar Face' };
      } else if (prot === 'CUG') {
        r = { r: scarsFace.scarsFace8, o: 'Blubos Scar Face' };
      } else if (prot === 'AUU') {
        r = { r: scarsFace.scarsFace9, o: 'Chaos Scar Face' };
      } else if (prot === 'AUC') {
        r = { r: scarsFace.scarsFace10, o: 'Orders Scar Face' };
      }
    }
    return r;
  }

  function _skinHead(s, e) {
    let r = {};
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      if (prot === 'UUC') {
        r = { r: skinHead.skinHead1, o: 'None' };
      } else if (prot === 'UUU') {
        r = { r: skinHead.skinHead2, o: 'Baligs Skin Head' };
      } else if (prot === 'UUA') {
        r = { r: skinHead.skinHead3, o: 'Vulcors Skin Head' };
      } else if (prot === 'UUG') {
        r = { r: skinHead.skinHead4, o: 'Malis Skin Head' };
      } else if (prot === 'CUU') {
        r = { r: skinHead.skinHead5, o: 'Koraks Skin Head' };
      } else if (prot === 'CUC') {
        r = { r: skinHead.skinHead6, o: 'None' };
      } else if (prot === 'CUA') {
        r = { r: skinHead.skinHead7, o: 'Pegors Skin Head' };
      } else if (prot === 'CUG') {
        r = { r: skinHead.skinHead8, o: 'Blubos Skin Head' };
      }
    }
    return r;
  }

  function _horns(s, e) {
    let r = {};
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      if (prot === 'UUC') {
        r = { r: horns.horns1, o: 'Toruks Horns' };
      } else if (prot === 'UUU') {
        r = { r: horns.horns2, o: 'Baligs Horn' };
      } else if (prot === 'UUA') {
        r = { r: horns.horns3, o: 'None' };
      } else if (prot === 'UUG') {
        r = { r: horns.horns4, o: 'None' };
      } else if (prot === 'CUU') {
        r = { r: horns.horns5, o: 'Koraks Horns' };
      } else if (prot === 'CUC') {
        r = { r: horns.horns6, o: 'None' };
      } else if (prot === 'CUA') {
        r = { r: horns.horns7, o: 'None' };
      } else if (prot === 'CUG') {
        r = { r: horns.horns8, o: 'None' };
      } else if (prot === 'AUU') {
        r = { r: horns.horns9, o: 'Unique Horns' };
      }
    }
    return r;
  }

  function _eyes(s, e) {
    let r = {};
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      if (prot === 'UUC') {
        r = { r: eyes.eyes1, o: 'Magnifiers' };
      } else if (prot === 'UUU') {
        r = { r: eyes.eyes2, o: 'Hexed Mask' };
      } else if (prot === 'UUA') {
        r = { r: eyes.eyes3, o: 'Pan Optics' };
      } else if (prot === 'UUG') {
        r = { r: eyes.eyes4, o: 'Aqua Goggles' };
      } else if (prot === 'CUU') {
        r = { r: eyes.eyes5, o: 'Original' };
      }
    }
    return r;
  }

  function _mouth(s, e) {
    let r = {};
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      if (prot === 'UUC') {
        r = { r: mouth.mouth1, o: 'Teething' };
      } else if (prot === 'UUU') {
        r = { r: mouth.mouth2, o: 'Biting' };
      } else if (prot === 'UUA') {
        r = { r: mouth.mouth3, o: 'Indifferent' };
      } else if (prot === 'UUG') {
        r = { r: mouth.mouth4, o: 'Fragmented' };
      } else if (prot === 'CUU') {
        r = { r: mouth.mouth5, o: 'Angry' };
      } else if (prot === 'CUC') {
        r = { r: mouth.mouth6, o: 'Fangs' };
      } else if (prot === 'CUA') {
        r = { r: mouth.mouth7, o: 'Beak' };
      } else if (prot === 'CUG') {
        r = { r: mouth.mouth8, o: 'Determined' };
      } else if (prot === 'AUU') {
        r = { r: mouth.mouth9, o: 'Bandana' };
      } else if (prot === 'AUC') {
        r = { r: mouth.mouth10, o: 'Water Filter' };
      } else if (prot === 'AUA') {
        r = { r: mouth.mouth11, o: 'Hidden' };
      } else if (prot === 'AUG') {
        r = { r: mouth.mouth12, o: 'Chaotic' };
      } else if (prot === 'GUU') {
        r = { r: mouth.mouth13, o: 'Orderly' };
      }
    }
    return r;
  }

  function _hair(s, e) {
    let r = {};
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      if (prot === 'UUC') {
        r = { r: head.hair1, o: 'Pumped-up' };
      } else if (prot === 'UUU') {
        r = { r: head.hair2, o: 'Slick' };
      } else if (prot === 'UUA') {
        r = { r: head.hair3, o: 'Fire' };
      } else if (prot === 'UUG') {
        r = { r: head.hair4, o: 'Golden Tiara' };
      } else if (prot === 'CUU') {
        r = { r: head.hair5, o: 'Mohawk' };
      } else if (prot === 'CUC') {
        r = { r: head.hair6, o: 'Buzz-Cut' };
      } else if (prot === 'CUA') {
        r = { r: head.hair7, o: 'Feather Bun' };
      } else if (prot === 'CUG') {
        r = { r: head.hair8, o: 'Sea Fins' };
      } else if (prot === 'AUU') {
        r = { r: head.hair9, o: 'Krakatoa' };
      } else if (prot === 'AUC') {
        r = { r: head.hair10, o: 'Stone Visage' };
      } else if (prot === 'AUA') {
        r = { r: head.hair11, o: 'Skull Mask' };
      } else if (prot === 'AUG') {
        r = { r: head.hair12, o: 'The Headbutter' };
      } else if (prot === 'GUU') {
        r = { r: head.hair13, o: 'Horned Mohawk' };
      } else if (prot === 'GUC') {
        r = { r: head.hair14, o: 'Wood Helmet' };
      }
    }
    return r;
  }

  function _rightHand(s, e) {
    let r = {};
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      if (prot === 'UUC' && rna.substr(237, 3) === 'UUC') {
        r = { r: rightHand.rightHand1, o: 'Oaken Shield' };
      } else if (prot === 'UUC' && rna.substr(237, 3) === 'UUU') {
        r = { r: rightHand.rightHand12, o: 'Oaken Shield' };
      } else if (prot === 'UUC' && rna.substr(237, 3) === 'UUA') {
        r = { r: rightHand.rightHand13, o: 'Oaken Shield' };
      } else if (prot === 'UUC' && rna.substr(237, 3) === 'UUG') {
        r = { r: rightHand.rightHand14, o: 'Oaken Shield' };
      } else if (prot === 'UUU') {
        r = { r: rightHand.rightHand2, o: 'Spiked Shield' };
      } else if (prot === 'UUA') {
        r = { r: rightHand.rightHand3, o: 'Power Glove' };
      } else if (prot === 'UUG') {
        r = { r: rightHand.rightHand4, o: 'Thorns' };
      } else if (prot === 'CUU') {
        r = { r: rightHand.rightHand5, o: 'Iron Fist' };
      } else if (prot === 'CUC') {
        r = { r: rightHand.rightHand6, o: 'Webbed Shield' };
      } else if (prot === 'CUA') {
        r = { r: rightHand.rightHand7, o: 'Second Wind' };
      } else if (prot === 'CUG') {
        r = { r: rightHand.rightHand8, o: 'Mad Mirror' };
      } else if (prot === 'AUU') {
        r = { r: rightHand.rightHand9, o: 'None' };
      }
    }
    return r;
  }

  function _eyeBrows(s, e) {
    let r = {};
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      if (prot === 'UUC') {
        r = { r: eyeBrows.eyeBrows1, o: 'Toruks Eyebrows' };
      } else if (prot === 'UUU') {
        r = { r: eyeBrows.eyeBrows2, o: 'Baligs Eyebrows' };
      } else if (prot === 'UUA') {
        r = { r: eyeBrows.eyeBrows3, o: 'Vulcors Eyebrows' };
      } else if (prot === 'UUG') {
        r = { r: eyeBrows.eyeBrows4, o: 'Malis Eyebrows' };
      } else if (prot === 'CUU') {
        r = { r: eyeBrows.eyeBrows5, o: 'Koraks Eyebrows' };
      } else if (prot === 'CUC') {
        r = { r: eyeBrows.eyeBrows6, o: 'Vespirs Eyebrows' };
      } else if (prot === 'CUA') {
        r = { r: eyeBrows.eyeBrows7, o: 'Pegors Eyebrows' };
      } else if (prot === 'CUG') {
        r = { r: eyeBrows.eyeBrows8, o: 'Blubos Eyebrows' };
      } else if (prot === 'AUU') {
        r = { r: eyeBrows.eyeBrows9, o: 'None' };
      }
    }
    return r;
  }

  function _weapon(s, e) {
    let r = {};
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      if (prot === 'UUC') {
        r = { r: leftHand.weapon1, o: 'Axe' };
      } else if (prot === 'UUU') {
        r = { r: leftHand.weapon2, o: 'Mallet' };
      } else if (prot === 'UUA') {
        r = { r: leftHand.weapon3, o: 'Sword' };
      } else if (prot === 'UUG') {
        r = { r: leftHand.weapon4, o: 'Shield' };
      } else if (prot === 'CUU') {
        r = { r: leftHand.weapon5, o: 'Flail' };
      } else if (prot === 'CUC') {
        r = { r: leftHand.weapon6, o: 'Spear' };
      } else if (prot === 'CUA') {
        r = { r: leftHand.weapon7, o: 'Bow' };
      } else if (prot === 'CUG') {
        r = { r: leftHand.weapon8, o: 'Trident' };
      } else if (prot === 'AUU') {
        r = { r: leftHand.weapon9, o: 'Stone Blade' };
      } else if (prot === 'AUC') {
        r = { r: leftHand.weapon10, o: 'Scimitar' };
      } else if (prot === 'AUA') {
        r = { r: leftHand.weapon11, o: 'Power Staff' };
      } else if (prot === 'AUG') {
        r = { r: leftHand.weapon12, o: 'Spiked Gloves' };
      } else if (prot === 'GUU') {
        r = { r: leftHand.weapon13, o: 'Tri-tip Spear' };
      } else if (prot === 'GUC') {
        r = { r: leftHand.weapon14, o: 'Coated Dagger' };
      } else if (prot === 'GUA') {
        r = { r: leftHand.weapon15, o: 'Slicing Bow' };
      } else if (prot === 'GUG') {
        r = { r: leftHand.weapon16, o: 'The Merlin' };
      } else if (prot === 'UCU') {
        r = { r: leftHand.weapon17, o: 'Lava Staff' };
      } else if (prot === 'UCC') {
        r = { r: leftHand.weapon18, o: 'Curved Fang' };
      } else if (prot === 'UCA') {
        r = { r: leftHand.weapon19, o: 'Lore Carver' };
      } else if (prot === 'UCG') {
        r = { r: leftHand.weapon20, o: 'Ancient Bow' };
      } else if (prot === 'AGU') {
        r = { r: leftHand.weapon21, o: 'Forsaken Sword' };
      } else if (prot === 'AGC') {
        r = { r: leftHand.weapon22, o: 'The Prodder' };
      } else if (prot === 'CCU') {
        r = { r: leftHand.weapon23, o: 'Bone Splinter' };
      } else if (prot === 'CCC') {
        r = { r: leftHand.weapon24, o: 'None' };
      } else if (prot === 'CCA') {
        r = { r: leftHand.weapon25, o: 'Tooth and Claw' };
      } else if (prot === 'CCG') {
        r = { r: leftHand.weapon26, o: 'Crystal Spear' };
      } else if (prot === 'ACU') {
        r = { r: leftHand.weapon27, o: 'Champions Spear' };
      } else if (prot === 'ACC') {
        r = { r: leftHand.weapon28, o: 'Champions Axe' };
      } else if (prot === 'ACA') {
        r = { r: leftHand.weapon29, o: 'Champions Trident' };
      } else if (prot === 'ACG') {
        r = { r: leftHand.weapon30, o: 'Champions Bow' };
      }
    }
    return r;
  }

  // function _solidBG(s, e) {
  //   let r = {};
  //   for (let i = s; i < e; i++) {
  //     prot = rna.substr(i * 3, 3);
  //
  //     if (prot === 'UUC') {
  //       r = { r: solidBG.solidBG1, o: 1 };
  //     } else if (prot === 'UUU') {
  //       r = { r: solidBG.solidBG2, o: 2 };
  //     } else if (prot === 'UUA') {
  //       r = { r: solidBG.solidBG3, o: 3 };
  //     } else if (prot === 'UUG') {
  //       r = { r: solidBG.solidBG4, o: 4 };
  //     } else if (prot === 'CUU') {
  //       r = { r: solidBG.solidBG5, o: 5 };
  //     } else if (prot === 'CUC') {
  //       r = { r: solidBG.solidBG6, o: 6 };
  //     } else if (prot === 'CUA') {
  //       r = { r: solidBG.solidBG7, o: 7 };
  //     } else if (prot === 'CUG') {
  //       r = { r: solidBG.solidBG8, o: 8 };
  //     }
  //   }
  //   return r;
  // }

  function _titanType(s, e) {
    let r = '';
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      if (prot === 'UUC' || prot === 'UUU' || prot === 'UUA' || prot === 'UUG' || prot === 'CUU' || prot === 'CUC' || prot === 'CUA' || prot === 'CUG' || prot === 'AUU' || prot === 'AUC' || prot === 'AUA' || prot === 'AUG' || prot === 'GUU' || prot === 'GUC' || prot === 'GUA' || prot === 'GUG' || prot === 'UCU' || prot === 'UCC' || prot === 'UCA' || prot === 'UCG' || prot === 'AGU' || prot === 'AGC' || prot === 'CCU' || prot === 'CCC' || prot === 'CCA' || prot === 'CCG' || prot === 'ACU' || prot === 'ACG' || prot === 'GCU' || prot === 'GCC' || prot === 'GCA' || prot === 'GCG') {
        r = 'Order';
      } else if (prot === 'UAU' || prot === 'UAC' || prot === 'GGC' || prot === 'GGA' || prot === 'GGG' || prot === 'CAU' || prot === 'CAC' || prot === 'CAA' || prot === 'CAG' || prot === 'AAU' || prot === 'AAC' || prot === 'AAA' || prot === 'AAG' || prot === 'GAU' || prot === 'GAC' || prot === 'GAA' || prot === 'GAG' || prot === 'UGU' || prot === 'UGC' || prot === 'UGG' || prot === 'CGU' || prot === 'CGC' || prot === 'CGA' || prot === 'CGG' || prot === 'AGA' || prot === 'AGG' || prot === 'GGU' || prot === 'UAA' || prot === 'UAG' || prot === 'UGA' || prot === 'ACC' || prot === 'ACA') {
        r = 'Chaos';
      }
    }
    return r;
  }

  function _titanElements(s, e) {
    let r = '';
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      if (prot === 'UUC' || prot === 'UUU' || prot === 'UUA' || prot === 'UUG' || prot === 'CUU' || prot === 'CUC' || prot === 'CUA' || prot === 'CUG') {
        r = 'Lava';
      } else if (prot === 'AUU' || prot === 'AUC' || prot === 'AUA' || prot === 'AUG' || prot === 'GUU' || prot === 'GUC' || prot === 'GUA' || prot === 'GUG') {
        r = 'Sea';
      } else if (prot === 'UCU' || prot === 'UCC' || prot === 'UCA' || prot === 'UCG' || prot === 'AGU' || prot === 'AGC' || prot === 'CCU' || prot === 'CCC') {
        r = 'Forest';
      } else if (prot === 'CCA' || prot === 'CCG' || prot === 'ACU' || prot === 'ACG' || prot === 'GCU' || prot === 'GCC' || prot === 'GCA' || prot === 'GCG') {
        r = 'Spike';
      } else if (prot === 'UAU' || prot === 'UAC' || prot === 'GGC' || prot === 'GGA' || prot === 'GGG' || prot === 'CAU' || prot === 'CAC' || prot === 'CAA') {
        r = 'Poison';
      } else if (prot === 'CAG' || prot === 'AAU' || prot === 'AAC' || prot === 'AAA' || prot === 'AAG' || prot === 'GAU' || prot === 'GAC' || prot === 'GAA') {
        r = 'Sky';
      } else if (prot === 'GAG' || prot === 'UGU' || prot === 'UGC' || prot === 'UGG' || prot === 'CGU' || prot === 'CGC' || prot === 'CGA' || prot === 'CGG') {
        r = 'Dawn';
      } else if (prot === 'AGA' || prot === 'AGG' || prot === 'GGU' || prot === 'UAA' || prot === 'UAG' || prot === 'UGA' || prot === 'ACC' || prot === 'ACA') {
        r = 'Dusk';
      }
    }
    return r;
  }

  function _titanRarity(s, e) {
    let r = '';
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      if (prot === 'UUC') {
        r = 'COMMON';
      } else if (prot === 'AAG') {
        r = 'RARE';
      } else if (prot === 'CGA') {
        r = 'ULTRA-RARE';
      } else if (prot === 'GGC') {
        r = 'LEGENDARY';
      } else if (prot === 'GGG') {
        r = 'SPECIAL';
      }
    }
    return r;
  }

  function _baseColor(s, e) {
    let r = '';
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      // Korak #ff8b00 color foi eliminada, pois ser muito parecida com Toruk
      if (prot === 'UUC') {
        r = '#494949'; // Vespir
      } else if (prot === 'UUU') {
        r = '#7a7a7a'; // New
      } else if (prot === 'UUA') {
        r = '#27c1c9'; // New
      } else if (prot === 'UUG') {
        r = '#ff7300'; // Toruk
      } else if (prot === 'CUU') {
        r = '#a8ff00'; // Balig
      } else if (prot === 'CUC') {
        r = '#ffd41f'; // Pegor trocado de #ffeea4 por #ffd41f -> nao mudou
      } else if (prot === 'CUA') {
        r = '#00ffe0'; // Blubo
      } else if (prot === 'CUG') {
        r = '#4e1400'; // Dark Brown
      } else if (prot === 'AUU') {
        r = '#254500'; // Dark Green
      } else if (prot === 'AUC') {
        r = '#ff0000'; // Dark Red
      }
    }
    return r;
  }

  function _titanColor(s, e) {
    // 'CGA','CGG','AGA','AGG','GGU','GGC','GGA','GGG' => Enderecos reservados para cores futuras

    let r = '';
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      if (prot === 'UUC') {
        r = '#494949'; // Vespir
      } else if (prot === 'UUU') {
        r = '#595959'; // Vespir
      } else if (prot === 'UUA') {
        r = '#DF9C9C'; // Vespir
      } else if (prot === 'UUG') {
        r = '#D9D9D9'; // Vespir
      } else if (prot === 'CUU') {
        r = '#A6A6A6'; // Vespir
      } else if (prot === 'CUC') {
        r = '#999999'; // Vespir
      } else if (prot === 'CUA') {
        r = '#E6E6E6'; // Vespir
      } else if (prot === 'CUG') {
        r = '#2ccddd'; // Mali
      } else if (prot === 'AUU') {
        r = '#12565C'; // Mali
      } else if (prot === 'AUC') {
        r = '#71D8E1'; // Mali
      } else if (prot === 'AUA') {
        r = '#2CCDDB'; // Mali
      } else if (prot === 'AUG') {
        r = '#229DA8'; // Mali
      } else if (prot === 'GUU') {
        r = '#1F919C'; // Mali
      } else if (prot === 'GUC') {
        r = '#2ED9E8'; // Mali
      } else if (prot === 'GUA') {
        r = '#ff8b00'; // Korak
      } else if (prot === 'GUG') {
        r = '#7D4500'; // Korak
      } else if (prot === 'UCU') {
        r = '#FDAD4C'; // Korak
      } else if (prot === 'UCC') {
        r = '#FC8B00'; // Korak
      } else if (prot === 'UCA') {
        r = '#C96F00'; // Korak
      } else if (prot === 'UCG') {
        r = '#BD6800'; // Korak
      } else if (prot === 'AGU') {
        r = '#3D2200'; // Korak
      } else if (prot === 'AGC') {
        r = '#ff5500'; // Vulcon
      } else if (prot === 'CCU') {
        r = '#612000'; // Vulcon
      } else if (prot === 'CCC') {
        r = '#E67A45'; // Vulcon
      } else if (prot === 'CCA') {
        r = '#E04B00'; // Vulcon
      } else if (prot === 'CCG') {
        r = '#AD3A00'; // Vulcon
      } else if (prot === 'ACU') {
        r = '#A13600'; // Vulcon
      } else if (prot === 'ACC') {
        r = '#ED4F00'; // Vulcon
      } else if (prot === 'ACA') {
        r = '#ff7300'; // Toruk
      } else if (prot === 'ACG') {
        r = '#7A3700'; // Toruk
      } else if (prot === 'GCU') {
        r = '#FB9A4B'; // Toruk
      } else if (prot === 'GCC') {
        r = '#FA7000'; // Toruk
      } else if (prot === 'GCA') {
        r = '#7A4B25'; // Toruk
      } else if (prot === 'GCG') {
        r = '#BA5400'; // Toruk
      } else if (prot === 'UAU') {
        r = '#3B1A00'; // Toruk
      } else if (prot === 'UAC') {
        r = '#a8ff00'; // Balig
      } else if (prot === 'UAA') {
        r = '#3D5C00'; // Balig
      } else if (prot === 'UAG') {
        r = '#ADE144'; // Balig
      } else if (prot === 'UGA') {
        r = '#92DB00'; // Balig
      } else if (prot === 'CAU') {
        r = '#70A800'; // Balig
      } else if (prot === 'CAC') {
        r = '#689C00'; // Balig
      } else if (prot === 'CAA') {
        r = '#9BE800'; // Balig
      } else if (prot === 'CAG') {
        r = '#ffeea4'; // Pegor
      } else if (prot === 'AAU') {
        r = '#6B6445'; // Pegor
      } else if (prot === 'AAC') {
        r = '#EED151'; // Pegor
      } else if (prot === 'AAA') {
        r = '#EBDB96'; // Pegor
      } else if (prot === 'AAG') {
        r = '#B8AB76'; // Pegor
      } else if (prot === 'GAU') {
        r = '#ABA06D'; // Pegor
      } else if (prot === 'GAC') {
        r = '#F7E79E'; // Pegor
      } else if (prot === 'GAA') {
        r = '#00ffe0'; // Blubo
      } else if (prot === 'GAG') {
        r = '#005E53'; // Blubo
      } else if (prot === 'UGU') {
        r = '#44E3D1'; // Blubo
      } else if (prot === 'UGC') {
        r = '#00DEC4'; // Blubo
      } else if (prot === 'UGG') {
        r = '#1C5E57'; // Blubo
      } else if (prot === 'CGU') {
        r = '#009E8C'; // Blubo
      } else if (prot === 'CGC') {
        r = '#00EBCF'; // Blubo
      }
    }
    return r;
  }

  const titanType = _titanType(55, 56);
  const titanElements = _titanElements(56, 57);

  const titanRarity = _titanRarity(68, 69);

  const baseColor = _baseColor(70, 71);
  const hairColor = _titanColor(71, 72);
  // const extraColor = _titanColor(72,73);
  const extraColor = baseColor;
  const armsColor = baseColor; // _genTitanColor(73,74);
  const bodyColor = baseColor; // _genTitanColor(74,75);
  const headColor = baseColor; // _genTitanColor(75,76);
  const earsColor = baseColor; // _genTitanColor(76,77);

  function preencheVar() {
    // var_r_solidBG = _solidBG(30, 31).r;

    if (indexTitan === '1234' || indexTitan === '4321') {
      var_r_extra = _extra(1, 2).r;
      var_r_ears = _ears(4, 5).r;
      var_r_hair = _hair(20, 21).r;
    } else {
      var_r_extra = _extra(1, 2).r?.replaceAll('changeExtraColor', extraColor) || '';
      var_r_ears = _ears(4, 5).r?.replaceAll('changeEarsColor', earsColor) || '';
      var_r_hair = _hair(20, 21).r?.replaceAll('changeHairColor', hairColor) || '';
    }

    var_r_armsExtra = _armsExtra(2, 3).r;
    var_r_skinArms = _skinArms(5, 6).r;
    var_r_scarsArms = _scarsArms(6, 7).r;
    var_r_skinBody = _skinBody(8, 9).r;
    var_r_bracelets = _bracelets(9, 10).r;
    var_r_clothUp = _clothUp(10, 11).r;
    var_r_shoes = _shoes(11, 12).r;
    var_r_clothDown = _clothDown(12, 13).r;
    var_r_belt = _belt(13, 14).r;
    var_r_scarsFace = _scarsFace(15, 16).r;
    var_r_skinHead = _skinHead(16, 17).r;
    var_r_horns = _horns(17, 18).r;
    var_r_eyes = _eyes(18, 19).r;
    var_r_mouth = _mouth(19, 20).r;
    var_r_eyeBrows = _eyeBrows(21, 22).r;
    var_r_weapon = _weapon(22, 23).r;
    var_r_rightHand = _rightHand(23, 24).r;

    var_o_extra = _extra(1, 2).o;
    var_o_armsExtra = _armsExtra(2, 3).o;
    var_o_ears = _ears(4, 5).o;
    var_o_skinArms = _skinArms(5, 6).o;
    var_o_scarsArms = _scarsArms(6, 7).o;
    var_o_skinBody = _skinBody(8, 9).o;
    var_o_bracelets = _bracelets(9, 10).o;
    var_o_clothUp = _clothUp(10, 11).o;
    var_o_shoes = _shoes(11, 12).o;
    var_o_clothDown = _clothDown(12, 13).o;
    var_o_belt = _belt(13, 14).o;
    var_o_scarsFace = _scarsFace(15, 16).o;
    var_o_skinHead = _skinHead(16, 17).o;
    var_o_horns = _horns(17, 18).o;
    var_o_eyes = _eyes(18, 19).o;
    var_o_mouth = _mouth(19, 20).o;
    var_o_hair = _hair(20, 21).o;
    var_o_eyeBrows = _eyeBrows(21, 22).o;
    var_o_weapon = _weapon(22, 23).o;
    var_o_rightHand = _rightHand(23, 24).o;
  }

  preencheVar();

  // Gerando Imagens
  let full = '';
  if (indexTitan === '1234') {
    full = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080">
${var_r_extra}
${var_r_armsExtra}
${arms.replaceAll('changeArmsColor', armsColor)}
${var_r_ears}
${var_r_skinArms}
${var_r_scarsArms}
${body.replaceAll('changeBodyColor', bodyColor)}
${var_r_skinBody}
${var_r_clothUp}
${var_r_bracelets}
${var_r_shoes}
${var_r_clothDown}
${var_r_belt}
${head0.replaceAll('changeHeadColor', headColor)}
${var_r_scarsFace}
${var_r_skinHead}
${var_r_horns}
${var_r_eyeBrows}
${var_r_eyes}
${var_r_hair}
${var_r_mouth}
${var_r_rightHand}
${var_r_weapon}
</svg>`;
  } else if (indexTitan === '4321') {
    full = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080">
${var_r_extra}
${var_r_armsExtra}
${arms.replaceAll('changeArmsColor', armsColor)}
${var_r_ears}
${var_r_skinArms}
${var_r_scarsArms}
${body.replaceAll('changeBodyColor', bodyColor)}
${var_r_skinBody}
${var_r_clothUp}
${var_r_bracelets}
${var_r_shoes}
${var_r_clothDown}
${var_r_belt}
${head0.replaceAll('changeHeadColor', headColor)}
${var_r_scarsFace}
${var_r_skinHead}
${var_r_horns}
${var_r_eyeBrows}
${var_r_eyes}
${var_r_hair}
${var_r_mouth}
${var_r_rightHand}
${var_r_weapon}
</svg>`;
  } else {
    full = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080">
${var_r_extra}
${var_r_armsExtra}
${arms.replaceAll('changeArmsColor', armsColor)}
${var_r_ears.replaceAll('changeEarsColor', bodyColor)}
${var_r_skinArms}
${var_r_scarsArms}
${body.replaceAll('changeBodyColor', bodyColor)}
${var_r_skinBody}
${var_r_clothUp}
${var_r_bracelets}
${var_r_shoes}
${var_r_clothDown}
${var_r_belt}
${head0.replaceAll('changeHeadColor', headColor)}
${var_r_scarsFace}
${var_r_skinHead}
${var_r_horns}
${var_r_eyeBrows}
${var_r_eyes}
${var_r_hair}
${var_r_mouth}
${var_r_rightHand}
${var_r_weapon}
</svg>`;
  }

  const fullmini = full.replace(/\n/g, ' ');

  // Gerando como Image base64 para ter o svg criptografado
  const decoded = unescape(encodeURIComponent(fullmini));
  const imgSource = `data:image/svg+xml;base64,${btoa(decoded)}`;

  return {
    img: imgSource,
    back: var_o_extra,
    armsExtra: var_o_armsExtra,
    ears: var_o_ears,
    skinArms: var_o_skinArms,
    scarsArms: var_o_scarsArms,
    skinBody: var_o_skinBody,
    bracelets: var_o_bracelets,
    clothUp: var_o_clothUp,
    shoes: var_o_shoes,
    clothDown: var_o_clothDown,
    belt: var_o_belt,
    scarsFace: var_o_scarsFace,
    skinHead: var_o_skinHead,
    horns: var_o_horns,
    eyes: var_o_eyes,
    mouth: var_o_mouth,
    hair: var_o_hair,
    eyeBrows: var_o_eyeBrows,
    leftHand: var_o_weapon,
    rightHand: var_o_rightHand,
    baseColor,
    hairColor,

    TP: titanType,
    EL: titanElements,
    rare: titanRarity,

    imgPNG: full,
  };
}

function translateWeapons(_rna) {
  let var_o_weapon = '';
  let var_o_rightHand = '';

  const rna = _rna;
  // console.log(_rna)
  let prot = '';

  function _rightHand(s, e) {
    let r = {};
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      if (prot === 'UUC') {
        r = { r: rightHand.rightHand1, o: 'Oaken Shield' };
      } else if (prot === 'UUU') {
        r = { r: rightHand.rightHand2, o: 'Spiked Shield' };
      } else if (prot === 'UUA') {
        r = { r: rightHand.rightHand3, o: 'Power Glove' };
      } else if (prot === 'UUG') {
        r = { r: rightHand.rightHand4, o: 'Thorns' };
      } else if (prot === 'CUU') {
        r = { r: rightHand.rightHand5, o: 'Iron Fist' };
      } else if (prot === 'CUC') {
        r = { r: rightHand.rightHand6, o: 'Webbed Shield' };
      } else if (prot === 'CUA') {
        r = { r: rightHand.rightHand7, o: 'Second Wind' };
      } else if (prot === 'CUG') {
        r = { r: rightHand.rightHand8, o: 'Mad Mirror' };
      } else if (prot === 'AUU') {
        r = { r: rightHand.rightHand9, o: 'None' };
      } else if (prot === 'AUC') {
        r = { r: rightHand.rightHand10, o: 'Bone Knife' };
      } else if (prot === 'AUA') {
        r = { r: rightHand.rightHand11, o: 'Woodland Gloves' };
      }
    }
    return r;
  }

  function _weapon(s, e) {
    let r = {};
    for (let i = s; i < e; i++) {
      prot = rna.substr(i * 3, 3);

      if (prot === 'UUC') {
        r = { r: leftHand.weapon1, o: 'Axe' };
      } else if (prot === 'UUU') {
        r = { r: leftHand.weapon2, o: 'Mallet' };
      } else if (prot === 'UUA') {
        r = { r: leftHand.weapon3, o: 'Sword' };
      } else if (prot === 'UUG') {
        r = { r: leftHand.weapon4, o: 'Shield' };
      } else if (prot === 'CUU') {
        r = { r: leftHand.weapon5, o: 'Flail' };
      } else if (prot === 'CUC') {
        r = { r: leftHand.weapon6, o: 'Spear' };
      } else if (prot === 'CUA') {
        r = { r: leftHand.weapon7, o: 'Bow' };
      } else if (prot === 'CUG') {
        r = { r: leftHand.weapon8, o: 'Trident' };
      } else if (prot === 'AUU') {
        r = { r: leftHand.weapon9, o: 'Stone Blade' };
      } else if (prot === 'AUC') {
        r = { r: leftHand.weapon10, o: 'Scimitar' };
      } else if (prot === 'AUA') {
        r = { r: leftHand.weapon11, o: 'Power Staff' };
      } else if (prot === 'AUG') {
        r = { r: leftHand.weapon12, o: 'Spiked Gloves' };
      } else if (prot === 'GUU') {
        r = { r: leftHand.weapon13, o: 'Tri-tip Spear' };
      } else if (prot === 'GUC') {
        r = { r: leftHand.weapon14, o: 'Coated Dagger' };
      } else if (prot === 'GUA') {
        r = { r: leftHand.weapon15, o: 'Slicing Bow' };
      } else if (prot === 'GUG') {
        r = { r: leftHand.weapon16, o: 'The Merlin' };
      } else if (prot === 'UCU') {
        r = { r: leftHand.weapon17, o: 'Lava Staff' };
      } else if (prot === 'UCC') {
        r = { r: leftHand.weapon18, o: 'Curved Fang' };
      } else if (prot === 'UCA') {
        r = { r: leftHand.weapon19, o: 'Lore Carver' };
      } else if (prot === 'UCG') {
        r = { r: leftHand.weapon20, o: 'Ancient Bow' };
      } else if (prot === 'AGU') {
        r = { r: leftHand.weapon21, o: 'Forsaken Sword' };
      } else if (prot === 'AGC') {
        r = { r: leftHand.weapon22, o: 'The Prodder' };
      } else if (prot === 'CCU') {
        r = { r: leftHand.weapon23, o: 'Bone Splinter' };
      } else if (prot === 'CCC') {
        r = { r: leftHand.weapon24, o: 'None' };
      } else if (prot === 'CCA') {
        r = { r: leftHand.weapon25, o: 'Tooth and Claw' };
      } else if (prot === 'CCG') {
        r = { r: leftHand.weapon26, o: 'Crystal Spear' };
      } else if (prot === 'ACU') {
        r = { r: leftHand.weapon27, o: 'Champions Spear' };
      } else if (prot === 'ACC') {
        r = { r: leftHand.weapon28, o: 'Champions Axe' };
      } else if (prot === 'ACA') {
        r = { r: leftHand.weapon29, o: 'Champions Trident' };
      } else if (prot === 'ACG') {
        r = { r: leftHand.weapon30, o: 'Champions Bow' };
      }
    }
    return r;
  }

  function preencheVar() {
    var_o_weapon = _weapon(22, 23).o;
    var_o_rightHand = _rightHand(23, 24).o;
  }

  preencheVar();

  return {
    leftHand: var_o_weapon,
    rightHand: var_o_rightHand,
  };
}

export default {
  translateDna,
  translateWeapons,
};
