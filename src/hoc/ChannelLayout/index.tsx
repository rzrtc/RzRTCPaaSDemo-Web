import React, { useEffect, useState } from 'react'

import { ChannelLayout } from '../../component'
import ChannelHeader from '../ChannelHeader'
import VideosContainer from '../VideosContainer'
import MoreInfoPanel from '../MoreInfoPanel'

export default function ChannelLayoutHoc() {
  const [showSideBox, setShowSideBox] = useState(false)
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const [showUserInfo, setShowUserInfo] = useState(false)

  useEffect(() => {
    if (showMoreInfo === false && showUserInfo === false) {
      setShowSideBox(false)
    } else {
      setShowSideBox(true)
    }
  }, [showMoreInfo, showUserInfo])

  const handleClickMore = () => {
    setShowUserInfo(false)
    setShowMoreInfo(!showMoreInfo)
  }

  const handleCloseRightSideBox = () => {
    setShowMoreInfo(false)
    setShowUserInfo(false)
  }

  return (
    <ChannelLayout
      videosContainer={<VideosContainer />}
      channelHeader={(
        <ChannelHeader
          onClickMore={handleClickMore}
        />
      )}
      rightSideBox={
        (showMoreInfo && <MoreInfoPanel />)
      }
      onCloseRightSideBox={handleCloseRightSideBox}
      showSideBox={showSideBox}
    />
  )
}
