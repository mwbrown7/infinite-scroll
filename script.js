// nsplash Api

let readyToLoad=false;
let imagesLoaded=0;
let totalImagesLoaded=0;
const count=10;
const apiKey='5aQ6zxWgLQLTLCImMAiPn-bIgsOebFM29vcBkB-WewE';
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imageContainer=document.getElementById('image-container');
const delayLoader=document.getElementById('loader');
let photoDataArray=[];


// Check if all iamge has loaded

function imageLoaded(){

    console.log("image loaded")
}

//Helper function to set atributes

function setAttributes(element,atributes){
       
    for(const key in atributes){
        element.setAttribute(key,atributes[key]);
    }

}
//Create html elements & Photos and to DOM
function displayPhotos(){
    photoDataArray.forEach((photos)=>{

        //Create elements and set attributes 
        const anchorElement=document.createElement('a');
       

        setAttributes(anchorElement,{
            href:photos.links.html,
            target:'_blank',
        })
       const imageElement=document.createElement('img');
    
        setAttributes(imageElement,{
            src:photos.urls.regular,
            alt:photos.alt_description,
            title:photos.alt_description,
        })
        imageElement.addEventListener('load',imageLoaded);

    //Put image inside <a></a> then both in imageContainer in DOM
    anchorElement.appendChild(imageElement);
    imageContainer.appendChild(anchorElement);

        

    });

    
}

async function getApiPhotos(){
    try{
        const responce= await fetch(apiUrl);
         photoDataArray= await responce.json();
        displayPhotos();
        
    }catch(error){
console.log(error,'no photos')
    }
}

window.addEventListener('scroll',()=>{
  if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000){
      displayPhotos();
  }
})

getApiPhotos();