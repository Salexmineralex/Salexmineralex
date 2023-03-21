'use strict';

class Slider extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }
  componentDidMount() {
  
  
    fetch('../data.json')
    .then((response) => response.json())
    .then((json) => {
      const projects = Object.values(json);
      const projectData = projects.find((project) => project.Name === this.props.project);
      this.setState({data: projectData})
    });
  }

  

  crearSliders(data) {
   
    if (!data) {
      return null; // or some other fallback option
    }
    const photos = data.PhotoRoute;
   
    const slides = [];

  
    if (photos && photos.length > 0) {
      photos.forEach((photo, index) => {
        console.log(photo)
        const slide = (
          <li key={index}>
            <img
              src={photo}
              className={`card-img d-none d-md-block${index === 0 ? " slide-visible" : ""}`}
              loading="lazy"
              alt="..."
            />
          </li>
        );
        slides.push(slide);
       
      });

    }

 
    return (
      <div className="swiffy-slider slider-nav-round slider-nav-animation slider-nav-animation-fadein">
          <ul className="slider-container">
          {this.state.data.PhotoRoute.map((photo, index) => 
            <li className="" key={index}>
              <div className="card rounded-0 h-100" >
                  <div className="row g-0 h-100">
                      <div className="col-md-6 col-xl-5 d-flex align-items-center p-2 p-md-3 p-xl-5">
                          <div className="card-body p-1 p-md-3 p-xl-5">
                              <p className="lead"></p>
                              <h2 className="card-title" style={{ color: '#DF1E1E' }} >{this.state.data.Name}</h2>
                              <p className="card-text mt-3">Super fast lightweight slider and carousel with amazing touch support and user experience.</p>
                              <p>Super simple setup using just markup and few powerful configuration options</p>
                              <p className="card-text"><small className="text-muted">Remember to check out on mobile</small></p>
                          </div>
                      </div>
                      <div className="col-md-6 col-xl-7">
                          <img  src={photo} className={`card-img d-none d-md-block${index === 0 ? " slide-visible" : ""}`} loading="lazy" style={{ height: '100vh',objectFit:'scale-down'}} alt="..."/>
                          <img  src={photo} className={`card-img d-none d-md-none${index === 0 ? " slide-visible" : ""}`} loading="lazy" style={{ width: '100%',objectFit:'scale-down'}} alt="..."/>
                      </div>
                  </div>
              </div>
          </li>)}
        </ul>
        <button type="button" className="slider-nav" aria-label="Go left"></button>
                <button type="button" className="slider-nav slider-nav-next" aria-label="Go Right"></button>

        <div className="slider-indicators">
          <button className="" aria-label="Go to slide"></button>
          <button aria-label="Go to slide" className="active"></button>
          <button aria-label="Go to slide"></button>
    </div>
      </div>);
  }

      /*{ <div className="swiffy-slider slider-nav-round slider-nav-animation slider-nav-animation-fadein slider-item-first-visible">
         <ul className="slider-container"> {this.state.data.PhotoRoute.map((photo, index) => 
          <li key={index}>
            <img
              src={photo}
              className={`card-img d-none d-md-block${index === 0 ? " slide-visible" : ""}`}
              loading="lazy"
              alt="..."
            />
          </li>)}
         </ul>
        <button type="button" className="slider-nav" aria-label="Go left" />
        <button type="button" className="slider-nav slider-nav-next" aria-label="Go left" />
        <div className="slider-indicators">
          <button className="active" aria-label="Go to slide" />
          <button aria-label="Go to slide" />
          <button aria-label="Go to slide" />
        </div>
        <div className="card-body p-1 p-md-3 p-xl-5">
          <h2 className="card-title" style={{ color: "#DF1E1E" }}>
            {this.state.data.Name}
          </h2>
          <p className="card-text mt-3">{this.state.data.Description}</p>
          <p className="card-text">
            <small className="text-muted">{this.state.data.Lenguaje}</small>
          </p>
        </div>
      </div> */

  render() {

    if(!this.state.data) return <div>Loading slides, please wait .....</div>
    return (
      <div>
        {this.crearSliders(this.props.project)}
      </div>
    );
  }
}

const el = document.getElementById("sliderspes");
const propname = el.getAttribute("project");
ReactDOM.render(<Slider project={propname} />, document.getElementById('sliderspes'));