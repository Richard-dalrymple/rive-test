import { useRive, Layout, Fit, Alignment, FileAsset, decodeImage } from '@rive-app/react-canvas';

import { Team } from './App';
import { useEffect } from 'react';

const RIVE_TEXT_RUN_LABEL = 'teamRun';

const TEAM_MAPPING = {
  'DOLPHINS': 'MIAMI DOLPHINS',
  'TEXANS': 'HOUSTON TEXANS',
  'FALCONS': 'ATLANTA FALCONS',
}

interface SimpleRiveComponentProps {
  team: Team;
}

export const SimpleRiveComponent = ({ team }: SimpleRiveComponentProps) => {
  const { rive, RiveComponent } = useRive({
    src: '/new_file.riv',
    autoplay: false,
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.Center
    }),
    assetLoader: (asset: FileAsset) => {
      if (asset.name === 'teamLogo.png') {
        fetch(`/${team.toLowerCase()}.png`).then(async (res) => {
          const image = await decodeImage(new Uint8Array(await res.arrayBuffer()));

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (asset as any).setRenderImage(image);

          // You could maintain a reference and update the image dynamically at any time.
          // But be sure to call unref to release any references when no longer needed.
          // This allows the engine to clean it up when it is not used by any more animations.
          image.unref();
        });

        return true;
      }

      return false;
    },
  });

  useEffect(() => {
    if (!rive) {
      return;
    }

    // Prevent a blurry canvas by using the device pixel ratio
    rive.resizeDrawingSurfaceToCanvas();

    rive.reset();
    rive.setTextRunValue(RIVE_TEXT_RUN_LABEL, TEAM_MAPPING[team]);
    rive.play();
  });

  return (
    <RiveComponent />
  );
}

export default SimpleRiveComponent;