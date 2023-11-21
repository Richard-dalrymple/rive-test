import { useRive, Layout, Fit, Alignment, FileAsset, decodeImage } from '@rive-app/react-canvas';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import Button from '@mui/material/Button';

const RIVE_TEXT_RUN_LABEL = 'teamRun';

type Team = 'DOLPHINS' | 'TEXANS' | 'FALCONS'

const TEAM_MAPPING = {
  'DOLPHINS': 'MIAMI DOLPHINS',
  'TEXANS': 'HOUSTON TEXANS',
  'FALCONS': 'ATLANTA FALCONS',
}

export const SimpleRiveComponent = () => {
  const { rive, RiveComponent } = useRive({
    src: '/new_file.riv',
    autoplay: false,
    layout: new Layout({
      fit: Fit.FitWidth,
      alignment: Alignment.Center
    }),
    assetLoader:(asset: FileAsset, bytes: Uint8Array) => {
      console.log(
        "Tell our asset importer if we are going to load the asset contents",
        {
          name: asset.name,
          fileExtension: asset.fileExtension,
          cdnUuid: asset.cdnUuid,
          isFont: asset.isFont,
          isImage: asset.isImage,
          bytes
        }
      );

      if (asset.name === 'teamLogo.png') {
        fetch("/dolphins.png").then(async (res) => {
          console.log("doing this");
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
    onLoad: () => {
      if (!rive) {
        return;
      }

      // Prevent a blurry canvas by using the device pixel ratio
      rive.resizeDrawingSurfaceToCanvas();
    }
  });

  const onTogglePlay = (team: Team) => {
    if (!rive) {
      return;
    }

    const teamLabel = TEAM_MAPPING[team];
    // const asset = `/${team}.png`;

    rive.reset();
    rive.setTextRunValue(RIVE_TEXT_RUN_LABEL, teamLabel)
    rive.play();
  }

  return (
    <Card sx={{ width: 375 }}>
      <CardContent sx={{ padding: 0, height: 120 }}>
        <RiveComponent />
      </CardContent>

      <CardActions sx={{ padding: '16px', justifyContent: 'space-between' }}>
        <Button variant="contained" disabled={!rive} onClick={() => onTogglePlay('DOLPHINS')}>
          Dolphins
        </Button>

        <Button variant="contained" disabled={!rive} onClick={() => onTogglePlay('TEXANS')}>
          Texans
        </Button>

        <Button variant="contained" disabled={!rive} onClick={() => onTogglePlay('FALCONS')}>
          Falcons
        </Button>
      </CardActions>
    </Card>
  );
}

export default SimpleRiveComponent;