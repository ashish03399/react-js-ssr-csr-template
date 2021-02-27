const template = ({ styles, seo, title, html, compiledFile = 'main.js' }) => {
  return `<!DOCTYPE html>
    <html lang="en">
     <head>
      <meta charset="utf-8" ${seo}>
      <style>${styles}</style>
     </head>
     <body>
       <div id="root">${html}</div>
       <script src="${compiledFile}"></script>
     </body>
    </html>
   `;
};
export default template;
