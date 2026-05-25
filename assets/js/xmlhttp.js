var xmlhttp;
if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
 try {
  xmlhttp = new XMLHttpRequest();
 } catch (e) {
  xmlhttp=false;
 }
}
var xmlhttpview;
  if (!xmlhttpview && typeof XMLHttpRequest != 'undefined') {
    try {
        xmlhttpview = new XMLHttpRequest();
    } catch (e) {
        xmlhttpview = false;
    }
}
var xmlhttp_login_text;
if (!xmlhttp_login_text && typeof XMLHttpRequest != 'undefined') {
    try {
        xmlhttp_login_text = new XMLHttpRequest();
    } catch (e) {
        xmlhttp_login_text = false;
    }
}
var xmlhttp3;
if (!xmlhttp3 && typeof XMLHttpRequest != 'undefined') {
    try {
        xmlhttp3 = new XMLHttpRequest();
    } catch (e) {
        xmlhttp3 = false;
    }
}
var xmlhttp5;
if (!xmlhttp5 && typeof XMLHttpRequest != 'undefined') {
    try {
        xmlhttp5 = new XMLHttpRequest();
    } catch (e) {
        xmlhttp5 = false;
    }
}
function showXmlHttp(obj, url, target) {
    var span = document.getElementById(target);
    span.innerHTML = "<img src='/images/waiting.gif'>";
    obj.open('GET', url + '&rd=' + Math.random(), true);
    obj.onreadystatechange = function () {
        if (obj.readyState === 4) {
            // ✅ check status trước
            if (obj.status === 200) {
              var iframe = document.createElement("iframe");
              iframe.style.width = "100%";
              iframe.style.border = "none";

              span.innerHTML = "";
              span.appendChild(iframe);
              var style = "<style>body{padding:0;margin:0;color:#fff;font-size: 14px;font-family: \"Merriweather Sans\", sans-serif;font-optical-sizing: auto;}</style>";
              iframe.contentDocument.open();
              iframe.contentDocument.write(style + obj.responseText);
              iframe.contentDocument.close();
                // span.innerHTML = obj.responseText;
            } else if (obj.status === 403) {
                span.innerHTML = "";
                console.warn("403 Forbidden");
            } else {
                span.innerHTML = "<div class='error'>Có lỗi xảy ra</div>";
            }
        }
    };

    obj.send(null);
    return true;
}
function showXmlHttpOld(obj, url, target) {
   var span = document.getElementById(target);
   span.innerHTML = "<img src=/images/waiting.gif>";
   obj.open('GET', url + '&rd=' + Math.random(), true);
   obj.onreadystatechange=function()  {
		if (obj.readyState==4) {
			span.innerHTML = obj.responseText;
		}
   }
  obj.send(null);
  return true;
}

function showXmlHttp2(obj, url, target) {
    var span = document.getElementById(target);
    obj.open('GET', url + '&rd=' + Math.random(), true);
    obj.onreadystatechange=function()  {
         if (obj.readyState == 4) {
             span.innerHTML = obj.responseText;
         }
    }
   obj.send(null);
   return true;
}

function ViewButtonLike(ID, l) {
    var html_span = document.getElementById("like_news_"+ID);
    var url = '/xmlhttp.aspx?FID=7&ID=' + ID + '&ButtonLike=1' + (l!=""?"&Language="+l:"");
    $.ajax({
      url: url,
      type: "get",
      dataType: "text",
      success: function (result) {
        html_span.innerHTML = result;
      }
    });
}

function CheckViewNVYT(nvyt, l) {
    var url = '/xmlhttp.aspx?FID=9&nvyt=' + nvyt + (l!=""?"&Language="+l:"");
    $.ajax({
      url: url,
      type: "get",
      dataType: "text",
      success: function (result) {
        if (result.indexOf('false1') >= 0) {
          alert((l != "" ? "You do not have access. Please log in to read the content inside!" : "Bạn không có quyền truy cập. Vui lòng đăng nhập để đọc nội dung bên trong!"));
          window.location = "/default.aspx?FID=3&AccountBar=1";
        } else if (result.indexOf('false2') >= 0) {
          alert((l != "" ? "You do not have access. Please log in to read the content inside!" : "Bạn không có quyền truy cập. Vui lòng đăng nhập để đọc nội dung bên trong!"));
          window.location = "/default.aspx?FID=3&AccountBar=1";
        } else if (result.indexOf('false3') >= 0) {
          alert((l != "" ? "You are not the medical staff!" : "Bạn không phải là nhân viên y tế!"));
          window.history.back(-1);
        }
        else {
            $(".page-content .content-article").css("visibility", "visible");
        }
      }   
    });
}

function ViewButtonComment(ID, l) {
    var html_span = document.getElementById("comment_news_"+ID);
    var url = '/xmlhttp.aspx?FID=7&ID=' + ID + '&ButtonComment=1' + (l!=""?"&Language="+l:"");
    $.ajax({
      url: url,
      type: "get",
      dataType: "text",
      success: function (result) {
        html_span.innerHTML = result;
      }
    });
}

function CountArticleViews(obj, url) {
    obj.open('GET', url + '&rd=' + Math.random(), true);
    obj.send(null);
    return true;
}

function closeXmlHttp(target){
  var s = document.getElementById(target);
  s.innerHTML = '';
}

