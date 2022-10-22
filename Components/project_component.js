'use strict';


  class Slider extends React.Component {

    componentDidMount() {
      if (typeof swiffyslider !== 'undefined') {
        // the variable is defined
        const script = document.createElement("script");
        script.src = 'https://cdn.jsdelivr.net/npm/swiffy-slider@1.6.0/dist/js/swiffy-slider.min.js';
        script.async = true;
        console.log("AS")
        document.body.appendChild(script);
    }
 
    }
    

    render() {



      fetch('../data.json')
      .then((response) => response.json()
      .then((json) =>  crearSliders(json)


      ));

      function crearSliders(data)
      {
      
        var map = new Map(Object.entries(data));

 
        map.forEach((value, key, map) => {
          // Prints "greeting Hello" followed by "name John"
      
          console.log(value);
        });
      }
    
  
      
  
      return (

      <div className="swiffy-slider slider-nav-round slider-nav-animation slider-nav-animation-fadein slider-item-first-visible">
        <ul className="slider-container">
          <li className="slide-visible">
            <div className="card rounded-0 h-100">
              <div className="row g-0 h-100">
                <div className="col-md-6 col-xl-5 d-flex align-items-center p-2 p-md-3 p-xl-5">
                  <div className="card-body p-1 p-md-3 p-xl-5">
                    <h2 className="card-title" style={{color: '#DF1E1E'}}>Swiffy Slider Benefits</h2>
                    <p className="card-text mt-3">Super fast lightweight slider and carousel with amazing touch support and user experience.</p>
                    <p>Super simple setup using just markup and few powerful configuration options</p>
                  </div>
                </div>
                <div className="col-md-6 col-xl-7">
                  <img src="../sqliteimages/sqlite1.png" className="card-img d-none d-md-block" loading="lazy" alt="..." />
                  <img src="../sqliteimages/sqlite2.png" className="card-img d-block d-md-none" loading="lazy" alt="..." />
                </div>
              </div>
            </div>
          </li>
          <li>
            <div className="card rounded-0 h-100">
              <div className="row g-0 h-100">
                <div className="col-md-6 col-xl-7">
                  <img src="../sqliteimages/sqlite1.png" className="card-img d-none d-md-block" loading="lazy" alt="..." />
                  <img src="../sqliteimages/sqlite1.png" className="card-img d-block d-md-none" loading="lazy" alt="..." />
                </div>
                <div className="col-md-6 col-xl-5 d-flex align-items-center p-2 p-md-3 p-xl-5">
                  <div className="card-body p-1 p-md-3 p-xl-5">
                    <p className="lead">Dreaming about cars</p>
                    <h2 className="card-title" style={{color: '#DF1E1E'}}>Vintage cars from another era</h2>
                    <p className="card-text mt-3">First, there’s the design of the car itself. Classic cars were created very much in an analogue world where designers used pencil and paper to create elegant shapes and flowing lines that would just not be possible
                      on the computer-based design software used by modern car designers.</p>
                    <p className="card-text"><small className="text-muted">Handcrafted like good code</small></p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <button type="button" className="slider-nav" aria-label="Go left" />
        <button type="button" className="slider-nav slider-nav-next" aria-label="Go left" />
        <div className="slider-indicators">
          <button className="active" aria-label="Go to slide" />
          <button aria-label="Go to slide" />
          <button aria-label="Go to slide" />
          
        </div>
        <h1>{this.props.project}</h1>
      </div>
      
    );
  }

}

const el = document.getElementById("sliderspes")
const propname = el.getAttribute("project")
console.log(propname)
ReactDOM.render(<Slider project={propname} />, document.getElementById('sliderspes'));


