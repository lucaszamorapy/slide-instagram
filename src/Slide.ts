import Timeout from "./Timeout.js";

export default class Slide {
  container: Element;
  slides: Element[];
  controls: Element;
  time: number;
  index: number;
  slide: Element
  timeout: Timeout | null
  pausedTimeout: Timeout | null
  paused: boolean

  constructor(container: Element, slides: Element[], controls: Element, time: number = 5000) {
    this.container = container;
    this.slides = slides;
    this.controls = controls;
    this.time = time;
    this.index = localStorage.getItem("activeSlide") ? Number(localStorage.getItem("activeSlide")) : 0;
    this.slide = this.slides[this.index]
    this.initSlide() //Assim que cria o newSlide esta função é ativada
    this.timeout = null
    this.pausedTimeout = null
    this.paused = false
  }

  hideSlide(element: Element) {
    element.classList.remove('active')
    if (element instanceof HTMLVideoElement) {
      element.currentTime = 0
      element.pause()
    }
  }

  showSlide(index: number) {
    this.index = index;
    this.slide = this.slides[this.index]
    localStorage.setItem("activeSlide", String(this.index))
    this.slides.forEach(item => this.hideSlide(item));
    this.slide.classList.add("active");
    if (this.slide instanceof HTMLVideoElement) {
      this.autoVideo(this.slide)
    } else {
      this.autoSlide(this.time)
    }
  }

  autoVideo(video: HTMLVideoElement) {
    video.muted = true;
    video.play();
    let firstPlay = true;
    video.addEventListener('playing', () => {
      if (firstPlay) this.autoSlide(video.duration * 1000);
      firstPlay = false;
    })
  }

  autoSlide(time: number) {
    this.timeout?.clear()
    this.timeout = new Timeout(() => this.nextSlide(), time)
  }

  prevSlide() {
    if (this.paused) return
    const prev = this.index > 0 ? this.index - 1 : this.slides.length - 1 //this.slides.length usado para ser o index do último slide
    this.showSlide(prev)
  }

  nextSlide() {
    if (this.paused) return
    const next = this.index + 1 < this.slides.length ? this.index + 1 : 0
    this.showSlide(next)
  }

  pauseSlide() {
    this.pausedTimeout = new Timeout(() => {
      this.timeout?.pause()
      this.paused = true
      if (this.slide instanceof HTMLVideoElement) this.slide.pause()
    }, 300)
  }

  continueSlide() {
    this.pausedTimeout?.clear()
    if (this.paused) {
      this.paused = false
      this.timeout?.continue()
      if (this.slide instanceof HTMLVideoElement) this.slide.play()
    }
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
    this.controls.addEventListener("pointerdown", () => this.pauseSlide())
    this.controls.addEventListener("pointerup", () => this.continueSlide())
  }

  private initSlide() {
    this.showSlide(this.index); // Inicializa com o slide 2
    this.addControls()
  }
}
