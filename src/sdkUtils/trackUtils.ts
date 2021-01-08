import _ from 'lodash'
import type { ICameraVideoTrack, IMicrophoneAudioTrack } from 'rz-paas-sdk-web'
import { getTrack } from '../store/mediaTrackStore'
import store from '../store'
import { DeviceID } from '../const'
import { createLocalTracks } from './mediaConnect'

const setCamera = (deviceId:string):Promise<void> => {
  const track = getTrack<ICameraVideoTrack>('')
  const hasNoVideoTrack = _.isNil(track)

  if (hasNoVideoTrack === false) {
    if (store.settingsStore.cameraId === deviceId) {
      return Promise.resolve()
    }
  }

  return new Promise(async (resolve, reject) => {
    try {
      if (deviceId === DeviceID.close) {
        await track?.setEnabled(false)
      } else {
        if (hasNoVideoTrack === true) {
          store.settingsStore.update({ cameraId: deviceId })
          await createLocalTracks(true, false)
        } else if (track.getDevice() === deviceId) {
          await track.setEnabled(true)
        } else {
          store.localVideos.get('')?.setFirstFrameDecoded(false)
          await track.setEnabled(true)
          await track.setDevice(deviceId)
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
