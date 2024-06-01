import Timeout from "./Timeout.js";

export default class Slide {
  container: Element;
  slides: Element[];
  controls: Element;
  time: number;
  index: number;
  slide: Element
  timeout: Timeout | null

  constructor(container: Element, slides: Element[], controls: Element, time: number = 5000) {
    this.container = container;
    this.slides = slides;
    this.controls = controls;
    this.time = time;
    this.index = 0;
    this.slide = this.slides[this.index]
    this.initSlide() //Assim que cria o newSlide esta função é ativada
    this.timeout = null
  }

  hideSlide(element: Element) {
    element.classList.remove('active')
  }

  showSlide(index: number) {
    this.index = index;
    this.slide = this.slides[this.index]
    this.slides.forEach(item => this.hideSlide(item));
    this.slide.classList.add("active");
    this.autoSlide(this.time)
  }

  autoSlide(time: number) {
    this.timeout?.clear()
    this.timeout = new Timeout(() => this.nextSlide(), time)
  }

  prevSlide() {
    const prev = this.index > 0 ? this.index - 1 : this.slides.length - 1 //this.slides.length usado para ser o index do último slide
    this.showSlide(prev)
  }

  nextSlide() {
    const next = this.index + 1 < this.slides.length ? this.index + 1 : 0
    this.showSlide(next)
  }

  private addControls() {
    const prevButton = document.createElement("button")
    const nextButton = document.createElement("button")
    prevButton.innerText = "Slide Anterior"
    nextButton.innerText = "Próximo Slide"
    this.controls.appendChild(prevButton)
    this.controls.appendChild(nextButton)
    prevButton.addEventListener("pointerup", () => this.prevSlide())
    nextButton.addEventListener("pointerup", () => this.nextSlide())
  }

  private initSlide() {
    this.showSlide(this.index); // Inicializa com o slide 2
    this.addControls()
  }
}
