const pptxgen = require('pptxgenjs');

const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';
pptx.author = 'Larvuz / Hermes';
pptx.company = 'Larvuz';
pptx.subject = 'Editable native PowerPoint export from HTML deck';
pptx.title = 'Gus Garza — Creative Tech Dossier';
pptx.lang = 'en-US';
pptx.theme = {
  headFontFace: 'Big Shoulders Display',
  bodyFontFace: 'Albert Sans',
  lang: 'en-US'
};
pptx.defineLayout({ name: 'LRVZ_WIDE', width: 13.333333, height: 7.5 });
pptx.layout = 'LRVZ_WIDE';
pptx.margin = 0;
pptx.defineSlideMaster({
  title: 'BLANK',
  background: { color: 'F1E6CB' },
  objects: []
});

const W = 13.333333;
const H = 7.5;
const sx = W / 1920;
const sy = H / 1080;
const P = {
  paper: 'F1E6CB', paperDk: 'E5D6B0', ink: '3A2516', red: 'E5392A', pink: 'E54489', orange: 'F09131', green: '3D9F47', blue: '3F8BC4', yellow: 'F0BC2A', white: 'F1E6CB'
};
const fontHead = 'Big Shoulders Display';
const fontBody = 'Albert Sans';
const fontMono = 'JetBrains Mono';
const fontJP = 'Noto Sans JP';
const px = n => n * sx;
const py = n => n * sy;
const pt = n => n * 0.5; // 1920px maps to 13.333in: CSS px -> PPT points = px/144*72 = px*0.5

function addBg(slide) {
  slide.background = { color: P.paper };
  // Editable dot texture approximation, grouped visually as native tiny circles.
  for (let x = 6; x < 1920; x += 96) {
    for (let y = 6; y < 1080; y += 96) {
      slide.addShape(pptx.ShapeType.ellipse, {
        x: px(x), y: py(y), w: px(3.2), h: py(3.2),
        fill: { color: P.ink, transparency: 86 }, line: { color: P.ink, transparency: 100 }
      });
    }
  }
}
function txt(slide, text, x, y, w, h, opt={}) {
  slide.addText(text, {
    x: px(x), y: py(y), w: px(w), h: py(h),
    fontFace: opt.font || fontBody,
    fontSize: opt.size || 18,
    bold: opt.bold ?? false,
    italic: opt.italic ?? false,
    color: opt.color || P.ink,
    align: opt.align || 'left',
    valign: opt.valign || 'top',
    fit: opt.fit || 'shrink',
    breakLine: false,
    margin: opt.margin ?? 0,
    paraSpaceAfterPt: opt.paraSpaceAfterPt ?? 0,
    paraSpaceBeforePt: opt.paraSpaceBeforePt ?? 0,
    breakLine: false,
    rotate: opt.rotate || 0,
    charSpace: opt.charSpace || 0,
    transparency: opt.transparency || 0,
  });
}
function rect(slide, x, y, w, h, fill, opt={}) {
  slide.addShape(pptx.ShapeType.rect, {
    x:px(x), y:py(y), w:px(w), h:py(h),
    fill:{ color: fill, transparency: opt.fillTransparency || 0 },
    line: opt.noLine ? { color: fill, transparency: 100 } : { color: opt.line || P.ink, width: opt.lineWidth || 1.2, transparency: opt.lineTransparency || 0 },
    rotate: opt.rotate || 0
  });
}
function ellipse(slide, x, y, w, h, fill, opt={}) {
  slide.addShape(pptx.ShapeType.ellipse, {
    x:px(x), y:py(y), w:px(w), h:py(h),
    fill:{ color: fill, transparency: opt.fillTransparency || 0 },
    line: opt.noLine ? { color: fill, transparency: 100 } : { color: opt.line || fill, width: opt.lineWidth || 1, transparency: opt.lineTransparency || 0 },
  });
}
function line(slide, x1, y1, x2, y2, opt={}) {
  slide.addShape(pptx.ShapeType.line, {
    x:px(x1), y:py(y1), w:px(x2-x1), h:py(y2-y1),
    line:{ color: opt.color || P.ink, width: opt.width || 1.2, dash: opt.dash }
  });
}
function checkBox(slide, x, y, label, checked=true) {
  rect(slide, x, y, 24, 24, checked ? P.ink : P.paper, { lineWidth: 2.2 });
  if (checked) txt(slide, '×', x-2, y-7, 28, 30, { font: fontHead, size: pt(29), bold:true, color:P.paper, align:'center', valign:'mid' });
  txt(slide, label, x+38, y-2, 170, 30, { font: fontBody, size: pt(23), bold:true, charSpace: 1.2 });
}
function pageNum(slide, n) {
  txt(slide, `${String(n).padStart(2,'0')} / 03`, 1740, 1002, 110, 28, { font: fontMono, size: pt(18), bold:true, align:'right', charSpace: 1 });
}
function seal(slide, text, x, y, w, h, size=24) {
  // PowerPoint-native editable approximation of jagged web seal.
  slide.addShape(pptx.ShapeType.sun, {
    x:px(x), y:py(y), w:px(w), h:py(h),
    fill:{color:P.ink}, line:{color:P.ink, transparency:100}
  });
  txt(slide, text, x, y+h*.25, w, h*.5, { font:fontHead, size:pt(size), bold:true, color:P.paper, align:'center', valign:'mid' });
}
function addPetals(slide, ox, oy, scale=1) {
  const petals = [
    [0, 87, 190, 190, P.red], [57, 153, 144, 144, P.orange], [106, 0, 167, 167, P.blue], [194, 66, 190, 190, P.green], [141, 156, 122, 122, P.yellow]
  ];
  for (const [x,y,w,h,c] of petals) ellipse(slide, ox+x*scale, oy+y*scale, w*scale, h*scale, c, {noLine:true});
}

// Slide 1
{
  const slide = pptx.addSlide('BLANK'); addBg(slide);
  addPetals(slide, 72, 70, 1);
  txt(slide, 'gus\ngarza', 505, 112, 260, 130, { font: fontHead, size: pt(74), bold:true, fit:'shrink' });
  txt(slide, 'CREATIVE-TECH DOSSIER', 505, 245, 340, 26, { font: fontBody, size: pt(20), bold:true, charSpace: 1.1 });
  // editable rotated ribbons
  const ry = [210, 294, 378, 462, 546];
  const rh = [88, 78, 78, 78, 88];
  const rc = [P.pink, P.orange, P.yellow, P.green, P.blue];
  for (let i=0;i<5;i++) rect(slide, 930, ry[i], 1500, rh[i], rc[i], { noLine:true, rotate:-22 });
  txt(slide, 'G-26', 72, 365, 560, 200, { font: fontHead, size: pt(266), bold:true, fit:'shrink' });
  rect(slide, 72, 744, 715, 111, P.pink, { noLine:true });
  txt(slide, 'CREATIVE SYSTEMS', 93, 756, 674, 80, { font:fontHead, size:pt(118), bold:true, color:P.paper, fit:'shrink' });
  txt(slide, 'Founder / producer / game builder turning cinematic taste into AI-native worlds, tools, films, decks, and playable IP.', 72, 898, 880, 78, { font:fontBody, size:pt(30), bold:true, fit:'shrink' });
  checkBox(slide, 1518, 330, 'CINEMA', true);
  checkBox(slide, 1518, 430, 'AI', true);
  checkBox(slide, 1518, 530, 'GAMES', true);
  checkBox(slide, 1518, 630, 'BORING', false);
  line(slide, 72, 1018, 1848, 1018, { width: 1.2 });
  txt(slide, '限定版', 72, 1040, 90, 24, { font:fontJP, size:pt(18), bold:true });
  txt(slide, 'made in mexico · built for weird futures', 170, 1040, 470, 24, { font:fontBody, size:pt(18), bold:true });
  txt(slide, 'N.R. :', 850, 1038, 80, 24, { font:fontMono, size:pt(16), bold:true });
  rect(slide, 940, 1041, 18, 18, P.ink); txt(slide, 'ON', 968, 1038, 45, 24, { font:fontMono, size:pt(16), bold:true });
  rect(slide, 1035, 1041, 18, 18, P.paper); txt(slide, 'OFF', 1062, 1038, 50, 24, { font:fontMono, size:pt(16), bold:true });
  seal(slide, '26', 1485, 986, 94, 94, 34);
  rect(slide, 1625, 1000, 128, 62, P.red, { noLine:true });
  txt(slide, 'ACTIVE FILE', 1642, 1010, 100, 14, { font:fontBody, size:pt(12), bold:true, color:P.paper, charSpace:1.2 });
  txt(slide, 'GUS', 1642, 1029, 80, 30, { font:fontHead, size:pt(28), bold:true, color:P.paper });
  pageNum(slide, 1);
}

// Slide 2
{
  const slide = pptx.addSlide('BLANK'); addBg(slide);
  ellipse(slide,126,90,172,172,P.red,{noLine:true}); ellipse(slide,300,240,132,132,P.orange,{noLine:true}); ellipse(slide,160,812,136,136,P.yellow,{noLine:true});
  ellipse(slide,1465,760,155,155,P.green,{noLine:true}); ellipse(slide,1465,142,150,150,P.blue,{noLine:true}); ellipse(slide,1648,318,120,120,P.pink,{noLine:true});
  txt(slide, 'A short note from the machine room', 0, 72, 1920, 28, { font:fontBody, size:pt(18), bold:true, align:'center', charSpace:3 });
  // split headline into editable text runs/boxes for color control.
  txt(slide, 'Turn instinct into', 210, 345, 1500, 95, { font:fontHead, size:pt(156), bold:true, align:'center', fit:'shrink' });
  txt(slide, 'output', 565, 462, 430, 95, { font:fontHead, size:pt(156), bold:true, color:P.red, align:'right', fit:'shrink' });
  txt(slide, '. Make the strange', 1000, 462, 640, 95, { font:fontHead, size:pt(156), bold:true, align:'left', fit:'shrink' });
  txt(slide, 'thing usable.', 210, 579, 1500, 95, { font:fontHead, size:pt(156), bold:true, align:'center', fit:'shrink' });
  line(slide, 168, 988, 1752, 988, { width:1.2 });
  const cols = [168, 718, 1268];
  const labels = ['Method', 'Material', 'Standard'];
  const bodies = ['cinematic direction + technical architecture + fast iteration', 'AI video, 3D worlds, games, audio-reactive systems, agent workflows', 'less generic, more buildable, more emotionally precise'];
  for (let i=0;i<3;i++) {
    txt(slide, labels[i].toUpperCase(), cols[i], 1010, 430, 20, {font:fontMono, size:pt(15), bold:true, transparency:20, charSpace:1.4});
    txt(slide, bodies[i], cols[i], 1042, 430, 58, {font:fontBody, size:pt(18), bold:true, fit:'shrink'});
  }
  pageNum(slide, 2);
}

// Slide 3
{
  const slide = pptx.addSlide('BLANK'); addBg(slide);
  txt(slide, 'Current', 72, 72, 300, 90, { font:fontHead, size:pt(100), bold:true, fit:'shrink' });
  txt(slide, 'catalogue', 390, 72, 430, 90, { font:fontHead, size:pt(100), bold:true, color:P.red, fit:'shrink' });
  txt(slide, 'Four active formats\ncreative technology · 2026', 1370, 95, 480, 70, { font:fontBody, size:pt(18), bold:true, align:'right', charSpace:1.6, fit:'shrink' });
  line(slide, 72, 204, 1848, 204, { width:1.2 });
  const cards = [
    {x:72, c:P.red, name:'AI FILM\nPRODUCTION', desc:'Cinematic prompt systems, character continuity, shot design, edit-aware workflows, and full fantasy film production pipelines.', extras:'For directors, agencies, studios, and teams that need visual output before the old pipeline catches up.', rows:[['MODE','Cinematic'],['STACK','AI Video'],['OUTPUT','Shots / Decks / Systems']]},
    {x:526, c:P.pink, name:'GAME\nWORLDS', desc:'Capyverse-style playable IP: cute but action-heavy, stylized but not kiddy, built around characters, mechanics, and trailer-ready moments.', extras:'Player fantasy first. Production reality second. Steam-ready shape, not vague lore.', rows:[['MODE','Playable'],['ENGINE','Unreal / 3D'],['OUTPUT','Loops / Levels / IP']]},
    {x:980, c:P.orange, name:'SLOPIA\nTOOLS', desc:'AI-native creation platform thinking: 3D scenes, characters, video generation, creator workflows, and internet-native franchises.', extras:'Not “AI content.” Worlds that can keep producing media, stories, assets, and social signals.', rows:[['MODE','Platform'],['CORE','World → Video'],['OUTPUT','MVP / Pitch / UX']]},
    {x:1434, c:P.blue, name:'AGENCY\nOPS', desc:'AI services that make money now: campaign concepts, visual systems, rapid decks, content engines, and production workflows for clients.', extras:'Taste-preserving monetization. Practical offers without turning the work into generic SaaS soup.', rows:[['MODE','Revenue'],['CLIENT','Agency / Brand'],['OUTPUT','Offers / Assets / Systems']]},
  ];
  for (const card of cards) {
    rect(slide, card.x, 250, 414, 620, P.paper, { lineWidth:1.3 });
    rect(slide, card.x, 250, 414, 31, card.c, { noLine:true });
    txt(slide, card.name, card.x+22, 307, 340, 90, { font:fontHead, size:pt(55), bold:true, fit:'shrink' });
    txt(slide, card.desc, card.x+22, 432, 360, 105, { font:fontBody, size:pt(19), bold:true, fit:'shrink' });
    line(slide, card.x+22, 582, card.x+392, 582, { width:1, dash:'dash' });
    txt(slide, card.extras, card.x+22, 604, 360, 88, { font:fontBody, size:pt(17), bold:true, fit:'shrink' });
    line(slide, card.x+22, 732, card.x+392, 732, { width:1, dash:'dash' });
    let yy=752;
    for (const [k,v] of card.rows) {
      txt(slide, k, card.x+22, yy, 115, 18, {font:fontMono, size:pt(14), transparency:25, charSpace:.4});
      txt(slide, v, card.x+130, yy, 260, 18, {font:fontMono, size:pt(14), align:'right', fit:'shrink'});
      yy += 28;
    }
  }
  line(slide, 72, 1000, 1848, 1000, { width:1.2 });
  txt(slide, 'Creative tech, but with taste sharp enough to survive the machine.', 72, 1018, 1370, 58, { font:fontHead, size:pt(55), bold:true, fit:'shrink' });
  seal(slide, 'LRVZ\nOK', 1756, 988, 92, 92, 30);
  pageNum(slide, 3);
}

pptx.writeFile({ fileName: '/root/presentations/shared-repo/gus-sakura-chroma/exports/Gus_Garza_Creative_Tech_Dossier_EDITABLE_v2.pptx' });
