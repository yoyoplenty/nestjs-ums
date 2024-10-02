import * as excelToJson from 'convert-excel-to-json';
import { MemoryStoredFile } from 'nestjs-form-data';

export const getFileStoreDetails = (file: MemoryStoredFile): any[] => {
  const result: Record<string, Record<string, string>[]> = excelToJson({
    source: file.buffer,
    columnToKey: {
      A: 'firstName',
      B: 'lastName',
      C: 'email',
    },
    header: { rows: 1 },
  });

  const storeMailingDetails = Object.values(result)[0];

  const storeDetails: any[] = storeMailingDetails.map((mailingStoreDetails: Record<string, string>) => {
    return {
      email: mailingStoreDetails.email,
      lastName: mailingStoreDetails.lastName,
      firstName: mailingStoreDetails.firstName,
    };
  });

  return storeDetails;
};
