
// どの種類の撮影であっても同じダイアログを通るので、どの種類の撮影かをグローバル変数に保存する
// もっとうまい方法はないのか・・・
var img_tag_id = "";


// initってこれDOMが描画された後に動くの？
// なんか違うっぽい・・・。DOM描画後に実行させたければ素直にbodyタグのonloadに引っ掛けるしかないかも。
document.addEventListener('init', function(event) {
    var page = event.target;
    if (page.matches('#first-page')) {
        page.querySelector('#push-button').onclick = function() {
            document.querySelector('#navigator').pushPage('page2.html');
        };
    } else if (page.matches('#second-page')) {
        page.querySelector('#pop-button').onclick = function() {
            document.querySelector('#navigator').popPage();
        };
    } else if (page.matches('#third-page')) {
        page.querySelector('#pop-button').onclick = function() {
            document.querySelector('#navigator').popPage();
        };
    }
//    console.log("hoge");
//    var screenWidth = screen.width;
//    document.getElementById("header").style.width = "10px";
});

//document.addEventListener("deviceready", onDeviceReady, false);
//function onDeviceReady() {
//    console.log("hoge");
//    var screenWidth = screen.width;
//    document.getElementById("header").style.width = "10px";
//};


// とりあえずiPhone6sに特化させるのでコメントアウト
//var sizeAdjust = function() {
//    var screenWidth = screen.width;
//    // デバッグ用。これがないとPC上でscreen.widthが1920になる
//    //screenWidth = 640;
//    document.getElementById("header").style.width = screenWidth + "px";
//};

//「事故・故障サポート」ページへの遷移
var moveJikoSupportPage = function() {
    document.querySelector('#navigator').pushPage('page2.html');
};

//「連絡先一覧」ページへの遷移
var moveRenrakusakiPage = function() {
    document.querySelector('#navigator').pushPage('renrakusaki_ichiran.html');
};


//「スマートフォトメール」ページへの遷移
var moveToSmartPhotoMailPage = function() {
    document.querySelector('#navigator').pushPage('page3.html');
};

//「設定・その他」ページへの遷移
var moveSetteiPage = function() {
    document.querySelector('#navigator').pushPage('sonota_settei_page.html');
};

//「電話番号登録」ページへの遷移
var moveTelNumTourokuPage = function() {
    document.querySelector('#navigator').pushPage('tel_num_touroku.html');
};

//「通知設定」ページへの遷移
var moveTuuchiSetteiPage = function() {
    document.querySelector('#navigator').pushPage('tuuchi_settei.html');
};

////「自分の車両の損傷部分」の写真撮影
//var getSonsyoPicture = function() {
//    //showConfirm();
//    snapPicture('sonsyo_picture');
//}
//
////「事故現場」の写真撮影
//var getJikogenbaPicture = function() {
//    snapPicture('jikogenba_picture');
//}
//
////「その他」の写真撮影
//var getSonotaPicture = function() {
//    snapPicture('sonota_picture');
//}


// カメラ撮影を行う
var snapPicture = function() {
    //alert(img_tag_id);
    navigator.camera.getPicture (onSuccess, onFail, 
            { quality: 50, destinationType: Camera.DestinationType.DATA_URL});

    // カメラ撮影成功時
    function onSuccess (imageData) {
        var image = document.getElementById(img_tag_id);
        image.src = "data:image/jpeg;base64," + imageData;
        //return "data:image/jpeg;base64," + imageData;
    }

    // カメラ撮影失敗時
    function onFail (message) {
        //alert ('Error occured: ' + message);
    }
    hideDialog("dialog-3");
};

// 端末上の画像を取得する
var getPicture = function() {
    //alert(img_tag_id);
    navigator.camera.getPicture(onSuccess, onFail, 
          { quality: 50,destinationType: Camera.DestinationType.FILE_URI,
          sourceType: navigator.camera.PictureSourceType.SAVEDPHOTOALBUM });

    // カメラ撮影成功時
    function onSuccess (imageURI) {
        var image = document.getElementById(img_tag_id);
        image.src = imageURI;
        //return "data:image/jpeg;base64," + imageData;
    }

    // カメラ撮影失敗時
    function onFail (message) {
        //alert ('Error occured: ' + message);
    }
    hideDialog("dialog-3");
};


//function showConfirm() {
//    navigator.notification.confirm(
//        'あなたの勝ちです！', // メッセージ
//        onConfirm, // 選択されたボタン情報とともに呼ばれるコールバック関数
//        'ゲームオーバー', // タイトル
//        'リスタート,終了' // ボタン
//    );
//}

//function onConfirm(button) {
//    alert('選択されたボタン ' + button);
//}

//function hoge() {
//    ons.notification.confirm({
//    message: 'Are you ready?',
//    callback: function(answer) {
//      // Do something here.
//    }
//});
//}

// ダイアログを消す
var hideDialog = function(id) {
    document
    .getElementById(id)
    .hide();
};


// テンプレートからダイアログを作成する
var cameraDialogFromTemplate = function(selected_img_tag_id) {
  var dialog = document.getElementById('dialog-3');
  img_tag_id = selected_img_tag_id;
  if (dialog) {
    dialog.show();
  }
  else {
    ons.createDialog('dialog.html')
      .then(function(dialog) {
        dialog.show();
      });
  }
};

// ダイアログから「写真を撮影する」が選択されたときに呼ばれる
//var getPicture = function() {
//    //alert(cameraFunctionSyurui);
//    
//    switch (img_tag_id) {
//        case 'sonsyo_picture':
//            snapPicture('sonsyo_picture');
//            break;
//        case 'jikogenba_picture':
//            
//    }
//    
//    
//    if (cameraFunctionSyurui == "getSonsyoPicture") {
//        snapPicture('sonsyo_picture');
//    } else if (cameraFunctionSyurui == "getJikogenbaPicture") {
//        snapPicture('jikogenba_picture');
//        //getJikogenbaPicture();
//    } else if (cameraFunctionSyurui == "getSonotaPicture") {
//        snapPicture('sonota_picture');
//    }
//    hideDialog("dialog-3");
//};


