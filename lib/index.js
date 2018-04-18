const parser = require('html-attribute-parser');
const tag = require('html-tag');

module.exports = (callback) => {
  return (markdown) => {
    markdown.core.ruler.after('inline', 'replace-src-link', ({ tokens, env }) => {
      for (let token of tokens) {

        // markdown img tag
        if (token.type === 'inline' && token.children.length) {
          for (let child of token.children) {
            if (child.tag === 'img') {
              for (let attr of child.attrs) {
                const value = callback(attr[0], attr[1], env);
                if (value !== null && value !== undefined) {
                  attr[1] = value;
                }
              }
            }
          }

        // direct img tag
        } else if (token.type === 'html_block' && /^<img/.test(token.content)) {
          const element = parser(token.content);

          for (let attr in element.attributes) {
            const value = callback(attr, element.attributes[attr], env);
            if (value !== null && value !== undefined) {
              element.attributes[attr] = value;
            }
          }

          token.content = tag(element.tagName, element.attributes);
        }
      }
    });
  }
}
