import {
  RzRTC, LogLevel, CreateClientConfig, IRzRTCClient,
} from 'rz-paas-sdk-web'

// eslint-disable-next-line import/no-mutable-exports
let client: IRzRTCClient = null
const rzCreatClient = RzRTC.createClient

const createClient = (config: CreateClientConfig) => {
  client = rzCreatClient({
    mode: config.mode,
    webServers: ['https://api.rzrtc.com'],
    streamServers: [],
    signalServers: [],
    logServers: ['https://data-center.duobeiyun.com'],
  })
  window.client = client
  return client
}

function getClient() {
  return client
}

RzRTC.setLogLevel(LogLevel.Debug)

export {
  createClient,
  RzRTC,
  getClient,
}
