export default class Slide {
  container: Element;
  slides: Element[];
  controls: Element;
  time: number;
  index: number;
  slide: Element

  constructor(container: Element, slides: Element[], controls: Element, time: number = 5000) {
    this.container = container;
    this.slides = slides;
    this.controls = controls;
    this.time = time;
    this.index = 0;
    this.slide = this.slides[this.index]
    this.showSlide(this.index); // Inicializa com o slide 2
  }
  hideSlide(element: Element) {
    element.classList.remove('active')
  }
  showSlide(index: number) {
    this.index = index;
    this.slide = this.slides[this.index]
    this.slides.forEach(item => this.hideSlide(item));
    this.slide.classList.add("active");
  }
}
