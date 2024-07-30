import { NextApiRequest, NextApiResponse, GetServerSideProps } from 'next';
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

//change using likedDom 

export default async function fetchHandler (req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://www.scriptslug.com/scripts');
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const html = await response.text();

    const dom = new JSDOM(html);
    const doc = dom.window.document;
    const scriptElements = doc.querySelectorAll('a.script-list-item');
  
    const scripts = Array.from(scriptElements).map(element => {
    const el = element as HTMLAnchorElement;
      const titleElement = el.querySelector('.script-list-item__title') as HTMLElement | null;
      const title = titleElement?.textContent?.trim() || 'No title';
      const link = el.getAttribute('href') || '';
      return { title, link: `https://www.scriptslug.com${link}` };
    });
    

    console.log(scripts);
  } catch (error) {
    console.error('Error fetching scripts:', error);
  }
}


