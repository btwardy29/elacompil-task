import interact from 'interactjs'


const position = { x: 0, y: 0 }

interact('.modal')
  .resizable({
    // resize from all edges and corners
    edges: { left: true, right: true, bottom: true, top: true },

    listeners: {
      move (event) {
        var target = event.target
        var x = position.x || 0
        var y = position.y || 0

        // update the element's style
        target.style.width = event.rect.width + 'px'
        target.style.height = event.rect.height + 'px'

        // translate when resizing from top or left edges
        x += event.deltaRect.left
        y += event.deltaRect.top

        target.style.transform = 'translate(' + x + 'px,' + y + 'px)'

        target.setAttribute('data-x', x)
        target.setAttribute('data-y', y)
      }
    },
    modifiers: [
      // keep the edges inside the parent

      // minimum size
      interact.modifiers.restrictSize({
        min: { width: 350, height: 200 },
        max: { width: 750, height: 400 }
      })
    ],

    inertia: true
  })
  .draggable({
    listeners: {
      start (event) {
        console.log(position.y)
      },
      move (event) {
        position.x += event.dx
        position.y += event.dy
  
        event.target.style.transform =
          `translate(${position.x}px, ${position.y}px)`
      },
    }
  })
