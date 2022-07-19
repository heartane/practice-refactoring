/* 
문장을 호출한 곳으로 옮기기

공통적으로 재사용되는 코드라면, 함수로 묶어서 재사용성을 높이고
호출하는 곳마다 조금 다르게 사용하는 부분이 있다면 그 부분은 추출해서
사용하는 곳에서 변형해서 사용할 수 있게 한다. 혹은 콜백함수로 받아올 수도 있다.
*/
function renderPerson(outStream, person) {
  outStream.write(`<p>${person.name}</p>\n`);
  renderPhoto(outStream, person.photo);
  emitPhotoData(outStream, person.photo);
}

function listRecentPhotos(outStream, photos) {
  photos
    .filter((photo) => photo.date > recentDateCutoff())
    .forEach((photo) => {
      outStream.write('<div>\n');
      emitPhotoData(outStream, photo);
      outStream.write('</div>\n');
    });
}

function emitPhotoData(outStream, photo) {
  outStream.write(`<p>title: ${photo.title}</p>\n`);
  outStream.write(`<p>date: ${photo.date.toDateString()}</p>\n`);
  outStream.write(`<p>location: ${photo.location}</p>\n`);
}

function renderPhoto(outStream, aPhoto) {
  outStream.write('');
}

function recentDateCutoff() {
  //7 days ago.
  return new Date().setDate(new Date().getDate() - 7);
}
