import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';
import { useState } from 'react';

export const SimpleRiveComponent = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const { rive, RiveComponent } = useRive({
    src: 'https://cdn.rive.app/animations/vehicles.riv',
    stateMachines: "bumpy",
    autoplay: false,
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.Center
    }),
    onStateChange: (event) => {
      console.log(event);
    }
  });

  const onTogglePlayPause = () => {
    if (!rive) {
      return
    }

    if (rive.isPlaying) {
      rive.pause();
      setIsPlaying(false);
    } else {
      rive.play();
      setIsPlaying(true);
    }
  }

  return (
    <Card sx={{ width: 380 }}>
      <CardContent sx={{ padding: 0, height: 215 }}>
        <RiveComponent />
      </CardContent>

      <CardActions sx={{ padding: '16px', justifyContent: 'center' }}>
        <Button variant="contained" disabled={!rive} onClick={onTogglePlayPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
      </CardActions>
    </Card>
  );
}

export default SimpleRiveComponent;