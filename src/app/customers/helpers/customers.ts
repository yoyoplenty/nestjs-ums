import * as excelToJson from 'convert-excel-to-json';
import { MemoryStoredFile } from 'nestjs-form-data';

export const getFileOrderDetails = (file: MemoryStoredFile): any[] => {
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

  const storeDetails: any[] = storeMailingDetails.map((mailingOrderDetails: Record<string, string>) => {
    return {
      email: mailingOrderDetails.email,
      lastName: mailingOrderDetails.lastName,
      firstName: mailingOrderDetails.firstName,
    };
  });

  return storeDetails;
};
