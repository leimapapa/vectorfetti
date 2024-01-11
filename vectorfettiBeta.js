function confetti(el = document.body, opt_properties) {
  if (!el) {
    console.error('Must have element to populate the confetti!');
    return;
  }
  const defaultProperties = {
    addBlur: true,
    angle: 0,
    angleEmoji: 0,
    colors: 'random',
    delay: 10,
    drop: 400,
    fadeout: true,
    fixedSize: false,
    flakes: 100,
    scale: 1,
    speed: 5000,
    spread: 400,
    spin: true,
    type: 'default',
		zIndex: 99999
  };

  const isImage = (url) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };

  // properties passed in from user onto the defaults
  const c = Object.assign(defaultProperties, opt_properties);

  const randInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const hh = c.drop;
  const ww = c.spread;

  const randomBlur = () => {
    if (c.addBlur) return randInt(1, 2);
    else return 1;
  };
	
  const overlayId = `conf${randInt(0, 1000)}etti${randInt(0, 1000)}ver${randInt(0, 1000)}lay`;
  let animatedConfetti = ``;
  // make sure number of flakes is a number
  if (!c.flakes || Number.isNaN(c.flakes * 1)) {
    c.flakes = 100;
  }
  for (let i = 0; i < c.flakes; i++) {
    const conId = `con${randInt(0, 1000)}fet${randInt(0, 1000)}ti${randInt(0, 1000)}`;
    const confettiDur = `${randInt(c.speed / 2, c.speed)}`;
    let confettiSpin = ``;
    let confettiType = ``;
    if (c.spin) {
      confettiSpin = `<animateTransform attributeName="transform"
                          attributeType="XML"
                          type="rotate"
                          from="0 0 0"
                          to="${(Math.random() < 0.5 ? -1 : 1) * 360} 0 0"
                          dur="${randInt(c.speed / 6, c.speed / 2)}ms"
                          begin="-${randInt(1, 10) / 10}s"
                          repeatCount="indefinite"/>`;
    }
    // are we using an array of colors or random ones?
    let confettiColor = ``;
    if (c.colors == 'random' || !Array.isArray(c.colors)) {
      confettiColor = `rgb(${randInt(0, 255)}, ${randInt(0, 255)}, ${randInt(0, 255)})`;
    } else {
      confettiColor = c.colors[randInt(0, c.colors.length - 1)];
    }
    // fixed circle r
    let fixedR = 6;
    let fixedFontSize = `calc(1em * ${c.scale})`;
    let fixedScale = 1;
    if (!c.fixedSize) {
      fixedR = randInt(4, 7);
      fixedFontSize = `calc(${randInt(5, 15) / 10}em * ${c.scale})`;
      fixedScale = randInt(5, 20) / 10;
    }
    if (!Array.isArray(c.type)) {
      // what type of confetti is it?
      switch (c.type) {
        case 'circle':
          confettiType = `<circle id="${conId}" fill="${confettiColor}" cx="0" cy="0" r="${fixedR}" 
          filter="url(#blur${randomBlur()})">
            ${confettiSpin}
            </circle>`;
          break;
        case 'square':
          const hhww = randInt(4, 12);
          confettiType = `<rect id="${conId}" fill="${confettiColor}" x="0" y="0" height="${hhww}" width="${hhww}" 
          filter="url(#blur${randomBlur()})">
                ${confettiSpin}
            </rect>`;
          break;
        case 'tri':
        case 'triangle':
          confettiType = `<path id="${conId}" fill="${confettiColor}" d="M -8 6 L 0 -8 L 8 6 Z" 
          filter="url(#blur${randomBlur()})">
                ${confettiSpin}
            </path>`;
          break;
        case 'rect':
        case 'default':
        default:
          confettiType = `<rect id="${conId}" fill="${confettiColor}" x="0" y="0" 
          height="${randInt(6, 18)}" width="${randInt(4, 7)}" filter="url(#blur${randomBlur()})">
            ${confettiSpin}
        </rect>`;
      }
    } else {
      // user passes in an array of values. (ex. array of emojis)
      const typeArray = c.type;
      const randArrVal = typeArray[randInt(0, typeArray.length - 1)];
      if (isImage(randArrVal)) {
        confettiType = `<g transform="scale(${c.scale})" id="${conId}">
            <image href="${randArrVal}" height="${fixedScale * 20}" width="${fixedScale * 20}" 
            x="${fixedScale * -10}" y="${fixedScale * -10}">
                ${confettiSpin}
            </image>
        </g>`;
      } else {
        confettiType = `<text id="${conId}" fill="${confettiColor}" stroke-width="${randInt(1, 3)}" 
        fill="none" x="0" y="0" dominant-baseline="middle" text-anchor="middle" filter="url(#blur${randomBlur()})" 
        font-size="${fixedFontSize}" font-family="'Roboto', sans-serif" transform="rotate(${c.angleEmoji})">
				${randArrVal}
        ${confettiSpin}
        </text>`;
      }
    }

    // add confetti to group
    animatedConfetti += `<g transform="translate(${randInt(ww * -0.3, ww * 0.3)} 0) scale(1.${randInt(0, 1)})">
        ${confettiType}
    </g>
    <animateMotion xlink:href="#${conId}" dur="${confettiDur}ms" begin="0s" fill="freeze" repeatCount="none" keyTimes="0;1" keySplines="0.12 0.1 0.9 0.1" caalcMode="spline">
        <mpath xlink:href="#motionPath${overlayId}${randInt(1, 2)}" />
    </animateMotion>`;
  }

  const elemRect = el.getBoundingClientRect();
  const centerY = elemRect.top + (elemRect.bottom - elemRect.top) / 2;
  const centerX = elemRect.left - (elemRect.left - elemRect.right) / 2;
	let fadeAnim = ``;
	if (c.fadeout) {
		fadeAnim = `<animate attributeName="opacity" values="1; 0" dur="${c.speed / 4}ms" begin="${c.speed / 4}ms" repeatCount="none" fill="freeze"/>
	<animateTransform attributeName="transform" type="translate" additive="sum" values="0 0; ${-ww / 2} ${-hh / 2}" begin="0s" dur="${c.speed / 10}ms" fill="freeze" repeatCount="0" keyTimes="0;1" keySplines="0.4 0 0.6 1" calcMode="spline" />
	<animateTransform attributeName="transform" type="scale" additive="sum" values="0; 1" begin="0s" dur="${c.speed / 10}ms" fill="freeze" repeatCount="0" keyTimes="0;1" keySplines="0.4 0 0.6 1" calcMode="spline" />`;
	}
  const svg = `<svg id="${overlayId}" viewBox="0 0 ${ww} ${hh}" height="${hh}px" width="${ww}px" preserveAspectRatio="none" style="left:${centerX}px; 
        top:${centerY}px; 
        pointer-events:none; 
        position:fixed; 
        transform:translate(-50%,-50%) rotate(${c.angle}deg); 
        transition:${c.speed / 10}ms; 
        user-select:none; 
        z-index:${c.zIndex}">
        <filter id="blur1" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0" />
        </filter>
        <filter id="blur2" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
        </filter>
        <path id="motionPath${overlayId}1" fill="none" stroke="none" 
        d="M ${ww * 0.5} -${hh * 0} Q ${ww * 0.3} ${hh * 0.25} ${ww * 0.5} ${hh * 0.5} 
        Q ${ww * 0.7} ${hh * 0.75} ${ww * 0.5} ${hh * 1.1}" />
        <path id="motionPath${overlayId}2" fill="none" stroke="none" 
        d="M ${ww * 0.5} -${hh * 0} 
        Q ${ww * 0.7} ${hh * 0.25} ${ww * 0.5} ${hh * 0.5} Q ${ww * 0.3} ${hh * 0.75} ${ww * 0.5} ${hh * 1.1}" />
				<g transform="translate(${ww / 2} ${hh / 2})">
        	${animatedConfetti}
					${fadeAnim}
				</g>
    </svg>`;

  // Make it a node to avoid the dangerous "document.body.innerHTML = svg"
  const wrapper = document.createElement('div');
  wrapper.innerHTML = svg;
  const svgChild = wrapper.firstChild;

  // @ts-ignore
  document.body.appendChild(svgChild);
  setTimeout(() => {
    svgChild?.remove();
  }, c.speed);
}
