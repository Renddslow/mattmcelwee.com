import { createCanvas, loadImage, registerFont } from 'canvas';
import titleize from 'titleize';
import fs from 'fs/promises';
import makeDir from 'make-dir';
import path from 'path';

const WIDTH = 800 * 2;
const HEIGHT = 415 * 2;

const TYPE_COLORS = {
  'Fleeting Note': '#FFE45E',
  'Stable Note': '#FF6392',
  Essay: '#10FFCB',
  'Abandoned Idea': '#335',
  'Position Paper': '#5AA9E6',
};

const textWrap = (context, text, x, y, maxWidth, lineHeight) => {
  const words = text.split(' ');
  let line = '';

  for (let n = 0; n < words.length; n++) {
    let testLine = line + words[n] + ' ';
    let metrics = context.measureText(testLine);
    let testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
};

const createImage = async ({ metaKnowledge, title }, filepath) => {
  const cvs = createCanvas(WIDTH, HEIGHT);
  const ctx = cvs.getContext('2d');

  registerFont(path.join(process.cwd(), 'static', 'font', 'SourceSerifPro-Black.ttf'), {
    family: 'Source Serif Pro',
    weight: 'black',
  });
  registerFont(path.join(process.cwd(), 'static', 'font', 'SF-Pro-Display-Semibold.otf'), {
    family: 'SF Pro Display',
    weight: 'semibold',
  });
  const plant = await loadImage(path.join(process.cwd(), 'static', 'plant.png'));

  if (!metaKnowledge) {
    return;
  }

  const typeLabel =
    metaKnowledge?.completeness === 'Certain'
      ? metaKnowledge.type
      : `${titleize(metaKnowledge?.completeness ?? '')} ${metaKnowledge.type}`;
  const certaintyLabel = titleize(metaKnowledge?.certainty ?? '');

  ctx.fillStyle = '#f4f3ef';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.fillStyle = TYPE_COLORS[metaKnowledge.type];
  const bottomBarHeight = Math.floor(HEIGHT * 0.04);
  ctx.fillRect(0, HEIGHT - bottomBarHeight, WIDTH, bottomBarHeight);

  const META_FONT_SIZE = 32;
  const padding = Math.floor(WIDTH * 0.06);

  ctx.font = `normal ${META_FONT_SIZE}px SF Pro Display`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  ctx.fillStyle = '#8c9199';

  ctx.fillText(typeLabel, padding, padding);
  const typeLabelWidth = ctx.measureText(typeLabel).width;

  ctx.drawImage(plant, padding + typeLabelWidth + 10, padding - 10, 48, 48);

  ctx.fillText(certaintyLabel, padding + typeLabelWidth + 10 + 48 + 10, padding);

  const TITLE_FONT_SIZE = 96;
  ctx.font = `black ${TITLE_FONT_SIZE}px Source Serif Pro`;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#24292f';

  textWrap(ctx, title, padding, padding * 2, WIDTH - padding * 2, TITLE_FONT_SIZE * 1.1);

  ctx.fillStyle = '#8c9199';
  ctx.font = `normal ${META_FONT_SIZE}px SF Pro Display`;
  ctx.fillText('mattmcelwee.com', padding, HEIGHT + META_FONT_SIZE * 1.4 - padding * 2);

  const image = cvs.toBuffer('image/png');

  const outPath = `/thumbnails/${filepath.replace('content/', '').replace('.md', '.png')}`;
  await makeDir(path.join(process.cwd(), 'static', path.dirname(outPath)));
  await fs.writeFile(path.join(process.cwd(), 'static', outPath), image);
  return outPath;
};

export default createImage;
