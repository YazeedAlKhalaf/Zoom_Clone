const shortUrlInput = document.getElementById("short_url");
const createRoomButton = document.getElementById("create_room_button");

const onCreateButtonClicked = () => {
  window.location.href = `/room/${shortUrlInput.value}`;
};
