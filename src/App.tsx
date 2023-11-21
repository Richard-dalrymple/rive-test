import { Button, Card, CardActions, CardContent } from "@mui/material"

import SimpleRiveComponent from "./RiveComponent"
import { useState } from "react";

export type Team = 'DOLPHINS' | 'TEXANS' | 'FALCONS'

export const App = () => {
  const [team, setTeam] = useState<Team|null>(null);

  const onTogglePlay = (activeTeam: Team) => {
    if (team) {
      setTeam(null);
    }

    // Bit of a hack to ensure the image asset changes
    setTimeout(() => {
      setTeam(activeTeam);
    }, 10);
  }

  return (
    <main>
      <Card sx={{ width: 375 }}>
        <CardContent sx={{ padding: 0, height: 120 }}>
          {team && (
            <SimpleRiveComponent team={team} />
          )}
        </CardContent>

        <CardActions sx={{ padding: '16px', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={() => onTogglePlay('DOLPHINS')}>
            Dolphins
          </Button>

          <Button variant="contained" onClick={() => onTogglePlay('TEXANS')}>
            Texans
          </Button>

          <Button variant="contained" onClick={() => onTogglePlay('FALCONS')}>
            Falcons
          </Button>
        </CardActions>
      </Card>
    </main>
  );
}

export default App
