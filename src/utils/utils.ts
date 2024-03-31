
export const capitalizedWord = (str:string) => str.charAt(0).toUpperCase() + str.slice(1);

export const formatDateNormalize = (dateData: string) => (
  new Date(dateData).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
);

export const formatDateTime = (dateData: string) => {
  const date = new Date(dateData);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
