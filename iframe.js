Vue.component('i-frame', {

  render(h) {
    return  h('iframe', {
    	on: { load: this.renderChildren }
    })
  },
  beforeUpdate() {
    //freezing to prevent unnessessary Reactifiation of vNodes
    this.iApp.children = Object.freeze(this.$slots.default)
  },  
  methods: {
    renderChildren() {
      const children = this.$slots.default
      const body = this.$el.contentDocument.body      
      const el = document.createElement('DIV') // we will mount or nested app to this element
      body.appendChild(el)

      const iApp = new Vue({
      	name: 'iApp',
        //freezing to prevent unnessessary Reactifiation of vNodes
        data: { children: Object.freeze(children) }, 
        render(h) {
          return h('div', this.children)
        },
      })

      iApp.$mount(el) // mount into iframe

      this.iApp = iApp // cache instance for later updates


    }
  }
})

Vue.component('test-child', {
  template: `<div>
    <h3>{{ title }}</h3>
    <p>
      <slot/>
    </p>
  </div>`,
  props: ['title'],
  methods: {
    log:  _.debounce(function() {
      console.log('resize!')
    }, 200)
  },
  mounted() {
    this.$nextTick(() => {
    	const doc = this.$el.ownerDocument
      const win = doc.defaultView
      win.addEventListener('resize', this.log)
    })
  },
  beforeDestroy() {
  	const doc = this.$el.ownerDocument
    const win = doc.defaultView
    win.removeEventListener('resize', this.log)
  }
})

new Vue({
  el: '#app',
  data: {
    dynamicPart: 'InputContent',
    show: false,
  }
})
