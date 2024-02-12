import { MuxPlayerProps } from "@mux/mux-player-react";
import MuxPlayer from "@mux/mux-player-react/lazy";
import styles from "./video.module.scss";

type Props = MuxPlayerProps & {
  title?: string;
  userId?: string;
};

export function Video({ playbackId, title, userId, ...props }: Props) {
  return (
    <MuxPlayer
      streamType="on-demand"
      playbackId={playbackId}
      accentColor="#000"
      autoPlay="muted"
      loop
      className={styles.video}
      primaryColor="#FFFFFF"
      secondaryColor="#000000"
      metadataVideoTitle={title}
      metadataViewerUserId={userId}
      style={{ aspectRatio: "409/270" }}
      {...props}
    />
  );
}
