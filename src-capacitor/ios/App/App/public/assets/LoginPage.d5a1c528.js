import { _ as _export_sfc, n as ref, g as computed, H as useRouter, z as onMounted, o as openBlock, c as createBlock, w as withCtx, Q as QCard, a as createVNode, I as QCardSection, J as createBaseVNode, K as QInput, L as QIcon, M as QBtn, O as createTextVNode, R as toDisplayString, P as Plugin, N as Notify, S as pushScopeId, T as popScopeId } from "./index.c8e2405b.js";
import { Q as QForm } from "./QForm.6c6124bb.js";
import { _ as _imports_0 } from "./GB_LOGO.b766a815.js";
import { u as useQuasar } from "./use-quasar.84d8ad03.js";
import { api } from "./axios.aa1bce92.js";
var LoginPage_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-e397036e"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-h5 text-red-6 q-mb-sm" }, [
  /* @__PURE__ */ createBaseVNode("img", {
    src: _imports_0,
    class: "logo"
  })
], -1));
const _hoisted_2 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-caption text-grey-8 q-mb-sm" }, " Please log in to continuesss. ", -1));
const _hoisted_3 = { class: "q-gutter-y-sm" };
const _hoisted_4 = { class: "q-my-md text-center" };
const _sfc_main = {
  __name: "LoginPage",
  setup(__props) {
    const isPwd = ref(true);
    const email = ref("");
    const password = ref("");
    const uuid = ref("");
    const loading = ref(false);
    const formIsValid = computed(() => email.value !== "" && password.value !== "");
    useQuasar();
    const router = useRouter();
    const activeMenuItem = ref("");
    const checkDevice = async () => {
      try {
        const id = await Device.getId();
        uuid.value = id.identifier;
        console.log("Device UUID:", uuid.value);
      } catch (error) {
        console.error("Error fetching device UUID:", error);
      }
    };
    onMounted(() => {
      checkDevice();
    });
    const login = async () => {
      var _a, _b;
      Plugin.show();
      try {
        const response = await api.post("/api/login", {
          email: email.value,
          password: password.value
        });
        localStorage.setItem("activeMenuItem", "dashboard");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        const role = response.data.role;
        const storedActiveMenuItem = localStorage.getItem("activeMenuItem");
        if (role === "Admin" || role === "Super Admin") {
          let path;
          if (storedActiveMenuItem) {
            path = `/admin/${storedActiveMenuItem}`;
            activeMenuItem.value = storedActiveMenuItem;
          } else {
            path = "/admin/dashboard";
            localStorage.setItem("activeMenuItem", "dashboard");
            activeMenuItem.value = "dashboard";
          }
          await router.push(path);
          Notify.create({
            type: "positive",
            message: response.data.message || "Login successful!",
            setTimeout: 5e3
          });
        } else if (role === "Baker") {
          await router.push("/branch/baker");
        } else if (role === "Cashier") {
          await router.push("/branch/sales_lady/products");
        }
      } catch (error) {
        console.error("Error during login:", error);
        const errorDisplay = ((_b = (_a = error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Login failed. Incorrect email & password.";
        Notify.create({
          type: "negative",
          message: errorDisplay
        });
      } finally {
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
          }),
          createTextVNode(" this is uuid " + toDisplayString(uuid.value), 1)
        ]),
        _: 1
      });
    };
  }
};
var LoginPage = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e397036e"], ["__file", "LoginPage.vue"]]);
export { LoginPage as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9naW5QYWdlLmQ1YTFjNTI4LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcGFnZXMvbG9naW4vTG9naW5QYWdlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gIDwhLS0gPGRpdj5cbiAgICA8cS1idG4gQGNsaWNrPVwiY2hlY2tEZXZpY2VcIj4gQ2hlY2sgRGV2aWNlIFVVSUQgPC9xLWJ0bj5cbiAgICA8cCB2LWlmPVwidXVpZFwiPkRldmljZSBVVUlEOiB7eyB1dWlkIH19PC9wPlxuICA8L2Rpdj4gLS0+XG4gIDxxLWNhcmRcbiAgICBjbGFzcz1cIm15LWNhcmQgcS1wYS1tZCBxLW1hLWxnXCJcbiAgICBzdHlsZT1cIlxuICAgICAgd2lkdGg6IDQzMHB4O1xuICAgICAgbWF4LXdpZHRoOiA5MCU7XG4gICAgICBoZWlnaHQ6IDUwMHB4OyAvKiBTZXQgYSBmaXhlZCBoZWlnaHQgKi9cbiAgICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIFwiXG4gID5cbiAgICA8cS1jYXJkLXNlY3Rpb24gY2xhc3M9XCJxLXBhLXNtIHRleHQtY2VudGVyXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dC1oNSB0ZXh0LXJlZC02IHEtbWItc21cIj5cbiAgICAgICAgPGltZyBzcmM9XCIuLi8uLi9hc3NldHMvR0JfTE9HTy5wbmdcIiBjbGFzcz1cImxvZ29cIiAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jYXB0aW9uIHRleHQtZ3JleS04IHEtbWItc21cIj5cbiAgICAgICAgUGxlYXNlIGxvZyBpbiB0byBjb250aW51ZXNzcy5cbiAgICAgIDwvZGl2PlxuICAgIDwvcS1jYXJkLXNlY3Rpb24+XG5cbiAgICA8IS0tIDxxLWNhcmQtc2VjdGlvbj5cbiAgICAgIDxkaXYgdi1pZj1cIm1hY2hpbmVJZFwiIGNsYXNzPVwicS1tdC1tZFwiPlxuICAgICAgICA8cS1jaGlwIGxhYmVsPVwiVVVJRFwiIGljb249XCJmaW5nZXJwcmludFwiIC8+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWJvZHkxIHEtbXQtc21cIj57eyBtYWNoaW5lSWQgfX08L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiB2LWVsc2UgY2xhc3M9XCJxLW10LW1kIHRleHQtY2FwdGlvblwiPkZldGNoaW5nIFVVSUQuLi48L2Rpdj5cbiAgICA8L3EtY2FyZC1zZWN0aW9uPiAtLT5cblxuICAgIDxxLWNhcmQtc2VjdGlvbiBjbGFzcz1cInEtbXQtc20gZmxleC1ncm93LTFcIj5cbiAgICAgIDxxLWZvcm0gQHN1Ym1pdD1cImxvZ2luXCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJxLWd1dHRlci15LXNtXCI+XG4gICAgICAgICAgPHEtaW5wdXRcbiAgICAgICAgICAgIHYtbW9kZWw9XCJlbWFpbFwiXG4gICAgICAgICAgICBvdXRsaW5lZFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJFbWFpbFwiXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgYXV0b2ZvY3VzXG4gICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgY2xhc3M9XCJpbnB1dC1keW5hbWljXCJcbiAgICAgICAgICAvPlxuICAgICAgICAgIDxxLWlucHV0XG4gICAgICAgICAgICB2LW1vZGVsPVwicGFzc3dvcmRcIlxuICAgICAgICAgICAgb3V0bGluZWRcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiUGFzc3dvcmRcIlxuICAgICAgICAgICAgOnR5cGU9XCJpc1B3ZCA/ICdwYXNzd29yZCcgOiAndGV4dCdcIlxuICAgICAgICAgICAgZGVuc2VcbiAgICAgICAgICAgIHJlcXVpcmVkXG4gICAgICAgICAgICBjbGFzcz1cImlucHV0LWR5bmFtaWNcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LXNsb3Q6YXBwZW5kPlxuICAgICAgICAgICAgICA8cS1pY29uXG4gICAgICAgICAgICAgICAgOm5hbWU9XCJpc1B3ZCA/ICd2aXNpYmlsaXR5X29mZicgOiAndmlzaWJpbGl0eSdcIlxuICAgICAgICAgICAgICAgIEBjbGljaz1cImlzUHdkID0gIWlzUHdkXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cImN1cnNvci1wb2ludGVyXCJcbiAgICAgICAgICAgICAgICBzdHlsZT1cImNvbG9yOiAjOWU5ZTllXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgPC9xLWlucHV0PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInEtbXktbWQgdGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICA8cS1idG5cbiAgICAgICAgICAgIHR5cGU9XCJzdWJtaXRcIlxuICAgICAgICAgICAgY29sb3I9XCJyZWQtNlwiXG4gICAgICAgICAgICBsYWJlbD1cIkxvZ2luXCJcbiAgICAgICAgICAgIGNsYXNzPVwicS1tdC1zbVwiXG4gICAgICAgICAgICBkZW5zZVxuICAgICAgICAgICAgOmxvYWRpbmc9XCJsb2FkaW5nXCJcbiAgICAgICAgICAgIDpkaXNhYmxlPVwiIWZvcm1Jc1ZhbGlkXCJcbiAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6IDEwMCU7IG1heC13aWR0aDogMzUwcHg7IGJvcmRlci1yYWRpdXM6IDhweFwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3EtZm9ybT5cbiAgICA8L3EtY2FyZC1zZWN0aW9uPlxuICAgIHRoaXMgaXMgdXVpZCB7eyB1dWlkIH19XG4gICAgPCEtLSA8Q2hlY2tVVUlEIC8+IC0tPlxuICA8L3EtY2FyZD5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQgc2V0dXA+XG5pbXBvcnQgeyByZWYsIGNvbXB1dGVkLCBvbk1vdW50ZWQgfSBmcm9tIFwidnVlXCI7XG5pbXBvcnQgeyBOb3RpZnksIHVzZVF1YXNhciwgTG9hZGluZyB9IGZyb20gXCJxdWFzYXJcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJ2dWUtcm91dGVyXCI7XG5pbXBvcnQgYXhpb3MsIHsgYXBpIH0gZnJvbSBcInNyYy9ib290L2F4aW9zXCI7XG4vLyBpbXBvcnQgeyBEZXZpY2UgfSBmcm9tIFwiQGNhcGFjaXRvci9kZXZpY2VcIjtcblxuLy8gaW1wb3J0IENoZWNrVVVJRCBmcm9tIFwiLi9DaGVja1VVSUQudnVlXCI7XG4vLyBjb25zdCB1dWlkID0gcmVmKFwiXCIpO1xuXG4vLyBjb25zdCBjaGVja0RldmljZSA9IGFzeW5jICgpID0+IHtcbi8vICAgdHJ5IHtcbi8vICAgICBjb25zdCBpbmZvID0gYXdhaXQgRGV2aWNlLmdldElkKCk7XG4vLyAgICAgdXVpZC52YWx1ZSA9IGluZm87XG4vLyAgICAgY29uc29sZS5sb2coXCJEZXZpY2UgVVVJRDpcIiwgdXVpZC52YWx1ZSk7XG4vLyAgIH0gY2F0Y2ggKGVycm9yKSB7XG4vLyAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGZldGNoaW5nIGRldmljZSBVVUlEOlwiLCBlcnJvcik7XG4vLyAgIH1cbi8vIH07XG4vLyBSZWFjdGl2ZSB2YXJpYWJsZSB0byBob2xkIG1hY2hpbmUgVVVJRFxuLy8gY29uc3QgbWFjaGluZUlkID0gcmVmKFxuLy8gICBcImYyZWRiOWM0MWY2YjdkMWIxNDcwMTZhNTZmOWQzMGI3MWVlMDJkZThlYjczNzVjNzM3ZWM5MTBhMmJlNWRjMjlcIlxuLy8gKTtcblxuLy8gTWV0aG9kIHRvIGdldCBVVUlEIGZyb20gRWxlY3Ryb24gdXNpbmcgbm9kZS1tYWNoaW5lLWlkXG4vLyBjb25zdCBnZXRVVUlEID0gYXN5bmMgKCkgPT4ge1xuLy8gICBpZiAod2luZG93LnJlcXVpcmUpIHtcbi8vICAgICBjb25zdCB7IG1hY2hpbmVJZDogZ2V0TWFjaGluZUlkIH0gPSB3aW5kb3cucmVxdWlyZShcIm5vZGUtbWFjaGluZS1pZFwiKTtcblxuLy8gICAgIHRyeSB7XG4vLyAgICAgICAvLyBGZXRjaCBVVUlEXG4vLyAgICAgICBtYWNoaW5lSWQudmFsdWUgPSBhd2FpdCBnZXRNYWNoaW5lSWQoKTtcbi8vICAgICAgIGNvbnNvbGUubG9nKFwibWFjaGluZUlkXCIsIG1hY2hpbmVJZC52YWx1ZSk7XG4vLyAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbi8vICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBtYWNoaW5lIFVVSUQ6XCIsIGVycm9yKTtcbi8vICAgICB9XG4vLyAgIH0gZWxzZSB7XG4vLyAgICAgY29uc29sZS53YXJuKFwiRWxlY3Ryb24gbm90IGF2YWlsYWJsZS5cIik7XG4vLyAgIH1cbi8vIH07XG5cbi8vIEF1dG9tYXRpY2FsbHkgZmV0Y2ggVVVJRCB3aGVuIHRoZSBjb21wb25lbnQgaXMgbW91bnRlZFxuLy8gb25Nb3VudGVkKCgpID0+IHtcbi8vICAgZ2V0VVVJRCgpO1xuLy8gfSk7XG4vLyBqb2huZG9lQGV4YW1wbGUuY29tXG4vLyBwYXNzd29yZFxuY29uc3QgaXNQd2QgPSByZWYodHJ1ZSk7XG5jb25zdCBlbWFpbCA9IHJlZihcIlwiKTtcbmNvbnN0IHBhc3N3b3JkID0gcmVmKFwiXCIpO1xuY29uc3QgdXVpZCA9IHJlZihcIlwiKTtcbmNvbnN0IGxvYWRpbmcgPSByZWYoZmFsc2UpO1xuXG5jb25zdCBmb3JtSXNWYWxpZCA9IGNvbXB1dGVkKCgpID0+IGVtYWlsLnZhbHVlICE9PSBcIlwiICYmIHBhc3N3b3JkLnZhbHVlICE9PSBcIlwiKTtcblxuY29uc3QgcXVhc2FyID0gdXNlUXVhc2FyKCk7XG5jb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbmNvbnN0IGFjdGl2ZU1lbnVJdGVtID0gcmVmKFwiXCIpO1xuXG5jb25zdCBjaGVja0RldmljZSA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBpZCA9IGF3YWl0IERldmljZS5nZXRJZCgpO1xuICAgIC8vIGNvbnN0IGluZm8gPSBhd2FpdCBEZXZpY2UuZ2V0SW5mbygpO1xuICAgIHV1aWQudmFsdWUgPSBpZC5pZGVudGlmaWVyO1xuICAgIC8vICB7XG4gICAgLy8gICBkZXZpY2VJbmZvOiBpbmZvLFxuICAgIC8vICAgaWQ6IGlkLFxuICAgIC8vIH07IC8vIFN0b3JlIHRoZSBVVUlEIGluIHRoZSByZWFjdGl2ZSB2YXJpYWJsZVxuICAgIGNvbnNvbGUubG9nKFwiRGV2aWNlIFVVSUQ6XCIsIHV1aWQudmFsdWUpOyAvLyBMb2cgdGhlIFVVSURcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3IgZmV0Y2hpbmcgZGV2aWNlIFVVSUQ6XCIsIGVycm9yKTtcbiAgfVxufTtcblxub25Nb3VudGVkKCgpID0+IHtcbiAgY2hlY2tEZXZpY2UoKTtcbn0pO1xuXG5jb25zdCBsb2dpbiA9IGFzeW5jICgpID0+IHtcbiAgTG9hZGluZy5zaG93KCk7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhcGkucG9zdChcIi9hcGkvbG9naW5cIiwge1xuICAgICAgZW1haWw6IGVtYWlsLnZhbHVlLFxuICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkLnZhbHVlLFxuICAgICAgLy8gdXVpZDogbWFjaGluZUlkLnZhbHVlLFxuICAgIH0pO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiYWN0aXZlTWVudUl0ZW1cIiwgXCJkYXNoYm9hcmRcIik7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0b2tlblwiLCByZXNwb25zZS5kYXRhLnRva2VuKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInJvbGVcIiwgcmVzcG9uc2UuZGF0YS5yb2xlKTtcblxuICAgIGNvbnN0IHJvbGUgPSByZXNwb25zZS5kYXRhLnJvbGU7XG4gICAgY29uc3Qgc3RvcmVkQWN0aXZlTWVudUl0ZW0gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImFjdGl2ZU1lbnVJdGVtXCIpO1xuICAgIGlmIChyb2xlID09PSBcIkFkbWluXCIgfHwgcm9sZSA9PT0gXCJTdXBlciBBZG1pblwiKSB7XG4gICAgICBsZXQgcGF0aDtcblxuICAgICAgLy8gSWYgYSBzdG9yZWQgdmFsdWUgaXMgZm91bmQgaW4gbG9jYWxTdG9yYWdlLCBzZXQgdGhlIGFjdGl2ZU1lbnVJdGVtXG4gICAgICBpZiAoc3RvcmVkQWN0aXZlTWVudUl0ZW0pIHtcbiAgICAgICAgcGF0aCA9IGAvYWRtaW4vJHtzdG9yZWRBY3RpdmVNZW51SXRlbX1gO1xuICAgICAgICBhY3RpdmVNZW51SXRlbS52YWx1ZSA9IHN0b3JlZEFjdGl2ZU1lbnVJdGVtO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGF0aCA9IFwiL2FkbWluL2Rhc2hib2FyZFwiO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcImFjdGl2ZU1lbnVJdGVtXCIsIFwiZGFzaGJvYXJkXCIpO1xuICAgICAgICBhY3RpdmVNZW51SXRlbS52YWx1ZSA9IFwiZGFzaGJvYXJkXCI7XG4gICAgICB9XG5cbiAgICAgIC8vIE5hdmlnYXRlIHRvIHRoZSBzdG9yZWQgcGF0aCBvciBuZXcgcGF0aFxuICAgICAgYXdhaXQgcm91dGVyLnB1c2gocGF0aCk7XG4gICAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgICAgdHlwZTogXCJwb3NpdGl2ZVwiLFxuICAgICAgICBtZXNzYWdlOiByZXNwb25zZS5kYXRhLm1lc3NhZ2UgfHwgXCJMb2dpbiBzdWNjZXNzZnVsIVwiLFxuICAgICAgICAvLyBwb3NpdGlvbjogXCJ0b3BcIixcbiAgICAgICAgc2V0VGltZW91dDogNTAwMCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAocm9sZSA9PT0gXCJCYWtlclwiKSB7XG4gICAgICBhd2FpdCByb3V0ZXIucHVzaChcIi9icmFuY2gvYmFrZXJcIik7XG4gICAgfSBlbHNlIGlmIChyb2xlID09PSBcIkNhc2hpZXJcIikge1xuICAgICAgYXdhaXQgcm91dGVyLnB1c2goXCIvYnJhbmNoL3NhbGVzX2xhZHkvcHJvZHVjdHNcIik7XG4gICAgfVxuICAgIC8vIGVsc2UgaWYgKHJvbGUgPT09IFwiU3VwZXJ2aXNvclwiKSB7XG4gICAgLy8gICBhd2FpdCByb3V0ZXIucHVzaChcIi9zdXBlcnZpc29yL3JlcG9ydHNcIik7XG4gICAgLy8gfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBkdXJpbmcgbG9naW46XCIsIGVycm9yKTtcbiAgICBjb25zdCBlcnJvckRpc3BsYXkgPVxuICAgICAgZXJyb3IucmVzcG9uc2U/LmRhdGE/Lm1lc3NhZ2UgfHxcbiAgICAgIFwiTG9naW4gZmFpbGVkLiBJbmNvcnJlY3QgZW1haWwgJiBwYXNzd29yZC5cIjtcbiAgICBOb3RpZnkuY3JlYXRlKHtcbiAgICAgIHR5cGU6IFwibmVnYXRpdmVcIixcbiAgICAgIG1lc3NhZ2U6IGVycm9yRGlzcGxheSxcbiAgICAgIC8vIHBvc2l0aW9uOiBcImJvdHRvbVwiLFxuICAgIH0pO1xuICB9IGZpbmFsbHkge1xuICAgIExvYWRpbmcuaGlkZSgpO1xuICB9XG59O1xuPC9zY3JpcHQ+XG5cbjxzdHlsZSBzY29wZWQ+XG4ubXktY2FyZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIGFuaW1hdGlvbjogbXltb3ZlIDJzIGluZmluaXRlO1xufVxuXG4ubG9nbyB7XG4gIHdpZHRoOiAxNTBweDtcbiAgaGVpZ2h0OiBhdXRvO1xuICBtYXgtd2lkdGg6IDEwMCU7XG59XG5cbi5pbnB1dC1keW5hbWljIHtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcbn1cblxuQG1lZGlhIChtYXgtaGVpZ2h0OiA2MDBweCkge1xuICAubXktY2FyZCB7XG4gICAgaGVpZ2h0OiA5MHZoOyAvKiBNYWtlIGNhcmQgcmVzcG9uc2l2ZSB3aGVuIHNjcmVlbiBoZWlnaHQgaXMgc21hbGwgKi9cbiAgfVxuICAuaW5wdXQtZHluYW1pYyB7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIHBhZGRpbmc6IDhweCAxMnB4O1xuICB9XG59XG5cbkBrZXlmcmFtZXMgbXltb3ZlIHtcbiAgNTAlIHtcbiAgICBib3gtc2hhZG93OiAxMHB4IDIwcHggMzBweCByZ2IoMjU0LCAxNTQsIDE1NCk7XG4gIH1cbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiTG9hZGluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9JQSxVQUFNLFFBQVEsSUFBSSxJQUFJO0FBQ3RCLFVBQU0sUUFBUSxJQUFJLEVBQUU7QUFDcEIsVUFBTSxXQUFXLElBQUksRUFBRTtBQUN2QixVQUFNLE9BQU8sSUFBSSxFQUFFO0FBQ25CLFVBQU0sVUFBVSxJQUFJLEtBQUs7QUFFekIsVUFBTSxjQUFjLFNBQVMsTUFBTSxNQUFNLFVBQVUsTUFBTSxTQUFTLFVBQVUsRUFBRTtBQUUvRCxjQUFZO0FBQzNCLFVBQU0sU0FBUyxVQUFTO0FBQ3hCLFVBQU0saUJBQWlCLElBQUksRUFBRTtBQUU3QixVQUFNLGNBQWMsWUFBWTtBQUM5QixVQUFJO0FBQ0YsY0FBTSxLQUFLLE1BQU0sT0FBTztBQUV4QixhQUFLLFFBQVEsR0FBRztBQUtoQixnQkFBUSxJQUFJLGdCQUFnQixLQUFLLEtBQUs7QUFBQSxNQUN2QyxTQUFRLE9BQVA7QUFDQSxnQkFBUSxNQUFNLCtCQUErQixLQUFLO0FBQUEsTUFDbkQ7QUFBQSxJQUNIO0FBRUEsY0FBVSxNQUFNO0FBQ2Q7SUFDRixDQUFDO0FBRUQsVUFBTSxRQUFRLFlBQVk7O0FBQ3hCQSxhQUFRLEtBQUk7QUFDWixVQUFJO0FBQ0YsY0FBTSxXQUFXLE1BQU0sSUFBSSxLQUFLLGNBQWM7QUFBQSxVQUM1QyxPQUFPLE1BQU07QUFBQSxVQUNiLFVBQVUsU0FBUztBQUFBLFFBRXpCLENBQUs7QUFDRCxxQkFBYSxRQUFRLGtCQUFrQixXQUFXO0FBQ2xELHFCQUFhLFFBQVEsU0FBUyxTQUFTLEtBQUssS0FBSztBQUNqRCxxQkFBYSxRQUFRLFFBQVEsU0FBUyxLQUFLLElBQUk7QUFFL0MsY0FBTSxPQUFPLFNBQVMsS0FBSztBQUMzQixjQUFNLHVCQUF1QixhQUFhLFFBQVEsZ0JBQWdCO0FBQ2xFLFlBQUksU0FBUyxXQUFXLFNBQVMsZUFBZTtBQUM5QyxjQUFJO0FBR0osY0FBSSxzQkFBc0I7QUFDeEIsbUJBQU8sVUFBVTtBQUNqQiwyQkFBZSxRQUFRO0FBQUEsVUFDL0IsT0FBYTtBQUNMLG1CQUFPO0FBQ1AseUJBQWEsUUFBUSxrQkFBa0IsV0FBVztBQUNsRCwyQkFBZSxRQUFRO0FBQUEsVUFDeEI7QUFHRCxnQkFBTSxPQUFPLEtBQUssSUFBSTtBQUN0QixpQkFBTyxPQUFPO0FBQUEsWUFDWixNQUFNO0FBQUEsWUFDTixTQUFTLFNBQVMsS0FBSyxXQUFXO0FBQUEsWUFFbEMsWUFBWTtBQUFBLFVBQ3BCLENBQU87QUFBQSxRQUNQLFdBQWUsU0FBUyxTQUFTO0FBQzNCLGdCQUFNLE9BQU8sS0FBSyxlQUFlO0FBQUEsUUFDdkMsV0FBZSxTQUFTLFdBQVc7QUFDN0IsZ0JBQU0sT0FBTyxLQUFLLDZCQUE2QjtBQUFBLFFBQ2hEO0FBQUEsTUFJRixTQUFRLE9BQVA7QUFDQSxnQkFBUSxNQUFNLHVCQUF1QixLQUFLO0FBQzFDLGNBQU0saUJBQ0osaUJBQU0sYUFBTixtQkFBZ0IsU0FBaEIsbUJBQXNCLFlBQ3RCO0FBQ0YsZUFBTyxPQUFPO0FBQUEsVUFDWixNQUFNO0FBQUEsVUFDTixTQUFTO0FBQUEsUUFFZixDQUFLO0FBQUEsTUFDTCxVQUFZO0FBQ1JBLGVBQVEsS0FBSTtBQUFBLE1BQ2I7QUFBQSxJQUNIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
