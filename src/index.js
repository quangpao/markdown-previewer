import React from 'react';
import ReactDOM from 'react-dom/client';

import 'highlight.js/styles/default.css'
//import boostrap from node_modules
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { marked } from 'marked';
import parse from 'html-react-parser'

const defaultText = [
  '# Welcome to my React Markdown Previewer!',
  '## This is a sub-heading...',
  '### And here\'s some other cool stuff:',
  'Heres some code, `<div></div>`, between 2 backticks.',
  '```javascript',
  '// this is multi-line code:',
  'function anotherExample(firstLine, lastLine) {',
  '  if (firstLine == \'```\' && lastLine == \'```\') {',
  '    return multiLineCode;',
  '  }',
  '}',
  '```',
  'You can also make text **bold**... whoa!',
  'Or _italic_.',
  'Or... wait for it... **_both!_**',
  'And feel free to go crazy ~~crossing stuff out~~.',
  'There\'s also [links](https://www.freecodecamp.org), and',
  '> Block Quotes!',
  'And if you want to get really crazy, even tables:',
  'Wild Header | Crazy Header | Another Header?',
  '------------ | ------------- | -------------',
  'Your content can | be here, and it | can be here....',
  'And here. | Okay. | I think we get it.',
  '- And of course there are lists.',
  '  - Some are bulleted.',
  '     - With different indentation levels.',
  '        - That look like this.',
  '1. And there are numbered lists too.',
  '1. Use just 1s if you want!',
  '1. And last but not least, let\'s not forget embedded images:',
  '![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)'
]



class MarkdownPreviewer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      textArea: defaultText
    }

    this.onChangeHandle = this.onChangeHandle.bind(this)

  }

  onChangeHandle = (e) => {
    const value = e.target.value.split('\n')
    console.log('Value: ', value)
    this.setState({ textArea: value })
  }

  render() {

    
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function(code, lang) {
        const hljs = require('highlight.js')
        const language = hljs.getLanguage(lang) ? lang : 'javascript';
        return hljs.highlight(code, { language }).value
      }, 
      langPrefix: 'hljs language-',
      breaks: true,
    })

    console.log(this.state.textArea)
    const fullText = this.state.textArea.join('\n')
    return (
      <div>
        <div id='textWrap'>
          <textarea id='editor' defaultValue={fullText} onChange={this.onChangeHandle}/>
        </div>
        <div id='resultWrap'>
          <div id='preview'>
            {parse(marked.parse(fullText))}
          </div>
        </div>
      </div>
    )
  }

}




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MarkdownPreviewer />
  </React.StrictMode>
);
reportWebVitals();
