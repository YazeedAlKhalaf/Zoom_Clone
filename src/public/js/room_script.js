const socket = io();

var messages = document.querySelector(".messages");
var message = document.getElementById("chat_message");

const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
myVideo.muted = true;

var peer = new Peer();
const userId = peer.id;

let myVideoStream;
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
    myVideoStream = stream;
    addVideoStream(myVideo, stream);

    peer.on("call", (call) => {
      call.answer(stream);
      const video = document.createElement("video");
      call.on("stream", (userVideoStream) => {
        addVideoStream(video, userVideoStream);
      });
    });

    socket.on("user-connected", (userId) => {
      connectToNewUser(userId, stream);
    });
  });

peer.on("open", (id) => {
  console.log(id);
  socket.emit("join-room", ROOM_ID, id);
});

document.body.addEventListener("keyup", function (e) {
  if (e.keyCode == 13) {
    socket.emit("message", message.value, USER_NAME);
    message.value = "";
  }
});

socket.on("createMessage", (message, userName) => {
  const newLI = document.createElement("li");
  newLI.innerHTML = `<li class="message"><strong>${userName}</strong><br />${message}</li>`;
  messages.appendChild(newLI);
  scrollToBottom();
});

const connectToNewUser = (userId, stream) => {
  const call = peer.call(userId, stream);
  const video = document.createElement("video");
  call.on("stream", (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
};

const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(video);
};

const scrollToBottom = () => {
  var d = $(".main__chat_window");
  d.scrollTop(d.prop("scrollHeight"));
};

const muteUnmute = () => {
  const enabled = myVideoStream.getAudioTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getAudioTracks()[0].enabled = false;
    setUnmuteButton();
  } else {
    setMuteButton();
    myVideoStream.getAudioTracks()[0].enabled = true;
  }
};

const setUnmuteButton = () => {
  const html = `
  <i class="mic_muted fas fa-microphone-slash"></i>
  <span>Unmute</span>
  `;
  document.querySelector("#main__mute_button").innerHTML = html;
};

const setMuteButton = () => {
  const html = `
  <i class="fas fa-microphone"></i>
  <span>Mute</span>
  `;
  document.querySelector("#main__mute_button").innerHTML = html;
};

const playStop = () => {
  const enabled = myVideoStream.getVideoTracks()[0].enabled;
  if (enabled) {
    myVideoStream.getVideoTracks()[0].enabled = false;
    setPlayButton();
  } else {
    setStopButton();
    myVideoStream.getVideoTracks()[0].enabled = true;
  }
};

const setPlayButton = () => {
  const html = `
  <i class="video_stopped fas fa-video-slash"></i>
  <span>Play Video</span>
  `;
  document.querySelector("#main__video_button").innerHTML = html;
};

const setStopButton = () => {
  const html = `
  <i class="fas fa-video"></i>
  <span>Stop Video</span>
  `;
  document.querySelector("#main__video_button").innerHTML = html;
};
