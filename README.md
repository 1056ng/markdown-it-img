# markdown-it-img
`<img>` tag plugin for [markdown-it](https://github.com/markdown-it/markdown-it)

## HOW TO USE

```
const markdown = require('markdown-it')();
const markdownItImg = require('markdown-it-img');

markdown.use(markdownItImg((attr, value, env) => {
  if (attr === 'src') {
    return value.replace('./', `${env.baseUrl}/`);
  }
}));
```

## License

[MIT](https://github.com/1056ng/markdown-it-img/blob/master/LICENSE)
