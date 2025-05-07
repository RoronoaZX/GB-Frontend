import { ref } from "vue";
import { formatFullname } from "./useEmployeeFunctions";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fontes";
pdfMake.vfs = pdfFonts.default;

export function useEmployeeIDPrinter(IDLogo, GB_LOGO) {
  const dialog = ref(false);
  const pdfUrl = ref("");

  const handlePrintID = (employee) => {
    convertImageToBase64(IDLogo, (base64Image) => {
      convertImageToBase64(GB_LOGO, (base64Logo) => {
        const docDefinition = generateDocDefinition(
          employee,
          base64Image,
          base64Logo
        );
        pdfMake.createPdf(docDefinition).getDataUrl((dataUrl) => {
          pdfUrl.value = dataUrl;
          dialog.value = true;
        });
      });
    });
  };

  const convertImageToBase64 = (url, callback) => {
    const reader = new FileReader();
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
      if (xhr.status === 200) {
        reader.readAsDataURL(xhr.response);
        reader.onloadend = function () {
          callback(reader.result);
        };
      } else {
        console.error("Failed to load image.");
      }
    };
    xhr.send();
  };

  const generateDocDefinition = (employee, base64Image, base64Logo) => {
    return {
      pageSize: { width: 323, height: 204 },
      pageMargins: [0, 0, 0, 0],
      background: [
        {
          image: base64Logo,
          width: 140,
          opacity: 0.1,
          absolutePosition: { x: 70, y: 15 },
        },
      ],
      content: [
        {
          canvas: [
            {
              type: "rect",
              x: 0,
              y: 0,
              w: 260,
              h: 150,
              lineWidth: 1,
              lineColor: "black",
              dash: { length: 4 },
            },
          ],
          absolutePosition: { x: 0, y: 0 },
        },
        {
          alignment: "justify",
          columns: [
            {
              image: base64Image,
              width: 100,
              height: 153,
              alignment: "left",
              margin: [-8, -4, 0, 0],
            },
            {
              stack: [
                {
                  text: "GB Bakeshop",
                  style: "header",
                  color: "red",
                  margin: [0, 0, 50, 0],
                },
                { text: `Name  : ${formatFullname(employee)}`, style: "name" },
                { text: `Position : ${employee.position}`, style: "position" },
                { text: `Phone  : ${employee.phone}`, style: "info" },
                {
                  qr: `${employee.id} - ${formatFullname(employee)} - ${
                    employee.position
                  }`,
                  fit: 87,
                  foreground: "red",
                  background: "yellow",
                  margin: [30, 7, 0, 0],
                },
              ],
            },
          ],
        },
      ],
      styles: {
        header: { fontSize: 15, bold: true, alignment: "center" },
        name: { fontSize: 8, bold: true, margin: [5, 1, 0, 0] },
        position: { fontSize: 8, margin: [5, 2, 0, 0] },
        info: { fontSize: 7, margin: [5, 2, 0, 0] },
        address: { fontSize: 7, margin: [0, 5, 0, 0] },
      },
    };
  };

  return {
    dialog,
    pdfUrl,
    handlePrintID,
  };
}
