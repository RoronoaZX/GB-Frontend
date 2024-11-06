import { e as createComponent, a9 as useDarkProps, ab as useDark, g as computed, h, j as hSlot, k as getCurrentInstance } from "./index.9b9dbcba.js";
var QBanner = createComponent({
  name: "QBanner",
  props: {
    ...useDarkProps,
    inlineActions: Boolean,
    dense: Boolean,
    rounded: Boolean
  },
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const classes = computed(
      () => "q-banner row items-center" + (props.dense === true ? " q-banner--dense" : "") + (isDark.value === true ? " q-banner--dark q-dark" : "") + (props.rounded === true ? " rounded-borders" : "")
    );
    const actionClass = computed(
      () => `q-banner__actions row items-center justify-end col-${props.inlineActions === true ? "auto" : "all"}`
    );
    return () => {
      const child = [
        h("div", {
          class: "q-banner__avatar col-auto row items-center self-start"
        }, hSlot(slots.avatar)),
        h("div", {
          class: "q-banner__content col text-body2"
        }, hSlot(slots.default))
      ];
      const actions = hSlot(slots.action);
      actions !== void 0 && child.push(
        h("div", { class: actionClass.value }, actions)
      );
      return h("div", {
        class: classes.value + (props.inlineActions === false && actions !== void 0 ? " q-banner--top-padding" : ""),
        role: "alert"
      }, child);
    };
  }
});
export { QBanner as Q };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUUJhbm5lci5jMGUwZmI3My5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvY29tcG9uZW50cy9iYW5uZXIvUUJhbm5lci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoLCBjb21wdXRlZCwgZ2V0Q3VycmVudEluc3RhbmNlIH0gZnJvbSAndnVlJ1xuXG5pbXBvcnQgeyBjcmVhdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi91dGlscy9wcml2YXRlLmNyZWF0ZS9jcmVhdGUuanMnXG5pbXBvcnQgdXNlRGFyaywgeyB1c2VEYXJrUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb3NhYmxlcy9wcml2YXRlLnVzZS1kYXJrL3VzZS1kYXJrLmpzJ1xuXG5pbXBvcnQgeyBoU2xvdCB9IGZyb20gJy4uLy4uL3V0aWxzL3ByaXZhdGUucmVuZGVyL3JlbmRlci5qcydcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlQ29tcG9uZW50KHtcbiAgbmFtZTogJ1FCYW5uZXInLFxuXG4gIHByb3BzOiB7XG4gICAgLi4udXNlRGFya1Byb3BzLFxuXG4gICAgaW5saW5lQWN0aW9uczogQm9vbGVhbixcbiAgICBkZW5zZTogQm9vbGVhbixcbiAgICByb3VuZGVkOiBCb29sZWFuXG4gIH0sXG5cbiAgc2V0dXAgKHByb3BzLCB7IHNsb3RzIH0pIHtcbiAgICBjb25zdCB7IHByb3h5OiB7ICRxIH0gfSA9IGdldEN1cnJlbnRJbnN0YW5jZSgpXG4gICAgY29uc3QgaXNEYXJrID0gdXNlRGFyayhwcm9wcywgJHEpXG5cbiAgICBjb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWJhbm5lciByb3cgaXRlbXMtY2VudGVyJ1xuICAgICAgKyAocHJvcHMuZGVuc2UgPT09IHRydWUgPyAnIHEtYmFubmVyLS1kZW5zZScgOiAnJylcbiAgICAgICsgKGlzRGFyay52YWx1ZSA9PT0gdHJ1ZSA/ICcgcS1iYW5uZXItLWRhcmsgcS1kYXJrJyA6ICcnKVxuICAgICAgKyAocHJvcHMucm91bmRlZCA9PT0gdHJ1ZSA/ICcgcm91bmRlZC1ib3JkZXJzJyA6ICcnKVxuICAgIClcblxuICAgIGNvbnN0IGFjdGlvbkNsYXNzID0gY29tcHV0ZWQoKCkgPT5cbiAgICAgICdxLWJhbm5lcl9fYWN0aW9ucyByb3cgaXRlbXMtY2VudGVyIGp1c3RpZnktZW5kJ1xuICAgICAgKyBgIGNvbC0keyBwcm9wcy5pbmxpbmVBY3Rpb25zID09PSB0cnVlID8gJ2F1dG8nIDogJ2FsbCcgfWBcbiAgICApXG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY29uc3QgY2hpbGQgPSBbXG4gICAgICAgIGgoJ2RpdicsIHtcbiAgICAgICAgICBjbGFzczogJ3EtYmFubmVyX19hdmF0YXIgY29sLWF1dG8gcm93IGl0ZW1zLWNlbnRlciBzZWxmLXN0YXJ0J1xuICAgICAgICB9LCBoU2xvdChzbG90cy5hdmF0YXIpKSxcblxuICAgICAgICBoKCdkaXYnLCB7XG4gICAgICAgICAgY2xhc3M6ICdxLWJhbm5lcl9fY29udGVudCBjb2wgdGV4dC1ib2R5MidcbiAgICAgICAgfSwgaFNsb3Qoc2xvdHMuZGVmYXVsdCkpXG4gICAgICBdXG5cbiAgICAgIGNvbnN0IGFjdGlvbnMgPSBoU2xvdChzbG90cy5hY3Rpb24pXG4gICAgICBhY3Rpb25zICE9PSB2b2lkIDAgJiYgY2hpbGQucHVzaChcbiAgICAgICAgaCgnZGl2JywgeyBjbGFzczogYWN0aW9uQ2xhc3MudmFsdWUgfSwgYWN0aW9ucylcbiAgICAgIClcblxuICAgICAgcmV0dXJuIGgoJ2RpdicsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMudmFsdWVcbiAgICAgICAgICArIChwcm9wcy5pbmxpbmVBY3Rpb25zID09PSBmYWxzZSAmJiBhY3Rpb25zICE9PSB2b2lkIDAgPyAnIHEtYmFubmVyLS10b3AtcGFkZGluZycgOiAnJyksXG4gICAgICAgIHJvbGU6ICdhbGVydCdcbiAgICAgIH0sIGNoaWxkKVxuICAgIH1cbiAgfVxufSlcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBT0EsSUFBQSxVQUFlLGdCQUFnQjtBQUFBLEVBQzdCLE1BQU07QUFBQSxFQUVOLE9BQU87QUFBQSxJQUNMLEdBQUc7QUFBQSxJQUVILGVBQWU7QUFBQSxJQUNmLE9BQU87QUFBQSxJQUNQLFNBQVM7QUFBQSxFQUNWO0FBQUEsRUFFRCxNQUFPLE9BQU8sRUFBRSxTQUFTO0FBQ3ZCLFVBQU0sRUFBRSxPQUFPLEVBQUUsR0FBSSxFQUFBLElBQUssbUJBQW9CO0FBQzlDLFVBQU0sU0FBUyxRQUFRLE9BQU8sRUFBRTtBQUVoQyxVQUFNLFVBQVU7QUFBQSxNQUFTLE1BQ3ZCLCtCQUNHLE1BQU0sVUFBVSxPQUFPLHFCQUFxQixPQUM1QyxPQUFPLFVBQVUsT0FBTywyQkFBMkIsT0FDbkQsTUFBTSxZQUFZLE9BQU8scUJBQXFCO0FBQUEsSUFDbEQ7QUFFRCxVQUFNLGNBQWM7QUFBQSxNQUFTLE1BQzNCLHNEQUNXLE1BQU0sa0JBQWtCLE9BQU8sU0FBUztBQUFBLElBQ3BEO0FBRUQsV0FBTyxNQUFNO0FBQ1gsWUFBTSxRQUFRO0FBQUEsUUFDWixFQUFFLE9BQU87QUFBQSxVQUNQLE9BQU87QUFBQSxRQUNqQixHQUFXLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFBQSxRQUV0QixFQUFFLE9BQU87QUFBQSxVQUNQLE9BQU87QUFBQSxRQUNqQixHQUFXLE1BQU0sTUFBTSxPQUFPLENBQUM7QUFBQSxNQUN4QjtBQUVELFlBQU0sVUFBVSxNQUFNLE1BQU0sTUFBTTtBQUNsQyxrQkFBWSxVQUFVLE1BQU07QUFBQSxRQUMxQixFQUFFLE9BQU8sRUFBRSxPQUFPLFlBQVksTUFBTyxHQUFFLE9BQU87QUFBQSxNQUMvQztBQUVELGFBQU8sRUFBRSxPQUFPO0FBQUEsUUFDZCxPQUFPLFFBQVEsU0FDVixNQUFNLGtCQUFrQixTQUFTLFlBQVksU0FBUywyQkFBMkI7QUFBQSxRQUN0RixNQUFNO0FBQUEsTUFDUCxHQUFFLEtBQUs7QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUNILENBQUM7OyJ9
