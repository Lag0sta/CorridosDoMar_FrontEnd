export function replaceNewLinesWithSpan(text) {
  console.log("textSplit :", text.split('\n'))
  return text.split('\n').map((sentence, index) => (
    `<span key=${index}>${sentence}</span>`
 
    
  ));
}