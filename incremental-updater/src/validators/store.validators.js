import CustomError from '../errors/custom.error.js';
import { HTTP_STATUS_SUCCESS_ACCEPTED } from '../constants/http.status.constants.js';

export function doValidation(messageBody) {
  const storeKey = messageBody.resourceUserProvidedIdentifiers?.key;
  const type = messageBody.type;
  if (!messageBody) {
    throw new CustomError(
      HTTP_STATUS_SUCCESS_ACCEPTED,
      `The incoming message body is missing. No further action is required. `
    );
  }
  if (storeKey !== process.env.CTP_STORE_KEY) {
    throw new CustomError(
      HTTP_STATUS_SUCCESS_ACCEPTED,
      `The incoming message is about the change in store ${storeKey}. No further action is required. `
    );
  }
  if (type !== 'StoreProductSelectionsChanged') {
    throw new CustomError(
      HTTP_STATUS_SUCCESS_ACCEPTED,
      `The incoming message belongs to inappropriate type ${type}. No further action is required. `
    );
  }

  if (
    !messageBody.updatedProductSelections &&
    !messageBody.removedProductSelections &&
    !messageBody.addedProductSelections
  ) {
    throw new CustomError(
      HTTP_STATUS_SUCCESS_ACCEPTED,
      `Unable to find suitable actions [addedProductSelections,removedProductSelections,updatedProductSelections] within incoming message.`
    );
  }
}
