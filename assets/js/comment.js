function Module_Comment(ID, Module, l) {
  var html_span = document.getElementById(section_comment);
  var url = '/xmlhttp.aspx?FID=3211&ID=' + ID + '&Module=' + Module + (l!=""?"&Language="+l:"");
  $.ajax({
    url: url,
    type: "get",
    dataType: "text",
    success: function (result) {
      html_span.innerHTML = result;
    }
  });
}
function validate_comment(ID, Module, ParentID, l) {
  var text_comment = $("#txtComment").val();
  if (text_comment == "") {
    $(".error_txt_cmt").css("display", "inline-block");
  }
  else {
    var url = '/xmlhttp.aspx?FID=3211&ID=' + ID + '&ParentID='+ParentID+'&Module=' + Module + '&Comment=1' + (l!=""?"&Language="+l:"");
    $.ajax({
        url: url,
        type: "post",
        dataType: "text",
        data: {
          Comment: text_comment,
        },
        success: function (result) {
          if (result.indexOf("Error") >= 0) {
            alert(result);
          }
          else {
            Module_Comment(ID, Module, l);
          }
        }
    });
  }
}
function validate_comment_reply(ID, Module, ParentID, id_tab, l) {
  var text_comment = $("#txtCommentReply").val();
  if (text_comment == "") {
    $(".error_txt_cmt_reply").css("display", "inline-block");
  }
  else {
    var url = '/xmlhttp.aspx?FID=3211&ID=' + ID + '&ParentID='+ParentID+'&Module=' + Module + '&Reply=1' + (l!=""?"&Language="+l:"");
    $.ajax({
        url: url,
        type: "post",
        dataType: "text",
        data: {
          Comment: text_comment,
        },
        success: function (result) {
          if (result.indexOf("Error") >= 0) {
            alert(result);
          }
          else {
            var id_tab = $('.tab-content>.active').attr('id');
            view_comment(ID, Module, id_tab, l);
          }
        }
    });
  }
}
function validate_comment_reply_2(ID, Module, ParentID, ParentID2, id_tab, l) {
  var text_comment = $("#txtCommentReply").val();
  if (text_comment == "") {
    $(".error_txt_cmt_reply").css("display", "inline-block");
  }
  else {
    var url = '/xmlhttp.aspx?FID=3211&ID=' + ID + '&ParentID='+ParentID+'&ParentID2='+ParentID2+'&Module=' + Module + '&Reply=1' + (l!=""?"&Language="+l:"");
    $.ajax({
        url: url,
        type: "post",
        dataType: "text",
        data: {
          Comment: text_comment,
        },
        success: function (result) {
          if (result.indexOf("Error") >= 0) {
            alert(result);
          }
          else {
            var id_tab = $('.tab-content>.active').attr('id');
            view_comment(ID, Module, id_tab, l);
          }
        }
    });
  }
}
function like_comment(id_comment, l) {
  var html_span = document.getElementById('reactions_total_' + id_comment);
  var url = '/xmlhttp.aspx?FID=3211&Like=' + id_comment;
  $.ajax({
    url: url,
    type: "get",
    dataType: "text",
    success: function (result) {
      if (result.indexOf("Error") >= 0) {
        if (l!="") {
          alert("You have used this function. You must wait 24 hours to continue.");
        }
        else {
          alert("Bạn đã sử dụng chức năng này. Bạn phải đợi 24h nữa mới được thao tác tiếp");
        }
      }
      else {
        html_span.innerHTML = result;
        if ($("#comment_"+id_comment+" > .comment-content > .like-comment > a.like-button").hasClass("like-active")) {
          $("#comment_"+id_comment+" > .comment-content > .like-comment > a.like-button").removeClass("like-active");
        }
        else {
          $("#comment_"+id_comment+" > .comment-content > .like-comment > a.like-button").addClass("like-active");
        }
      }
    }
  });
}
function reply_comment(ID, Module, ParentID, l) {
  $('.reply-comment-content').html("");
  var html_span = document.getElementById('reply_comment_' + ParentID);
  html_span.innerHTML = "<center>...</center>";
  var url = '/xmlhttp.aspx?FID=3211&ID=' + ID + '&ParentID='+ParentID+'&Module=' + Module + '&Reply=1' + (l!=""?"&Language="+l:"");
  $.ajax({
    url: url,
    type: "get",
    dataType: "text",
    success: function (result) {
      html_span.innerHTML = result;
    }
  });
}
function show_reply_comment(ID, Module, ParentID, l) {
  $("#sub_comment_"+ParentID).html("<center>...</center>");
  var url = '/xmlhttp.aspx?FID=3211&ID=' + ID + '&ParentID='+ParentID+'&Module=' + Module + '&SubComment=1' + (l!=""?"&Language="+l:"");
  $.ajax({
    url: url,
    type: "get",
    dataType: "text",
    success: function (result) {
      $("#sub_comment_"+ParentID).html(result);
      $("#sub_comment_"+ParentID).addClass("view_sub");
    }
  });
}
function view_comment(ID, Module, id_tab, l) {
  $('.tab-content>.tab-pane').html("");
  $("#"+id_tab).html("<center>...</center>");
  var url = '/xmlhttp.aspx?FID=3211&ID=' + ID + '&Module=' + Module + '&ViewComment=Most' + (l!=""?"&Language="+l:"");
  if (id_tab == "v-comments_latest") {
    url = '/xmlhttp.aspx?FID=3211&ID=' + ID + '&Module=' + Module + '&ViewComment=Latest' + (l!=""?"&Language="+l:"");
  }
  $.ajax({
    url: url,
    type: "get",
    dataType: "text",
    success: function (result) {
      $("#"+id_tab).html(result);
    }
  });
}