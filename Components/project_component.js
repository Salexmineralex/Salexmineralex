class Slider {
  constructor(props) {
    this.state = {
      data: null,
    };
    this.props = props;
  }

  init() {
    this.fetchData();
    this.render();
  }

  fetchData() {
    const self = this;
    fetch('../data.json')
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        console.log(json)
        const projects = Object.values(json);
        const projectData = projects.find((project) => project.Name === self.props.project);
        self.setState({ data: projectData },
        );
      });
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  render() {
    if (!this.state.data) {
      return;
    }

    const el = document.getElementById('slider');
    const slides = [];

    for (let i = 0; i < this.state.data.PhotoRoute.length; i++) {
      const photo = this.state.data.PhotoRoute[i];
      const slideVisibleClass = i === 0 ? " slide-visible" : "";
      const slide = `
        <li class="${slideVisibleClass}" style="max-height:100vh">
          <div class="card rounded-0 h-100">
            <div class="row g-0 h-100">
              <div class="col-md-6 col-xl-5 d-flex align-items-center p-2 p-md-3 p-xl-5">
                <div class="card-body p-1 p-md-3 p-xl-5">
                  <p class="lead"></p>
                  <h2 class="card-title" style="color: #DF1E1E">${this.state.data.Name}</h2>
                  <p class="card-text mt-3">${this.state.data.PhotoText[i]}</p>
                  <p class="card-text"></p>
                </div>
              </div>
              <div class="col-md-6 col-xl-7" style="max-width:90vh;max-height:100vh; text-align: center; ">
                <img src="${photo}" class="card-img d-none d-md-block${slideVisibleClass}" loading="lazy" style="height: 100vh;  object-fit: fit;" alt="...">
                <img src="${photo}" class="card-img d-none d-md-none${slideVisibleClass}" loading="lazy" style="width: 100vw; object-fit: fit;" alt="...">
              </div>
            </div>
          </div>
        </li>
      `;
      slides.push(slide);
    }

    const slider = `
      <div class="swiffy-slider slider-nav-round slider-nav-animation slider-nav-animation-fadein">
        <ul class="slider-container">
          ${slides.join('')}
        </ul>
        <button type="button" class="slider-nav" aria-label="Go left"></button>
        <button type="button" class="slider-nav slider-nav-next" aria-label="Go Right"></button>
        <div class="slider-indicators">
          <button class="" aria-label="Go to slide"></button>
          <button aria-label="Go to slide" class="active"></button>
          <button aria-label="Go to slide"></button>
        </div>
      </div>
    `;

    el.innerHTML = slider;
  }
}
var ProjectName = parent.document.URL.substring(parent.document.URL.indexOf('=')+1, parent.document.URL.length);
const slider = new Slider({ project: ProjectName });
slider.init();
