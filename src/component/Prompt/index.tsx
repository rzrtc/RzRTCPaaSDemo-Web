import React from 'react'
import ReactDOM from 'react-dom'

import './index.less'

export interface PromptProps {
  title: string,
  content: string,
  buttonText: string,
  onClickMainButton: () => void
}
export default function Prompt({
  title,
  content,
  buttonText,
  onClickMainButton,
}: PromptProps) {
  return ReactDOM.createPortal(
    <div className="rz-web-test-app-prompt-wrap">
      <div className="content-wrap">
        <div className="title">{title}</div>
        <div className="content">{content}</div>
        <div
          className="main-btn"
          onClick={onClickMainButton}
        >
          {buttonText}
        </div>
      </div>
    </div>,
    document.getElementById('rz-web-test-app-prompt-container'),
  )
}
