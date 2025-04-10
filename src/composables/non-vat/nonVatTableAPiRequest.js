import { useBirReportsStore } from "src/stores/bir-reports";

const birReportsStore = useBirReportsStore();

export const updateDate = async (data, val) => {
  console.log("updateDate", data);
  console.log("updateDate", val);

  const response = await birReportsStore.updateDate(data, val);

  return response;
};

export const updateReceiptNo = async (data, val) => {
  console.log("updateReceiptNo", data);
  console.log("updateReceiptNo", val);

  const response = await birReportsStore.updateReceiptNo(data, val);

  return response;
};

export const updateDescription = async (data, val) => {
  console.log("updateDescription composables", data);
  console.log("updateDescription composables", val);

  const response = await birReportsStore.updateDescription(data, val);

  return response;
};

export const updateAddress = async (data, val) => {
  console.log("updateAddress", data);
  console.log("updateAddress", val);

  const response = await birReportsStore.updateAddress(data, val);

  return response;
};

export const updateTinNo = async (data, val) => {
  console.log("updateTinNo", data);
  console.log("updateTinNo", val);

  const response = await birReportsStore.updateTinNo(data, val);

  return response;
};

export const updateAmount = async (data, val) => {
  console.log("updateAmount", data);
  console.log("updateAmount", val);

  const response = await birReportsStore.updateAmount(data, val);

  return response;
};
