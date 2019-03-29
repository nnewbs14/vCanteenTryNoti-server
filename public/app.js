var config = {
    apiKey: "AIzaSyCBbAvsG2-xjitRmVu0Qrl66e-E3G0F_ac",
    authDomain: "vcanteentrynoti-1532f.firebaseapp.com",
    databaseURL: "https://vcanteentrynoti-1532f.firebaseio.com",
    projectId: "vcanteentrynoti-1532f",
    storageBucket: "vcanteentrynoti-1532f.appspot.com",
    messagingSenderId: "253280269928"
};

firebase.initializeApp(config);

firebase.auth.Auth.Persistence.LOCAL; 

$("#btn-login").click(function(){        
    var email = $("#email").val();
    var password = $("#password").val(); 

    var result = firebase.auth().signInWithEmailAndPassword(email, password);
    
    result.catch(function(error){
        var errorCode = error.code; 
        var errorMessage = error.message; 

        console.log(errorCode);
        console.log(errorMessage);
    });
});
