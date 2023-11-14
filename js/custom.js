const myJson={};
const x = document.getElementById("location");
const currentLocation = document.getElementById('current-location');


const Name = document.getElementById('name');
const NID = document.getElementById('NID');
const phone = document.getElementById('phone');
const HazardType = document.getElementById('hazard-type');
const HazardDesc = document.getElementById('hazard-desc');
var lat=0;
var long=0;
const attachment = document.getElementById('attachment');
const agreement = document.getElementById('tabContent9Checkbox');
const submit = document.getElementById('submit');

currentLocation.onclick = function(){getLocation()}
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.value = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
    myJson['lat']=position.coords.latitude ;
    myJson['long']=position.coords.longitude;
    
    x.value = "Latitude: " + position.coords.latitude + 
  ", Longitude: " + position.coords.longitude;
}



var confirmBtn = document.getElementById('confirmPosition');
  var onClickPositionView = document.getElementById('onClickPositionView');
  var onIdlePositionView = document.getElementById('onIdlePositionView');

  // Initialize locationPicker plugin
  var lp = new locationPicker('map', {
    setCurrentPosition: true, // You can omit this, defaults to true
  }, {
    zoom: 15 // You can set any google map options here, zoom defaults to 15
  });

  // Listen to button onclick event
//   confirmBtn.onclick = function () {
//     // Get current location and show it in HTML
//     var location = lp.getMarkerPosition();
//     x.value = 'Latitude: ' + location.lat + ', Longitude: ' + location.lng;
//   };

  // Listen to map idle event, listening to idle event more accurate than listening to ondrag event
  google.maps.event.addListener(lp.map, 'idle', function (event) {
    // Get current location and show it in HTML
    var location = lp.getMarkerPosition();
    x.value = 'Latitude: ' + location.lat + ', Longitude: ' + location.lng;
    myJson['lat']=location.lat;
    myJson['long']=location.lng;
  });
//   let myFiles={};
//   attachment.addEventListener('change', async (event) => {
//     const files = event.srcElement.files;
  
//     console.log(files)}
//     )
myJson['attchment'] = {
    'filename':'',
    'filetype':'',
    'filecontent':{}
}
attachment.addEventListener('change', async (event) => {
    // clean up earliest files
    const myFiles = {}
    // set state of files to false until each of them is processed
    isFilesReady = false
  
    const files = event.srcElement.files;
  
    const filePromises = Object.entries(files).map(item => {
      return new Promise((resolve, reject) => {
        const [index, file] = item
        const reader = new FileReader();
        reader.readAsBinaryString(file);
  
        reader.onload = function(event) {
          // Convert file to Base64 string
          // btoa is built int javascript function for base64 encoding
          myFiles['picture'] = btoa(event.target.result)
         
  
          resolve()
        };
        reader.onerror = function() {
          console.log("can't read the file");
          reject()
        };
      })
    })
  
    Promise.all(filePromises)
      .then(() => {
        console.log('ready to submit')
        isFilesReady = true
        myJson['attchment'] = {
            'filename':files[0].name,
            'filetype':files[0].type,
            'filecontent':myFiles.picture
        }
      })
      .catch((error) => {
        console.log(error)
        console.log('something wrong happened')
      })
  })



  submit.onclick = function(){submitting()}
  
function submitting(){
    myJson['username']=Name.value;
    myJson['NID']=NID.value;
    myJson['phone']=phone.value;
    myJson['hazardtype']=HazardType.value;
    myJson['hazarddesc']=HazardDesc.value;
    
    myJson['agreement'] =agreement.checked;
    console.log(myJson)

}