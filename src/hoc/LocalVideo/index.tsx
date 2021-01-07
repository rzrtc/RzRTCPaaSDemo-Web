import React, {
  useEffect,
  useCallback,
  useRef,
} from 'react'
import { ICameraVideoTrack, VideoFitMode } from 'rz-paas-sdk-web'

import LocalVideo from '../../component/LocalVideo'
import useStore from '../../hooks/useStore'
import store from '../../store'
import { getTrack } from '../../store/mediaTrackStore'
import { DeviceID } from '../../const'

export interface VideoInfo {
  id: string,
  muted: boolean,
  firstFrameDecoded: boolean,
  createTrackError: string,
}
export interface AudioInfo {
  id: string,
  volume: number,
  muted: boolean,
}

export interface VideoPlayerConfig {
  mirror?: boolean,
  fit?: VideoFitMode,
}
export interface LocalVideoHOCProps {
  videoInfo: VideoInfo,
  audioInfo: AudioInfo,
  videoPlayerConfig: VideoPlayerConfig,
}

export default function LocalVideoHOC({
  videoInfo, audioInfo, videoPlayerConfig,
}: LocalVideoHOCProps) {
  const selfUid = useStore(store, 'selfUid')
  const cameraId = useStore(store.settingsStore, 'cameraId')
  const micId = useStore(store.settingsStore, 'micId')

  const videoContainerRef = useRef(null)

  useEffect(() => {
    const track = getTrack<ICameraVideoTrack>(videoInfo.id, true)
    track?.play(videoContainerRef.current, videoPlayerConfig)
    return () => {
      track?.pause()
    }
  }, [videoInfo.id, videoInfo.muted, videoPlayerConfig])

  const handleSwitchVideo = useCallback(
    () => {
      const video = store.localVideos.get(videoInfo.id)
      const newMuted = !videoInfo.muted
      getTrack<ICameraVideoTrack>(videoInfo.id, true)?.setMuted(newMuted)
      video.setMuted(newMuted)
    },
    [videoInfo],
  )

  const handleSwitchAudio = useCallback(
    () => {
      const newMuted = !audioInfo.muted
      getTrack<ICameraVideoTrack>('localAudio', false)?.setMuted(newMuted)
      store.localAudio.setMuted(newMuted)
    },
    [audioInfo],
  )

  return (
    <LocalVideo
      userId={selfUid}
      videoId={videoInfo.id}
      isAudioMuted={audioInfo.muted}
      isAudioStreamAvailable={micId !== DeviceID.close && micId !== DeviceID.empty}
      isVideoMuted={videoInfo.muted}
      isVideoStreamAvailable={cameraId !== DeviceID.close && cameraId !== DeviceID.empty}
      isCameraEmpty={cameraId === DeviceID.empty}
      createTrackError={videoInfo.createTrackError}
      onSwitchAudio={handleSwitchAudio}
      ref={videoContainerRef}
      onSwitchVideo={handleSwitchVideo}
      isFirstFrameDecoded={videoInfo.firstFrameDecoded}
    />
  )
}
