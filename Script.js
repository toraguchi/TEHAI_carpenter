// 位置情報を取得するフラグ
let hasLocationPermission = false;

// Google Maps APIキーを設定
const GOOGLE_MAPS_API_KEY = "AIzaSyA0hj5yFG-9OZwWcL6o0RYYieGIlax0RMw";

// 企業リスト
const companies = [
    {
        name: "丸松産業",
        phone:"0484782000",
        hours:"8:30〜16:30",
        rate: "混廃 ¥65〜/kg\n木くず ¥30〜/kg",
        address: "埼玉県新座市大和田2-231-1",
        holiday: "土日祝(第二土曜日除く)",
        memo:"11:30〜13:00 持ち込み不可",
        contract:"",
        personnel:"与儀 様",
        location:{ lat:35.808179558872375, lng: 139.54994368553108 }
        },
         {
        name: "オネスト",
        phone:"0335225300",
        hours: "平日／7：00～18：00\n日曜日・祝／10：00～17：00",
        rate: "混廃 ¥65〜/kg\n木くず ¥35/kg",
        address: "東京都江東区新木場4-3-26",
        holiday: "第二日曜日",
        memo:"日曜日事前予約制 「前日15:00までに予約必須」",
        contract:"",
        personnel:"小林 様",
        location:{ lat:35.645324883816585, lng: 139.83876319650597 }
        },
         {
        name: "東港金属",
        phone:"0337901751",
        hours:"全日 00:00〜23:59（24時間営業）",
        rate: "混廃 ¥70〜/kg\n木くず ¥30/kg",
        address: "東京都大田区京浜島2-20-4",
        holiday: "年末年始",
        memo:"ー",
        contract:"",
        personnel:"森 様",
        location:{ lat: 35.56727553499662, lng: 139.7666577830091 }
        },
         {
        name: "旭商会",
        phone:"0427713558",
        hours:"8:30〜16:30\n※全日・12:00〜13:00 持ち込み不可",
        rate: "混廃 ¥40〜/kg\n木くず ¥30/kg",
        address: "神奈川県相模原市緑区下九沢2096-1",
        holiday: "土日祝",
        memo:"全日事前予約制 「持込2日前に予約必須」",
        contract:"",
        personnel:"石澤 様",
        location:{ lat: 35.589123760212026, lng: 139.33580377287038 }
        },
         {
        name: "亀田",
        phone:"0336186023",
        hours:"8:30〜15:00\n※全日・12:00〜13:00 持ち込み不可",
        rate: "混廃 ¥75〜/kg\n木くず ¥30/kg",
        address: "東京都墨田区東墨田2-24-19",
        holiday: "土日祝",
        memo:"ー",
        contract:"",
        personnel:"高橋 様",
        location:{ lat: 35.72374042038803, lng: 139.8337693110415 }
        },
         {
        name: "アール・イー・ハヤシ",
        phone:"0334723054",
        hours:"8:30〜16:30\n※全日・12:00〜13:00 持ち込み不可",
        rate: "混廃 ¥70〜/kg\n木くず ¥30/kg",
        address: "東京都大田区東糀谷1-7-1",
        holiday: "年末年始のみ",
        memo:"ー",
        contract:"",
        personnel:"沼下 様",
        location:{ lat: 35.560442159460635, lng: 139.74225118300902 }
        },
        {
            name: "有限会社谷口重機",
            phone:"0334168206",
            hours:"8:00〜17:30",
            rate: "混廃 ¥14000〜/m3",
            address: "東京都世田谷区大蔵6-20-29",
            holiday: "日・祝日",
            memo:"ー",
            contract:"紙契約書（契約：持込後）",
            personnel:"谷口 様",
            location:{ lat:35.62500720709309,lng:139.607269909393}
            },
            {
                name: "木村管工（瀬谷区）",
                phone:"0459222179",
                hours:"8:00〜17:30\n※全日・12:00〜13:00 持ち込み不可",
                rate: "混廃 ¥60〜/kg\n木くず ¥20〜/kg",
                address: "神奈川県横浜市瀬谷区北町20-20",
                holiday: "日・祝日",
                memo:"ー",
                contract:"紙契約書（契約：持込前）",
                personnel:"甲斐 様",
                location:{ lat:35.50534093053265, lng:139.481085560736}
                },
                 {
                name: "木村管工（保土ケ谷区）",
                phone:"0453519640",
                hours:"8:00〜17:30\n※全日・12:00〜13:00 持ち込み不可",
                rate: "混廃 ¥8000〜/m3\n木くず ¥6000〜/m3",
                address: "神奈川県横浜市保土ケ谷区今井町1120-1",
                holiday: "日・祝日",
                memo:"ー",
                contract:"紙契約書（契約：持込前）",
                personnel:"甲斐 様",
                location:{ lat:35.44751579005078,lng:139.555081874302}
                },
                 {
                name: "木村管工（麻生区）",
                phone:"0449887624",
                hours:"8:00〜17:30\n※全日・12:00〜13:00 持ち込み不可",
                rate: "混廃 ¥8000〜/m3\n木くず 不可",
                address: "神奈川県川崎市麻生区岡上1028",
                holiday: "日・祝日",
                memo:"ー",
                contract:"紙契約書（契約：持込前）",
                personnel:"甲斐 様",
                location:{ lat:35.57851266191747,lng:139.480746457445}
                }
];
// 電話をかける
function callRequest(companyName) {
    const company = companies.find(c => c.name === companyName);
    if (!company || !company.phone) {
        alert("会社情報または電話番号が見つかりません");
        return;
    }

    // 電話番号にかけるためのリンクを作成
    const telLink = `tel:${company.phone}`;
    window.location.href = telLink; // 電話をかける
}
// 位置情報取得通知をリロードごとに表示
window.onload = () => {
    // ページが読み込まれるたびに位置情報を取得
    requestLocationPermission();
};

// 位置情報を取得して表示する関数
function getUserLocation() {
    if (navigator.geolocation) {
        // 位置情報取得をリクエスト
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                console.log("位置情報取得成功:", userLocation);
                calculateDistances(userLocation); // 位置情報取得後に距離計算
            },
            (error) => {
                const errorMessages = {
                    1: "位置情報の利用が許可されていません。",
                    2: "位置情報を取得できません。",
                    3: "位置情報の取得がタイムアウトしました。"
                };
                console.error("位置情報取得エラー:", error.message);
                alert(errorMessages[error.code] || "未知のエラーが発生しました。");
            },
            {
                enableHighAccuracy: true, // 高精度な位置情報を取得
                maximumAge: 0 // キャッシュを無効にする
            }
        );
    } else {
        alert("このブラウザは位置情報の取得をサポートしていません。");
    }
}

// 距離計算と企業リスト更新
function calculateDistances(userLocation) {
    const service = new google.maps.DistanceMatrixService();
    const destinations = companies.map(company => company.location);

    service.getDistanceMatrix(
        {
            origins: [userLocation],
            destinations: destinations,
            travelMode: google.maps.TravelMode.DRIVING
        },
        (response, status) => {
            if (status === "OK") {
                const results = response.rows[0].elements;
                companies.forEach((company, index) => {
                    company.distance = results[index].distance.value; // 距離（メートル）
                    company.duration = results[index].duration.text; // 移動時間（テキスト）
                });

                // 企業リストを距離順にソート
                companies.sort((a, b) => a.distance - b.distance);

                // **企業リストを表示**
                displayCompanies(userLocation);
            } else {
                // エラー詳細のログを表示
                console.error("Distance Matrix APIのエラー:", status);
                alert(`エラーが発生しました: ${status}. 詳細はコンソールで確認してください。`);

                // コンソールに追加情報を表示
                if (status === google.maps.DistanceMatrixStatus.INVALID_REQUEST) {
                    console.error("リクエストが無効です。URLのパラメータやリファラ設定を確認してください。");
                } else if (status === google.maps.DistanceMatrixStatus.MAX_ELEMENTS_EXCEEDED) {
                    console.error("最大の要素数を超えました。リクエストが多すぎます。");
                } else if (status === google.maps.DistanceMatrixStatus.OVER_QUERY_LIMIT) {
                    console.error("クエリ制限を超えました。APIのリクエスト制限を確認してください。");
                } else if (status === google.maps.DistanceMatrixStatus.REQUEST_DENIED) {
                    console.error("リクエストが拒否されました。APIキーやリファラ設定を確認してください。");
                } else if (status === google.maps.DistanceMatrixStatus.UNKNOWN_ERROR) {
                    console.error("不明なエラーが発生しました。");
                }
            }
        }
    );
}



function displayCompanies(userLocation) {
    const container = document.getElementById("company-list");
    if (!container) {
        console.error("企業リストのコンテナが見つかりません。HTML構造を確認してください。");
        return;
    }
    container.innerHTML = ""; // 初期化

    companies.forEach((company) => {
        // 各企業カードのHTMLを生成
        const card = document.createElement("div");
        card.className = "feature-item";
        card.innerHTML = `
            <h4>${company.name}</h4>
            <p>⚪︎営業時間: ${formatTextWithLineBreaks(company.hours)}</p>
            <p>⚪︎処分単価: ${formatTextWithLineBreaks(company.rate)}</p>
            <p>⚪︎住所: ${company.address}</p>
            <p>⚪︎休業日: ${company.holiday}</p>
            <p>⚪︎備考: ${company.memo}</p>            
            <p>⚪︎移動時間: ${company.duration || "計算中..."}</p>
            <p>⚪︎契約書: ${company.contract}</p>     
            <p>⚪︎担当者: ${company.personnel}</p>          
            <div id="map-${company.name}" style="width: 100%; height: 300px;"></div>
            <button onclick="callRequest('${company.phone}')">tel依頼</button> <!-- 電話ボタン -->
            <button onclick="openRoute('${company.name}', ${userLocation.lat}, ${userLocation.lng})">経路案内</button>
        `;
        container.appendChild(card); // コンテナにカードを追加

        // 企業の地図を表示
        const mapElement = card.querySelector(`#map-${company.name}`);
        initMap(mapElement, company.location);
    });
}
// エラーハンドリング
const errorMessages = {
    1: "位置情報の利用が許可されていません。",
    2: "位置情報を取得できません。",
    3: "位置情報の取得がタイムアウトしました。"
};

// 電話依頼の処理
function callRequest(phoneNumber) {
    window.location.href = `tel:${phoneNumber}`;
}

// 改行をHTMLの <br> タグに変換
function formatTextWithLineBreaks(text) {
    return text.replace(/\n/g, "<br>"); // 改行を <br> タグに変換
}

// 依頼確認の2段階認証
function confirmRequest(companyName) {
    const confirmation = confirm("依頼でお間違いないですか？");
    if (confirmation) {
        sendRequest(companyName); // 確認後にメール送信
    }
}

// Google Mapを初期化して企業の位置にマーカーを追加
function initMap(mapElement, location) {
    const map = new google.maps.Map(mapElement, {
        center: location,
        zoom: 14
    });
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: "企業の位置"
    });
}

function openRoute(companyName, userLat, userLng) {
    const company = companies.find(c => c.name === companyName);
    if (!company || !company.location) {
        alert("会社情報または位置情報が見つかりません");
        return;
    }

    // GoogleマップのURLを生成
    const destination = `${company.location.lat},${company.location.lng}`;
    const origin = `${userLat},${userLng}`;
    const googleMapsURL = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;

    // 新しいタブでGoogleマップを開く
    window.open(googleMapsURL, '_blank');
}

// 初期化
window.onload = () => {
    getUserLocation();
};