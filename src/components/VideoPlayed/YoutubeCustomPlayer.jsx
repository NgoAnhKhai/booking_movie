import React, { useMemo } from "react";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import "./custom-plyr-theme.css";

export default function CustomPlyrPlayer({ url, poster }) {
  // Memo hóa toàn bộ object source
  const plyrSource = useMemo(
    () => ({
      type: "video",
      sources: [{ src: url, provider: "html5" }],
      poster: poster,
    }),
    [url, poster]
  );

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Plyr
        source={plyrSource}
        options={{
          controls: [
            "play-large",
            "rewind",
            "play",
            "fast-forward",
            "progress",
            "current-time",
            "duration",
            "mute",
            "volume",
            "settings",
            "pip",
            "airplay",
            "fullscreen",
          ],
          invertTime: false,
        }}
      />
    </div>
  );
}
