window.MathJax = {
    tex: {
      inlineMath: [['\\(', '\\)']],
      displayMath: [["\\[", "\\]"]],
      processEscapes: true,
      processEnvironments: true
    },
    options: {
      ignoreHtmlClass: ".*|",
      processHtmlClass: "arithmatex",
      renderActions: {
        /* add a new named action not to override the original 'find' action */
        find_script_mathtex: [10, function (doc) {
          for (const node of document.querySelectorAll('script[type^="math/tex"]')) {
            const display = !!node.type.match(/; *mode=display/);
            const math = new doc.options.MathItem(node.textContent, doc.inputJax[0], display);
            const text = document.createTextNode('');
            node.parentNode.replaceChild(text, node);
            math.start = {node: text, delim: '', n: 0};
            math.end = {node: text, delim: '', n: 0};
            doc.math.push(math);
          }
        }, '']
      }
    }
  };
  
  document$.subscribe(() => { 
    MathJax.typesetPromise()
  })