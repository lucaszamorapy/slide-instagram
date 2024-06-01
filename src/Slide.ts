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
    this.initSlide()

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

  prevSlide() {
    const prev = this.index > 0 ? this.index - 1 : this.slides.length - 1
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
