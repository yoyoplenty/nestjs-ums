import * as excelToJson from 'convert-excel-to-json';
import { MemoryStoredFile } from 'nestjs-form-data';

export const getFileUserDetails = (file: MemoryStoredFile): any[] => {
  const result: Record<string, Record<string, string>[]> = excelToJson({
    source: file.buffer,
    columnToKey: {
      A: 'firstName',
      B: 'lastName',
      C: 'email',
    },
    header: { rows: 1 },
  });

  const userMailingDetails = Object.values(result)[0];

  const userDetails: any[] = userMailingDetails.map((mailingUserDetails: Record<string, string>) => {
    return {
      email: mailingUserDetails.email,
      lastName: mailingUserDetails.lastName,
      firstName: mailingUserDetails.firstName,
    };
  });

  return userDetails;
};
