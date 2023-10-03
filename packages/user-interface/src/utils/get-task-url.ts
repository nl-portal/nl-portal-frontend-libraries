export const getTaskUrl = (formType: string, formValue: string, verwerkerTaakId: string) => {
  if (formType === 'id') {
    return `/taken/taak?formulier=${formValue}&id=${verwerkerTaakId}`;
  }
  return formValue;
};
