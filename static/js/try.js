var firebaseConfig  = {
    apiKey: "api-key",	//api-key
	authDomain: "test1-73089.firebaseapp.com",	//project-id.firebaseapp.com
	databaseURL: "https://test1-73089.firebaseio.com/",	//https://project-id.firebaseio.com
	projectId: "test1-73089",	//project-id
	storageBucket: "test1-73089.appspot.com",	//project-id.appspot.com
	messagingSenderId: "sender-id",	//sender-id
	appID: "app-id",	//app-id
};


function trr() {
	// The key of any non-root reference is the last token in the path
	var adaRef = firebase.database().ref("addList");
	var key = adaRef.key;  // key === "ada"
	key = adaRef.child("addList/price").key;  // key === "last"
	alert(key);
}