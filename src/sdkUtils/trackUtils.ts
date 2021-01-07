import _ from 'lodash'
import type { ICameraVideoTrack, IMicrophoneAudioTrack } from 'rz-paas-sdk-web'
import { getTrack } from '../store/mediaTrackStore'
import store from '../store'
import { DeviceID } from '../const'
import { createLocalTracks } from './mediaConnect'

const setCamera = (deviceId:string):Promise<void> => {
  const track1 = getTrack<ICameraVideoTrack>('first')
  const hasNoVideoTrack = _.isNil(track1)

  if (hasNoVideoTrack === false) {
    if (store.settingsStore.cameraId === deviceId) {
      return Promise.resolve()
    }
  }

  return new Promise(async (resolve, reject) => {
    try {
      if (deviceId === DeviceID.close) {
        await track1?.setEnabled(false)
      } else {
        if (hasNoVideoTrack === true) {
          store.settingsStore.update({ cameraId: deviceId })
          await createLocalTracks(true, false)
        } else if (track1.getDevice() === deviceId) {
          await track1.setEnabled(true)
        } else {
          store.localVideos.get('first')?.setFirstFrameDecoded(false)
          store.localVideos.get('second')?.setFirstFrameDecoded(false)
          await track1.setEnabled(true)
          await track1.setDevice(deviceId)
        }
      }
      store.settingsStore.update({ cameraId: deviceId })
    } catch (error) {
      reject(error)
    }
    resolve()
  })
}

const setMic = (deviceId: string): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const track = getTrack<IMicrophoneAudioTrack>('localAudio', false)
    const hasNoAudioTrack = _.isNil(track)

    if (hasNoAudioTrack === false) {
      if (store.settingsStore.micId === deviceId) {
        return Promise.resolve()
      }
    }

    try {
      if (deviceId === DeviceID.close) {
        await track?.setEnabled(false)
      } else {
        if (hasNoAudioTrack === true) {
          store.settingsStore.update({ micId: deviceId })
          await createLocalTracks(false, true)
        } else if (track.getDevice() === deviceId) {
          await track.setEnabled(true)
        } else {
          await track.setEnabled(true)
          await track.setDevice(deviceId)
        }
      }
    } catch (error) {
      reject(error)
    }

    store.settingsStore.update({ micId: deviceId })
    resolve()
  })
}

export {
  setCamera,
  setMic,
}
