const getFilterSteps = (num: number) => {
    return Array.from({ length: num }, (_, i) => i);
}

const getGradientCheckpoints = (height: number, detail: number) => {
    let result = [];
    const increment = height / detail;
    for (let i = 0; i <= detail; i++) {
        result.push((100 - height) + (increment * i));
    }
    return result;
}

const getApplicableStylesForStep = (step: number, steps: number[], blurAmount: number) => {
    const gradientOffsets = [
        `rgba(0, 0, 0, 0) ${steps[step]}%`,
        `rgba(0, 0, 0, 1) ${steps[step + 1]}%`
    ];
    if (steps[step + 2]) {
        gradientOffsets.push(`rgba(0, 0, 0, 1) ${steps[step + 2]}%`);
    }
    if (steps[step + 3]) {
        gradientOffsets.push(`rgba(0, 0, 0, 0) ${steps[step + 3]}%`);
    }
    return {
        filter: `blur(${blurAmount * Math.pow(2, step)}px)`,
        maskImage: `linear-gradient(
      to bottom,
      ${gradientOffsets.join(', ')}
    )`,
        WebkitMaskImage: `linear-gradient(
      to bottom,
      ${gradientOffsets.join(', ')}
    )`,
        'z-index': `${step + 1}`,
    };
}

const getStyleString = (styles: any) =>  {
    const css = Object.entries(styles).map(([k, v]) => `${k}:${v}`).join(';')
    return `{${css};}`;
}

const getCssString = (styles: any) => {
    return Object.entries(styles).map(([k, v]) => `${k} ${v}`).join('');
}

const getHTMLString = (blurDetail: number, imageSource: string, imageAlt: string) => {
    const blurDivs = Array.from({ length: blurDetail }, (_, i) => `<div class="blur"></div>`).join('');
    return `<div class="wrapper"><div class="progressive-blur">${blurDivs}</div><img src="${imageSource}" alt="${imageAlt}" /></div>`
}

const getWrapperStyle = (borderRadius: number) => {
    return {
        '.wrapper':
            getStyleString({
                position: 'relative',
                overflow: 'hidden',
                'border-radius': `${borderRadius}px`,
            })
    }
}

const getImageStyle = (scale: number) => {
    return {
        'img': getStyleString({
            width: '100%',
            height: 'auto',
            transform: `scale(${scale})`,
        })
    }
}

const getBlurWrapperStyle = (detail: number, scale: number) => {
    return {
        '.progressive-blur':
            getStyleString({
                position: 'absolute',
                'z-index': `${detail + 1}`,
                width: '100%',
                height: '100%',
                'pointer-events': 'none',
                inset: 'auto 0 0 0',
                transform: `scale(${scale})`,
            })
    };
}

const getBaseBlurStyle = (imageSource: string) => {
    return {
        '.blur':
            getStyleString({
                background: `url('${imageSource}')`,
                'background-size': 'cover',
                position: 'absolute',
                inset: 0,
            })
    }
}

const getBlurDisplayStyles = (height: number, detail: number, blurAmount: number) => {
    const steps = getGradientCheckpoints(height, detail);
    const result: Record<string, string> = {};
    for (const step of getFilterSteps(detail)) {
        const gradientOffsets = [
            `rgba(0, 0, 0, 0) ${steps[step]}%`,
            `rgba(0, 0, 0, 1) ${steps[step + 1]}%`
        ];
        if (steps[step + 2]) {
            gradientOffsets.push(`rgba(0, 0, 0, 1) ${steps[step + 2]}%`);
        }
        if (steps[step + 3]) {
            gradientOffsets.push(`rgba(0, 0, 0, 0) ${steps[step + 3]}%`);
        }
        const cssObject = {
            filter: `blur(${blurAmount * Math.pow(2, step)}px)`,
            'mask-image': `linear-gradient(to bottom,${gradientOffsets.join(', ')})`,
            '-webkit-mask-image': `linear-gradient(to bottom,${gradientOffsets.join(', ')})`,
            'z-index': `${step + 1}`,
        };
        result[`.progressive-blur > div:nth-child(${step + 1})`] = getStyleString(cssObject);
    }
    return result;
}

export {
    getFilterSteps,
    getGradientCheckpoints,
    getApplicableStylesForStep,
    getBlurDisplayStyles,
    getBaseBlurStyle,
    getBlurWrapperStyle,
    getWrapperStyle,
    getImageStyle,
    getHTMLString,
    getCssString
}