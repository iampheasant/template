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

var input_count = 0;
var d = new Date();
var t = d.getTime();
var counter = -1;
//onload所有需要的function
window.onload = function(){
	readGoods();
	readGoods_2();
	ShowTime();
}
//調整內容的頂高
function Resize() {
	$("body").css("margin-bottom",$(".navbar_2").height());
}
$(window).resize(Resize);
//跳到內容頁面
function index() {
	window.location.assign("index");
}
//跳到註冊頁面
function reg() {
	window.location.assign("reg");
}
//跳到登入頁面
function sign() {
	window.location.assign("sign");
}
//跳到登入頁面
function guest() {
	window.location.assign("guest");
}
//按"新增一筆目標金額"，增加input的數量
function addInput(obj)
{
	if (input_count < 4) {
		input_count++;
		var new_element = document.createElement("input");
		//設定這個input的屬性
		new_element.setAttribute("type","text");
		new_element.setAttribute("placeholder","請輸入目標購物金額");
		new_element.setAttribute("id","threshold_" + input_count);
		//最後再使用appendChild加到要加的form裡
		obj.form.appendChild(new_element);
	}
	
}
//按"刪除一筆目標金額"，減少input的數量
function cutInput(obj) {
	if (input_count>=1) {
		var str = document.getElementById("threshold_" + input_count);
		str.remove();
		input_count--;
	}
	else{
		return false;
	}
}
//從資料庫讀取商品內容，並以card逐個顯示，並有編輯刪除按鈕
function readGoods() {
	var goods = firebase.database().ref("addList");
	goods.on("child_added",function(data){
		var goodsValue = data.val();

		document.getElementById("cardSection").innerHTML+=
		`
			<div class="mycard md-3 relative">
				<div class="">
					<div class="col-xs-4">
						<img src="" style="width:100%" class="">
					</div>
					<div class="col-xs-8">
						<div class="row">
							<div class="col-xs-9"><p class="card-text left">商品: ${goodsValue.name}</p></div>
							<div class="col-xs-3"><button id="updateGoods" onclick="updateGoods()">編</button></div>
						</div>
						<p class="card-text left" id="price_p">價格: ${goodsValue.price}元</p>
						<div class="row">
							<div class="col-xs-9"><p class="card-text left">數量: ${goodsValue.number}個</p></div>
							<div class="col-xs-3"><button id="deleteGoods" onclick="deleteGoods(${goodsValue.id})">刪</button></div>
						</div>
					</div>
				</div>
			</div>
		`
	});
}
//從資料庫讀取商品內容，並以card逐個顯示
function readGoods_2() {
	var goods = firebase.database().ref("addList");
	goods.on("child_added",function(data){
		var goodsValue = data.val();

		document.getElementById("cardSection_2").innerHTML+=
		`
			<div class="mycard md-3 relative">
				<div class="">
					<div class="col-xs-4">
						<img src="" style="width:100%" class="">
					</div>
					<div class="col-xs-8">
						<div class="row">
							<div class="col-xs-9"><p class="card-text left">商品: ${goodsValue.name}</p></div>
						</div>
						<p class="card-text left" id="price_p">價格: ${goodsValue.price}元</p>
						<div class="row">
							<div class="col-xs-9"><p class="card-text left">數量: ${goodsValue.number}個</p></div>
						</div>
					</div>
				</div>
			</div>
		`
	});
}
//顯示時間
function ShowTime(){
	document.getElementById('showbox').innerHTML = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate() + "/&nbsp" + d.getHours() + ":" + d.getMinutes();
}
//按"新增商品"，增加商品詳細資訊進資料庫，並跳出新增成功視窗
function addList(img, name, price,number) {
	counter++;
	console.log(d);
	console.log(t);
	console.log(counter);
	db.ref('addList/' + counter).set({
		img: document.getElementById("img").value, 
		name: document.getElementById("name").value, 
		price: document.getElementById("price").value,
		number: document.getElementById("number").value
	})
	.then(function () {
		Swal.fire({
			icon: 'success',
			title: '商品新增成功',
			showConfirmButton: false,
			timer: 1200
		});
	})
	;
}
//導覽列動畫
const $menu = $('#myCarousel');
$menu.on('show.bs.collapse', function () {
  $menu.addClass('menu-show');
});
$menu.on('hide.bs.collapse', function () {
  $menu.removeClass('menu-show');
});