
jQuery(function ($) { // この中であればWordpressでも「$」が使用可能になる

  //ハンバーガーメニュー
  $('.js-hamburger').on('click', function () {
    if ($('.js-hamburger').hasClass('is-open')) {
      // $('.js-drawer-menu').fadeOut();
      $('.js-drawer-menu').removeClass('is-open');
      $(this).removeClass('is-open');
    } else {
      // $('.js-drawer-menu').fadeIn();
      $('.js-drawer-menu').addClass('is-open');
      $(this).addClass('is-open');
    }
  });

  //スマホメニュー
  $('.js-drawer-menu').on('click', function () {
    $('.js-hamburger').removeClass('is-open');
    $('.js-drawer-menu').removeClass('is-open');
  });

  //ブラウザの高さを取得
  var windowHeight = $(window).height();

  //戻るボタンは最初非表示
  var topBtn = $('.to-top');
  topBtn.hide();

  // ボタンの表示設定（100vhスクロールしたら表紙）
  $(window).scroll(function () {
    if ($(this).scrollTop() > windowHeight) {
      // 指定px以上のスクロールでボタンを表示
      topBtn.fadeIn();
    } else {
      // 画面が指定pxより上ならボタンを非表示
      topBtn.fadeOut();
    }
  });

  // ボタンをクリックしたらスクロールして上に戻る
  topBtn.click(function () {
    $('body,html').animate({
      scrollTop: 0
    }, 300, 'swing');
    return false;
  });

  // スムーススクロール (絶対パスのリンク先が現在のページであった場合でも作動)
  $(document).on('click', 'a[href*="#"]', function () {
    let time = 400;
    let header = $('header').innerHeight();
    let target = $(this.hash);
    if (!target.length) return;
    let targetY = target.offset().top - header;
    $('html,body').animate({ scrollTop: targetY }, time, 'swing');
    return false;
  });

});

// -----------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  setUpAccordion();
});

/**
 * ブラウザの標準機能(Web Animations API)を使ってアコーディオンのアニメーションを制御します
 */
const setUpAccordion = () => {
  const details = document.querySelectorAll(".js-details");
  const RUNNING_VALUE = "running"; // アニメーション実行中のときに付与する予定のカスタムデータ属性の値
  const IS_OPENED_CLASS = "is-opened"; // アイコン操作用のクラス名

  details.forEach((element) => {
    const summary = element.querySelector(".js-summary");
    const content = element.querySelector(".js-content");

    summary.addEventListener("click", (event) => {
      // デフォルトの挙動を無効化
      event.preventDefault();

      // 連打防止用。アニメーション中だったらクリックイベントを受け付けないでリターンする
      if (element.dataset.animStatus === RUNNING_VALUE) {
        return;
      }

      // detailsのopen属性を判定
      if (element.open) {
        // アコーディオンを閉じるときの処理
        // アイコン操作用クラスを切り替える(クラスを取り除く)
        element.classList.toggle(IS_OPENED_CLASS);

        // アニメーションを実行
        const closingAnim = content.animate(closingAnimKeyframes(content), animTiming);
        // アニメーション実行中用の値を付与
        element.dataset.animStatus = RUNNING_VALUE;

        // アニメーションの完了後に
        closingAnim.onfinish = () => {
          // open属性を取り除く
          element.removeAttribute("open");
          // アニメーション実行中用の値を取り除く
          element.dataset.animStatus = "";
        };
      } else {
        // アコーディオンを開くときの処理
        // open属性を付与
        element.setAttribute("open", "true");

        // アイコン操作用クラスを切り替える(クラスを付与)
        element.classList.toggle(IS_OPENED_CLASS);

        // アニメーションを実行
        const openingAnim = content.animate(openingAnimKeyframes(content), animTiming);
        // アニメーション実行中用の値を入れる
        element.dataset.animStatus = RUNNING_VALUE;

        // アニメーション完了後にアニメーション実行中用の値を取り除く
        openingAnim.onfinish = () => {
          element.dataset.animStatus = "";
        };
      }
    });
  });
}

/**
 * アニメーションの時間とイージング
 */
const animTiming = {
  duration: 400,
  easing: "ease-out"
};

/**
 * アコーディオンを閉じるときのキーフレーム
 */
const closingAnimKeyframes = (content) => [
  {
    height: content.offsetHeight + 'px', // height: "auto"だとうまく計算されないため要素の高さを指定する
    opacity: 1,
  }, {
    height: 0,
    opacity: 0,
  }
];

/**
 * アコーディオンを開くときのキーフレーム
 */
const openingAnimKeyframes = (content) => [
  {
    height: 0,
    opacity: 0,
  }, {
    height: content.offsetHeight + 'px',
    opacity: 1,
  }
];
// ---------------------------------------------------------------------------
// フォームのバリデーションチェック
// 全てのアラート文を非表示にする
$(".js-alert, .js-alert-top").hide();

// 送信ボタンをクリック
$(".js-submit").click(function () {
  // チェック用の変数sendFlag
  var sendFlag = true;

  // 名前フィールドのチェック
  if (!$("#your-name").val()) {
    // 入力がない：アラート文を表示
    $(".error-name.js-alert").show();
    $(".js-alert-top").show();
    sendFlag = false; // 入力がなければfalseに
  } else {
    // 入力がある：アラート文を非表示
    $(".error-name.js-alert").hide();
  }

  /*// カナフィールドのチェック
  if(!$("#kana").val()){
    // 入力がない：アラート文を表示
    $(".error-kana.js-alert").show();
    $(".js-alert-top").show();
    sendFlag = false; // 入力がなければfalseに
  }else{
    // 入力がある：アラート文を非表示
    $(".error-kana.js-alert").hide();
  }*/

  // メールフィールドのチェック
  if (!$("#email").val()) {
    // 入力がない：アラート文を表示
    $(".error-mail.js-alert").show();
    $(".js-alert-top").show();
    sendFlag = false; // 入力がなければfalseに
  } else {
    // 入力がある：アラート文を非表示
    $(".error-mail.js-alert").hide();
  }

  /* // ラジオボタンのチェック
  var radioChk = $('input[name = "radio"]:checked').length;
 
  // 選択されたラジオボタンの数を調べる
  if(radioChk == 0){
    // 選択がない：アラート文を表示
    $(".js-alert").show();
    sendFlag = false; // 入力がなければfalseに
  }else{
    // 選択がある：アラート文を非表示
    $(".js-alert").hide();
  } */


  /*// チェックボックスのチェック
  var chkboxChk = $('input[type = "checkbox"]:checked').length;
 
  // 選択されたチェックボックスの数を調べる
  if(chkboxChk == 0){
    // 選択がない：アラート文を表示
    $(".error-privacy.js-alert").show();
    $(".js-alert-top").show();
    sendFlag = false; // 選択がなければfalseに
  }else{
    // 選択がある：アラート文を非表示
    $(".error-privacy.js-alert").hide();
  }*/

  /* // セレクトボックスのチェック
   if($("select").val() == "none"){
     // 選択がない：アラート文を表示
     $("#selectSection .alert").show();
     sendFlag = false; // 「---」を選択していたらfalseに
   }else{
     // 選択がある：アラート文を非表示
     $("#selectSection .alert").hide();
   } */

  // 複数行入力フィールドのチェック
  if (!$("#message").val()) {
    // 入力がない：アラート文を表示
    $(".error-contents.js-alert").show();
    $(".js-alert-top").show();
    sendFlag = false; // 入力がなければfalseに
  } else {
    // 入力がある：アラート文を非表示
    $(".error-contents.js-alert").hide();
  }

  // 変数sendFlagの値をチェック
  if (sendFlag == false) {
    return false; // falseであれば送信を許可しない（そうでなければ送信）
  }
});


// 送信完了画面に遷移
// document.addEventListener('wpcf7mailsent', function (event) {
//   location = '/contact/thanks/';
// }, false);
