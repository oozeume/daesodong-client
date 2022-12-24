/**
 * 메인 스레드 스크립트
 */

import { onDebugPrint, onInit, onMovePosition, setMarker } from "./mapTool.js";

const agent = window.navigator.userAgent.toLowerCase();

// 모바일에서 받은 메세지 처리
const webviewMessageCallback = (e) => {
  // 앱에서 받아온 데이터
  const { success, data, type, isDebug } = JSON.parse(e.data);

  if (success) {
    if (isDebug) {
      onDebugPrint(`${type}\n data: ${JSON.stringify(data)}`);
    }

    if (type === "init") {
      // init processs
      onInit();
    } else if (type === "move") {
      onMovePosition(data.latitude, data.longitude);
    } else if (type === "marker") {
      if (data?.length !== 0) {
        data.map((item) => {
          setMarker(item.latitude, item.longitude);
        });
      }
    }
  }
};

window.__WEBVIEW_BRIDGE__ = {
  init: function () {
    try {
      if (agent.indexOf("iphone") > -1) {
        // safari, 파이어폭스 일때,
        window.addEventListener("message", webviewMessageCallback);
      } else if (
        agent.indexOf("android") > -1 &&
        agent.indexOf("chrome") > -1
      ) {
        document.addEventListener("message", webviewMessageCallback);
      }
    } catch (err) {
      pTag.innerText = `[DEBUG]\n ${err}`;
    }
  },
};

window.__WEBVIEW_BRIDGE__.init();
