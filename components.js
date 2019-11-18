import { ref, reactive, onMounted } from "./vue.js";

export const Editable = {
  template:
    '<div contenteditable="true" @input="update" ref="editable">{{ content }}</div>',
  props: ["content"],
  setup(_, { emit }) {
    return {
      update: event => emit("update", event.target.innerText)
    };
  }
};

import "https://cdn.jsdelivr.net/npm/vue-draggable-resizable@2.0.1/dist/VueDraggableResizable.umd.js";
export const VueDraggableResizable = {
  props: ["width", "height"],
  components: { VueDraggableResizable: window.VueDraggableResizable },
  template: `<vue-draggable-resizable
  ref="element"
  :style="{  
    width:elem.width +'%', height: elem.height +'%', 
    left: elem.x+'%', 
    top: elem.y+'%', 
    'font-size': (parentWidth / 500) + 'em' 
  }"
  @resizing="(left, top, width,height) => onResizing(  width,height )"
  @dragging="( left, top) => onDragging(  left, top)"
  :parent="true"
  ><slot></slot></vue-draggable-resizable>`,
  setup(props) {
    const elem = reactive({
      x: 0,
      y: 0,
      height: props.height,
      width: props.width
    });
    const onDragging = (left, top) => {
      const parent = element.value.$el.parentNode;
      let x = (left / parent.offsetWidth) * 100;
      let y = (top / parent.offsetHeight) * 100;

      elem.x = x;
      elem.y = y;
    };
    const onResizing = (width, height) => {
      const parent = element.value.$el.parentNode;
      let w = (width / parent.offsetWidth) * 100;
      let h = (height / parent.offsetHeight) * 100;

      elem.width = w;
      elem.height = h;
    };

    const parentWidth = ref(null);
    const setParentWidth = () => {
      const parent = element.value.$el.parentNode;
      parentWidth.value = parent.offsetWidth;
    };
    window.addEventListener("resize", setParentWidth);
    onMounted(setParentWidth);
    const element = ref(null);
    return {
      elem,
      element,
      parentWidth,
      onDragging,
      onResizing
    };
    // return () =>
    //   h(
    //     window.VueDraggableResizable,
    //     {
    //       ref: parent, // Don't work
    //       props: { parent: false },
    //       style: {
    //         width: elem.width + "%",
    //         height: elem.height + "%",
    //         left: elem.x + "%",
    //         top: elem.y + "%",
    //         "font-size": parentWidth.value / 1000 + "em"
    //       },
    //       on: {
    //         dragging: (left, top) => onDragging(left, top),
    //         resizing: (left, top, width, height) => onResizing(width, height)
    //       }
    //     },
    //     slots.default()
    //   );
  }
};
