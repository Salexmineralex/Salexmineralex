var data;

fetch('./data.json')
.then((response) => response.json()
.then((json) =>  iterateprojects(json) 


));



function iterateprojects(json)
{
    data = json

    // console.log(data.projects.length)

    // for(i = 0; i < data.projects.length; i++)
    // {

    //     //<div> <a class="btne cta bg">Boton1</a> </div>
    //     const div = document.createElement('div');
    //     const button = document.createElement('a');
    //     //navigationButton.setAttribute('type', 'button');
    //     button.classList.add('btne');
    //     button.classList.add('cta');
    //     button.classList.add('bg');
    //     button.text = data.projects[i].name
    //     div.appendChild(button)
    //     document.getElementById("owl-stage").appendChild(div)
    //     console.log(data.projects[i].name)
    // }
  
}


/* { function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', './data.json', true);
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        callback(xobj.responseText);
      }
    };
    xobj.send(null);  
  }


  loadJSON(function(json) {
     // this will log out the json object
    console.log(json);
    data = $.parseJSON(json);
    
    console.log(data)

    setUpButtons()
  });



function setUpButtons()
{
    
      
}  }*/



var varSpeedMouse = 3;

class Carousel {
    constructor(el, options = {}) {
      const DEFAULTS = {
        infinite : true,
        slideSelector: '.C-slide',
        initialSlideIndex: 0,
        vertical: false,
      };
      this.carousel = el;
      this.settings = {
        ...DEFAULTS,
        ...options,
      };
  
      this.slides = document.querySelectorAll(
        this.settings.slideSelector
      );
  
      this.state = {
        currentSlide: this.settings.initialSlideIndex,
      };
  
      this.track = null;
      this.navigation = null;
      this.navigationButtons = [];
  
      // Init
      this.init();
    }
  
    setState(newState, callback = () => undefined) {
      this.state = {
        ...this.state,
        ...newState,
      };
      this.updateCarousel();
      return callback();
    }
    
    getSettings = () => {
      return this.settings;
    }
  
    reInitWithOptions = (options = {}) => {
      this.carousel.classList.remove('initialized');
      this.track.classList.add('C-track--reinit');
      this.settings = {
        ...this.getSettings(),
        ...options,
      };
      
      this.init();
      this.onResizeActions();
      this.track.classList.remove('C-track--reinit');
    };
  
    init() {
      const {
        carousel,
        slides,
      } = this;
  
      const {
        vertical,
      } = this.settings;
  
      carousel.classList.remove('C-carousel--vertical');
      carousel.classList.remove('C-carousel--horizontal');
      if (vertical) {
        carousel.classList.add('C-carousel--vertical');
      } else {
        carousel.classList.add('C-carousel--horizontal');
        slides.forEach(slide => {
          slide.style.float = 'left';
        });
      }
  
      this.onInitActions();
  
      window.addEventListener('resize', () => {
        setTimeout(() => { this.onResizeActions(); }, 100);
      });
  
    }
  
    onInitActions() {
      this.createSlideTrack();
      this.createNavigation();
      this.createMousewheel()
      this.createNavigationButtons();
      this.updateCarousel();
      this.carousel.classList.add('initialized');
    }
  
    onResizeActions() {
      this.setSlideTrackDimensions();
    }
  
    createSlideTrack() {
      const {
        slides,
        carousel,
        track,
      } = this;
      
      // Do not re-create track if it exists
      if(!track) {
        const track = document.createElement('div');
        track.classList.add('C-track');
        slides.forEach(slide => {
          track.appendChild(slide);
        });
  
        carousel.appendChild(track);
        this.track = track;
      }
      this.setSlideTrackDimensions();
    }
  
    setSlideTrackDimensions() {
  
      const {
        track,
        slides,
      } = this;
      slides.forEach(slide => {
        slide.style.transition = 'none';
      });
      const numberOfSlides = slides.length;
  
      if (!track) { return; }
  
      const {
        vertical,
      } = this.settings;
  
      const height = [...slides].reduce((acc, slide) => (
        acc + slide.offsetHeight
      ), 0);
      const width = [...slides].reduce((acc, slide) => (
        acc + slide.offsetWidth
      ), 0);
      
      track.style.transition = 'none';
  
      if (!!vertical) {
        track.style.width = width / numberOfSlides + 'px';
        track.style.height = height + 'px';
      } else {
        track.style.width = width + 'px';
        track.style.height = height / numberOfSlides + 'px';
      }
  
      track.style.transition = '';
      slides.forEach(slide => {
        slide.style.transition = '';
      });
    }
  
    updateTrackPosition() {
      const {
        slides,
        track,
      } = this;
  
      const numberOfSlides = slides.length;
      const basePercentage = 100 / numberOfSlides;
  
      const {
        vertical,
      } = this.settings;
  
      const {
        currentSlide,
      } = this.state;
  
      const translateValue = !!vertical
      ? `translateY(-${basePercentage * currentSlide}%)`
      : `translateX(-${basePercentage * currentSlide}%)`
  
      track.style.transform = translateValue;
  
    }

   

   
   
  
    createNavigation () {
      const {
        slides,
        carousel,
        navigation,
      } = this;
      
      if (!navigation) {
        const navigationContainer = document.createElement('div');
        navigationContainer.classList.add('C-navigation');
        [...slides].forEach((slide, index) => {
          navigationContainer.appendChild(this.createNavigationDot(index));
        });
        carousel.appendChild(navigationContainer);
        this.navigation = navigationContainer; 
      }
    }
  
    createNavigationDot(index) {
      const { currentSlide } = this.state;
      const navigationDot = document.createElement('div');
      navigationDot.classList.add('C-navigation__dot');
      navigationDot.classList.add('but');
      navigationDot.setAttribute('data-slideIndex', index);
      navigationDot.style.visibility = "hidden"
      navigationDot.addEventListener('click', () => {
        this.goTo(index);
      });
  
      return navigationDot;
    }

    createMousewheel()
    {
        
      $(window).bind('mousewheel', function(event) {
        console.log(registeredCarousels)
        const { slides } = registeredCarousels[0]["carousel"];
        const {currentSlide} = registeredCarousels[0]["carousel"].state
        const numberOfSLides = slides.length;
        const lastSlideIndex = numberOfSLides - 1;
        if (event.originalEvent.wheelDelta >= 0) {
          const slideToGo = currentSlide - 1;
          if (slideToGo < 0) {
            
            if(!!registeredCarousels[0]["carousel"].settings.infinite) {
         
              return registeredCarousels[0]["carousel"].goTo(lastSlideIndex);
            }
            return;
          } else {
            registeredCarousels[0]["carousel"].goTo(slideToGo);
          }
        
        }
        else {
          const slideToGo = currentSlide + 1;
          if (slideToGo > lastSlideIndex) {
            if(!!registeredCarousels[0]["carousel"].settings.infinite) {
              return registeredCarousels[0]["carousel"].goTo(0);
            }
            return;
          } else {
            registeredCarousels[0]["carousel"].goTo(slideToGo);
          }
        }
        });

        $(window).on('touchmove', function() {
          $(document).trigger('mousewheel');
        });

    }
  
    createNavigationButtons() {
      const createNavigationButton = (buttonType) => {
        console.log(this)
        const { carousel } = this;
        const navigationButton = document.createElement('button');
        navigationButton.setAttribute('type', 'button');
        navigationButton.classList.add('C-carousel-navigation-button');
        navigationButton.classList.add('but');

        navigationButton.style.visibility = "hidden"
        navigationButton.classList.add(`C-carousel-navigation-button--${buttonType}`);
    
        navigationButton.addEventListener('click', () => {
          const { slides } = this;
          const { currentSlide } = this.state;
          const numberOfSLides = slides.length;
          const lastSlideIndex = numberOfSLides - 1;
         
          
          if (buttonType === 'next') {
       
            const slideToGo = currentSlide + 1;
            if (slideToGo > lastSlideIndex) {
              if(!!this.settings.infinite) {
                return this.goTo(0);
              }
              return;
            } else {
              this.goTo(slideToGo);
            }
            
          } else {
         
            const slideToGo = currentSlide - 1;
            if (slideToGo < 0) {
              if(!!this.settings.infinite) {
                return this.goTo(lastSlideIndex);
              }
              return;
            } else {
              this.goTo(slideToGo);
            }
          }
        });

 
        if(buttonType == "next")
        {
            navigationButton.id = "next"
            navigationButton.addEventListener("click",comprobarboton);
            navigationButton.style.right = "50%"
            const downarrowkey = document.createElement('i');
            downarrowkey.classList.add("fa-solid")
            downarrowkey.classList.add("fa-angles-down")
            downarrowkey.classList.add("shake-vertical")

            navigationButton.appendChild(downarrowkey)
        }else
        {
            navigationButton.id = "prev"
            navigationButton.addEventListener("click",comprobarboton);
            navigationButton.style.right = "50%"
            navigationButton.style.top = "1%"
            navigationButton.style.bottom = "94%"
            const downarrowkey = document.createElement('i');
            downarrowkey.classList.add("fa-solid")
            downarrowkey.classList.add("fa-angles-up")
            downarrowkey.classList.add("shake-vertical")

            navigationButton.appendChild(downarrowkey)
        }
        carousel.appendChild(navigationButton);
        this.navigationButtons.push(navigationButton);
      }
      
      if (this.navigationButtons.length <= 0) {
        createNavigationButton('next');
        createNavigationButton('prev');
      } 

    
    }
  
    updateNavigation() {
      const {
        navigation,
      } = this;
  
      const {
        currentSlide,
      } = this.state;
  
      const navigationDots = navigation.querySelectorAll('.C-navigation__dot');
      navigationDots.forEach(dot => {
        const dotIndex = parseInt(dot.getAttribute('data-slideIndex'), 10);
        if (dotIndex === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
  
    updateSlides() {
      const {
        slides,
      } = this;
  
      const {
        currentSlide,
      } = this.state;
  
      slides.forEach((slide, index) => {
        if (index === currentSlide) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });
    }
  
    goTo = (index) => {
      this.setState({
        currentSlide: index,
      }, () => {
 
   
        if(document.getElementById("slide"+eval(this.state.currentSlide+1)) == "slide2")
        {
          document.getElementsByClassName("C-carousel-navigation-button").style.color = black
        }else
        {
          document.getElementsByClassName("C-carousel-navigation-button").style.color = white
        };
        //console.log('Current slide is now: ', this.state.currentSlide);
      });
    }
  
    updateCarousel() {
      this.updateTrackPosition();
      this.updateNavigation();
      this.updateSlides();
    }
  
  }
  
  const registeredCarousels = [];
  const carousels = document.querySelectorAll('.C-carousel');
  carousels.forEach((carousel, index) => {
    registeredCarousels.push({  
      id: `C-carousel-${index}`,
      carousel: new Carousel(carousel, {
        vertical: true,
      }),
    })
  });
  
  const changeCarouselDirectionButton = document.querySelector('.js-change-carousel-direction');
 


function setupTypewriter(t) 
{
    var HTML = t.innerHTML;

    t.innerHTML = "";

    var cursorPosition = 0,
        tag = "",
        writingTag = false,
        tagOpen = false,
        typeSpeed = 0.1,
      tempTypeSpeed = 0;

    var type = function() {
      
        if (writingTag === true) {
            tag += HTML[cursorPosition];
        }

        if (HTML[cursorPosition] === "<") {
            tempTypeSpeed = 0;
            if (tagOpen) {
                tagOpen = false;
                writingTag = true;
            } else {
                tag = "";
                tagOpen = true;
                writingTag = true;
                tag += HTML[cursorPosition];
            }
        }
        if (!writingTag && tagOpen) {
            tag.innerHTML += HTML[cursorPosition];
        }
        if (!writingTag && !tagOpen) {
            if (HTML[cursorPosition] === " ") {
                tempTypeSpeed = 0.001;
            }
            else {
                tempTypeSpeed = (Math.random() * 0.001); //+ varSpeedMouse;
            }
            t.innerHTML += HTML[cursorPosition];
        }
        if (writingTag === true && HTML[cursorPosition] === ">") {
            tempTypeSpeed = (Math.random() * 0.001) ;//+ varSpeedMouse;
            writingTag = false;
            if (tagOpen) {
                var newSpan = document.createElement("span");
                t.appendChild(newSpan);
                newSpan.innerHTML = tag;
                tag = newSpan.firstChild;
            }
        }

        cursorPosition += 1;
        if (cursorPosition < HTML.length - 1) {
            setTimeout(type, tempTypeSpeed);
        }
        if(cursorPosition == HTML.length-1)
        {
            

            for(var i = 0; i< document.getElementsByClassName("but").length ; i++)
            {
                document.getElementsByClassName("but")[i].style.visibility = "visible";
            }

            const d = new Date();
            
            localStorage.setItem("myday",d.getDate());
        }
     
    };

    return {
        type: type
        
    };
}

const d = new Date();

var typer = document.getElementById("typewriter");

day = localStorage.getItem("myday")

let days = d.getDate();

if(day == null)
{
    day = -1;        
}





if(day != days){

  typewriter = setupTypewriter(typer);

  typewriter.type();

    
}else
{
    for(var i = 0; i< document.getElementsByClassName("but").length ; i++)
    {
        document.getElementsByClassName("but")[i].style.visibility = "visible";
    }
}

$('body').on('mousedown mouseup', function mouseState(e) {
  if (e.type == "mousedown") {
      //code triggers on hold
      varSpeedMouse = 0;
  }else
  {
      varSpeedMouse = 3;
  }
});

$('body').on('keyup keydown',function(e)
{

  if (e.type == "keydown" &&
  e.code == "Space"     
) {
   varSpeedMouse = 0;
   console.log(e.type)
}else
{
  varSpeedMouse = 3;
}
});


function comprobarboton()
{
    if(document.getElementById("slide2").className.includes("active") )
    {
        //document.getElementById("next").style.borderColor = "black";
        document.getElementById("next").style.color = "black";
        //document.getElementById("prev").style.borderColor = "black";
        document.getElementById("prev").style.color = "black";


    }else
    {
        //document.getElementById("next").style.borderColor = "white";
        document.getElementById("next").style.color = "white";
        //document.getElementById("prev").style.borderColor = "white";
        document.getElementById("prev").style.color = "white";
    }
}

$('.owl-carousel').owlCarousel({
    margin:10,
    stagePadding:50,
    center:true,
    autoWidth:true,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        700:{
            items:1,
            nav:false
        },
        1000:{
            items:2,
            nav:true,
            loop:true
        }
    }
})



   


