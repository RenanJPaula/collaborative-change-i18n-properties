(function (Stickyfill) {
  'use strict'

  setTimeout(() => {
    const stickyElements = document.getElementsByClassName('sticky')

    for (var i = stickyElements.length - 1; i >= 0; i--) {
      Stickyfill.add(stickyElements[i])
    }
  }, 1000)
})(window.Stickyfill)
