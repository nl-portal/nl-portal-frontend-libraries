export const getTaskUrl = (
  formType: string,
  formValue: string,
  taakId: string,
) => {
  if (formType === "externalurl") return formValue;
  return `/taken/taak?id=${taakId}`;
};
