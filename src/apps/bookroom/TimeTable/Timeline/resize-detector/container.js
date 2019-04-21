import elementResizeDetectorMaker from 'element-resize-detector'

function addListener(component) {
  component._erd = elementResizeDetectorMaker({
    strategy: 'scroll'
  })

  component._erdWidth = component.container.offsetWidth

  component._erd.listenTo(component.container, element => {
    var width = element.offsetWidth
    if (width !== 0) {
      if (component._erdWidth !== width) {
        component.resize(component.props)
        component._erdWidth = width
      }
    } else {
      component._erdWidth = 0;
    }
  })
}

function removeListener(component) {
  component._erd.removeAllListeners(component.container)
}

export default { addListener, removeListener }
