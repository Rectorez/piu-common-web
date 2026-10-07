import { Slider } from '@mui/material';
import React, { useState } from 'react';

export default function ComponentPage() {
  const [iconRotationAngle, setIconRotationAngle] = useState(0);
  const [isHoverOverIcon, setIsHoverOverIcon] = useState(false);

  const onIconMouseOver = (event) => {
    setIsHoverOverIcon(true);
  };
  const onIconMouseLeave = (event) => {
    setIsHoverOverIcon(false);
  };
  const onSliderChange = (event) => {
    const sliderValue = event?.target?.value;
    const angleValue = (sliderValue * 360) / 12;
    setIconRotationAngle(angleValue);
  };

  const onPasteIntoDiv = (event) => {
    console.log('onPasteIntoDiv', {
      event,
      data: event?.clipboardData?.getData('text'),
      clipboard: event?.clipboardData,
      items: event?.clipboardData?.items,
    });
    const items = Array.from(event?.clipboardData?.items) || [];
    for (var item in items) {
      console.log('Item:', { item, type: item?.type, kind: item?.kind });
    }
    items?.forEach((item) => {
      console.log({ type: item?.type, kind: item?.kind });
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <img
        style={{
          // transitionDuration: '0.5s',
          // transitionProperty: 'all',
          // transform: `rotateZ(${iconRotationAngle}deg) scale(${isHoverOverIcon ? '1.2, 1.2' : '1, 1'})`,

          rotate: `${iconRotationAngle}deg`,
          scale: `${isHoverOverIcon ? '1.2' : '1'}`,
          // mixBlendMode: 'exclusion',
          transition: `rotate 0.1s, scale 1.0s`,
        }}
        onMouseOver={onIconMouseOver}
        onMouseLeave={onIconMouseLeave}
        src="https://piugame.com/data/avatar_img2/420b610d3688cd7d3335fe59e1a1ce15.png"
        alt="Icon here"
      />
      <br />
      <Slider
        style={{ width: '30%' }}
        onChange={onSliderChange}
        min={0}
        max={12}
        step={1}
      />
      <div onPaste={onPasteIntoDiv}>Paste Here</div>
    </div>
  );
}
