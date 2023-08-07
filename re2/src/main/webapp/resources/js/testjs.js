function photoModal_TEST(savePath, replyJson, replyListJson, photoReviewJson, r_no, index1) {
  // ... (Existing code)

  // Parse the stringified JSON objects back into arrays/objects
  var photoReview = JSON.parse(decodeURIComponent(photoReviewJson));
  var replyList = JSON.parse(decodeURIComponent(replyListJson));
  var reply = JSON.parse(decodeURIComponent(replyJson));

  // ... (Existing code)

  let matchedReply = replyList.find((item) => item.r_no == r_no);

  let photoBtn =
    '<div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">' +
    '<div class="carousel-inner">';

  if (matchedReply) {
    photoReview.forEach(function (item, index) {
      let sPath = encodeURIComponent(item.savePath);

      if (index == 0) {
        photoBtn +=
          '<div class="carousel-item active" data-bs-interval="10000">' +
          '<img style="height: 400px;" src="/display?fileName=' + savePath + '" class="d-block" alt="...">' +
          '</div>';
      } else {
        photoBtn +=
          '<div  class="carousel-item">' +
          '<img style="height: 400px;" src="/display?fileName=' + sPath + '" class="d-block" alt="...">' +
          '</div>';
      }
    });
  }

  photoBtn +=
    '</div>' +
    '<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">' +
    '<span style="background-color: #F7863B;" class="carousel-control-prev-icon" aria-hidden="true" data-bs-slide-to="' + (index1 - 1) + '"></span>' +
    '<span class="visually-hidden">Previous</span>' +
    '</button>' +
    '<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">' +
    '<span style="background-color: #F7863B;" class="carousel-control-next-icon" aria-hidden="true" data-bs-slide-to="' + (index1 + 1) + '"></span>' +
    '<span class="visually-hidden">Next</span>' +
    '</button>' +
    '</div>';

  photoReviewImgDiv.innerHTML = photoBtn;

  // ... (Existing code)

  if (matchedReply) {
    let content =
      '<div id="modalContent">' +
      '<div id="modalHead">' +
      '<span>' + matchedReply.writer + '</span> <div class="test-score2" data-max="5" data-rate="' + matchedReply.star + '"></div>' +
      '<span>' + matchedReply.replydate + '</span>' +
      '</div>' +
      '<div id="modalContent">' + matchedReply.reply + '</div>' +
      '</div>';
    photoReviewReplyDiv.innerHTML = content;
    $(".test-score2").score();
  } else {
    photoReviewReplyDiv.innerHTML = '일치하는 댓글이 없습니다.';
  }

  // ... (Existing code)

  // 포토리뷰 전체를 보여주는 부분
  let photoList = '<ul>';

  photoReview.forEach(function (item, index) {
    let saveP = encodeURIComponent(item.savePath);

    photoList += '<li style="width: 70px;" class="photoList"><img class="w100" name="photoList" src="/display?fileName=' + saveP + '" data-r_no="' + item.r_no + '" data-savePath="' + saveP + '"></li>';
  });

  photoList += '</ul>'

  photoReviewModalList.innerHTML = photoList;

  // 'photoList' 클래스를 가진 모든 이미지 요소를 가져옵니다.
  const photoListImages = document.querySelectorAll('.photoList img');

  // ... (Existing code)

  // photoList의 각 이미지에 클릭 이벤트 리스너를 추가합니다.
  photoListImages.forEach((image) => {

    image.addEventListener('click', function () {
      // 클릭한 이미지에서 'data-r_no' 속성을 가져옵니다.
      const clickedRNo = image.getAttribute('data-r_no');
      const clickedSaveP = image.getAttribute('data-savePath');

      // 클릭한 이미지의 'data-r_no' 속성과 일치하는 댓글을 'replyList'에서 찾습니다.
      const matchedReply = replyList.find((item) => item.r_no == clickedRNo);

      // 모달창에 클릭한 사진의 이미지를 표시합니다.
      photoReviewImgDiv.innerHTML = matchedReply ?
        '<img style="max-width: 500px; max-height: 300px;" src="/display?fileName=' + clickedSaveP + '">' :
        '일치하는 이미지가 없습니다.';

      // 댓글 정보를 'photoReviewReplyDiv'에 표시합니다.
      if (matchedReply) {
        let content =
          '<div id="modalContent">' +
          '<div id="modalHead">' +
          '<span>' + matchedReply.writer + '</span> <div class="test-score2" data-max="5" data-rate="' + matchedReply.star + '"></div>' +
          '<span>' + matchedReply.replydate + '</span>' +
          '</div>' +
          '<div id="modalContent">' + matchedReply.reply + '</div>' +
          '</div>';
        photoReviewReplyDiv.innerHTML = content;
        $(".test-score2").score();
      } else {
        photoReviewReplyDiv.innerHTML = '일치하는 댓글이 없습니다.';
      }
    });
  });

  modal.style.display = 'block';
}