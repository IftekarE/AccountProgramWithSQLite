//DATABASE VARIABLES START
var filter = 0;
var profiles = [];
var profilesStore = 0;
//DATABASE VARIABLES END
//AUTHANTICATION VARIABLES START
var entry = 0;
var toggle = 0;
var arrayLength = 0;
var count = 0;
var idhold0 = 0;
var meshold0 = 0;
var username = 0;
var shouldAllow = 0;
var notInRecords = 0;
//AUTHANTICATION VARIABLES END
//CREATING & UPDATING DB START
var db = new SQL.Database();//settting pointer 
db.run("CREATE TABLE profiles (id INTEGER PRIMARY KEY AUTOINCREMENT, unit TEXT);");//creating table in DB
var insertProfile = function(user){//adding data to the DB
    db.run("INSERT INTO profiles (unit) VALUES (?)", [user]);//using the input to enter data to DB
     //Extract data from DB
        var results = db.exec("SELECT unit FROM profiles");//extracting the data from the DB
        for(var i = profiles.length; i < results[0].values.length; i++){//finding the latest addition to the DB
            profiles.push(results[0].values[i]);//pushing the latest addition to the DB
        }
        ReEntry();
        console.log(profiles);
    //Extract data from DB
};
var form = document.getElementById("account-form");//accepting input from HTML file
document.addEventListener("submit", function(e){//this code calls all the functions 
    e.preventDefault();
    if(document.getElementById("change").innerHTML == "Password:"){//this calls for the password filter 
        filter = document.getElementById("user-input").value;//setting the input to a filter variable 
        //add password filter
        PasswordAuthanticate();
        //add password filter
      }else{//this calls for username filter
        filter = document.getElementById("user-input").value;//setting the input to a filter variable 
        //add username filter
        UsernameAuthanticate(); 
        //add username filter
      }
    if(entry == 1){//this calls data entry function and changes innerHTML
        if(toggle == 1){
            //CHANGEING INNER-HTML
            var lable = document.getElementById("change");
            lable.innerHTML = "Username:";
            //CHANGEING INNER-HTML
            var button = document.getElementById("button");  
            button.innerHTML = "Next";   
            //CHANGEING INNER-HTML
            toggle = 0;
        }else{
            //CHANGEING INNER-HTML
            var lable = document.getElementById("change");
            lable.innerHTML = "Password:";
            //CHANGEING INNER-HTML
            var button = document.getElementById("button");  
            button.innerHTML = "Register";   
            //CHANGEING INNER-HTML
        }
        insertProfile(document.getElementById("user-input").value);//calling data entry
        entry = 0;//blocking access for the next input until filtered 
        document.getElementById("account-form").reset();//resetting input box
    }                                        
});
//CREATING & UPDATING DB END
//PASSWORD FILTER START
function PasswordAuthanticate(){//filtering password
    if(filter.length == 0){//checking to see if user entred a password                                                              
        meshold0 = "Please enter a Password";
        display();
    }else{
        var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;// settign the passing requirements, Lowercase || Uppercase || Number || Special Character || Length
            if(filter.match(passw)){//seeing if password matches the reqirments 
                entry = 1;
                toggle = 1;
                meshold0 = "Your account is now registred";
                display();
            }else{ 
                document.getElementById("account-form").reset();
                meshold0 = "Password is not Strong, try again.";
                display();
            }
        }   
};
//PASSWORD FILTER END
//USERNAME FILTER START
function UsernameAuthanticate(){//filtering username
    //Extract data from DB
        if(profiles.length !== 0){
            var results = db.exec("SELECT unit FROM profiles");//extracting the data from the DB
            for(var i = profiles.length; i < results[0].values.length; i++){//finding the latest addition to the DB
                profiles.push(results[0].values[i]);//pushing the latest addition to the DB
            }
        }
    //Extract data from DB
        if(filter.length == 0){//checking if user entred a password
            meshold0 = "Please enter a Username";
            display();
        }else{
            arrayLength = profiles.length;
            var i = 0;
            var allowEntry = 0;
            do{//looping through the DB array
                if(filter == profiles[i]){//checking for repeating userrnames 
                    meshold0 = "An account by the Username " + filter + " already exists.";
                    display();
                    document.getElementById("account-form").reset();
                    allowEntry = 1;//allows for new data entry 
                    i = i + 2;
                }else{
                    i = i + 2;
                }
            }while(i < arrayLength);//checking loop break condition 
            if(allowEntry == 0){//deciding if wether or not to add new data to DB
                entry = 1;//this line of code should be placed after the username has been checked for all requirments
            }
        }
};
//USERNAME FILTER END 
//THIS IS FOR TESTING PURPOSES START
function call(){
    //EXTRACTING DATA START (put into profiles array)  
    var results = db.exec("SELECT unit FROM profiles");
    for(var i = profiles.length; i < results[0].values.length; i++){
        profiles.push(results[0].values[i]);
    }
    console.log("This is the call function: " + profiles);
    //EXTRACTING DATA END (put into profiles array)
    //ConsoleLog Profiles array to see data, every even is a username and every odd is a password
};
//THIS IS FOR TESTING PURPOSES END
//USERNAME LOGIN START
function UserMatch(inputtxt){
    if(inputtxt.value.length == 0){//checks to see if input is blank
        meshold0 = "Please enter a Username";//checking to see if input box is empty 
        display();
    }else{
        filter = inputtxt.value;
            //Extract data from DB
                var results = db.exec("SELECT unit FROM profiles");//extracting the data from the DB
                for(var i = profiles.length; i < results[0].values.length; i++){//finding the latest addition to the DB
                    profiles.push(results[0].values[i]);//pushing the latest addition to the DB
                }
            //Extract data from DB
        arrayLength = profiles.length;
        i = 0;
        notInRecords = 0;
        do{//looping through the DB array
            if(filter == profiles[i]){//checking for repeating userrnames 
                i++;
                count = i;
                i = arrayLength + 1;
                notInRecords = 1;
                username = filter;
            }else{
                i = i + 2;
                notInRecords = 0;
            }
        }while(i < arrayLength);//checking loop break condition 
        console.log(notInRecords);
    }
}
//USERNAME LOGIN END
//PASSWORD LOGIN START
function PassMatch(inputtxt){
    if(inputtxt.value.length == 0){//checks to see if input is blank
        meshold0 = "Please enter a Password";
        display();
    }else{
        if(notInRecords == 0){
            meshold0 = "There is no account by the Username " + filter;
            display();
        }else{
            filter = inputtxt.value;
            //Extract data from DB
                var results = db.exec("SELECT unit FROM profiles");//extracting the data from the DB
                for(var i = profiles.length; i < results[0].values.length; i++){//finding the latest addition to the DB
                    profiles.push(results[0].values[i]);//pushing the latest addition to the DB
                }
                console.log(profiles);
            //Extract data from DB
            if(profiles[count] == filter){
                meshold0 = "You are now logged into " + username;
                display();
            }else{
                meshold0 = "Incorrect Username or Password, Try again ";
                display();
            }
        }
    }
}
//PASSWORD LOGIN
//DISPLAY START
function display(){//this is what displays the messages on screen 
    idhold0 = 0;
    idhold0 = document.getElementById("can0");// its telling the program where to display the message 
    idhold0.innerHTML = meshold0;
}
//DISPLAY END
//DB RESET SOLUTION START
function ReEntry(){
     //Extract data from DB
     var results = db.exec("SELECT unit FROM profiles");//extracting the data from the DB
     for(var i = profiles.length; i < results[0].values.length; i++){//finding the latest addition to the DB
         profiles.push(results[0].values[i]);//pushing the latest addition to the DB
     }
    //Extract data from DB
        var duration = profiles.length;
        var zz = profiles.length - 1;
        do{
            profilesStore = profiles[zz];

            var i = JSON.parse(localStorage.getItem("Database")) || [];
            i.push(profilesStore); 
            localStorage.setItem("Database", JSON.stringify(i));
            zz++;
        }while(zz < duration)
        var display = JSON.parse(localStorage.getItem("Database")) || [];
        console.log(display);
}
function ReReEntry(){
    if(shouldAllow == 0){
    var display = JSON.parse(localStorage.getItem("Database")) || [];
    var duration = display.length;
    var zz = 0;
    do{
        profilesStore = display[zz];
        db.run("INSERT INTO profiles (unit) VALUES (?)", profilesStore);
        zz++;
    }while(zz < duration)
    shouldAllow = 1;
}
}
//DB RESET SOLUTION END