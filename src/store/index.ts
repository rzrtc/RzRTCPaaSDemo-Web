import {
  VideoFitMode, VideoOptimizationMode,
} from 'rz-paas-sdk-web'

import Store from './types/Store'
import { DeviceID } from '../const'

const store = Store.create({
  channelId: '',
  joinedChannel: false,
  promptStore: {
    kickOut: false,
    connectFailed: false,
    loginFailed: { isFailed: false, errorCode: 1 },
  },
  selfUid: '',
  localAudio: {
    id: 'localAudio',
    muted: true,
    volume: NaN,
  },
  localVideos: {},
  remoteAudios: {},
  remoteVideos: {},
  settingsStore: {
    defaultVideoPlayerConfig: { mirror: false, fit: VideoFitMode.Contain },
    videoInitConfig1: {
      encoderConfig: { width: 640, height: 360, frameRate: 15 },
      optimizationMode: VideoOptimizationMode.Motion,
    },
    micId: DeviceID.empty,
    cameraId: DeviceID.empty,
  },
})

export default store
