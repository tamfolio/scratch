export const FormHandler = (event, fieldsArray = [], changes = false) => {
  event?.preventDefault();
  const obj = {};
  for (let i = 0; i < fieldsArray.length; i++) {
    try {
      const value = event?.target[fieldsArray[i]]?.value;
      if (value) {
        if (changes && changes.rename.includes(fieldsArray[i])) {
          obj[changes.to] = value;
        } else {
          if (fieldsArray[i] === 'dateOfBirth') {
            obj[fieldsArray[i]] = new Date(value).toISOString();
          } else {
            obj[fieldsArray[i]] = value;
          }
        }
      }
    } catch (error) { }
  }
  return obj;
}

export const FormClear = (event, fieldsArray) => {
  event?.preventDefault();
  for (let i = 0; i < fieldsArray.length; i++) {
    try {
      event.target[fieldsArray[i]].value = '';
    } catch (error) { }
  }
}

export const FormError = (obj) => {
  return { [obj.errorType]: { error: true, errorMessage: obj.errorMessage } }
}