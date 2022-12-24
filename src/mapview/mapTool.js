export const initX = 37.3595704;
export const initY = 127.105399;

let mapOptions = {
  center: new naver.maps.LatLng(initX, initY),
  zoom: 16,
};

let mapObject = new naver.maps.Map("map", mapOptions);

// 맵 뷰 초기 설정 함수
export const onInit = () => {};

// 맵 뷰 이동 함수
export const onMovePosition = (latitude, longitude) => {
  if (!mapObject) return;

  let position = new naver.maps.LatLng(latitude, longitude);
  mapObject.setCenter(position); // 중심 좌표 이동
};

// 맵 뷰 마커 표시
export const setMarker = (latitude, longitude) => {
  if (!mapObject) return;

  let position = new naver.maps.LatLng(latitude, longitude);

  let marker = new naver.maps.Marker({
    position,
    map: mapObject,
    icon: {
      url: "./marker.svg",
    },
  });
};

// 디버깅 내용 출력
export const onDebugPrint = (data) => {
  const pTag = document.getElementById("debug");
  pTag.innerText = `[DEBUG]\n ${data}`;
};
