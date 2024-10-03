import * as excelToJson from 'convert-excel-to-json';
import { MemoryStoredFile } from 'nestjs-form-data';

export const getFileBankDetails = (file: MemoryStoredFile): any[] => {
  const result: Record<string, Record<string, string>[]> = excelToJson({
    source: file.buffer,
    columnToKey: {
      A: 'firstName',
      B: 'lastName',
      C: 'email',
    },
    header: { rows: 1 },
  });

  const productMailingDetails = Object.values(result)[0];

  const productDetails: any[] = productMailingDetails.map((mailingStoreDetails: Record<string, string>) => {
    return {
      email: mailingStoreDetails.email,
      lastName: mailingStoreDetails.lastName,
      firstName: mailingStoreDetails.firstName,
    };
  });

  return productDetails;
};
