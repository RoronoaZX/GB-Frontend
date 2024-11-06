import { _ as _export_sfc, n as ref, g as computed, H as useRouter, o as openBlock, c as createBlock, w as withCtx, Q as QCard, a as createVNode, I as QCardSection, J as createBaseVNode, K as QInput, L as QIcon, M as QBtn, P as Plugin, N as Notify, O as pushScopeId, R as popScopeId } from "./index.9b9dbcba.js";
import { Q as QForm } from "./QForm.326c5fc0.js";
import { _ as _imports_0 } from "./GB_LOGO.b766a815.js";
import { u as useQuasar } from "./use-quasar.cd221389.js";
import { api } from "./axios.91431b0b.js";
var LoginPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-07314030"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 text-red-6 q-mb-sm" }, [
  /* @__PURE__ */ createBaseVNode("img", {
    src: _imports_0,
    class: "logo"
  })
], -1));
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-caption text-grey-8 q-mb-sm" }, " Please log in to continue. ", -1));
const _hoisted_3 = { class: "q-gutter-y-sm" };
const _hoisted_4 = { class: "q-my-md text-center" };
const _sfc_main = {
  __name: "LoginPage",
  setup(__props) {
    const isPwd = ref(true);
    const email = ref("johndoe@example.com");
    const password = ref("password");
    const loading = ref(false);
    const formIsValid = computed(() => email.value !== "" && password.value !== "");
    useQuasar();
    const router = useRouter();
    const login = async () => {
      var _a, _b;
      Plugin.show();
      try {
        const response = await api.post("/api/login", {
          email: email.value,
          password: password.value
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        Plugin.hide();
        Notify.create({
          type: "positive",
          message: response.data.message || "Login successful!",
          position: "top"
        });
        const role = response.data.role;
        if (role === "Admin") {
          router.push("/admin/dashboard");
        } else if (role === "Baker") {
          router.push("/branch/baker");
        } else if (role === "Cashier") {
          router.push("/branch/sales_lady/products");
        }
      } catch (error) {
        console.error("Error during login:", error);
        const errorDisplay = ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Login failed. Incorrect email & password.";
        Notify.create({
          type: "negative",
          message: errorDisplay,
          position: "top"
        });
        Plugin.hide();
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QCard, {
        class: "my-card q-pa-md q-ma-lg",
        style: { "width": "430px", "max-width": "90%", "height": "500px", "border-radius": "16px", "box-shadow": "0 4px 12px rgba(0, 0, 0, 0.1)", "display": "flex", "flex-direction": "column", "justify-content": "space-between" }
      }, {
        default: withCtx(() => [
          createVNode(QCardSection, { class: "q-pa-sm text-center" }, {
            default: withCtx(() => [
              _hoisted_1,
              _hoisted_2
            ]),
            _: 1
          }),
          createVNode(QCardSection, { class: "q-mt-sm flex-grow-1" }, {
            default: withCtx(() => [
              createVNode(QForm, { onSubmit: login }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_3, [
                    createVNode(QInput, {
                      modelValue: email.value,
                      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => email.value = $event),
                      outlined: "",
                      placeholder: "Email",
                      dense: "",
                      autofocus: "",
                      required: "",
                      class: "input-dynamic"
                    }, null, 8, ["modelValue"]),
                    createVNode(QInput, {
                      modelValue: password.value,
                      "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => password.value = $event),
                      outlined: "",
                      placeholder: "Password",
                      type: isPwd.value ? "password" : "text",
                      dense: "",
                      required: "",
                      class: "input-dynamic"
                    }, {
                      append: withCtx(() => [
                        createVNode(QIcon, {
                          name: isPwd.value ? "visibility_off" : "visibility",
                          onClick: _cache[1] || (_cache[1] = ($event) => isPwd.value = !isPwd.value),
                          class: "cursor-pointer",
                          style: { "color": "#9e9e9e" }
                        }, null, 8, ["name"])
                      ]),
                      _: 1
                    }, 8, ["modelValue", "type"])
                  ]),
                  createBaseVNode("div", _hoisted_4, [
                    createVNode(QBtn, {
                      type: "submit",
                      color: "red-6",
                      label: "Login",
                      class: "q-mt-sm",
                      dense: "",
                      loading: loading.value,
                      disable: !formIsValid.value,
                      style: { "width": "100%", "max-width": "350px", "border-radius": "8px" }
                    }, null, 8, ["loading", "disable"])
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
var LoginPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-07314030"], ["__file", "LoginPage.vue"]]);
export { LoginPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9naW5QYWdlLjE2YjgwMmIwLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvbG9naW4vTG9naW5QYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDxxLWNhcmRcbiAgICBjbGFzcz1cIm15LWNhcmQgcS1wYS1tZCBxLW1hLWxnXCJcbiAgICBzdHlsZT1cIlxuICAgICAgd2lkdGg6IDQzMHB4O1xuICAgICAgbWF4LXdpZHRoOiA5MCU7XG4gICAgICBoZWlnaHQ6IDUwMHB4OyAvKiBTZXQgYSBmaXhlZCBoZWlnaHQgKi9cbiAgICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIFwiXG4gID5cbiAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXBhLXNtIHRleHQtY2VudGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNSB0ZXh0LXJlZC02IHEtbWItc21cIj5cbiAgICAgICAgPGltZyBzcmM9XCIuLi8uLi9hc3NldHMvR0JfTE9HTy5wbmdcIiBjbGFzcz1cImxvZ29cIiAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jYXB0aW9uIHRleHQtZ3JleS04IHEtbWItc21cIj5cbiAgICAgICAgUGxlYXNlIGxvZyBpbiB0byBjb250aW51ZS5cbiAgICAgIDwvZGl2PlxuICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLW10LXNtIGZsZXgtZ3Jvdy0xXCI+XG4gICAgICA8cS1mb3JtIEBzdWJtaXQ9XCJsb2dpblwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwicS1ndXR0ZXIteS1zbVwiPlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICB2LW1vZGVsPVwiZW1haWxcIlxuICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRW1haWxcIlxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIGF1dG9mb2N1c1xuICAgICAgICAgICAgcmVxdWlyZWRcbiAgICAgICAgICAgIGNsYXNzPVwiaW5wdXQtZHluYW1pY1wiXG4gICAgICAgICAgLz5cbiAgICAgICAgICA8cS1pbnB1dFxuICAgICAgICAgICAgdi1tb2RlbD1cInBhc3N3b3JkXCJcbiAgICAgICAgICAgIG91dGxpbmVkXG4gICAgICAgICAgICBwbGFjZWhvbGRlcj1cIlBhc3N3b3JkXCJcbiAgICAgICAgICAgIDp0eXBlPVwiaXNQd2QgPyAncGFzc3dvcmQnIDogJ3RleHQnXCJcbiAgICAgICAgICAgIGRlbnNlXG4gICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgY2xhc3M9XCJpbnB1dC1keW5hbWljXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1zbG90OmFwcGVuZD5cbiAgICAgICAgICAgICAgPHEtaWNvblxuICAgICAgICAgICAgICAgIDpuYW1lPVwiaXNQd2QgPyAndmlzaWJpbGl0eV9vZmYnIDogJ3Zpc2liaWxpdHknXCJcbiAgICAgICAgICAgICAgICBAY2xpY2s9XCJpc1B3ZCA9ICFpc1B3ZFwiXG4gICAgICAgICAgICAgICAgY2xhc3M9XCJjdXJzb3ItcG9pbnRlclwiXG4gICAgICAgICAgICAgICAgc3R5bGU9XCJjb2xvcjogIzllOWU5ZVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3RlbXBsYXRlPlxuICAgICAgICAgIDwvcS1pbnB1dD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLW15LW1kIHRleHQtY2VudGVyXCI+XG4gICAgICAgICAgPHEtYnRuXG4gICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgIGNvbG9yPVwicmVkLTZcIlxuICAgICAgICAgICAgbGFiZWw9XCJMb2dpblwiXG4gICAgICAgICAgICBjbGFzcz1cInEtbXQtc21cIlxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIDpsb2FkaW5nPVwibG9hZGluZ1wiXG4gICAgICAgICAgICA6ZGlzYWJsZT1cIiFmb3JtSXNWYWxpZFwiXG4gICAgICAgICAgICBzdHlsZT1cIndpZHRoOiAxMDAlOyBtYXgtd2lkdGg6IDM1MHB4OyBib3JkZXItcmFkaXVzOiA4cHhcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9xLWZvcm0+XG4gICAgPC9xLWNhcmQtc2VjdGlvbj5cbiAgPC9xLWNhcmQ+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0IHNldHVwPlxuaW1wb3J0IHsgcmVmLCBjb21wdXRlZCB9IGZyb20gXCJ2dWVcIjtcbmltcG9ydCB7IE5vdGlmeSwgdXNlUXVhc2FyLCBMb2FkaW5nIH0gZnJvbSBcInF1YXNhclwiO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcInZ1ZS1yb3V0ZXJcIjtcbmltcG9ydCBheGlvcywgeyBhcGkgfSBmcm9tIFwic3JjL2Jvb3QvYXhpb3NcIjtcblxuY29uc3QgaXNQd2QgPSByZWYodHJ1ZSk7XG5jb25zdCBlbWFpbCA9IHJlZihcImpvaG5kb2VAZXhhbXBsZS5jb21cIik7XG5jb25zdCBwYXNzd29yZCA9IHJlZihcInBhc3N3b3JkXCIpO1xuXG5jb25zdCBsb2FkaW5nID0gcmVmKGZhbHNlKTtcblxuY29uc3QgZm9ybUlzVmFsaWQgPSBjb21wdXRlZCgoKSA9PiBlbWFpbC52YWx1ZSAhPT0gXCJcIiAmJiBwYXNzd29yZC52YWx1ZSAhPT0gXCJcIik7XG5cbmNvbnN0IHF1YXNhciA9IHVzZVF1YXNhcigpO1xuY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cbmNvbnN0IGxvZ2luID0gYXN5bmMgKCkgPT4ge1xuICBMb2FkaW5nLnNob3coKTtcbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFwaS5wb3N0KFwiL2FwaS9sb2dpblwiLCB7XG4gICAgICBlbWFpbDogZW1haWwudmFsdWUsXG4gICAgICBwYXNzd29yZDogcGFzc3dvcmQudmFsdWUsXG4gICAgfSk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0b2tlblwiLCByZXNwb25zZS5kYXRhLnRva2VuKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInJvbGVcIiwgcmVzcG9uc2UuZGF0YS5yb2xlKTtcbiAgICBMb2FkaW5nLmhpZGUoKTtcblxuICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgdHlwZTogXCJwb3NpdGl2ZVwiLFxuICAgICAgbWVzc2FnZTogcmVzcG9uc2UuZGF0YS5tZXNzYWdlIHx8IFwiTG9naW4gc3VjY2Vzc2Z1bCFcIixcbiAgICAgIHBvc2l0aW9uOiBcInRvcFwiLFxuICAgIH0pO1xuXG4gICAgY29uc3Qgcm9sZSA9IHJlc3BvbnNlLmRhdGEucm9sZTtcbiAgICBpZiAocm9sZSA9PT0gXCJBZG1pblwiKSB7XG4gICAgICByb3V0ZXIucHVzaChcIi9hZG1pbi9kYXNoYm9hcmRcIik7XG4gICAgfSBlbHNlIGlmIChyb2xlID09PSBcIkJha2VyXCIpIHtcbiAgICAgIHJvdXRlci5wdXNoKFwiL2JyYW5jaC9iYWtlclwiKTtcbiAgICB9IGVsc2UgaWYgKHJvbGUgPT09IFwiQ2FzaGllclwiKSB7XG4gICAgICByb3V0ZXIucHVzaChcIi9icmFuY2gvc2FsZXNfbGFkeS9wcm9kdWN0c1wiKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIkVycm9yIGR1cmluZyBsb2dpbjpcIiwgZXJyb3IpO1xuICAgIGNvbnN0IGVycm9yRGlzcGxheSA9XG4gICAgICBlcnJvci5yZXNwb25zZT8uZGF0YT8ubWVzc2FnZSB8fFxuICAgICAgXCJMb2dpbiBmYWlsZWQuIEluY29ycmVjdCBlbWFpbCAmIHBhc3N3b3JkLlwiO1xuICAgIE5vdGlmeS5jcmVhdGUoe1xuICAgICAgdHlwZTogXCJuZWdhdGl2ZVwiLFxuICAgICAgbWVzc2FnZTogZXJyb3JEaXNwbGF5LFxuICAgICAgcG9zaXRpb246IFwidG9wXCIsXG4gICAgfSk7XG5cbiAgICBMb2FkaW5nLmhpZGUoKTtcbiAgfVxufTtcbjwvc2NyaXB0PlxuXG48c3R5bGUgc2NvcGVkPlxuLm15LWNhcmQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBhbmltYXRpb246IG15bW92ZSAycyBpbmZpbml0ZTtcbn1cblxuLmxvZ28ge1xuICB3aWR0aDogMTUwcHg7XG4gIGhlaWdodDogYXV0bztcbiAgbWF4LXdpZHRoOiAxMDAlO1xufVxuXG4uaW5wdXQtZHluYW1pYyB7XG4gIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG59XG5cbkBtZWRpYSAobWF4LWhlaWdodDogNjAwcHgpIHtcbiAgLm15LWNhcmQge1xuICAgIGhlaWdodDogOTB2aDsgLyogTWFrZSBjYXJkIHJlc3BvbnNpdmUgd2hlbiBzY3JlZW4gaGVpZ2h0IGlzIHNtYWxsICovXG4gIH1cbiAgLmlucHV0LWR5bmFtaWMge1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBwYWRkaW5nOiA4cHggMTJweDtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIG15bW92ZSB7XG4gIDUwJSB7XG4gICAgYm94LXNoYWRvdzogMTBweCAyMHB4IDMwcHggcmdiKDI1NCwgMTU0LCAxNTQpO1xuICB9XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIkxvYWRpbmciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2RUEsVUFBTSxRQUFRLElBQUksSUFBSTtBQUN0QixVQUFNLFFBQVEsSUFBSSxxQkFBcUI7QUFDdkMsVUFBTSxXQUFXLElBQUksVUFBVTtBQUUvQixVQUFNLFVBQVUsSUFBSSxLQUFLO0FBRXpCLFVBQU0sY0FBYyxTQUFTLE1BQU0sTUFBTSxVQUFVLE1BQU0sU0FBUyxVQUFVLEVBQUU7QUFFL0QsY0FBWTtBQUMzQixVQUFNLFNBQVMsVUFBUztBQUV4QixVQUFNLFFBQVEsWUFBWTs7QUFDeEJBLGFBQVEsS0FBSTtBQUNaLFVBQUk7QUFDRixjQUFNLFdBQVcsTUFBTSxJQUFJLEtBQUssY0FBYztBQUFBLFVBQzVDLE9BQU8sTUFBTTtBQUFBLFVBQ2IsVUFBVSxTQUFTO0FBQUEsUUFDekIsQ0FBSztBQUNELHFCQUFhLFFBQVEsU0FBUyxTQUFTLEtBQUssS0FBSztBQUNqRCxxQkFBYSxRQUFRLFFBQVEsU0FBUyxLQUFLLElBQUk7QUFDL0NBLGVBQVEsS0FBSTtBQUVaLGVBQU8sT0FBTztBQUFBLFVBQ1osTUFBTTtBQUFBLFVBQ04sU0FBUyxTQUFTLEtBQUssV0FBVztBQUFBLFVBQ2xDLFVBQVU7QUFBQSxRQUNoQixDQUFLO0FBRUQsY0FBTSxPQUFPLFNBQVMsS0FBSztBQUMzQixZQUFJLFNBQVMsU0FBUztBQUNwQixpQkFBTyxLQUFLLGtCQUFrQjtBQUFBLFFBQ3BDLFdBQWUsU0FBUyxTQUFTO0FBQzNCLGlCQUFPLEtBQUssZUFBZTtBQUFBLFFBQ2pDLFdBQWUsU0FBUyxXQUFXO0FBQzdCLGlCQUFPLEtBQUssNkJBQTZCO0FBQUEsUUFDMUM7QUFBQSxNQUNGLFNBQVEsT0FBUDtBQUNBLGdCQUFRLE1BQU0sdUJBQXVCLEtBQUs7QUFDMUMsY0FBTSxpQkFDSixpQkFBTSxhQUFOLG1CQUFnQixTQUFoQixtQkFBc0IsWUFDdEI7QUFDRixlQUFPLE9BQU87QUFBQSxVQUNaLE1BQU07QUFBQSxVQUNOLFNBQVM7QUFBQSxVQUNULFVBQVU7QUFBQSxRQUNoQixDQUFLO0FBRURBLGVBQVEsS0FBSTtBQUFBLE1BQ2I7QUFBQSxJQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
