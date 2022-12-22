import { ColorPalette } from "./types/types";


getColors();

async function getColors() {
  try {
    const res = await fetch('/getAll');
    const json = (await res.json()) as ColorPalette[];

    if (json && json.length > 0) {
      const items: HTMLDivElement[] = json.map(item => {

        const copyColors: string = `${item.color1}\n${item.color2}\n${item.color3}\n${item.color4}`

        const colorContainer = document.createElement('div');
        colorContainer.classList.add('colorContainer');

        const div1 = document.createElement('div');
        div1.classList.add('color');
        div1.textContent = item.color1;
        div1.style.backgroundColor = item.color1;

        const div2 = document.createElement('div');
        div2.classList.add('color');
        div2.textContent = item.color2;
        div2.style.backgroundColor = item.color2;

        const div3 = document.createElement('div');
        div3.classList.add('color');
        div3.textContent = item.color3;
        div3.style.backgroundColor = item.color3;

        const div4 = document.createElement('div');
        div4.classList.add('color');
        div4.textContent = item.color4;
        div4.style.backgroundColor = item.color4;



        const title = document.createElement('h3');
        title.classList.add('title');
        title.textContent = item.title

        const copy = document.createElement('img')
        copy.src = 'assets/copy-paste-icon.png';
        copy.title = 'Copy colors to clipboard'
        copy.addEventListener('click', () => {
          copyToClipboard(copyColors, item.title)
        });


        const titleContainer = document.createElement('div');
        titleContainer.classList.add('containerTitle');
        titleContainer.append(title, copy)

        const container = document.createElement('div');
        colorContainer.append(div1, div2, div3, div4);
        container.append(titleContainer, colorContainer);

        return container;
      });

      document.querySelector('#items')?.append(...items)
    }
  } catch (error) {

  }
}

const copyToClipboard = (text: string, title: string) => {
  navigator.clipboard.writeText(text).then(() => {
    alert('Colors ' + title + ' was copied to clipboard')
  }, (err) => {
    console.error('Failed to copy text: ', err);
  });
}
