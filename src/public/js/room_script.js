const socket = io();

var messages = document.querySelector(".messages");
var message = document.getElementById("chat_message");

const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
myVideo.muted = true;

var peer = new Peer();
const userId = peer.id;

navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: true,
  })
  .then((stream) => {
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
