import './style.css';
import Slide from './Slide.js';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1>Slide Instagram</h1>
  <div id="slide">
    <div id="slide-elements">
      <img src="./assets/imagem_1.jpg" alt="Lobo">
      <img src="./assets/imagem_2.jpg" alt="Lobo">
      <img src="./assets/imagem_3.jpg" alt="Lobo">
      <video playsinline src="./assets/video.mp4"></video>
    </div>
    <div id="slide-controls"></div>
  </div>
`;

const container = document.getElementById('slide');
const slides = document.getElementById('slide-elements');
const controls = document.getElementById('slide-controls');

if (container && slides && controls && slides.children.length) {
  const slide = new Slide(container, Array.from(slides.children), controls, 3000);
  slide.showSlide(0)
}

