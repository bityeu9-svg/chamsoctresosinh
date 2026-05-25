var h_ = screen.height;
var w_ = screen.width;
if (w_ > 800) {
  var w_ = window.innerWidth;
  var h_ = window.innerHeight;
}
$(document).ready(function () {
  document.getElementById("searchico").addEventListener("click", function () {
    search_keyword();
  });
  document.addEventListener("click", function (event) {
    // If user clicks inside the element, do nothing
    if (event.target.closest(".menu-top-right")) return;
    if (event.target.closest(".menu-top-right > div.search-icon *")) return;
    // If user clicks outside the element, hide it!
    $(".menu-top-right > div.search-icon").removeClass("open");
    if ($("#catalogue_view").length > 0) {
      if (event.target.closest(".social_pin .social_left li a")) return;
      if (event.target.closest("#catalogue_view")) return;
      if (event.target.closest("#catalogue_view *")) return;
      $("#catalogue_view").removeClass("opened");
    }
  });
  if ($(".keyword-item").length > 0) {
    $(".keyword-item").each(function() {
      var keyword_item = "<a href=\""+$(this).children().attr('href')+"\" class=\"keyword_item_content\">"+$(this).text()+"</a>";
      $("#content_article").html($("#content_article").html().replace($(this).text(), keyword_item));
    });
  }
});
$(window).on("resize", function () {});
(function ($) {
  var position = $(window).scrollTop(),
    scrolled = false,
    desktop_scrolled = false,
    checkScroll = function () {
      var new_position = $(window).scrollTop();
      if (new_position !== position) {
        position = new_position;
        if (!scrolled && position > 0) {
          scrolled = true;
          $("body").addClass("scrolled");
        } else if (scrolled && position <= 0) {
          scrolled = false;
          $("body").removeClass("scrolled");
        }
      }
      window.requestAnimationFrame(checkScroll);
    };

  window.requestAnimationFrame(checkScroll);
})(jQuery);

function showsearch() {
  toggle(document.querySelectorAll(".header-search"));
}
function textAreaAdjust(el) {
  $(".error_txt_cmt").css("display", "none");
  el.style.height = (el.scrollHeight > el.clientHeight) ? (el.scrollHeight)+"px" : "120px";
}
function open_catalogue () {
  $("#catalogue_view").toggleClass('opened');
}
function Module_Catalogue(id_div, l) {
  $("#catalogue_view").html("");
  var level_1 = "h2";
  if ($("#"+id_div+" > " + level_1).length > 0) {
    $(".catalogue").addClass('view');
    var contentDiv = $('#' + id_div);
    var tree = "";
    var i = 0;
    $("#catalogue_view").append("<li><b style=\"font-family: var(--font-family-merriweather-serif);font-weight: bold;text-align: center;display: flex;justify-content: center;font-size: 20px;border-bottom: 1px solid var(--color-5);\">"+(l!=""?"Index":"Mục lục")+"</b></li>");
    $("#catalogue_content").append("<li><b style=\"font-family: var(--font-family-merriweather-serif);font-weight: bold;display: flex;font-size: 20px;border-bottom: 1px solid var(--color-5);padding-top: 10px;\">"+(l!=""?"Index":"Mục lục")+"</b></li>");
    contentDiv.find('h2, h3').each(function() {
      i = i + 1;
      var heading = $(this);
      heading.attr('id', 'title_catalogue_' + i);
      var level = parseInt(heading.prop('tagName').replace('H', ''));
      $("#catalogue_view").append("<li class=\"level_"+level+"\"><a href=\"javascript:void(0);\" onclick=\"scroll_up_div('title_catalogue_"+(i)+"');\">" + heading.html() + "</a></li>");
      $("#catalogue_content").append("<li class=\"level_"+level+"\"><a href=\"javascript:void(0);\" onclick=\"scroll_up_div('title_catalogue_"+(i)+"');\">" + heading.html() + "</a></li>");
    });
    
  }
}
function scroll_up_div (id_div) {
  const tabScroll = document.getElementById(id_div);
  window.scrollTo({
    'behavior': 'smooth',
    'left': 0,
    'top': tabScroll.offsetTop - 130
  });
}
function Module_Comment(section_comment, ID, Module, l) {
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
            alert('Đã bình luận');
          }
        }
    });
  }
}
function share_fb(url) {
  window.open('https://www.facebook.com/sharer/sharer.php?u='+url, '_blank',"width=626, height=436").focus();
}
function share_twitter(url) {
  var field_list = {
    url: url,
    text: '',
    hashtags: '',
  }
  window.open('https://twitter.com/share?'+jQuery.param(field_list), '_blank', 'width=626, height=436').focus();
}
function share_linkedin (url) {
  window.open('https://www.linkedin.com/sharing/share-offsite/?url='+url, '_blank',"width=626, height=436").focus();
}
function print_html(id_div, title_print) {
  var divToPrint = document.getElementById(id_div);
  var newWin = window.open("", title_print);
  newWin.document.open();
  newWin.document.write(
    '<html><head><style>font-family: Arial, Tahoma, Verdana, sans-serif !important;</style></head><body onload="window.print()"><h1>'+title_print+'</h1>' + divToPrint.innerHTML + "</body></html>"
  );
  newWin.document.close();
  setTimeout(function () { newWin.close(); }, 10);
}
function add_to_favorite(ID, l) {
  var url = '/xmlhttp.aspx?FID=8&ID='+ID+'&add=1' + (l != '' ? '&Language=' + l : '');
  $.ajax({
      url: url,
      type: "get",
      dataType: "text",
      success: function (result) {
          ViewButtonLike(ID, l);
      }
  });
  return true;
}
function delete_to_favorite(ID, l) {
  var url = '/xmlhttp.aspx?FID=8&ID='+ID+'&delete=1' + (l != '' ? '&Language=' + l : '');
  $.ajax({
      url: url,
      type: "get",
      dataType: "text",
      success: function (result) {
          ViewButtonLike(ID, l);
      }
  });
  return true;
}

function Swiper_Option_Other(class_name) {
  var swiper = new Swiper("." + class_name + "", {
    nextButton: ".swiper-button-next",
    prevButton: ".swiper-button-prev",
    slidesPerView: 3,
    paginationClickable: true,
    spaceBetween: 50,
    breakpoints: {
      // when window width is <= 576
      576: {
        slidesPerView: "auto",
        spaceBetweenSlides: 10,
      },
      // when window width is <= 768
      768: {
        slidesPerView: "auto",
        spaceBetweenSlides: 20,
      },
      // when window width is <= 1024
      1024: {
        slidesPerView: 3,
        spaceBetweenSlides: 30,
      },
    },
  });
}

function Swiper_Option_1(class_name) {
  var swiper = new Swiper("." + class_name + "", {
    nextButton: ".swiper-button-next",
    prevButton: ".swiper-button-prev",
    slidesPerView: 5,
    autoplay: 2500,
    paginationClickable: true,
    spaceBetween: 50,
    breakpoints: {
      // when window width is <= 576
      576: {
        slidesPerView: 1,
        spaceBetweenSlides: 10,
      },
      // when window width is <= 768
      768: {
        slidesPerView: 2,
        spaceBetweenSlides: 20,
      },
      // when window width is <= 1024
      1024: {
        slidesPerView: 3,
        spaceBetweenSlides: 30,
      },
    },
  });
}

function Swiper_Option_1_NoAuto(class_name) {
  var swiper = new Swiper("." + class_name + "", {
    nextButton: ".swiper-button-next",
    prevButton: ".swiper-button-prev",
    slidesPerView: 5,
    paginationClickable: true,
    spaceBetween: 50,
    breakpoints: {
      // when window width is <= 576
      576: {
        slidesPerView: 1,
        spaceBetweenSlides: 10,
      },
      // when window width is <= 768
      768: {
        slidesPerView: 2,
        spaceBetweenSlides: 20,
      },
      // when window width is <= 1024
      1024: {
        slidesPerView: 3,
        spaceBetweenSlides: 30,
      },
    },
  });
}

function Swiper_Option_2(class_name) {
  var swiper = new Swiper("." + class_name + "", {
    nextButton: ".swiper-button-next",
    prevButton: ".swiper-button-prev",
    slidesPerView: 4,
    autoplay: 2500,
    paginationClickable: true,
    spaceBetween: 50,
    breakpoints: {
      // when window width is <= 576
      576: {
        slidesPerView: "auto",
        spaceBetweenSlides: 10,
      },
      // when window width is <= 768
      768: {
        slidesPerView: "auto",
        spaceBetweenSlides: 20,
      },
      // when window width is <= 1024
      1024: {
        slidesPerView: 2,
        spaceBetweenSlides: 30,
      },
    },
  });
}

function Swiper_Option_Info(class_name) {
  var swiper = new Swiper("." + class_name + "", {
    nextButton: ".swiper-button-next",
    prevButton: ".swiper-button-prev",
    slidesPerView: 3,
    autoplay: 2500,
    paginationClickable: true,
    spaceBetween: 50,
    breakpoints: {
      // when window width is <= 576
      576: {
        slidesPerView: "auto",
        spaceBetweenSlides: 10,
      },
      // when window width is <= 768
      768: {
        slidesPerView: "auto",
        spaceBetweenSlides: 20,
      },
      // when window width is <= 1024
      1024: {
        slidesPerView: 2,
        spaceBetweenSlides: 30,
      },
    },
  });
}

function Swiper_Option_Adv(class_name) {
  var swiper = new Swiper("." + class_name + "", {
    nextButton: ".swiper-button-next",
    prevButton: ".swiper-button-prev",
    slidesPerView: "auto",
    autoplay: 2500,
    paginationClickable: true,
    spaceBetween: 30,
  });
}

function Swiper_Option_AQM(class_name) {
  var swiper = new Swiper("." + class_name + "", {
    nextButton: ".swiper-button-next",
    prevButton: ".swiper-button-prev",
    slidesPerView: 3,
    paginationClickable: true,
    spaceBetween: 50,
    breakpoints: {
      // when window width is <= 576
      576: {
        slidesPerView: "auto",
        spaceBetweenSlides: 10,
      },
      // when window width is <= 768
      768: {
        slidesPerView: "auto",
        spaceBetweenSlides: 20,
      },
      // when window width is <= 1024
      1024: {
        slidesPerView: 2,
        spaceBetweenSlides: 30,
      },
    },
  });
}
// function CheckEmail() {
//   var email = document.getElementById("Email").value;
//   var atpos = email.indexOf("@");
//   var dotpos = email.lastIndexOf(".");
//   if (email != "") {
//     if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
//       document.getElementById("msgemail").innerHTML =
//         "Email không đúng định dạng";
//       return false;
//     }
//     showXmlHttp(xmlhttp, "/xmlhttp.aspx?FID=25&CheckEmail=1&Email=" + email, "msgemail");
//   } else { 
//     document.getElementById("msgemail").innerHTML = "*";
//   }
// }
function ShowRegisterInfo() {
  if (document.getElementById("Approved").checked == true)
    document.getElementById("accountRegisterInfo").style.display = "block";
  else {
    document.getElementById("Name").value = "";
    document.getElementById("Address").value = "";
    document.getElementById("Phone").value = "";
    document.getElementById("Location").value = 0;
    document.getElementById("Company").value = "";
    document.getElementById("accountRegisterInfo").style.display = "none";
  }
}

function toggle(elements, specifiedDisplay) {
  var element, index;

  elements = elements.length ? elements : [elements];
  for (index = 0; index < elements.length; index++) {
    element = elements[index];

    if (isElementHidden(element)) {
      element.style.display = "";

      // If the element is still hidden after removing the inline display
      if (isElementHidden(element)) {
        element.style.display = specifiedDisplay || "block";
      }
    } else {
      element.style.display = "none";
    }
  }
  function isElementHidden(element) {
    return (
      window.getComputedStyle(element, null).getPropertyValue("display") ===
      "none"
    );
  }
}
function keyEnter(evt) {
  var charCode = evt.which ? evt.which : event.keyCode;
  if (charCode == "13") {
    search_keyword();
    return false;
  }
}
function search_keyword(str) {
  var $this = $("#searchid");
  var value = $this.val();
  value = $.trim(value);
  if (
    (value != "") &
    (value != null) &
    (value != str) &
    $(".menu-top-right > div.search-icon").hasClass("open")
  ) {
    $("#fsm").submit();
  } else {
    if ($(".menu-top-right > div.search-icon").hasClass("open")) {
      $(".menu-top-right > div.search-icon").removeClass("open");
    } else {
      $(".menu-top-right > div.search-icon").addClass("open");
    }
  }
  return false;
}
function keyEnter_m(evt, str) {
  var charCode = evt.which ? evt.which : event.keyCode;
  if (charCode == "13") {
    search_m(str);
    return false;
  }
}
function search_m(str) {
  var $this = $("#searchid_m");
  var $thas = $("#searchid");
  var value = $this.val();
  value = $.trim(value);
  if ((value != "") & (value != null) & (value != str)) {
    $thas.val(value);
    $("#fsm").submit();
  }
  return false;
}
function getCookie(c_name) {
  var v = "";
  var i,
    x,
    y,
    ARRcookies = document.cookie.split(";");
  for (i = 0; i < ARRcookies.length; i++) {
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g, "");
    if (x == c_name) {
      v = unescape(y);
    }
  }
  return v;
}
function Set_Cookie(name, value, expires, path, domain, secure) {
  // set time, it's in milliseconds
  var today = new Date();
  today.setTime(today.getTime());
  /*
    if the expires variable is set, make the correct
    expires time, the current script below will set
    it for x number of days, to make it for hours,
    delete * 24, for minutes, delete * 60 * 24
    */
  if (expires) {
    expires = expires * 1000 * 60 * 60 * 24;
  }
  var expires_date = new Date(today.getTime() + expires);
  document.cookie =
    name +
    "=" +
    escape(value) +
    (expires ? ";expires=" + expires_date.toGMTString() : "") +
    (path ? ";path=" + path : "") +
    (domain ? ";domain=" + domain : "") +
    (secure ? ";secure" : "");
}
