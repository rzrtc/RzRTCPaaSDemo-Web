import React from 'react'
import classNames from 'classnames'

import './index.less'

export interface LocalVideoProps {
  style?: Object,
  userId: string,
  videoId: string,
  isVideoStreamAvailable: boolean, // 摄像头关闭为 false 否则为 true
  isCameraEmpty: boolean,
  createTrackError: string,
  isVideoMuted: boolean,
  isAudioStreamAvailable: boolean, // 麦克风关闭为 false 否则为 true
  isAudioMuted: boolean,
  isFirstFrameDecoded: boolean,
  onSwitchVideo: () => void,
  onSwitchAudio: () => void,
  onClickZoomIn?: () => void,
}
export default React.forwardRef((props: LocalVideoProps, ref) => {
  const {
    style,
    userId,
    videoId,
    isVideoStreamAvailable,
    createTrackError,
    isCameraEmpty,
    isVideoMuted,
    isAudioStreamAvailable,
    isAudioMuted,
    isFirstFrameDecoded,
    onSwitchVideo,
    onSwitchAudio,
  } = props

  const wrapperRef = React.useRef(null)

  return (
    <div
      className="rz-web-test-app-local-video-wrapper"
      style={style || {}}
      ref={wrapperRef}
    >
      <div className="header">
        <div className="user-id">
          {`${userId} ${videoId}`}
          （我）
        </div>
      </div>
      <div
        className="main-content"
      >
        {
          isVideoStreamAvailable === false && (
            <div className="video-status-info-wrap">
              <i className="no-remote-stream-icon" />
              本地摄像头已关闭
            </div>
          )
        }
        {
          isCameraEmpty === true && (
            <div className="video-status-info-wrap">
              <i className="no-remote-stream-icon" />
              未检测到可用的摄像头
            </div>
          )
        }
        {
          createTrackError !== '' && (
            <div className="video-status-info-wrap">
              <i className="no-remote-stream-icon" />
              {createTrackError}
            </div>
          )
        }
        {
          isFirstFrameDecoded === false && isVideoStreamAvailable === true && createTrackError === '' && (
            <div className="video-status-info-wrap">
              <i className="loading-icon" />
              加载中...
            </div>
          )
        }
        <div
          // @ts-ignore
          ref={ref}
          className="video-elememt-container"
        />
      </div>
      <div className="foot">
        <div
          className="stream-button"
          onClick={onSwitchVideo}
        >
          <i
            className={classNames({
              'video-normal-icon': isVideoStreamAvailable,
              'video-err-icon': !isVideoStreamAvailable,
            })}
          />
          {isVideoMuted ? '停止' : '推送'}
        </div>
        <div
          className="stream-button"
          onClick={onSwitchAudio}
        >
          <i
            className={classNames({
              'audio-normal-icon': isAudioStreamAvailable,
              'audio-err-icon': !isAudioStreamAvailable,
            })}
          />
          {isAudioMuted ? '停止' : '推送'}
        </div>
      </div>
    </div>
  )
})
