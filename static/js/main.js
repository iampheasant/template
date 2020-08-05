var firebaseConfig  = {
    apiKey: "api-key",	//api-key
	authDomain: "test1-73089.firebaseapp.com",	//project-id.firebaseapp.com
	databaseURL: "https://test1-73089.firebaseio.com/",	//https://project-id.firebaseio.com
	projectId: "test1-73089",	//project-id
	storageBucket: "test1-73089.appspot.com",	//project-id.appspot.com
	messagingSenderId: "sender-id",	//sender-id
	appID: "app-id",	//app-id
};
firebase.initializeApp(firebaseConfig);
var db = firebase.database();

//第一頁中按"目標金額增加"，增加input的數量
var input_count = 0;
function addInput(obj)
{
	input_count++;
	var new_element = document.createElement("input");
	//設定這個input的屬性
	new_element.setAttribute("type","text");
	new_element.setAttribute("placeholder","請輸入金額");
	new_element.setAttribute("id","threshold_" + input_count);
	//最後再使用appendChild加到要加的form裡
	obj.form.appendChild(new_element);
	var s = document.createElement("br");
	obj.form.appendChild(s);
}
//第一頁中按"確定"，將門檻寫入firebase，並跳到第二頁
function addThreshold(threshold) {
	//加入for
	db.ref('addThreshold/' + input_count).push({
		threshold: document.getElementById("threshold").value
	})
	.then(function () {
		window.location.assign("page_2");
	});
}
//第二頁中按"新增商品"，前往第四頁
function btnGoPage4() {
	window.location.assign("page_4");
}
//第二頁中按"確定拆分"，跳到第三頁，(並執行python的部分(尚未加入))
function split() {
	window.location.assign("page_3");
}
//第四頁中按"新增"，增加商品詳細資訊進資料庫，跳出新增成功視窗並刷新頁面
function addList(img, name, price, must_items, buyable_items) {
	db.ref('addList/').push({
		img: document.getElementById("img").value, 
		name: document.getElementById("name").value, 
		price: document.getElementById("price").value, 
		must_items: document.getElementById("must_items").value, 
		buyable_items: document.getElementById("buyable_items").value
	})
	.then(function () {
			alert("新增成功");
	})
	.then(function () {
		window.location.assign(window.location.href);
	})
	;
}
//第四頁中按"返回"，前往第二頁
function btnGoPage2() {
	window.location.assign("page_2");
}
function tr() {
	var myNameRef = firebase.database().ref('addList');
	//on 隨時監聽
	myNameRef.on('value', function (snapshot) {
	    console.log(snapshot.val());
	    document.getElementById('price').textContent = snapshot.val();
	    alert(snapshot.val());
})
}

/*

function tr() {
	var messageListRef = firebase.database().ref( 'addList' );
	var newMessageRef = messageListRef.push();
	newMessageRef.set({
	  'user_id' : 'ada' ,
	  'text' : 'test.'
	});
	// We've appended a new message to the message_list location.
	var path = newMessageRef.toString();
	// path will be something like
	// 'https://sample-app.firebaseio.com/message_list/-IKo28nwJLH0Nc5XeFmj' 
	alert(path);
}

function trr() {
	var myNameRef = firebase.database().ref('addList');
	//on 隨時監聽
	myNameRef.on('value', function (snapshot) {
	    console.log(snapshot.val());
	    document.getElementById('title').textContent = snapshot.val();
})
}
*/