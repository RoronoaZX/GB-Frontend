import { B as noop, b6 as isDate, bs as isRegexp, an as client } from "./index.c8e2405b.js";
function encode(value) {
  if (isDate(value) === true) {
    return "__q_date|" + value.getTime();
  }
  if (isRegexp(value) === true) {
    return "__q_expr|" + value.source;
  }
  if (typeof value === "number") {
    return "__q_numb|" + value;
  }
  if (typeof value === "boolean") {
    return "__q_bool|" + (value ? "1" : "0");
  }
  if (typeof value === "string") {
    return "__q_strn|" + value;
  }
  if (typeof value === "function") {
    return "__q_strn|" + value.toString();
  }
  if (value === Object(value)) {
    return "__q_objt|" + JSON.stringify(value);
  }
  return value;
}
function decode(value) {
  const length = value.length;
  if (length < 9) {
    return value;
  }
  const type = value.substring(0, 8);
  const source = value.substring(9);
  switch (type) {
    case "__q_date":
      const number = Number(source);
      return new Date(Number.isNaN(number) === true ? source : number);
    case "__q_expr":
      return new RegExp(source);
    case "__q_numb":
      return Number(source);
    case "__q_bool":
      return Boolean(source === "1");
    case "__q_strn":
      return "" + source;
    case "__q_objt":
      return JSON.parse(source);
    default:
      return value;
  }
}
function getEmptyStorage() {
  const getVal = () => null;
  return {
    has: () => false,
    hasItem: () => false,
    getLength: () => 0,
    getItem: getVal,
    getIndex: getVal,
    getKey: getVal,
    getAll: () => {
    },
    getAllKeys: () => [],
    set: noop,
    setItem: noop,
    remove: noop,
    removeItem: noop,
    clear: noop,
    isEmpty: () => true
  };
}
function getStorage(type) {
  const webStorage = window[type + "Storage"], get = (key) => {
    const item = webStorage.getItem(key);
    return item ? decode(item) : null;
  };
  const hasItem = (key) => webStorage.getItem(key) !== null;
  const setItem = (key, value) => {
    webStorage.setItem(key, encode(value));
  };
  const removeItem = (key) => {
    webStorage.removeItem(key);
  };
  return {
    has: hasItem,
    hasItem,
    getLength: () => webStorage.length,
    getItem: get,
    getIndex: (index) => {
      return index < webStorage.length ? get(webStorage.key(index)) : null;
    },
    getKey: (index) => {
      return index < webStorage.length ? webStorage.key(index) : null;
    },
    getAll: () => {
      let key;
      const result = {}, len = webStorage.length;
      for (let i = 0; i < len; i++) {
        key = webStorage.key(i);
        result[key] = get(key);
      }
      return result;
    },
    getAllKeys: () => {
      const result = [], len = webStorage.length;
      for (let i = 0; i < len; i++) {
        result.push(webStorage.key(i));
      }
      return result;
    },
    set: setItem,
    setItem,
    remove: removeItem,
    removeItem,
    clear: () => {
      webStorage.clear();
    },
    isEmpty: () => webStorage.length === 0
  };
}
const storage = client.has.webStorage === false ? getEmptyStorage() : getStorage("local");
const Plugin = {
  install({ $q }) {
    $q.localStorage = storage;
  }
};
Object.assign(Plugin, storage);
export { Plugin as P };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9jYWxTdG9yYWdlLjEyYThhOTY2LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvcXVhc2FyL3NyYy9wbHVnaW5zL3N0b3JhZ2UvZW5naW5lL3dlYi1zdG9yYWdlLmpzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3F1YXNhci9zcmMvcGx1Z2lucy9zdG9yYWdlL0xvY2FsU3RvcmFnZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvZXZlbnQvZXZlbnQuanMnXG5pbXBvcnQgeyBpc0RhdGUsIGlzUmVnZXhwIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvaXMvaXMuanMnXG5cbmZ1bmN0aW9uIGVuY29kZSAodmFsdWUpIHtcbiAgaWYgKGlzRGF0ZSh2YWx1ZSkgPT09IHRydWUpIHtcbiAgICByZXR1cm4gJ19fcV9kYXRlfCcgKyB2YWx1ZS5nZXRUaW1lKClcbiAgfVxuICBpZiAoaXNSZWdleHAodmFsdWUpID09PSB0cnVlKSB7XG4gICAgcmV0dXJuICdfX3FfZXhwcnwnICsgdmFsdWUuc291cmNlXG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gJ19fcV9udW1ifCcgKyB2YWx1ZVxuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiAnX19xX2Jvb2x8JyArICh2YWx1ZSA/ICcxJyA6ICcwJylcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiAnX19xX3N0cm58JyArIHZhbHVlXG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiAnX19xX3N0cm58JyArIHZhbHVlLnRvU3RyaW5nKClcbiAgfVxuICBpZiAodmFsdWUgPT09IE9iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gJ19fcV9vYmp0fCcgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSlcbiAgfVxuXG4gIC8vIGhtbSwgd2UgZG9uJ3Qga25vdyB3aGF0IHRvIGRvIHdpdGggaXQsXG4gIC8vIHNvIGp1c3QgcmV0dXJuIGl0IGFzIGlzXG4gIHJldHVybiB2YWx1ZVxufVxuXG5mdW5jdGlvbiBkZWNvZGUgKHZhbHVlKSB7XG4gIGNvbnN0IGxlbmd0aCA9IHZhbHVlLmxlbmd0aFxuICBpZiAobGVuZ3RoIDwgOSkge1xuICAgIC8vIHRoZW4gaXQgd2Fzbid0IGVuY29kZWQgYnkgdXNcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIGNvbnN0IHR5cGUgPSB2YWx1ZS5zdWJzdHJpbmcoMCwgOClcbiAgY29uc3Qgc291cmNlID0gdmFsdWUuc3Vic3RyaW5nKDkpXG5cbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnX19xX2RhdGUnOlxuICAgICAgY29uc3QgbnVtYmVyID0gTnVtYmVyKHNvdXJjZSlcbiAgICAgIHJldHVybiBuZXcgRGF0ZShOdW1iZXIuaXNOYU4obnVtYmVyKSA9PT0gdHJ1ZSA/IHNvdXJjZSA6IG51bWJlcilcblxuICAgIGNhc2UgJ19fcV9leHByJzpcbiAgICAgIHJldHVybiBuZXcgUmVnRXhwKHNvdXJjZSlcblxuICAgIGNhc2UgJ19fcV9udW1iJzpcbiAgICAgIHJldHVybiBOdW1iZXIoc291cmNlKVxuXG4gICAgY2FzZSAnX19xX2Jvb2wnOlxuICAgICAgcmV0dXJuIEJvb2xlYW4oc291cmNlID09PSAnMScpXG5cbiAgICBjYXNlICdfX3Ffc3Rybic6XG4gICAgICByZXR1cm4gJycgKyBzb3VyY2VcblxuICAgIGNhc2UgJ19fcV9vYmp0JzpcbiAgICAgIHJldHVybiBKU09OLnBhcnNlKHNvdXJjZSlcblxuICAgIGRlZmF1bHQ6XG4gICAgICAvLyBobW0sIHdlIHJlYWNoZWQgaGVyZSwgd2UgZG9uJ3Qga25vdyB0aGUgdHlwZSxcbiAgICAgIC8vIHRoZW4gaXQgbWVhbnMgaXQgd2Fzbid0IGVuY29kZWQgYnkgdXMsIHNvIGp1c3RcbiAgICAgIC8vIHJldHVybiB3aGF0ZXZlciB2YWx1ZSBpdCBpc1xuICAgICAgcmV0dXJuIHZhbHVlXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVtcHR5U3RvcmFnZSAoKSB7XG4gIGNvbnN0IGdldFZhbCA9ICgpID0+IG51bGxcblxuICByZXR1cm4ge1xuICAgIGhhczogKCkgPT4gZmFsc2UsIC8vIGFsaWFzIGZvciBoYXNJdGVtOyBUT0RPOiByZW1vdmUgaW4gUXYzXG4gICAgaGFzSXRlbTogKCkgPT4gZmFsc2UsXG4gICAgZ2V0TGVuZ3RoOiAoKSA9PiAwLFxuICAgIGdldEl0ZW06IGdldFZhbCxcbiAgICBnZXRJbmRleDogZ2V0VmFsLFxuICAgIGdldEtleTogZ2V0VmFsLFxuICAgIGdldEFsbDogKCkgPT4ge30sXG4gICAgZ2V0QWxsS2V5czogKCkgPT4gW10sXG4gICAgc2V0OiBub29wLCAvLyBhbGlhcyBmb3Igc2V0SXRlbTsgVE9ETzogcmVtb3ZlIGluIFF2M1xuICAgIHNldEl0ZW06IG5vb3AsXG4gICAgcmVtb3ZlOiBub29wLCAvLyBhbGlhcyBmb3IgcmVtb3ZlSXRlbTsgVE9ETzogcmVtb3ZlIGluIFF2M1xuICAgIHJlbW92ZUl0ZW06IG5vb3AsXG4gICAgY2xlYXI6IG5vb3AsXG4gICAgaXNFbXB0eTogKCkgPT4gdHJ1ZVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdG9yYWdlICh0eXBlKSB7XG4gIGNvbnN0XG4gICAgd2ViU3RvcmFnZSA9IHdpbmRvd1sgdHlwZSArICdTdG9yYWdlJyBdLFxuICAgIGdldCA9IGtleSA9PiB7XG4gICAgICBjb25zdCBpdGVtID0gd2ViU3RvcmFnZS5nZXRJdGVtKGtleSlcbiAgICAgIHJldHVybiBpdGVtXG4gICAgICAgID8gZGVjb2RlKGl0ZW0pXG4gICAgICAgIDogbnVsbFxuICAgIH1cblxuICBjb25zdCBoYXNJdGVtID0ga2V5ID0+IHdlYlN0b3JhZ2UuZ2V0SXRlbShrZXkpICE9PSBudWxsXG4gIGNvbnN0IHNldEl0ZW0gPSAoa2V5LCB2YWx1ZSkgPT4geyB3ZWJTdG9yYWdlLnNldEl0ZW0oa2V5LCBlbmNvZGUodmFsdWUpKSB9XG4gIGNvbnN0IHJlbW92ZUl0ZW0gPSBrZXkgPT4geyB3ZWJTdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KSB9XG5cbiAgcmV0dXJuIHtcbiAgICBoYXM6IGhhc0l0ZW0sIC8vIFRPRE86IHJlbW92ZSBpbiBRdjNcbiAgICBoYXNJdGVtLFxuICAgIGdldExlbmd0aDogKCkgPT4gd2ViU3RvcmFnZS5sZW5ndGgsXG4gICAgZ2V0SXRlbTogZ2V0LFxuICAgIGdldEluZGV4OiBpbmRleCA9PiB7XG4gICAgICByZXR1cm4gaW5kZXggPCB3ZWJTdG9yYWdlLmxlbmd0aFxuICAgICAgICA/IGdldCh3ZWJTdG9yYWdlLmtleShpbmRleCkpXG4gICAgICAgIDogbnVsbFxuICAgIH0sXG4gICAgZ2V0S2V5OiBpbmRleCA9PiB7XG4gICAgICByZXR1cm4gaW5kZXggPCB3ZWJTdG9yYWdlLmxlbmd0aFxuICAgICAgICA/IHdlYlN0b3JhZ2Uua2V5KGluZGV4KVxuICAgICAgICA6IG51bGxcbiAgICB9LFxuICAgIGdldEFsbDogKCkgPT4ge1xuICAgICAgbGV0IGtleVxuICAgICAgY29uc3QgcmVzdWx0ID0ge30sIGxlbiA9IHdlYlN0b3JhZ2UubGVuZ3RoXG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAga2V5ID0gd2ViU3RvcmFnZS5rZXkoaSlcbiAgICAgICAgcmVzdWx0WyBrZXkgXSA9IGdldChrZXkpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHRcbiAgICB9LFxuICAgIGdldEFsbEtleXM6ICgpID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IFtdLCBsZW4gPSB3ZWJTdG9yYWdlLmxlbmd0aFxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHdlYlN0b3JhZ2Uua2V5KGkpKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSxcbiAgICBzZXQ6IHNldEl0ZW0sIC8vIFRPRE86IHJlbW92ZSBpbiBRdjNcbiAgICBzZXRJdGVtLFxuICAgIHJlbW92ZTogcmVtb3ZlSXRlbSwgLy8gVE9ETzogcmVtb3ZlIGluIFF2M1xuICAgIHJlbW92ZUl0ZW0sXG4gICAgY2xlYXI6ICgpID0+IHsgd2ViU3RvcmFnZS5jbGVhcigpIH0sXG4gICAgaXNFbXB0eTogKCkgPT4gd2ViU3RvcmFnZS5sZW5ndGggPT09IDBcbiAgfVxufVxuIiwiaW1wb3J0IHsgY2xpZW50IH0gZnJvbSAnLi4vcGxhdGZvcm0vUGxhdGZvcm0uanMnXG5pbXBvcnQgeyBnZXRFbXB0eVN0b3JhZ2UsIGdldFN0b3JhZ2UgfSBmcm9tICcuL2VuZ2luZS93ZWItc3RvcmFnZS5qcydcblxuY29uc3Qgc3RvcmFnZSA9IF9fUVVBU0FSX1NTUl9TRVJWRVJfXyB8fCBjbGllbnQuaGFzLndlYlN0b3JhZ2UgPT09IGZhbHNlXG4gID8gZ2V0RW1wdHlTdG9yYWdlKClcbiAgOiBnZXRTdG9yYWdlKCdsb2NhbCcpXG5cbmNvbnN0IFBsdWdpbiA9IHtcbiAgaW5zdGFsbCAoeyAkcSB9KSB7XG4gICAgJHEubG9jYWxTdG9yYWdlID0gc3RvcmFnZVxuICB9XG59XG5cbk9iamVjdC5hc3NpZ24oUGx1Z2luLCBzdG9yYWdlKVxuXG5leHBvcnQgZGVmYXVsdCBQbHVnaW5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0EsU0FBUyxPQUFRLE9BQU87QUFDdEIsTUFBSSxPQUFPLEtBQUssTUFBTSxNQUFNO0FBQzFCLFdBQU8sY0FBYyxNQUFNLFFBQVM7QUFBQSxFQUNyQztBQUNELE1BQUksU0FBUyxLQUFLLE1BQU0sTUFBTTtBQUM1QixXQUFPLGNBQWMsTUFBTTtBQUFBLEVBQzVCO0FBQ0QsTUFBSSxPQUFPLFVBQVUsVUFBVTtBQUM3QixXQUFPLGNBQWM7QUFBQSxFQUN0QjtBQUNELE1BQUksT0FBTyxVQUFVLFdBQVc7QUFDOUIsV0FBTyxl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
