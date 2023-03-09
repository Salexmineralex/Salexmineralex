'use strict';

class Slider extends React.Component {
  componentDidMount() {
    if (typeof swiffyslider !== 'undefined') {
      // the variable is defined
      const script = document.createElement("script");
      script.src = 'https://cdn.jsdelivr.net/npm/swiffy-slider@1.6.0/dist/js/swiffy-slider.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
  
    fetch('../data.json')
    .then((response) => response.json())
    .then((json) => {
      const projects = Object.values(json);

      const projectData = projects.find((project) => project.Name === this.props.project);
  
      this.crearSliders(projectData);
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
      <div className="swiffy-slider slider-nav-round slider-nav-animation slider-nav-animation-fadein slider-item-first-visible">
        <ul className="slider-container">{slides}</ul>
        <button type="button" className="slider-nav" aria-label="Go left" />
        <button type="button" className="slider-nav slider-nav-next" aria-label="Go left" />
        <div className="slider-indicators">
          <button className="active" aria-label="Go to slide" />
          <button aria-label="Go to slide" />
          <button aria-label="Go to slide" />
        </div>
        <div className="card-body p-1 p-md-3 p-xl-5">
          <h2 className="card-title" style={{ color: "#DF1E1E" }}>
            {data.Name}
          </h2>
          <p className="card-text mt-3">{data.Description}</p>
          <p className="card-text">
            <small className="text-muted">{data.Lenguaje}</small>
          </p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.crearSliders(this.props.data)}
      </div>
    );
  }
}

const el = document.getElementById("sliderspes");
const propname = el.getAttribute("project");
ReactDOM.render(<Slider project={propname} />, document.getElementById('sliderspes'));